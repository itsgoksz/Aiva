"""
Aiva — Pydantic Schemas for Call
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class CallResponse(BaseModel):
    id: int
    business_id: int
    customer_id: Optional[int] = None
    call_start: datetime
    call_end: Optional[datetime] = None
    duration_seconds: Optional[int] = None
    outcome: str
    transcript: Optional[str] = None
    recording_url: Optional[str] = None
    transfer_reason: Optional[str] = None
    voice_provider: str
    provider_call_id: Optional[str] = None
    customer_name: Optional[str] = None
    created_at: datetime
    
    call_outcome: Optional[str] = None
    confidence: Optional[str] = None
    summary: Optional[str] = None
    timeline_events: Optional[str] = None
    phone_number: Optional[str] = None
    service_requested: Optional[str] = None
    staff_assigned: Optional[str] = None
    appointment_datetime: Optional[datetime] = None
    price: Optional[float] = None

    model_config = {"from_attributes": True}


class CallListResponse(BaseModel):
    items: list[CallResponse]
    total: int
    page: int
    page_size: int
