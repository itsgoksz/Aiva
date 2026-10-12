import asyncio
import os
import httpx
from dotenv import load_dotenv

load_dotenv()
VAPI_KEY = os.getenv("VAPI_API_KEY")

async def main():
    if not VAPI_KEY:
        print("Error: VAPI_API_KEY not found in .env")
        return
        
    new_url = "https://true-gifts-take.loca.lt/api/webhooks/vapi/3"
    
    async with httpx.AsyncClient() as client:
        # Get Assistants
        resp = await client.get("https://api.vapi.ai/assistant", headers={"Authorization": f"Bearer {VAPI_KEY}"})
        assistants = resp.json()
        local_assistant = next((a for a in assistants if a.get("name") == "Aiva - Hair & Care (V11)"), None)
        
        if not local_assistant:
            print("Could not find an assistant named 'Aiva - Hair & Care (V11)'.")
            return
            
        print(f"Updating Assistant: {local_assistant['name']} ({local_assistant['id']})")
        
        update_resp = await client.patch(
            f"https://api.vapi.ai/assistant/{local_assistant['id']}",
            headers={"Authorization": f"Bearer {VAPI_KEY}"},
            json={
                "serverUrl": new_url
            }
        )
        
        if update_resp.status_code == 200:
            print(f"Success! Updated webhook URL to: {new_url}")
        else:
            print(f"Failed to update: {update_resp.text}")

asyncio.run(main())
