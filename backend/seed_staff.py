import asyncio
from datetime import date, time
from app.core.database import AsyncSessionLocal
from app.models.staff import Staff
from app.models.customer import Customer
from app.models.appointment import Appointment
from app.models.service import Service

async def seed_data():
    async with AsyncSessionLocal() as db:
        # Create Staff
        s1 = Staff(business_id=3, name="Priya Sharma", role="Colour Specialist", phone="+919876543210", email="priya@snipandstreak.com")
        s2 = Staff(business_id=3, name="Arjun", role="Hair Designer", phone="+919876543211", email="arjun@snipandstreak.com")
        s3 = Staff(business_id=3, name="Meera Reddy", role="Massage Therapist", phone="+919876543212", email="meera@snipandstreak.com")
        db.add_all([s1, s2, s3])
        await db.commit()
        await db.refresh(s1)
        await db.refresh(s2)
        await db.refresh(s3)
        print("Seeded staff")
        
        # Create Customer
        c1 = Customer(business_id=3, name="Gokul", phone="+15076107461", email="gokul@example.com")
        db.add(c1)
        await db.commit()
        await db.refresh(c1)
        print("Seeded customer")
        
        # Fetch Service (to attach to appointment)
        from sqlalchemy import select
        res = await db.execute(select(Service).where(Service.business_id == 3))
        svc = res.scalars().first()
        svc_id = svc.id if svc else None
        
        # Create Appointments
        a1 = Appointment(
            business_id=3,
            customer_id=c1.id,
            service_id=svc_id,
            staff_id=s2.id, # Arjun
            date=date.today(),
            start_time=time(9, 0),
            end_time=time(10, 0),
            status="confirmed",
            notes="Regular haircut"
        )
        db.add(a1)
        await db.commit()
        print("Seeded appointments")

asyncio.run(seed_data())
