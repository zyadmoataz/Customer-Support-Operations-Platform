# Customer Support Operations Platform (CSOP)

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Angular](https://img.shields.io/badge/Angular_18-DD0031?style=flat-square&logo=angular&logoColor=white)](https://angular.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A support-ticketing system with two frontends on one Supabase backend: a **React customer portal** for submitting and tracking tickets, and an **Angular staff workspace** for triage, resolution and manager QA audits. Access rules are enforced in the database with Row-Level Security (RLS) and role-checked stored procedures, not only in the UI.

**Live demo**
- Support Workspace (Angular): https://customer-support-operations-platfor.vercel.app/login
- Customer Portal (React): https://customer-support-operations-platfor.vercel.app/support/login

<img width="1919" height="430" alt="optima-overview" src="https://github.com/user-attachments/assets/42174fbb-a5f7-4e50-a5cf-04c668f42c9c" />

## The idea
Customer-facing and internal support interfaces have different needs and different risks. CSOP keeps them as **two separate apps** that share one database. Staff-only data, such as internal notes and agent metrics, is hidden from customers by RLS policies at the database level, so a bug in a frontend cannot expose it.

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


## Try the full flow
1. In the Customer Portal, sign in as the customer and create a ticket with an attachment.
2. In the Support Workspace, sign in as the agent, claim the ticket, post an internal note and a public reply.
3. Back in the Customer Portal, confirm only the public reply is visible.
4. As the agent, resolve the ticket with a resolution note.
5. As the manager, rate the resolved ticket and check the agent's average rating in the Manager Panel.
6. As the manager, deactivate an agent and confirm their open tickets return to the queue.


