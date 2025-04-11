# 🎟️ Flight-Booking-Service Microservice

This is a dedicated **microservice** for handling flight bookings within the Airplane Booking System. It is responsible for managing the entire booking lifecycle—from initiation to payment—while ensuring data consistency through the use of transactions and row-level locks.

A background **cron job** runs every 10 minutes to automatically cancel bookings that remain unpaid (status: *Initiated* or *Pending*) beyond a certain time limit.

⚠️ Note: This service depends on the **Flights-Service** microservice to fetch flight details and update seat availability.

---

## 📦 Tech Stack

- **Backend Framework**: Node.js, Express.js  
- **Database**: PostgreSQL  
- **ORM**: Prisma ORM  
- **Language**: JavaScript  

---

## 📖 Features

- Book a flight with seat reservation
- Ensure consistency using transactions and row-level locks
- Simulated payment system with 5-minute timeout
- Automatic cancellation via a scheduled cron job every 10 minutes
- RESTful APIs for interaction

---

## 🚀 Getting Started

### 1. Prerequisites

Ensure that the **Flights-Service** microservice is already up and running.

### 2. Clone the Repository

```bash
git clone <repo_url>
cd Flight-Booking-Service
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables
Create a .env file in the root directory and add the following variables:

```env
PORT=4000
DATABASE_URL=<your_postgresql_database_url>
FLIGHT_SERVICE=http://localhost:3000
```

### 4. Set Up Database with Prisma
Navigate to the src directory and run the following Prisma commands:

```bash
cd src
npx prisma migrate dev
npx prisma generate
```


### 5. Start the Development Server

```bash
npm run dev
```

## 🗃️ Database Schema
You can inspect the data models and relationships in the Prisma schema file located at:

```bash
prisma/schema.prisma
```

## 📡 API Endpoints

Below is a categorized list of the available RESTful API endpoints.
## 📦 Booking Routes
- `GET /api/v1/booking` — Get all bookings
- `GET /api/v1/booking/:id` — Get a specific booking by ID
- `POST /api/v1/booking` — Create a new flight booking (status will initially be Initiated)
- `POST /api/v1/booking/payment` — Make a payment for a booking (must be done within 5 minutes)

## ⏱️ Cron Job
A scheduled background task runs every 10 minutes to:
- Find all bookings with Initiated or Pending status
- Automatically mark them as Cancelled if they exceed the 5-minute payment window


## 📁 Folder Structure

```bash
└───src
    ├───config
    ├───controllers
    ├───middleware
    ├───prisma
    │   └───migrations
    │       ├───20250410060806_booking_model
    │       └───20250410105230_added_created_at_field
    ├───repositories
    ├───routes
    │   └───v1
    │       └───booking
    ├───services
    └───utils
        └───common
```
