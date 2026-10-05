---
title: "Mess Meal Management — Shared-Household Meal Planning and Expense Tracking"
label: "Household operations PWA"
summary: "A React and Supabase PWA for meal registration, shared expenses, deposits, inventory, and household reporting."
role: "Application and database implementation"
contribution: "Meals, cutoffs, time synchronization, financial reporting, and migrations."
stack: "React · TypeScript · Supabase · PostgreSQL"
outcome: "Implemented meal, expense, deposit, inventory, and settlement reporting workflows."
featured: true
order: 4
repository: "https://github.com/razibit/meal-app"
---

*From daily meal choices to traceable monthly settlements.*

## Project header

**Category:** Household operations PWA. **Role:** Application and database implementation. **Timeline:** Documented repository work from October 2025, with reporting and access-model changes through July 2026. **Status:** Implemented application with authentication-first and manager/public-report variants; current operation is unestablished.

## Overview and problem

A boarding mess must know who will eat, how many meals to prepare, what shared groceries cost, and how deposits and consumption affect settlement. Late changes and device-clock differences complicate meal cutoffs. Custom meal-month boundaries also make calendar-month-only reporting insufficient.

## Solution and my contribution

I implemented member meal registration, quantities, automatic meals, cutoff logic, chat, inventory and financial tracking, reporting, exports, and supporting SQL migrations. A later variant gives managers control over which aggregate reports visitors can read. These variants belong to one project and should not be presented as two separate products.

## Technical architecture

The React 18/Vite TypeScript client uses React Router and Zustand. Supabase provides PostgreSQL persistence, Auth, row-level security, functions/RPCs, Realtime subscriptions, and Edge Functions. Database logic models meals, expenses, deposits, egg inventory and prices, reporting periods, rate history, and settlements. Browser report exports use html2canvas/jsPDF alongside CSV output.

## Key engineering work

Server-time synchronization computes and caches a PostgreSQL clock offset for client decisions. Independent UTC+6 Edge Function checks enforce date-aware cutoffs. Meal-rate history records snapshots when contributing meal, expense, or egg inputs change and avoids unchanged duplicate snapshots. Reporting supports custom periods and exports; chat includes mentions and a cleanup function for old messages.

## Challenges and solutions

Device clocks were addressed with synchronized UI time plus independent server enforcement. Offline write queuing was removed in favor of fail-fast online writes rather than allowing delayed updates to cross cutoff boundaries. Public reporting uses dedicated RPCs and manager-controlled visibility; it is a distinct access variant and is not described as anonymous data, since member names can appear.

## Technology stack

**Frontend:** React, TypeScript, Vite, React Router, Zustand, Tailwind CSS. **Backend/data:** Supabase, PostgreSQL, Auth, RLS, RPCs, Realtime, Edge Functions. **PWA/reporting:** Workbox, vite-plugin-pwa, html2canvas, jsPDF, CSV.

## Results and limitations

The implementation brings meal choices, financial inputs, inventory, and reports into one application. The 16-member specification is intended capacity, not verified adoption. Deployment guides/configuration exist, but current usage, time savings, and settlement accuracy in actual operation have no measured claim here.
