# 🛡️ Customer Support Operations Platform (Milestone 1)

A dual-frontend enterprise support system built with a shared PostgreSQL / Supabase backend, role-based access control (RBAC), Row-Level Security (RLS), and modern design systems.

---

## 🌟 Platform Overview

The platform connects two distinct frontends to a single unified backend:

1. **Customer Portal (React 18 + Vite + Tailwind CSS + Lucide React + Framer Motion)**
   - Designed for customers to submit tickets, track issue progress, and edit profiles.
   - Glassmorphic **Electric Indigo (`#6366f1`)** theme.
2. **Support Workspace (Angular 17 Standalone + Signals + Tailwind CSS + Lucide Angular)**
   - Designed for support agents to triage queue tickets and managers to supervise operations.
   - Glassmorphic **Operations Emerald (`#10b981`)** theme.

---

## 👥 Role & Responsibilities Matrix

| Role | Application | Account Email | Password | Responsibilities |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | Customer Portal (React) | `customer@portal.com` | `password123` | Create support tickets, view own history, filter status, search requests, edit profile |
| **Support Agent** | Support Workspace (Angular) | `agent@support.com` | `password123` | Triage incoming ticket queue, update ticket progress (`Open` $\rightarrow$ `In Progress` $\rightarrow$ `Resolved`), edit staff profile |
| **Support Manager** | Support Workspace (Angular) | `manager@support.com` | `password123` | Access **Manager Operations Console**, review unassigned & urgent escalations, auto-distribute workload |

---

## 🏗️ Monorepo Architecture

```
Customer-Support-Operations-Platform/
├── customer-portal/                # React 18 Application (Customer Experience)
│   ├── src/
│   │   ├── components/            # Modular folder-per-component UI (Header, StatsCards, TicketCard, Modals)
│   │   ├── context/               # AuthContext.tsx (User & Role state)
│   │   ├── pages/                 # LoginPage.tsx, DashboardPage.tsx
│   │   ├── services/              # Supabase client singleton
│   │   └── types/                 # Pure frontend domain types (SupportTicket, NewTicketInput)
│   ├── public/favicon.svg         # Indigo Shield Favicon
│   └── package.json
│
├── support-workspace/              # Angular 17 Application (Staff Operations)
│   ├── src/app/
│   │   ├── components/            # Modular folder-per-component UI (header, stats, queue, manager, modals)
│   │   ├── core/                  # Signals-based SupabaseService, ToastService, AuthGuard, ErrorHandler
│   │   └── pages/                 # login/login.component, dashboard/dashboard.component
│   ├── public/favicon.svg         # Emerald Headset Favicon
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔒 Security & Database Architecture

- **Database**: PostgreSQL hosted on Supabase.
- **Triggers**: `handle_new_user()` auto-syncs `auth.users` with `public.profiles`.
- **Functions**: `get_user_role()` with `SECURITY DEFINER` avoids RLS recursion.
- **Row-Level Security (RLS)**:
  - **Customers**: Strictly restricted to `customer_id = auth.uid()` for viewing and creating tickets.
  - **Staff (Agents & Managers)**: Granted SELECT and UPDATE privileges across the entire queue.

---

## 🚀 Local Development Setup

### 1. Customer Portal (React)
```bash
cd customer-portal
npm install
npm run dev
# Running on http://localhost:5173
```

### 2. Support Workspace (Angular)
```bash
cd support-workspace
npm install
ng serve
# Running on http://localhost:4200
```

---

## ☁️ Deploying Both Frontends on Vercel

Vercel natively supports monorepos by deploying each app as an independent project from the same GitHub repository:

### Step 1: Deploy Customer Portal
1. In the Vercel Dashboard, click **Add New Project** and import `Customer-Support-Operations-Platform`.
2. Set **Root Directory** to `customer-portal`.
3. Framework Preset: **Vite**
4. Click **Deploy**.

### Step 2: Deploy Support Workspace
1. In the Vercel Dashboard, click **Add New Project** again and import the same repository `Customer-Support-Operations-Platform`.
2. Set **Root Directory** to `support-workspace`.
3. Framework Preset: **Angular**
4. Click **Deploy**.

---

## 📦 Pushing to GitHub

To push the entire monorepo to your GitHub repository:

```bash
git init
git add .
git commit -m "feat: complete Milestone 1 for Customer Portal and Support Workspace"
git branch -M main
git remote add origin https://github.com/zyadmoataz/Customer-Support-Operations-Platform.git
git push -u origin main --force
```
