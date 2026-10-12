import asyncio
from app.core.database import AsyncSessionLocal
from app.models.appointment import Appointment
from app.models.call import Call
from sqlalchemy import select

async def run():
    async with AsyncSessionLocal() as db:
        res = await db.execute(select(Appointment).order_by(Appointment.created_at.desc()).limit(6))
        apts = res.scalars().all()
        print("--- LATEST APPOINTMENTS ---")
        for a in apts:
            print(f'Apt {a.id}: Date {a.date}, Time {a.start_time}-{a.end_time}, Source {a.source}')
        
        res = await db.execute(select(Call).order_by(Call.created_at.desc()).limit(5))
        calls = res.scalars().all()
        print("\n--- LATEST CALLS ---")
        for c in calls:
            print(f'Call ID: {c.id}, Provider ID: {c.provider_call_id}, Outcome: {c.call_outcome}, Timeline length: {len(c.timeline_events)}')

asyncio.run(run())
