import json

payload = {
    "message": {
        "type": "tool-calls",
        "toolWithToolCallList": [
            {
                "toolCall": {
                    "id": "call_123",
                    "function": {
                        "name": "book_appointment",
                        "arguments": "{\"customer_name\":\"Gokul\"}"
                    }
                }
            }
        ]
    }
}

message = payload.get("message", {})
message_type = message.get("type", "")

if message_type == "tool-calls":
    tool_calls = message.get("toolWithToolCallList", message.get("toolCalls", []))
    if not tool_calls:
        print("Empty tool_calls")
        
    tool_call_obj = tool_calls[0].get("toolCall", {})
    function_call = tool_call_obj.get("function", {})
    
    args = function_call.get("arguments", "{}")
    if isinstance(args, str):
        try:
            args = json.loads(args)
        except Exception:
            args = {}
            
    print({
        "type": "function_call",
        "function_name": function_call.get("name", ""),
        "parameters": args,
        "tool_call_id": tool_call_obj.get("id", "")
    })
