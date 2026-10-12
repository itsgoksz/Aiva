import asyncio
from app.core.database import AsyncSessionLocal
from app.models.customer import Customer
from sqlalchemy import select

async def run():
    async with AsyncSessionLocal() as db:
        res = await db.execute(select(Customer).where(Customer.phone == "9999988888"))
        cust = res.scalar_one_or_none()
        if cust:
            print(f"Found customer! Name: {cust.name}, Phone: {cust.phone}")
        else:
            print("Customer not found.")

asyncio.run(run())
