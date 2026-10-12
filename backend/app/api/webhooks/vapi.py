"""
Aiva — Vapi Webhook Handler
"""

from datetime import datetime, timezone

from fastapi import APIRouter, Request, HTTPException, BackgroundTasks
from sqlalchemy import select

from app.core.database import AsyncSessionLocal
from app.models.business import Business
from app.models.call import Call
from app.models.customer import Customer
from app.models.appointment import Appointment
from app.models.service import Service
from app.services.ai_agent_service import AIAgentService
from app.voice.vapi_provider import VapiProvider

router = APIRouter(prefix="/webhooks", tags=["Webhooks"])
vapi = VapiProvider()


@router.post("/vapi/{business_id}")
async def vapi_webhook(business_id: int, request: Request, background_tasks: BackgroundTasks):
    """Handle incoming Vapi AI webhook events."""
    # Verify webhook authenticity
    if not await vapi.verify_webhook(request):
        raise HTTPException(status_code=401, detail="Invalid webhook signature")

    payload = await request.json()
    
    with open("vapi_debug.log", "a") as f:
        import json
        f.write(f"\n--- INCOMING PAYLOAD ---\n{json.dumps(payload)}\n")
        
    event = await vapi.handle_event(payload)

    async with AsyncSessionLocal() as db:
        # Verify business exists
        biz_result = await db.execute(
            select(Business).where(Business.id == business_id)
        )
        business = biz_result.scalar_one_or_none()
        if not business:
            raise HTTPException(status_code=404, detail="Business not found")

        if event["type"] == "function_call":
            # Route to AI agent service
            agent = AIAgentService(db, business_id)
            fn_name = event["function_name"]
            params = event["parameters"]
            tool_call_id = event.get("tool_call_id")

            handler = getattr(agent, fn_name, None)
            if handler:
                result = await handler(**params)
                await db.commit()
                
                if tool_call_id:
                    resp = {
                        "results": [
                            {
                                "toolCallId": tool_call_id,
                                "result": result.get("message", "")
                            }
                        ]
                    }
                    with open("vapi_debug.log", "a") as f:
                        f.write(f"--- OUTGOING RESPONSE ---\n{json.dumps(resp)}\n")
                    return resp
                resp = {"result": result.get("message", ""), "data": result}
                with open("vapi_debug.log", "a") as f:
                    f.write(f"--- OUTGOING RESPONSE ---\n{json.dumps(resp)}\n")
                return resp
            else:
                if tool_call_id:
                    resp = {
                        "results": [
                            {
                                "toolCallId": tool_call_id,
                                "result": "Sorry, I'm not sure how to help with that."
                            }
                        ]
                    }
                    with open("vapi_debug.log", "a") as f:
                        f.write(f"--- OUTGOING RESPONSE ---\n{json.dumps(resp)}\n")
                    return resp
                resp = {"result": "Sorry, I'm not sure how to help with that."}
                with open("vapi_debug.log", "a") as f:
                    f.write(f"--- OUTGOING RESPONSE ---\n{json.dumps(resp)}\n")
                return resp
        elif event["type"] == "assistant-request":
            customer_phone = event.get("customer_phone")
            
            if customer_phone:
                cust_result = await db.execute(
                    select(Customer)
                    .where(Customer.business_id == business_id)
                    .where(Customer.phone == customer_phone)
                )
                customer = cust_result.scalar_one_or_none()
                if customer:
                    apt_result = await db.execute(
                        select(Appointment)
                        .where(Appointment.customer_id == customer.id)
                        .order_by(Appointment.created_at.desc())
                        .limit(1)
                    )
                    recent_apt = apt_result.scalar_one_or_none()
                    
                    if recent_apt:
                        svc_result = await db.execute(select(Service).where(Service.id == recent_apt.service_id))
                        service = svc_result.scalar_one_or_none()
                        svc_name = service.name if service else "appointment"
                        
                        return {
                            "assistant": {
                                "firstMessage": f"Welcome back, {customer.name}! Are you calling to book your usual {svc_name} today?"
                            }
                        }
                    else:
                        return {
                            "assistant": {
                                "firstMessage": f"Welcome back, {customer.name}! How can I help you today?"
                            }
                        }
            
            return {}

        elif event["type"] == "call_ended":
            # Store call record
            call = Call(
                business_id=business_id,
                call_start=datetime.now(timezone.utc),
                call_end=datetime.now(timezone.utc),
                duration_seconds=event.get("duration"),
                transcript=event.get("transcript"),
                recording_url=event.get("recording_url"),
                voice_provider="vapi",
                provider_call_id=event.get("call_id"),
                outcome="unknown",  # Will be determined from transcript analysis
            )
            db.add(call)
            await db.commit()

            # Async wrapper for background task
            async def run_post_call():
                async with AsyncSessionLocal() as bg_db:
                    bg_agent = AIAgentService(bg_db, business_id)
                    await bg_agent.process_post_call_transcript(event.get("transcript", ""), event.get("call_id", ""))
                    await bg_db.commit()

            # Launch background post-call processing to catch hallucinated bookings
            if event.get("transcript"):
                background_tasks.add_task(run_post_call)

            return {"status": "recorded"}

        return {"status": "ok"}
