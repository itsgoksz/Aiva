import asyncio
from app.core.database import AsyncSessionLocal
from app.models.business import Business
async def seed():
    async with AsyncSessionLocal() as db:
        biz = Business(business_name="Aiva Test Salon", phone_number="+15076107461")
        db.add(biz)
        await db.commit()
        await db.refresh(biz)
        print(f"BUSINESS_ID={biz.id}")
asyncio.run(seed())
