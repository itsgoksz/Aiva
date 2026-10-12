import asyncio
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.models.business import Business
from app.models.service import Service

async def main():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Business))
        businesses = result.scalars().all()
        for b in businesses:
            print(f"Business: {b.id} - {b.business_name}")
            srv = await db.execute(select(Service).where(Service.business_id == b.id))
            for s in srv.scalars().all():
                print(f"  Service: {s.name} (Active: {s.is_active})")

asyncio.run(main())
