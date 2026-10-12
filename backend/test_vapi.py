import asyncio
import json

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
                            "arguments": "{\"customer_name\":\"Gokul\",\"customer_phone\":\"+918904216921\",\"service_name\":\"Haircut\",\"date\":\"2026-06-27\",\"time\":\"14:00\"}"
                        }
                    }
                }
            ]
        }
    }
    print("Testing payload")
    import httpx
    async with httpx.AsyncClient() as client:
        resp = await client.post("http://127.0.0.1:8000/api/webhooks/vapi/3", json=payload)
        print("Status:", resp.status_code)
        print("Body:", resp.text)

asyncio.run(main())
