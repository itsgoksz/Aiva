import asyncio
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.models.service import Service

async def main():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Service).where(Service.business_id == 4))
        services = result.scalars().all()
        for s in services:
            print(f"ID: {s.id}, Name: {s.name}, Active: {s.is_active}")

asyncio.run(main())
