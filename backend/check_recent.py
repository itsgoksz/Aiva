import asyncio
from sqlalchemy import select
from app.core.database import AsyncSessionLocal
from app.models.appointment import Appointment
from app.models.customer import Customer
from app.models.service import Service

async def main():
    async with AsyncSessionLocal() as db:
        result = await db.execute(select(Appointment).order_by(Appointment.id.desc()).limit(5))
        appointments = result.scalars().all()
        for a in appointments:
            print(f"Appointment ID: {a.id}, Date: {a.date}, Start: {a.start_time}, End: {a.end_time}, Status: {a.status}, Biz: {a.business_id}")

asyncio.run(main())
