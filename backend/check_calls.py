import asyncio
from app.core.database import AsyncSessionLocal
from app.models.call import Call
from sqlalchemy import select

async def run():
    async with AsyncSessionLocal() as db:
        res = await db.execute(select(Call))
        calls = res.scalars().all()
        for c in calls[-5:]:
            print(f"ID: {c.id}, Provider ID: {c.provider_call_id}, Name: {c.customer_name}, Outcome: {c.call_outcome}")

if __name__ == "__main__":
    asyncio.run(run())
