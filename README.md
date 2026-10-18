# ⚡ SkillServe - Blinkit & Zepto for Home Services (MERN Stack)

> An on-demand 15-minute home services platform built with the **MERN Stack** (MongoDB, Express, React, Node.js), featuring the iconic **Blinkit** visual design, fast cart drawers, instant partner dispatch, and real-time live booking tracking.

---

## 📸 Features & Visual Design (Blinkit & Zepto Style)

- **Blinkit & Zepto Aesthetic**:
  - Signature Blinkit Yellow (`#F8CB46`) and Forest Green (`#0C831F`) color palette.
  - 15-Minute Guaranteed Doorstep Arrival indicator.
  - Interactive City & Pin Code location selector (`Phagwara, Punjab`, `Delhi`, `Mumbai`, `Bengaluru`, etc.).
  - Global instant search with live autofill for services.
  - Top promotional carousel banner with 4 quick category cards (AC & Fridge repair, Roadside mechanic SOS, Doorstep tailoring, Instant house sweeping).
  - Rounded category cards grid identical to Blinkit's home screen.

- **Available Services**:
  1. ⚡ **Technician**: AC Foam Jet Service, Instant Emergency Electrician, RO Water Purifier filter repair, Refrigerator cooling check.
  2. 🔧 **Mechanic**: 15-Min roadside bike puncture SOS, Car emergency battery jumpstart, Doorstep engine oil change.
  3. ✂️ **Tailor**: Doorstep alteration & fitting (jeans, shirts, kurti), Custom blouse & kurti stitching with home measurements, Curtains & zipper repair.
  4. 🧹 **Sweeper & Cleaning**: Instant home sweeping & disinfectant wet mopping, Deep bathroom tile descaling, Kitchen degreasing & chimney scrub.
  5. 🪚 **Carpenter**: Furniture repair, Door lock & hinge fix, Drill & hang shelves/curtains.
  6. 🎨 **Painter**: Room touchup, wall crack filling, waterproofing.
  7. 🚰 **Plumber**: Tap leakage repair, flush tank fix, pipe blockage.

- **Blinkit-Style Core Features**:
  - **Dynamic "ADD" button**: Green border button that transforms into a `[-] 1 [+]` quantity stepper with instant cart synchronization.
  - **Slide-out Cart Drawer**:
    - "Instant in 15 mins" vs "Scheduled Slot" toggle.
    - Tip your technician/partner (₹20, ₹30, ₹50, ₹100).
    - Promo coupons: `BLINKIT50` (₹50 OFF), `FIRST100` (₹100 OFF).
    - Itemized Bill breakdown (Item total, Visiting fee, Safety fee, Tip, Discount, Grand total).
  - **Live Dispatch & Order Tracking**:
    - Shows assigned technician details (Name, photo, vehicle number, phone, rating).
    - 4-digit security OTP to verify when technician arrives.
    - Live progress timeline: Booking placed -> Partner assigned -> On the way (12 mins) -> Work in progress -> Completed.
    - Interactive simulation button to test the entire lifecycle in real time!
  - **Partner / Admin Console**:
    - Switch between "Customer View" and "Partner/Admin Dispatch Center" in 1 click.
    - View incoming jobs, dispatch partners, verify OTPs, and complete bookings.

---

## 📂 Project Structure

```text
Ecommerce Project/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # User registration & JWT login
│   │   ├── serviceController.js  # Categories & services API
│   │   ├── bookingController.js  # 15-min instant bookings & tracking
│   │   └── adminController.js    # Partner & dispatch statistics
│   ├── data/
│   │   └── seedData.js           # Rich initial dataset
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
    │   │   ├── Header.jsx                # Blinkit top bar, search, location, cart
    │   │   ├── BannerHero.jsx            # Hero carousel & 4 promo cards
    │   │   ├── CategoryGrid.jsx          # Rounded category grid (Image 1)
    │   │   ├── ServiceCard.jsx           # Blinkit service item & stepper
    │   │   ├── ServiceDetailModal.jsx    # Full inclusions & safety modal
    │   │   ├── CartDrawer.jsx            # Slide-over checkout drawer
    │   │   ├── LiveTrackingModal.jsx     # Live partner ETA, OTP & status
    │   │   ├── LocationModal.jsx         # Delivery city & pincode selector
    │   │   ├── AuthModal.jsx             # Login, signup & 1-click demo
    │   │   ├── BookingsModal.jsx         # Order history modal
    │   │   ├── AdminPartnerDashboard.jsx # Partner dispatch console
    │   │   └── Footer.jsx                # Blinkit links & safety guarantees
    │   ├── context/
    │   │   ├── CartContext.jsx           # Blinkit cart state & bill math
    │   │   ├── AuthContext.jsx           # User session & role switcher
    │   │   └── LocationContext.jsx       # Delivery address state
    │   ├── data/
    │   │   └── mockData.js               # Standalone client dataset
    │   ├── services/
    │   │   └── api.js                    # API client with offline fallback
    │   ├── App.jsx                       # Main application component
    │   ├── main.jsx                      # React entry point
    │   └── index.css                     # Tailwind CSS & custom animations
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
npm run seed     # (Optional: seeds MongoDB with services & categories)
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

> **Seamless Hybrid Mode**: The frontend is built with an automatic fallback mechanism. If the backend or MongoDB is not yet running, the entire app (services, search, cart, checkout, OTP live tracking, and admin console) still functions smoothly without crashing!
