import asyncio
import json
from app.core.database import AsyncSessionLocal
from app.models.call import Call
from sqlalchemy import select

async def run():
    async with AsyncSessionLocal() as db:
        res = await db.execute(select(Call).order_by(Call.created_at.desc()).limit(1))
        call = res.scalar_one_or_none()
        if call:
            print(f"Call ID: {call.id}")
            events = json.loads(call.timeline_events) if call.timeline_events else []
            for e in events:
                print(f"[{e['event']}] {json.dumps(e['data'])}")
        else:
            print("No calls found.")

asyncio.run(run())
