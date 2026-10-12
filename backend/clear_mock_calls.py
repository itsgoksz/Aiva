import asyncio
from app.core.database import AsyncSessionLocal
from sqlalchemy import text

async def clear_mock_calls():
    async with AsyncSessionLocal() as db:
        # Delete calls that don't have a provider_call_id (the ones created by seed script)
        await db.execute(text("DELETE FROM calls WHERE provider_call_id IS NULL"))
        await db.commit()
        print("Mock calls cleared successfully!")

if __name__ == "__main__":
    asyncio.run(clear_mock_calls())
