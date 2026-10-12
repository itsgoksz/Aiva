import asyncio
import httpx

async def main():
    payload = {
        "message": {
            "type": "tool-calls",
            "toolWithToolCallList": [
                {
                    "toolCall": {
                        "id": "call_123",
                        "function": {
                            "name": "book_appointment",
                            "arguments": "{\"customer_name\":\"Google\",\"customer_phone\":\"9989979989\",\"service_name\":\"Haircut\",\"date\":\"2026-06-27\",\"time\":\"11:00\"}"
                        }
                    }
                }
            ]
        }
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post("http://127.0.0.1:8000/api/webhooks/vapi/3", json=payload)
        print("Status:", resp.status_code)
        print("Body:", resp.text)

asyncio.run(main())
