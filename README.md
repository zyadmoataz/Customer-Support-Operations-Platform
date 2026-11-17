# Customer Support Operations Platform (CSOP)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Angular](https://img.shields.io/badge/Angular_18-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A multi-role enterprise support-ticketing ecosystem pairing two distinct frontends on a shared **Supabase PostgreSQL** backend: a **React 19 Customer Portal** for submitting and tracking tickets, and an **Angular 18 Staff Workspace** for triage, SLA resolution, and manager QA audits. Access rules are enforced directly in the database via **Row-Level Security (RLS)** and role-checked `PL/pgSQL` stored procedures—never relying solely on UI checks.

**Live Demos:**
- **Support Workspace (Angular 18):** [https://customer-support-operations-platfor.vercel.app/login](https://customer-support-operations-platfor.vercel.app/login)
- **Customer Portal (React 19):** [https://customer-support-operations-platfor.vercel.app/support/login](https://customer-support-operations-platfor.vercel.app/support/login)

<img width="1919" height="430" alt="optima-overview" src="https://github.com/user-attachments/assets/42174fbb-a5f7-4e50-a5cf-04c668f42c9c" />

---

## Architecture & Security Design

Customer-facing and internal support interfaces have fundamentally different operational workflows and security boundaries. CSOP isolates them into **two independent applications** sharing one PostgreSQL schema. Staff-only records—such as internal triage notes (`is_internal = true`) and agent QA metrics—are filtered by **PostgreSQL Row-Level Security (RLS)** policies at the database engine layer so no client-side query manipulation can ever leak internal data.

| Role | Application | Capabilities & Enforced Permissions |
| :--- | :--- | :--- |
| **Customer** | Customer Portal (`React 19`) | Create tickets, track live SLA status, upload attachments (up to 10 MB), exchange public messages, read resolution reports, and reopen resolved tickets (`reopen_ticket` RPC). |
| **Support Agent** | Support Workspace (`Angular 18`) | Monitor unassigned queue, 1-click claim tickets (`in_progress`), post internal notes (`is_internal = true`) and public replies, and lock resolved tickets with mandatory resolution summaries. |
| **Operations Manager** | Support Workspace (`Angular 18`) | Oversee full queue, assign tickets to active agents, audit resolved tickets with 1–5 star QA ratings, onboard/deactivate staff (automatically returning open tickets to queue), and inspect workload analytics. |

---

## Key Engineering Highlights

### Customer Portal (`React 19`)
- Live ticket counter dashboard (`total`, `open`, `in_progress`, `resolved`) with switchable Table and Card layouts.
- Server-side pagination and URL-synced filters: status, priority, category, date range (`7`, `30`, or `90` days), and debounced keyword search.
- Detailed ticket timeline displaying SLA stage, assigned specialist, resolution report, file attachments, and public thread.
- Secure registration flow with real-time password-strength validation, plus a searchable Help Center & FAQ.

### Support Workspace (`Angular 18`)
- Real-time agent queue with 1-click claiming and optimistic UI updates via **Angular Signals**.
- Dual-channel conversation view separating public customer replies from RLS-protected internal team notes.
- Manager QA Audit module supporting 1–5 star ratings and written coaching feedback on closed tickets.
- Automated staff lifecycle management: deactivating an agent immediately revokes session access and returns their open tickets to the unassigned queue via transactional RPC.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Customer Portal** | React 19, Vite, TypeScript, React Router, TanStack Query v5, Zod, Tailwind CSS, Framer Motion |
| **Support Workspace** | Angular 18 (Standalone Components, Signals), TypeScript, Tailwind CSS, GSAP, Reactive Forms |
| **Backend & Security** | Supabase (PostgreSQL, JWT Auth, Storage Buckets, Row-Level Security, `PL/pgSQL` RPC Functions) |
| **Deployment** | Vercel (Multi-App Monorepo Configuration) |

---

## End-to-End Verification Flow

1. In the **Customer Portal**, sign in as a customer and submit a ticket with a file attachment.
2. In the **Support Workspace**, sign in as an agent, claim the ticket, and post both an **internal note** and a **public reply**.
3. Return to the **Customer Portal** and verify that only the public reply is returned by Supabase RLS.
4. As the agent, resolve the ticket with a closing summary.
5. Sign in as the **Operations Manager**, submit a QA rating on the resolved ticket, and inspect the updated agent scorecard in the Manager Analytics view.
