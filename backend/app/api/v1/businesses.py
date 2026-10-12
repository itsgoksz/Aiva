"""
Aiva — Business API Routes
"""

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.core.deps import CurrentUser, DbSession, OwnerUser
from app.models.business import Business
from app.schemas.business import BusinessResponse, BusinessUpdate

router = APIRouter(prefix="/business", tags=["Business"])


@router.get("", response_model=BusinessResponse)
async def get_business(current_user: CurrentUser, db: DbSession):
    """Get the current user's business."""
    result = await db.execute(
        select(Business).where(Business.id == current_user.business_id)
    )
    business = result.scalar_one_or_none()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")
    return BusinessResponse.model_validate(business)


@router.put("", response_model=BusinessResponse)
async def update_business(
    data: BusinessUpdate, current_user: OwnerUser, db: DbSession
):
    """Update business settings (owner only)."""
    result = await db.execute(
        select(Business).where(Business.id == current_user.business_id)
    )
    business = result.scalar_one_or_none()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(business, field, value)

    await db.flush()
    await db.refresh(business)
    return BusinessResponse.model_validate(business)

@router.post("/provision-voice")
async def provision_voice(current_user: OwnerUser, db: DbSession):
    """
    Provision a unique Vapi Assistant and Phone Number for this business.
    This enables true multi-tenancy and BYON (Call Forwarding).
    """
    import os
    from app.voice.vapi_provider import VapiProvider

    result = await db.execute(
        select(Business).where(Business.id == current_user.business_id)
    )
    business = result.scalar_one_or_none()
    if not business:
        raise HTTPException(status_code=404, detail="Business not found")

    vapi = VapiProvider()

    # Build business config for the prompt
    business_config = {
        "business_name": business.business_name,
        "opening_hours": business.opening_hours or {},
        "services": [
            {"name": s.name, "duration_minutes": s.duration_minutes, "price": s.price}
            for s in business.services
        ] if business.services else [],
        "policies": business.policies or {},
        "faq_knowledge_base": business.faq_knowledge_base or [],
        "ai_greeting": business.ai_greeting,
        "webhook_url": os.getenv("APP_URL", "https://327a-106-51-109-211.ngrok-free.app") + f"/api/webhooks/vapi/{business.id}"
    }

    try:
        # 1. Create Assistant
        assistant_id = await vapi.create_assistant(business_config)
        business.vapi_assistant_id = assistant_id

        # 2. Allocate and link Phone Number
        phone_data = await vapi.allocate_phone_number(assistant_id)
        business.vapi_phone_id = phone_data["phone_id"]
        business.vapi_phone_number = phone_data["phone_number"]

        await db.commit()

        return {
            "success": True,
            "assistant_id": assistant_id,
            "phone_number": phone_data["phone_number"],
            "message": f"Successfully provisioned voice! Business owners can now forward their calls to {phone_data['phone_number']}."
        }
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to provision voice: {str(e)}")

