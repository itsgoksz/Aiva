import asyncio
from sqlalchemy import select, func
from app.core.database import AsyncSessionLocal
from app.models.staff import Staff
from app.models.service import Service

async def main():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Staff).where(Staff.business_id == 3))
        staff = result.scalars().all()
        for s in staff:
            print(f"Staff: {s.name}, Active: {s.is_active}")
        
        srv = await db.execute(select(Service).where(Service.business_id == 3, Service.name.ilike('%Haircut%')))
        services = srv.scalars().all()
        for s in services:
            print(f"Service: {s.name}")

asyncio.run(main())
