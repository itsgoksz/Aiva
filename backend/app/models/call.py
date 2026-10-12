"""
Aiva — Call Model
"""

from datetime import datetime, timezone

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Call(Base):
    __tablename__ = "calls"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    business_id: Mapped[int] = mapped_column(
        ForeignKey("businesses.id", ondelete="CASCADE"), nullable=False
    )
    customer_id: Mapped[int | None] = mapped_column(
        ForeignKey("customers.id", ondelete="SET NULL"), nullable=True
    )
    call_start: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    call_end: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    duration_seconds: Mapped[int | None] = mapped_column(Integer, nullable=True)
    
    # Event-driven fields
    phone_number: Mapped[str | None] = mapped_column(String(20), nullable=True)
    customer_name: Mapped[str | None] = mapped_column(String(100), nullable=True)
    service_requested: Mapped[str | None] = mapped_column(String(100), nullable=True)
    staff_assigned: Mapped[str | None] = mapped_column(String(100), nullable=True)
    appointment_datetime: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    price: Mapped[float | None] = mapped_column(Integer, nullable=True) # or Float
    
    call_outcome: Mapped[str | None] = mapped_column(String(50), nullable=True)
    confidence: Mapped[str | None] = mapped_column(String(20), nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    timeline_events: Mapped[str | None] = mapped_column(Text, nullable=True) # Store JSON string of events
    
    # Deprecated fields (kept for backward compatibility)
    outcome: Mapped[str] = mapped_column(String(30), nullable=False, default="unknown")
    transcript: Mapped[str | None] = mapped_column(Text, nullable=True)
    recording_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    transfer_reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    voice_provider: Mapped[str] = mapped_column(String(20), nullable=False, default="elevenlabs")
    provider_call_id: Mapped[str | None] = mapped_column(String(255), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    business = relationship("Business", back_populates="calls")
    customer = relationship("Customer", back_populates="calls", lazy="selectin")

    def __repr__(self) -> str:
        return f"<Call(id={self.id}, outcome='{self.outcome}')>"
