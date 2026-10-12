import asyncio
import os
import httpx
from dotenv import load_dotenv

load_dotenv()
VAPI_KEY = os.getenv("VAPI_API_KEY")

async def main():
    async with httpx.AsyncClient() as client:
        # Get Phone Numbers
        resp = await client.get("https://api.vapi.ai/phone-number", headers={"Authorization": f"Bearer {VAPI_KEY}"})
        numbers = resp.json()
        
        for n in numbers:
            print(f"Number: {n.get('number')} | ID: {n.get('id')} | AssistantID: {n.get('assistantId')}")

asyncio.run(main())
