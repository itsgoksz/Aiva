from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any, Dict
import logging

from app.core.database import get_db
from app.services.ai_agent_service import AIAgentService

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks/elevenlabs", tags=["webhooks", "elevenlabs"])

@router.post("/tool")
async def handle_tool_call(request: Request, db: AsyncSession = Depends(get_db)):
    """
    Handle incoming tool calls from ElevenLabs Conversational AI Agent.
    ElevenLabs sends the tool name in the headers or payload depending on configuration.
    Alternatively, we can set up different endpoints for different tools.
    For this MVP, we assume a single endpoint that receives tool_name and arguments in the JSON body,
    or we can parse the specific tool based on the payload.
    """
    try:
        payload = await request.json()
        logger.info(f"Received ElevenLabs webhook payload: {payload}")
    except Exception as e:
        logger.error(f"Failed to parse ElevenLabs webhook JSON: {e}")
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    # Assuming we pass 'business_id' in the webhook URL query param or headers, or hardcode to 1 for MVP
    business_id = int(request.query_params.get("business_id", 1))
    call_id = request.query_params.get("call_id", "unknown_call") # Might need to get this from headers/payload
    
    agent_service = AIAgentService(db, business_id)

    # ElevenLabs Webhook Tools typically send the parameters directly in the body.
    # To multiplex, we might need the tool name. 
    # Let's assume the user configures the webhook tool in ElevenLabs dashboard to send 'tool_name' in the body,
    # OR they point different tools to different URLs like /webhooks/elevenlabs/tool/check_availability.
    # Let's support the path parameter approach for easier routing:
    
    raise HTTPException(status_code=400, detail="Use specific tool endpoints: /tool/{tool_name}")

@router.post("/tool/{tool_name}")
async def handle_specific_tool_call(tool_name: str, request: Request, db: AsyncSession = Depends(get_db)):
    """
    Handle specific tool calls from ElevenLabs.
    Endpoint URL in ElevenLabs Dashboard should be:
    https://your-domain.com/api/webhooks/elevenlabs/tool/check_availability?business_id=1&call_id={{call_id}}
    """
    try:
        payload = await request.json()
        logger.info(f"Received ElevenLabs tool call '{tool_name}' with payload: {payload}")
    except Exception as e:
        logger.error(f"Failed to parse ElevenLabs webhook JSON: {e}")
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    business_id = int(request.query_params.get("business_id", 1))
    # In ElevenLabs, we can pass dynamic variables or just generate a call_id
    call_id = request.query_params.get("call_id", "unknown") 
    
    agent_service = AIAgentService(db, business_id)
    
    # Optional: Log the event to timeline
    await agent_service.log_timeline_event(call_id, f"tool_call_{tool_name}", payload)

    try:
        if tool_name == "check_availability":
            result = await agent_service.check_availability(**payload, call_id=call_id)
        elif tool_name == "book_appointment":
            result = await agent_service.book_appointment(**payload, call_id=call_id)
        elif tool_name == "reschedule_appointment":
            result = await agent_service.reschedule_appointment(**payload, call_id=call_id)
        elif tool_name == "cancel_appointment":
            result = await agent_service.cancel_appointment(**payload, call_id=call_id)
        elif tool_name == "answer_faq":
            result = await agent_service.answer_faq(**payload, call_id=call_id)
        elif tool_name == "transfer_to_human":
            result = await agent_service.transfer_to_human(**payload, call_id=call_id)
        elif tool_name == "get_service_price":
            result = await agent_service.get_service_price(**payload, call_id=call_id)
        else:
            return {"success": False, "message": f"Unknown tool: {tool_name}"}
            
        # Log successful completion
        await agent_service.log_timeline_event(call_id, f"tool_result_{tool_name}", result)
        
        return result
    except Exception as e:
        logger.error(f"Error executing tool '{tool_name}': {e}", exc_info=True)
        return {"success": False, "message": "An internal error occurred while processing your request."}
