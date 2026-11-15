# Customer Support Operations Platform (CSOP)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Angular](https://img.shields.io/badge/Angular_18-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A support-ticketing system with two frontends on one Supabase backend: a **React customer portal** for submitting and tracking tickets, and an **Angular staff workspace** for triage, resolution and manager QA audits. Access rules are enforced in the database with Row-Level Security (RLS) and role-checked stored procedures, not only in the UI.

**Live demo**
- Support Workspace (Angular): [CONFIRM: URL, probably https://customer-support-operations-platfor.vercel.app/]
- Customer Portal (React): [CONFIRM: URL]

![Support Workspace: manager triage view](./docs/optima-overview.png)
![Customer Portal](./docs/customer-portal.png)
<img width="1919" height="430" alt="optima-overview" src="https://github.com/user-attachments/assets/42174fbb-a5f7-4e50-a5cf-04c668f42c9c" />

## Demo accounts
Shared demo accounts with sample data only. [CONFIRM: data is reset periodically, or say it is not]

| Role | App | Email | Password |
|:---|:---|:---|:---|
| Customer | Customer Portal | `customer@portal.com` | `password123` |
| Support Agent | Support Workspace | `agent@support.com` | `password123` |
| Operations Manager | Support Workspace | `manager@support.com` | `password123` |

## The idea
Customer-facing and internal support interfaces have different needs and different risks. CSOP keeps them as **two separate apps** that share one database. Staff-only data, such as internal notes and agent metrics, is hidden from customers by RLS policies at the database level, so a bug in a frontend cannot expose it.

## Architecture

```mermaid
graph TB
    subgraph "Customer Portal (React 19)"
        CP_UI["UI: Tailwind CSS, Framer Motion"]
        CP_QUERY["TanStack Query v5 hooks"]
        CP_API["API client layer"]
    end

    subgraph "Support Workspace (Angular 18)"
        SW_UI["Standalone components: Tailwind CSS, GSAP"]
        SW_GUARD["Auth guard: role and active-status check"]
        SW_SVC["Services with Angular Signals state"]
    end

    subgraph "Supabase"
        SB_AUTH["Auth: JWT sessions"]
        SB_STORAGE["Storage: ticket-attachments"]
        SB_DB[("PostgreSQL: profiles, support_requests, ticket_messages, ticket_attachments")]
        SB_RLS{"Row-Level Security"}
        SB_RPC["Stored procedures (SECURITY DEFINER)"]
    end

    CP_UI --> CP_QUERY --> CP_API --> SB_AUTH
    CP_API --> SB_DB
    CP_API --> SB_STORAGE
    SW_UI --> SW_GUARD --> SW_SVC --> SB_AUTH
    SW_SVC --> SB_DB
    SW_SVC --> SB_STORAGE
    SB_DB --> SB_RLS --> SB_RPC
```

## Roles

| Role | App | What they can do |
|:---|:---|:---|
| **Customer** | Customer Portal | Create tickets, track status, upload attachments (up to 10 MB), exchange public messages, read resolution notes, reopen resolved tickets, manage their profile |
| **Support Agent** | Support Workspace | See the unassigned queue, claim tickets, update status, write internal notes and public replies, resolve tickets with a required summary |
| **Operations Manager** | Support Workspace | Oversee the full queue, assign tickets to active agents, audit resolved tickets with a 1 to 5 rating and feedback, onboard, edit, deactivate and remove agents, view analytics |

## Features

### Customer Portal (React 19)
- Ticket dashboard with live counts (total, open, in progress, resolved)
- Table and card views
- Server-side pagination and filters: status, priority, category, date range (7, 30 or 90 days) and keyword search
- Ticket detail with SLA stage, assignee, resolution report, attachments and a public conversation thread
- Reopen resolved tickets (`reopen_ticket` RPC)
- Registration with a live password-strength checklist, plus a Help Center and FAQ

### Support Workspace (Angular 18)
- Agent queue with one-click claiming (moves the ticket to `in_progress`)
- Two-channel conversation: public replies, and internal notes (`is_internal = true`) that RLS hides from customers
- Resolution report that locks the ticket
- Manager QA audit: 1 to 5 star rating and feedback on resolved tickets
- Staff management: onboard agents, edit, deactivate and remove. Deactivating an agent revokes access and returns their open tickets to the queue
- Performance view: assigned count, resolved count and average QA rating per agent
- Analytics: category and priority distribution and workload balance

## Tech stack

| Layer | Technology |
|:---|:---|
| Customer Portal | React 19, Vite, TypeScript, TanStack Query v5, Zod, Tailwind CSS, Framer Motion [CONFIRM: React Router] |
| Support Workspace | Angular 18 (standalone components, Signals), TypeScript, Tailwind CSS, GSAP, Reactive Forms |
| Backend | Supabase: PostgreSQL, Auth (JWT), Storage, RLS, PL/pgSQL functions |
| Hosting | Vercel (monorepo, two projects) |

## Ticket lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    actor Agent
    actor Manager
    participant CP as Customer Portal
    participant SW as Support Workspace
    participant DB as PostgreSQL + RLS

    Customer->>CP: Submit ticket (category, priority, description, file)
    CP->>DB: INSERT support_requests and ticket_attachments
    Agent->>SW: Claim ticket from the queue
    SW->>DB: UPDATE status = in_progress, assigned_to = agent
    Agent->>SW: Post internal note
    SW->>DB: INSERT ticket_messages (is_internal = true)
    Agent->>SW: Post public reply
    SW->>DB: INSERT ticket_messages (is_internal = false)
    Agent->>SW: Submit resolution report
    SW->>DB: UPDATE status = resolved, resolution_note
    Manager->>SW: Audit with rating and feedback
    SW->>DB: UPDATE manager_rating, manager_feedback
    opt Issue persists
        Customer->>CP: Reopen ticket
        CP->>DB: rpc reopen_ticket
    end
```

## Database schema

```mermaid
erDiagram
    PROFILES ||--o{ SUPPORT_REQUESTS : "creates (customer_id)"
    PROFILES ||--o{ SUPPORT_REQUESTS : "assigned to (assigned_to)"
    PROFILES ||--o{ TICKET_MESSAGES : "authors"
    PROFILES ||--o{ TICKET_ATTACHMENTS : "uploads"
    SUPPORT_REQUESTS ||--o{ TICKET_MESSAGES : "contains"
    SUPPORT_REQUESTS ||--o{ TICKET_ATTACHMENTS : "has"

    PROFILES {
        uuid id PK "FK to auth.users.id"
        text full_name
        text role "customer | agent | manager"
        boolean is_active
        timestamptz created_at
    }
    SUPPORT_REQUESTS {
        uuid id PK
        uuid customer_id FK
        text title "5-100 chars"
        text description "10-2000 chars"
        text category
        text priority "low | medium | high | urgent"
        text status "open | in_progress | resolved"
        uuid assigned_to FK
        text resolution_note
        text manager_feedback
        integer manager_rating "1 to 5"
        timestamptz created_at
        timestamptz updated_at
    }
    TICKET_MESSAGES {
        uuid id PK
        uuid ticket_id FK
        uuid author_id FK
        text body
        boolean is_internal
        timestamptz created_at
    }
    TICKET_ATTACHMENTS {
        uuid id PK
        uuid ticket_id FK
        uuid uploaded_by FK
        text file_path
        text file_name
        integer file_size "max 10 MB"
        text file_type
        timestamptz created_at
    }
```

## Security model

RLS is enabled on all tables and on the storage bucket. Every query is evaluated against the caller's `auth.uid()` and role.

| Table | Customers | Staff (agent / manager) |
|:---|:---|:---|
| `profiles` | Read and update own profile | Read all profiles |
| `support_requests` | Read, insert and update own tickets that are not resolved | Read and update all tickets |
| `ticket_messages` | Read public messages on own tickets; send public replies | Read all messages and internal notes; send replies and notes |
| `ticket_attachments` | Read attachments on own tickets | Read all attachments |

Privileged operations run as `SECURITY DEFINER` functions with role checks inside:

| Function | Who can call it | Purpose |
|:---|:---|:---|
| `get_user_role()` | Authenticated | Returns the caller's role for RLS policies |
| `register_customer(...)` | Anonymous | Creates a customer account and profile |
| `create_staff_agent(...)` | Manager | Onboards an agent |
| `update_staff_agent(...)` | Manager | Edits an agent's name or email, or resets a password |
| `toggle_agent_status(...)` | Manager | Activates or deactivates an agent and returns their open tickets to the queue |
| `delete_staff_agent(...)` | Manager | Removes an agent and unassigns their tickets |
| `get_agents_overview()` | Manager | Per-agent assigned, resolved and average QA rating |
| `reopen_ticket(ticket_id)` | Customer / Staff | Reopens a resolved ticket |

Validation runs in layers: client forms (Zod and Angular Reactive Forms), route guards, Supabase Auth (JWT), RLS, and checks inside the stored procedures. Database `CHECK` constraints enforce the rating range (1 to 5) and field lengths.

## Known limitations
- `register_customer` pre-confirms the email address, so there is no email verification. That is fine for a demo; a production system should verify emails.
- [CONFIRM: how role and `is_active` changes on `profiles` are blocked for normal users, for example column-level grants or a trigger. A policy of `id = auth.uid()` alone does not prevent a user from editing those columns. Describe the mechanism here.]
- [CONFIRM: how customers are prevented from changing fields such as `assigned_to` or `status` on their own tickets, for example column-level grants or RPCs.]
- [CONFIRM: automated tests. Say "none yet" if there are none, or list what exists.]

## Run locally

Requirements: Node.js 20 or higher, npm 10 or higher, and a Supabase project.

```bash
git clone https://github.com/zyadmoataz/Customer-Support-Operations-Platform.git
cd Customer-Support-Operations-Platform
```

**Customer Portal**
```bash
cd customer-portal
cp .env.example .env     # set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
npm install
npm run dev              # http://localhost:5173
```

**Support Workspace**
```bash
cd support-workspace
cp src/environments/environment.example.ts src/environments/environment.ts   # set supabaseUrl and supabaseKey
npm install
npx ng serve             # http://localhost:4200
```

[CONFIRM: where the SQL schema, policies and functions live in the repo (for example `supabase/migrations`) and how to apply them. Never commit real keys.]

## Deploy (Vercel monorepo)

| Setting | Customer Portal | Support Workspace |
|:---|:---|:---|
| Root directory | `customer-portal` | `support-workspace` |
| Framework preset | Vite | Angular |
| Build command | `npm run build` | `npm run build` |
| Output directory | `dist` | `dist` [CONFIRM: Angular output path] |

## Try the full flow
1. In the Customer Portal, sign in as the customer and create a ticket with an attachment.
2. In the Support Workspace, sign in as the agent, claim the ticket, post an internal note and a public reply.
3. Back in the Customer Portal, confirm only the public reply is visible.
4. As the agent, resolve the ticket with a resolution note.
5. As the manager, rate the resolved ticket and check the agent's average rating in the Manager Panel.
6. As the manager, deactivate an agent and confirm their open tickets return to the queue.

## License
[CONFIRM: MIT, only if a LICENSE file exists in the repo. Otherwise delete this section.]
