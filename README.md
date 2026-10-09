# RAWAS – Node.js port (Part 1)

Express + MySQL + server-rendered templates. The Laravel Blade views were auto-converted, so the design is unchanged.

## Status
**Done (Part 1):** client register/login/logout, admin login/logout, admin dashboard, users (edit, trash/restore, add credit, credit history),
payment gateways (QR upload), credit packages, credit orders (approve/reject), client dashboard, buy credits / order history.

**Part 2 (shows a "coming soon" page for now):** credentials + OTP, cards, exam bookings (create/reschedule/cancel/PDF), payments, sessions.

## Run locally
```bash
cp .env.example .env      # fill in DB_* and APP_KEY
npm install
npm run db:init           # creates the tables (database/schema.sql)
npm run create-admin -- admin@example.com 'StrongPass123' Admin User
npm start                 # http://localhost:3000
```

## Deploy on Railway
1. Push this folder to GitHub (repo root must contain `package.json`).
2. Railway → New Project → Deploy from GitHub repo.
3. Add a **MySQL** service in the same project. In your app service → Variables, add reference variables:
   `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE` (or `DATABASE_URL` = `${{MySQL.MYSQL_URL}}`).
4. Add variables: `NODE_ENV=production`, `APP_KEY` (see below), `APP_TIMEZONE=Asia/Dhaka`.
5. Create tables once: Railway shell / local with Railway vars → `npm run db:init`, then `npm run create-admin -- ...`.
6. Uploads (payment screenshots, QR images): Railway's disk is wiped on every deploy. Add a **Volume** (mount `/data`) and set `UPLOAD_DIR=/data/uploads`.

## Migrating your old data
Import your old MySQL dump instead of running `db:init`. Passwords (bcrypt) keep working. To keep the
reversibly-encrypted values readable, set `APP_KEY` to the **same value as the old Laravel `.env`**.

## Security notes
- Never commit `.env`. The zip you uploaded contained a real `.env` (DB password, APP_KEY) – rotate those secrets.
- Saved card **CVV** must not be stored (PCI-DSS). Part 2 will not port CVV storage.
- The old app had public debug routes (`/test-occupations`, `/debug-booking-id`) that exposed tokens; they are intentionally not ported.
