<p align="center">
  <img src="assets/logo.png" alt="Aiva Logo" width="120" style="border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
</p>

# Aiva

> Autonomous voice AI receptionist and appointment booking platform for high-touch businesses. Answers inbound client phone calls 24/7 in natural voice, cross-checks real specialist calendars, prevents double-booking, and texts instant confirmations.

<p align="center">
  <img src="assets/preview.png" alt="Aiva Operator Dashboard" width="100%" style="border-radius: 18px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.12);" />
</p>

---

## The High-Touch Business Dilemma

For appointment-driven businesses—luxury salons, aesthetic medical clinics, wellness spas, and boutique fitness studios—the front desk is a chronic bottleneck:
- **30% Missed Inbound Calls:** During peak hours or after closing, calls roll to voicemail. High-ticket clients rarely leave messages—they simply call a competitor.
- **Calendar Fragmentation & Double-Bookings:** Receptionists juggle paper appointment books, overlapping stylist schedules, and variable treatment durations on the fly.
- **Costly No-Shows:** Without instant multi-channel confirmations (WhatsApp, SMS, email), forgotten appointments directly hit specialist earnings.

Aiva functions as an autonomous front-desk coordinator: answering client calls 24/7 in low-latency natural voice, looking up specialist availability in real time, locking appointments into the calendar, and dispatching instant confirmations over WhatsApp and SMS.

---

## Tailored for Appointment-Driven Verticals

- **Dental & Medical Clinics:** Handles urgent emergency slots, routine hygiene exams, and doctor availability inquiries while texting intake forms in advance.
- **Hair Salons & Spas:** Schedules balayage, haircuts, massages, and styling with specific specialists based on exact service durations.
- **Aesthetic Clinics:** Reserves consultations and clinical treatments with certified doctors while answering procedural FAQs.
- **Fitness & Wellness Studios:** Schedules personal training evaluations, recovery sessions, and class orientations.
- **Home & Professional Services:** Dispatches technicians, handles quotes, and confirms service arrival windows.

---

## Effortless Voice Booking for Customers & Businesses

Whether it is a dental practice handling urgent toothache calls, a hair salon managing high-demand stylists, or any service enterprise fielding daily inquiries—Aiva eliminates front-desk bottlenecks on both sides of the phone line:

### For Customers
- **Zero Hold Time, Zero Phone Menus:** Callers speak directly to a calm, natural voice without navigating confusing IVR menus or waiting on hold.
- **Natural Conversational Inquiries:** Customers can ask open questions (*"Hello, I have a bad toothache. Do you have any emergency dentist openings today?"*), request preferred specialists, or check pricing on the fly.
- **Instant Mobile Confirmation:** The second an appointment is locked, Aiva dispatches an immediate confirmation and pre-visit intake form via WhatsApp and SMS so everything is prepared prior to arrival.

### For Business Owners & Front-Desk Staff
- **100% Inbound Capture:** Never lose revenue to missed calls during peak service hours, lunch rushes, or after closing time.
- **Atomic Calendar Synchronization:** Cross-checks doctor, stylist, or specialist schedules in real time, preventing accidental double-bookings and respecting buffer times.
- **Cuts Administrative Overhead:** Eliminates repetitive phone tag and manual intake data entry, freeing staff to focus entirely on delivering exceptional in-person client care.

<p align="center">
  <img src="assets/voice_call_preview.png" alt="Aiva Conversational Voice Call Booking Experience" width="480" style="border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.12);" />
</p>

---

## Live Operator Dashboard

The Aiva operator console provides real-time visibility into the daily workflow:

- **Unified Flow & Live Queue:** Instant overview of confirmed client appointments, upcoming walk-ins, and automated phone bookings.
- **AI Intelligence & Staff Insights:** Real-time tracking of specialist capacity, open time slots, and proactive notifications for unscheduled return clients.
- **Voice Intelligence & Call Transcripts:** Complete inbound call feed with duration tracking, intent classification, customer sentiment, and verified booking outcomes.

---

## Architecture & Voice Workflow

```mermaid
flowchart TD
    Caller([Client Inbound Call]) --> VoiceGateway[Voice AI Gateway
Vapi / Retell AI Webhooks]
    VoiceGateway --> FastAPIServer[FastAPI /webhooks/vapi]
    
    subgraph CoreEngine [Aiva Backend Core]
        FastAPIServer --> Router[Agent Router & NLP Intent Classifier]
        Router --> AvailService[Availability Service Engine
- Verifies Operating Hours
- Checks Specialist Free Slots
- Factors Service Durations & Buffers]
        
        AvailService --> BookingEngine[Atomic Appointment Booking Engine]
        BookingEngine --> DB[(SQLAlchemy Database
app.db / PostgreSQL)]
        
        BookingEngine --> Notifs[Notification Dispatcher
- Instant WhatsApp Booking Card
- Twilio SMS Alert
- Email Calendar Invite]
    end

    FastAPIServer --> CallLogger[Call Intelligence Hub
- Playable Audio Recordings
- Full Timestamped Transcripts
- Caller Sentiment & Conversion Tagging]
    CallLogger --> DB
    DB --> Dashboard[React 19 Operator Dashboard]
```

### Core System Features
- **Dynamic Slot Availability (`availability_service.py`):** Calculates unallocated time slots in real time, preventing double-booking and factoring in required buffer times between appointments.
- **Dual Voice Provider Support:** Seamless bidirectional webhook architecture supporting Vapi, Retell AI, and ElevenLabs voice models, with an offline local fallback via Ollama.
- **Call Recordings & Full Transcripts:** Live call log with audio player, duration tracking, full transcription, and sentiment analysis.
- **Automated Client Confirmations:** Dispatches instant booking receipts and calendar invites via WhatsApp, SMS, and Email.
- **Background Automation (`app/tasks/`):** Automated background scripts handle 24-hour appointment reminders, no-show recovery, and daily revenue reports for owners.

---

## Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Backend Framework** | [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+) | High-throughput asynchronous API & webhook router |
| **Voice AI Layer** | Vapi & Retell AI | Low-latency voice pipelines with ElevenLabs models |
| **Local Fallback** | Ollama | Offline local AI agent fallback service |
| **Database & ORM** | [SQLAlchemy](https://www.sqlalchemy.org/) + SQLite / PostgreSQL | Async database sessions with Alembic migrations |
| **Notifications** | WhatsApp, Twilio SMS & Email | Omni-channel automated client confirmations |
| **Frontend UI** | [React 19](https://react.dev/) + [Vite](https://vite.dev/) | Sleek operator dashboard with Lucide icons |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Dark minimalist aesthetic built for busy front desks |

---

## Repository Structure

```text
Aiva/
├── assets/                       # Showcases, logos & interface previews
│   ├── preview.png               # Live operator dashboard capture
│   ├── voice_call_preview.png    # Inbound voice booking call & WhatsApp confirmation
│   └── logo.png                  # Aiva branding
├── backend/                      # Python FastAPI server
│   ├── app/
│   │   ├── api/
│   │   │   ├── v1/               # Appointments, Calls, Staff, Services, Analytics APIs
│   │   │   └── webhooks/         # Vapi, Retell & ElevenLabs incoming handlers
│   │   ├── services/
│   │   │   ├── availability_service.py # Non-conflicting booking slot calculator
│   │   │   ├── ai_agent_service.py     # Business context & booking logic
│   │   │   ├── local_ai_service.py     # Local Ollama fallback engine
│   │   │   └── notification_service.py # Multi-channel dispatch
│   │   ├── voice/                # Vapi & Retell provider implementations
│   │   ├── notifications/        # WhatsApp, SMS & Email dispatchers
│   │   ├── tasks/                # Reminders, no-show workflows & daily reports
│   │   ├── models/               # SQLAlchemy models (Business, Staff, Appointment, Call)
│   │   ├── schemas/              # Pydantic request & response contracts
│   │   └── main.py               # Server entry point
│   ├── alembic/                  # Database migration versions
│   └── requirements.txt
├── frontend/                     # React 19 + TypeScript dashboard
│   ├── src/
│   │   ├── features/
│   │   │   ├── appointments/     # Interactive calendar & booking list
│   │   │   ├── calls/            # Call logs, audio player & full transcripts
│   │   │   ├── staff/            # Specialist management & working hours
│   │   │   ├── services/         # Pricing, service durations & categories
│   │   │   ├── analytics/        # Conversion rates, peak hours & revenue
│   │   │   ├── dashboard/        # Operator overview & live queue
│   │   │   └── universe/         # Namma Universe product showcases
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## Getting Started

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- A Vapi or Retell AI account (optional for local/mock mode)

### 2. Clone the Repository
```bash
git clone https://github.com/itsgoksz/Aiva.git
cd Aiva
```

### 3. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Create `.env` in `backend/`:
```env
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite+aiosqlite:///./aiva.db
VAPI_API_KEY=your-vapi-api-key
# Optional: RETELL_API_KEY, TWILIO_ACCOUNT_SID, etc.
```

Seed initial business data and run the backend:
```bash
python3 seed.py
uvicorn app.main:app --reload --port 8000
```

### 4. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the Aiva operations dashboard.

---

<p align="center">
  Engineered by <a href="https://github.com/itsgoksz">itsgoksz</a>
</p>
