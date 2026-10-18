# ⚡ SkillServe - On-Demand Instant Home & Roadside Services (MERN Stack)

> A modern, lightning-fast on-demand services platform built with the **MERN Stack** (MongoDB Atlas, Express.js, React 18, Node.js). Book verified electricians, mechanics, tailors, and deep-clean sweepers with guaranteed 15-minute doorstep dispatch and live tracking.

---

## 🌟 Key Highlights & Design System

- **Modern Brand Identity**:
  - Signature **Royal Indigo** (`#4F46E5`), **Electric Coral** (`#FF5B35`), and **Midnight Slate** (`#0F172A`) color palette.
  - 15-Minute Guaranteed Doorstep Arrival indicator.
  - Interactive City & PIN Code location selector (`Phagwara`, `Jalandhar`, `Delhi`, `Mumbai`, `Bengaluru`, or custom address).
  - Global instant search with live autofill for services.
  - Promotional carousel banner with 4 quick category cards (AC & Fridge repair, Roadside mechanic SOS, Doorstep tailoring, Instant house sweeping).
  - Grid of service categories with instant filtering.

- **Available On-Demand Services**:
  1. ⚡ **Technician**: AC Power Jet Service, Emergency Electrician, RO Water Purifier filter repair, Refrigerator cooling check.
  2. 🔧 **Mechanic**: 15-Minute roadside bike puncture SOS, Car emergency battery jumpstart, Doorstep engine oil change.
  3. ✂️ **Tailor**: Doorstep alteration & fitting (jeans, shirts, kurti), Custom blouse & kurti stitching with home measurements, Curtains & zipper repair.
  4. 🧹 **Sweeper & Cleaning**: Instant home sweeping & disinfectant wet mopping, Deep bathroom tile descaling, Kitchen degreasing & chimney scrub.
  5. 🪚 **Carpenter**: Furniture repair, Door lock & hinge fix, Drill & hang shelves/curtains.
  6. 🎨 **Painter**: Room touchup, wall crack filling, waterproofing.
  7. 🚰 **Plumber**: Tap leakage repair, flush tank fix, pipe blockage.
  8. 🐜 **Pest Control**: Safe, odorless insect and pest eradication.

- **Core User Experience & Checkout Flow**:
  - **Dynamic "ADD" Action**: Interactive button that transforms on click into a quantity stepper `[-] 1 [+]` with instant cart synchronization.
  - **Slide-out Cart Drawer**:
    - "Instant in 15 mins" vs "Scheduled Slot" toggle.
    - Tip your professional partner (₹20, ₹30, ₹50, ₹100).
    - Promo coupons: `SKILL50` (₹50 OFF), `FIRST100` (₹100 OFF).
    - Itemized Bill breakdown (Item total, Visiting fee, Safety fee, Tip, Discount, Grand total).
  - **Live Dispatch & Order Tracking**:
    - Displays assigned professional details (Name, photo, vehicle number, phone, rating).
    - 4-digit security OTP to verify when the technician arrives.
    - Live progress timeline: *Booking Placed → Partner Assigned → On the Way (12 mins) → Work in Progress → Completed*.
    - Interactive simulation button to test the entire lifecycle in real time.
  - **Partner / Admin Console**:
    - Switch between "Customer View" and "Partner/Admin Dispatch Center" in 1 click.
    - View incoming jobs, dispatch partners, verify OTPs, and complete bookings.

---

## 📂 Project Structure

```text
Ecommerce Project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB Atlas connection & error resilience
│   ├── controllers/
│   │   ├── authController.js     # User registration & JWT login
│   │   ├── serviceController.js  # Categories & services API
│   │   ├── bookingController.js  # Instant bookings & live dispatch
│   │   └── adminController.js    # Partner & dispatch statistics
│   ├── data/
│   │   └── seedData.js           # Initial service catalog dataset
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & admin guard
│   │   └── errorMiddleware.js    # Global error handlers
│   ├── models/
│   │   ├── User.js               # Customer, Partner & Admin schema
│   │   ├── Category.js           # Service categories schema
│   │   ├── Service.js            # Service items schema
│   │   └── Booking.js            # Booking orders & live tracking schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── serviceRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── adminRoutes.js
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── seeder.js                 # Database seeder script
│   └── server.js                 # Express server entry point
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.jsx                # Top bar, search, location, cart trigger
    │   │   ├── BannerHero.jsx            # Hero carousel & 4 promo cards
    │   │   ├── CategoryGrid.jsx          # Rounded category grid
    │   │   ├── ServiceCard.jsx           # Service item & stepper
    │   │   ├── ServiceDetailModal.jsx    # Full inclusions & safety modal
    │   │   ├── CartDrawer.jsx            # Slide-over checkout drawer
    │   │   ├── LiveTrackingModal.jsx     # Live partner ETA, OTP & status
    │   │   ├── LocationModal.jsx         # Delivery city & pincode selector
    │   │   ├── AuthModal.jsx             # Login, signup & 1-click demo
    │   │   ├── BookingsModal.jsx         # Order history modal
    │   │   ├── AdminPartnerDashboard.jsx # Partner dispatch console
    │   │   └── Footer.jsx                # Links & safety guarantees
    │   ├── context/
    │   │   ├── CartContext.jsx           # Cart state & bill calculations
    │   │   ├── AuthContext.jsx           # User session & role switcher
    │   │   └── LocationContext.jsx       # Delivery address state
    │   ├── data/
    │   │   └── mockData.js               # Fallback client dataset
    │   ├── services/
    │   │   └── api.js                    # API client with offline fallback
    │   ├── App.jsx                       # Main application component
    │   ├── main.jsx                      # React entry point
    │   └── index.css                     # Tailwind CSS & custom styling
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── package.json
```

---

## 🚀 How to Run the Project

### 1. Start the Backend (Node.js + Express)
Open a terminal in the `backend` folder:
```powershell
cd backend
npm install
npm run seed     # Seeds MongoDB Atlas with services & categories
npm run dev      # Or: npm start
```
*Backend runs on: `http://localhost:5000`*

### 2. Start the Frontend (React + Vite)
Open a second terminal in the `frontend` folder:
```powershell
cd frontend
npm install
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

> **Seamless Hybrid Mode**: The frontend is built with an automatic fallback mechanism. If the backend or database is not yet running, the entire app (services, search, cart, checkout, OTP live tracking, and admin console) still functions smoothly without crashing.
