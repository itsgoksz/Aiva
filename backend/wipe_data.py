import asyncio
from app.core.database import AsyncSessionLocal
from app.models.customer import Customer
from app.models.appointment import Appointment
from app.models.call import Call
from sqlalchemy import delete

async def run():
    async with AsyncSessionLocal() as db:
        await db.execute(delete(Appointment))
        await db.execute(delete(Call))
        await db.execute(delete(Customer))
        await db.commit()
        print("Successfully wiped all appointments, calls, and customer data! Staff and Services were kept intact.")

asyncio.run(run())
