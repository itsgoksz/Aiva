<p align="center">
  <img src="assets/logo.png" alt="Aiva Logo" width="130" style="border-radius: 26px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
</p>

# 🤖 Aiva

> **Autonomous voice AI receptionist & appointment booking platform for high-touch businesses.** Never miss a client call again. Answers inbound calls, checks live staff availability, schedules appointments, and sends instant confirmations.

<p align="center">
  <img src="assets/preview.png" alt="Aiva Operations Dashboard" width="100%" style="border-radius: 16px; box-shadow: 0 20px 50px rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1);" />
</p>

---

## The Problem Aiva Solves

For appointment-driven businesses—luxury salons, aesthetic clinics, wellness spas, and boutique fitness studios—the front desk is a chronic bottleneck:
- **Missed Inbound Calls:** Up to 30% of calls go unanswered during peak operating hours or after closing, directly forfeiting high-ticket appointments.
- **Double-Bookings & Calendar Chaos:** Front-desk staff constantly juggle multi-staff schedules, service durations, and client preferences on paper or fragmented tools.
- **No-Show Revenue Loss:** Without instant calendar confirmations and automated reminders, no-show rates eat into specialist earnings.

**Aiva acts as a tireless front-desk coordinator:** answering client calls 24/7 in natural voice, checking real-time staff schedules, booking appointments directly into the calendar, and dispatching instant confirmations over WhatsApp and SMS.

---

## 🏢 Tailored for High-Touch Verticals

<p align="center">
  <img src="assets/luxury-salon.png" width="23%" alt="Luxury Salon" style="border-radius: 12px; margin: 4px;" />
  <img src="assets/clinic-reception.png" width="23%" alt="Aesthetic Clinic" style="border-radius: 12px; margin: 4px;" />
  <img src="assets/luxury-gym.png" width="23%" alt="Fitness Studio" style="border-radius: 12px; margin: 4px;" />
  <img src="assets/luxury-home.png" width="23%" alt="Home Services" style="border-radius: 12px; margin: 4px;" />
</p>

- **Hair Salons & Spas:** Books haircuts, balayage, massages, and nail treatments with specific stylists based on exact duration.
- **Aesthetic Clinics:** Schedules consultations and treatments with doctors or specialists while answering common procedural FAQs.
- **Fitness & Wellness Gyms:** Reserves personal training slots and class orientations.
- **Luxury Home Services:** Dispatches technicians and confirms appointment windows.

---

## 🕹️ Architecture & Voice Workflow

```mermaid
flowchart TD
    Caller([Client Calls Inbound Number]) --> VoiceProvider[Voice AI Gateway
Vapi / Retell AI Webhook]
    VoiceProvider --> WebhookAPI[FastAPI /webhooks/vapi]
    
    subgraph IntelligenceCore [Aiva Backend Core]
        WebhookAPI --> IntentRouter[Agent Router & NLP]
        IntentRouter --> AvailService[Availability Service
- Checks Operating Hours
- Verifies Specialist Free Slots
- Factors Service Duration]
        
        AvailService --> BookingEngine[Appointment Booking Engine]
        BookingEngine --> DB[(SQLAlchemy Database
app.db / PostgreSQL)]
        
        BookingEngine --> Notifs[Notification Service
- WhatsApp Confirmation
- SMS Alert
- Email Receipt]
    end

    WebhookAPI --> CallLogger[Call Intelligence
- Audio Recording
- Full Transcript
- Sentiment & Duration]
    CallLogger --> DB
    DB --> Dashboard[React 19 Operator Dashboard]
```

### Core System Features
- **Dynamic Slot Availability:** `AvailabilityService` calculates unallocated time slots in real time, preventing double-booking and factoring in buffer times between appointments.
- **Voice Webhook Orchestration:** Seamless bidirectional webhook integration with Vapi and Retell AI for natural, low-latency conversational audio. Includes local fallback support via Ollama.
- **Call Recordings & Transcripts:** Full visibility into every phone interaction. Listen to call audio, inspect timestamped transcripts, and evaluate caller sentiment.
- **Automated Client Confirmations:** Sends immediate booking receipts and calendar invites via WhatsApp, SMS, and Email.
- **Background Tasks:** Automated scripts manage day-before appointment reminders, no-show tracking, and daily summary reports for business owners.

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Backend Framework** | [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+) | High-throughput asynchronous API & webhook endpoints |
| **Voice AI Layer** | Vapi & Retell AI | Low-latency voice pipelines with ElevenLabs voice models |
| **Local Fallback** | Ollama | Offline local AI agent fallback service |
| **Database & ORM** | [SQLAlchemy](https://www.sqlalchemy.org/) + SQLite / PostgreSQL | Async database sessions with Alembic migrations |
| **Notifications** | WhatsApp, Twilio SMS & Email | Omni-channel automated client confirmations |
| **Frontend UI** | [React 19](https://react.dev/) + [Vite](https://vite.dev/) | Sleek, modern operator dashboard with Lucide icons |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Dark minimalist aesthetic engineered for busy front desks |

---

## 📁 Repository Structure

```text
Aiva/
├── assets/                       # UI previews & vertical graphics
│   ├── preview.png
│   ├── logo.png
│   ├── luxury-salon.png
│   ├── clinic-reception.png
│   ├── luxury-gym.png
│   └── luxury-home.png
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
│   │   │   └── landing/          # Vertical marketing showcases
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- A Vapi or Retell AI account (optional for mock / local mode)

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
Open [http://localhost:5173](http://localhost:5173) in your browser to access the Aiva operations dashboard.

---

<p align="center">
  Developed by <a href="https://github.com/itsgoksz">itsgoksz</a>
</p>
