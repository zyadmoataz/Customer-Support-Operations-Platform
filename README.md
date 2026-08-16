# 🛡️ Customer Support Operations Platform

An enterprise-grade, dual-frontend operations platform built with a shared PostgreSQL / Supabase backend, cryptographic Row-Level Security (RLS), Role-Based Access Control (RBAC), and 2050 design standards.

---

## 🌟 Executive Overview & Business Value

The platform provides a unified operations ecosystem connecting two distinct interfaces to a single live database:

1. **Customer Portal (React 19 + Vite + TanStack Query v5 + Framer Motion + Tailwind CSS)**
   - Designed for end-customers to create support requests, track live resolution progress with status timelines, search their inquiries, review official agent resolution summaries, and manage security credentials.
   - Glassmorphic **Electric Indigo (`#6366f1`)** theme.
2. **Support Workspace (Angular 18 Standalone + Signals + GSAP + Tailwind CSS)**
   - Designed for support agents to triage queue tickets and operations managers to supervise workload, provision staff, and audit resolution quality with 1–5 star reviews.
   - Glassmorphic **Operations Emerald (`#10b981`)** theme.

---

## 👥 Role & Responsibilities Matrix

| Role | Application | Account Email | Password | Responsibilities & Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Customer** | Customer Portal (React) | `customer@portal.com` | `password123` | Create support tickets with instant schema validation, view own history, filter status, search requests, review official agent resolution notes, edit profile & change password. |
| **Support Agent** | Support Workspace (Angular) | `agent@support.com` | `password123` | Triage incoming unassigned queue, claim tickets into active tasks, update ticket progress (`Open` $\rightarrow$ `In Progress` $\rightarrow$ `Resolved`), lock resolved tickets with resolution reports, manage staff profile. |
| **Support Manager** | Support Workspace (Angular) | `manager@support.com` | `password123` | Full organization queue oversight, filter by staff member, provision new agent accounts, toggle staff active/inactive status, review resolutions with **1–5 Star QA ratings & feedback**, analyze SLA metrics. |

---

## 🏗️ Monorepo Architecture

```
Customer-Support-Operations-Platform/
├── customer-portal/                # React 19 Application (Customer Experience)
│   ├── src/
│   │   ├── components/            # Folder-per-component UI (Landing, TicketCard, TicketList, CreateModal, Settings, FAQ, ErrorBoundary)
│   │   ├── context/               # AuthContext.tsx (User & Role state)
│   │   ├── pages/                 # LandingPage.tsx (Front.com/Aceternity inspired), LoginPage.tsx, DashboardPage.tsx
│   │   ├── services/              # Supabase client singleton
│   │   └── types/                 # Pure frontend domain types (SupportTicket, NewTicketInput)
│   ├── public/favicon.svg         # Indigo Shield Favicon
│   └── package.json
│
├── support-workspace/              # Angular 18 Application (Staff Operations)
│   ├── src/app/
│   │   ├── components/            # Modular folder-per-component UI (sidebar, stats-overview, ticket-queue, manager-panel, modals)
│   │   ├── core/                  # Signals-based SupabaseService, TicketService, ToastService, AuthGuard, GlobalErrorHandler
│   │   └── pages/                 # login/login.component, dashboard/dashboard.component
│   ├── public/favicon.svg         # Emerald Headset Favicon
│   └── package.json
│
├── tasks pdf/                      # Assignment & Milestone Specifications
│   ├── New Task Milestone 1.pdf
│   └── New Task Customer Support Operations Platform.pdf
├── .gitignore
└── README.md
```

---

## 🔒 Security Architecture & Review Preparation

### 1. Where Authentication State is Managed
- Authentication tokens (JWTs) are issued and refreshed automatically by **Supabase Auth** (`supabase.auth`).
- **React (Customer Portal)**: Managed centrally in `AuthContext.tsx` via `supabase.auth.onAuthStateChange()`, exposing `user`, `profile`, `role`, and `loading` state to all components.
- **Angular (Support Workspace)**: Managed in `SupabaseService` using Angular Signals (`_currentUser`, `_currentProfile`), checked asynchronously prior to route resolution in `auth.guard.ts`.

### 2. Where Authorization is Enforced (Defense in Depth)
- **Client-Side (UI Guards)**:
  - `ProtectedRoute` in React validates that active session role equals `'customer'`.
  - `authGuard` in Angular checks session validity and verifies role inclusion (`'agent' | 'manager'`).
- **Database-Side (Row-Level Security - RLS)**:
  - **Non-Bypassable Security**: Even if a user manipulates client-side JavaScript or sends raw REST/GraphQL requests to the Supabase URL, PostgreSQL Row-Level Security policies enforce data boundaries at the SQL engine level.
  - Customers can only read and write rows where `customer_id = auth.uid()`.
  - Support staff (Agents & Managers) can view the organizational queue and update assigned tickets.
  - Role resolution is performed via a `SECURITY DEFINER` function `get_user_role()` to prevent infinite RLS recursion.

### 3. How Both Applications Use the Same User Model
- Both frontends connect to the shared PostgreSQL schema:
  - `auth.users`: Core identity table managed by Supabase.
  - `public.profiles`: Application user table synchronized via a PostgreSQL trigger (`handle_new_user()`) on account creation.
  - The `role` column (`'customer' | 'agent' | 'manager'`) determines access privileges across both applications.

### 4. What Data is Safe to Expose to Browser Code
- **Safe to Expose**:
  - Public Supabase URL & Anonymous (`anon`) API Key (which is restricted by PostgreSQL RLS policies).
  - Sanitized ticket metadata (title, category, priority, status, public description, customer display name).
  - Public resolution summaries provided by support agents.
- **Protected / Never Exposed to Customer Browser**:
  - `service_role` master database key (never bundled in frontend builds).
  - Internal staff notes, confidential employee provisioning data, and cross-tenant customer records.

---

## 📋 Comprehensive Form Validation Rules

All user inputs across both platforms are validated using strict schemas (Zod on both frontends):
- **Email**: Standard RFC format validation, lowercase trimmed.
- **Password (Sign up & Password Change)**:
  - Minimum 8 characters
  - At least 1 uppercase letter (`[A-Z]`)
  - At least 1 lowercase letter (`[a-z]`)
  - At least 1 numeric digit (`[0-9]`)
  - At least 1 special character (`[^A-Za-z0-9]`)
- **Support Ticket Subject**: Min 5 characters, max 100 characters, trimmed.
- **Support Ticket Description**: Min 10 characters, max 2000 characters, trimmed.
- **Support Ticket Category & Priority**: Strict enum constraints.
- **Resolution Summary**: Min 10 characters required before locking ticket.
- **Manager Feedback**: Min 5 characters, 1–5 star rating constraint.

---

## 🚀 Local Development Setup

### 1. Customer Portal (React 19)
```bash
cd customer-portal
npm install
npm run dev
# Running on http://localhost:5173
```

### 2. Support Workspace (Angular 18)
```bash
cd support-workspace
npm install
ng serve
# Running on http://localhost:4200
```

---

## 🧪 Production Verification & Build Check

Both applications compile cleanly with 0 TypeScript errors and 0 lint warnings:

```bash
# Build Customer Portal
npm --prefix customer-portal run build

# Build Support Workspace
npm --prefix support-workspace run build
```

---

## ☁️ Deployment on Vercel

Vercel natively deploys monorepos by creating two independent projects from the same repository:

1. **Customer Portal Project**: Root Directory = `customer-portal`, Framework = `Vite`.
2. **Support Workspace Project**: Root Directory = `support-workspace`, Framework = `Angular`.
