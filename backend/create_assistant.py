import asyncio
from app.core.database import AsyncSessionLocal
from app.models.business import Business
from app.voice.vapi_provider import VapiProvider
from sqlalchemy import select
from app.models.service import Service

async def main():
    async with AsyncSessionLocal() as db:
        biz = (await db.execute(select(Business).where(Business.id == 3))).scalar_one()
        
        srv_result = await db.execute(select(Service).where(Service.business_id == 3, Service.is_active == True))
        services_db = srv_result.scalars().all()
        services_list = [{"name": s.name, "duration_minutes": s.duration_minutes, "price": float(s.price) if s.price else 0} for s in services_db]
        
        provider = VapiProvider()
        biz_config = {
            "business_name": biz.business_name,
            "webhook_url": "https://kizjs-2401-4900-1cc4-420b-a017-c195-528b-a231.run.pinggy-free.link/api/webhooks/vapi/3",
            "opening_hours": biz.opening_hours,
            "services": services_list,
            "policies": {"Cancellation": "24 hours notice required"}
        }
        
        assistant_id = await provider.create_assistant(biz_config)
        print(f"ASSISTANT_ID={assistant_id}")

asyncio.run(main())
