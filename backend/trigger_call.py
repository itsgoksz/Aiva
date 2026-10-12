import asyncio
import os
import httpx
from dotenv import load_dotenv

load_dotenv()
VAPI_KEY = os.getenv("VAPI_API_KEY")
MY_PHONE = "+918904216921" # User will fill this in

async def main():
    if not VAPI_KEY:
        print("Error: VAPI_API_KEY not found in .env")
        return
        
    async with httpx.AsyncClient() as client:
        # Get Assistants
        resp = await client.get("https://api.vapi.ai/assistant", headers={"Authorization": f"Bearer {VAPI_KEY}"})
        assistants = resp.json()
        local_assistant = next((a for a in assistants if a.get("name") == "Aiva - Hair & Care (V11)"), None)
        
        if not local_assistant:
            print("Could not find an assistant named 'Aiva - Hair & Care (V11)'.")
            return
            
        print(f"Found Assistant: {local_assistant['name']} ({local_assistant['id']})")
        
        # Get Phone Numbers
        resp = await client.get("https://api.vapi.ai/phone-number", headers={"Authorization": f"Bearer {VAPI_KEY}"})
        numbers = resp.json()
        if not numbers:
            print("No phone numbers found in Vapi.")
            return
            
        phone = numbers[0]
        print(f"Found Phone Number: {phone['number']} ({phone['id']})")
        
        if not MY_PHONE:
            print("\nPlease add your phone number to the MY_PHONE variable in trigger_call.py to make the call!")
            return
            
        print(f"\nTriggering outbound call to {MY_PHONE}...")
        call_resp = await client.post(
            "https://api.vapi.ai/call/phone",
            headers={"Authorization": f"Bearer {VAPI_KEY}"},
            json={
                "phoneNumberId": phone["id"],
                "assistantId": local_assistant["id"],
                "customer": {"number": MY_PHONE}
            }
        )
        
        if call_resp.status_code == 201:
            print("Success! Your phone should be ringing in a few seconds.")
        else:
            print(f"Failed: {call_resp.text}")

asyncio.run(main())
