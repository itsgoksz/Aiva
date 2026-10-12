from datetime import datetime, timezone
date = "2026-06-27"
time = "11:00"
start_time_local = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M")
start_time_utc = start_time_local.astimezone(timezone.utc)
print("Local naive:", start_time_local)
print("UTC aware:", start_time_utc)
