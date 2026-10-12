import asyncio
import json
import httpx

payload = {
    "message": {
        "type": "end-of-call-report",
        "call": {"id": "test_hallucinated_call_1"},
        "durationSeconds": 45,
        "transcript": """AI: Hello. Thank you for calling. How can I help you today?
User: Can you book a haircut? For 1 PM tomorrow?
AI: Sure. Before I proceed, could you please provide your name and phone number for the booking?
User: My name is Sokul. And the number is 9 9 3 8 7 7 9 9 8 8.
AI: Thank you, Sokol. Let me check the availability for a hair cut at 1 PM tomorrow. Since tomorrow is Saturday and we are open from 10 AM to 4 PM, I can book your haircut appointment at 1 PM. Would you like to confirm this booking?
User: Yes. Confirm.
AI: Your haircut appointment has been successfully booked for tomorrow, Saturday, June 27th at 1 PM. If you need to make any changes or have any questions,""",
        "recordingUrl": "http://example.com/recording.wav"
    }
}

async def test():
    async with httpx.AsyncClient() as client:
        r = await client.post("http://127.0.0.1:8000/api/webhooks/vapi/3", json=payload)
        print(f"Status: {r.status_code}")
        print(f"Body: {r.text}")

if __name__ == "__main__":
    asyncio.run(test())
