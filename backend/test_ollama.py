import asyncio
from pydantic import BaseModel
import openai

class CallExtraction(BaseModel):
    intent: str
    is_confirmed: bool

async def test():
    client = openai.AsyncOpenAI(base_url="http://localhost:11434/v1", api_key="ollama")
    try:
        completion = await client.beta.chat.completions.parse(
            model="gemma3:4b",
            messages=[{"role": "user", "content": "Extract: intent=book_appointment, is_confirmed=true"}],
            response_format=CallExtraction
        )
        print(completion.choices[0].message.parsed)
    except Exception as e:
        print(f"Error: {e}")

asyncio.run(test())
