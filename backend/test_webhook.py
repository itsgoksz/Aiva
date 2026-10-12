import asyncio
import httpx

async def main():
    async with httpx.AsyncClient() as client:
        payload = {
            "message": {
                "type": "function-call",
                "functionCall": {
                    "name": "book_appointment",
                    "parameters": {
                        "customer_name": "Gokul",
                        "customer_phone": "+918904216921",
                        "service_name": "Haircut",
                        "date": "2026-06-27",
                        "time": "11:00"
                    }
                }
            }
        }
        resp = await client.post("http://127.0.0.1:8000/api/webhooks/vapi/3", json=payload)
        print("Status:", resp.status_code)
        print("Body:", resp.json())

asyncio.run(main())
