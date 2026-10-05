---
title: "DenZo — Multi-Vendor E-Commerce Marketplace with Payments and Logistics"
label: "Commerce platform"
summary: "A multi-portal marketplace that coordinates seller-owned catalogs, server-authoritative checkout, verified payments, and courier fulfillment."
role: "Solo founding engineer and CEO"
contribution: "Portal, commerce, payment, logistics, and infrastructure engineering."
stack: "Next.js · TypeScript · NestJS · PostgreSQL"
outcome: "Four applications, 15 services, and six shared packages in the audited source."
featured: true
order: 1
---

*Connecting shopping, seller operations, payments, and fulfillment.*

## Project header

**Category:** Commerce platform. **Role:** Solo founding engineer and CEO. **Timeline:** March 2026–present. **Status:** Implemented platform with historical cloud deployment; current hosted availability is unestablished.

## Overview and problem

A marketplace brings several parties into one transaction: a customer buys, each seller fulfills its own items, and administrators handle exceptions. These parties need different permissions while agreeing on price, stock, payment, and delivery state. A stale cart or repeated provider event must not become an incorrect order or duplicate financial action.

## Solution and my contribution

I built the customer, seller, administrative, and supporting publishing workflows and the services behind them. The work covers portal identity, catalogs and variants, inventory, checkout, orders, payment and courier integration, chat, content, commissions, and operations. External providers supply payment processing, courier services, cloud hosting, and object storage.

## Technical architecture

Four Next.js/React applications connect through server-side application boundaries and a gateway to 15 backend services. A TypeScript pnpm/Turborepo workspace shares six packages. PostgreSQL persists domain data; Redis supports selected cache and counter paths. The documented Azure architecture uses Container Apps, Database for PostgreSQL, Service Bus, Container Registry, and Log Analytics. Cloudflare R2 stores media through S3-compatible APIs, separating object bytes from persisted product metadata.

## Key engineering work

- Checkout resolves current seller, price, variant, weight, pickup configuration, and stock on the server, then creates seller-specific suborders and transactional inventory reservations.
- SSLCommerz attempts are persisted before initiation. Provider validation checks transaction identity, amount, currency, merchant, and status before advancing an order, with idempotency and recovery for expiry or unavailable stock.
- Pathao workflows connect seller stores and pickup addresses with rate lookup, forward/reverse shipments, signed webhook processing, and reconciliation.
- Separate portal identities and permission checks restrict seller and administrative actions. Finance code validates balanced double-entry posting and commission snapshots, with posting, payouts, refunds, and imports gated for operator enablement.

## Challenges and solutions

Provider retries and partial failures can leave payment, inventory, and delivery state out of agreement. Stored attempts and events, transactional reservation paths, idempotency keys, and reconciliation give those transitions explicit recovery paths. Cold-start investigations also distinguished infrastructure timing from browser navigation: the recorded 23.54-second cold API probe and later 0.90-second product-page navigation use different measurement boundaries and are not a percentage speedup claim.

## Technology stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS. **Backend:** NestJS, Node.js, shared gateway and event libraries. **Data:** PostgreSQL, Redis. **Infrastructure:** Docker; historical Azure Container Apps, PostgreSQL, Service Bus, ACR, and Log Analytics deployment. **Integrations:** SSLCommerz, Pathao, Cloudflare R2, Better Auth.

## Results and limitations

The audited source contains four applications, 15 services, and six shared packages. An August 27, 2026 infrastructure snapshot recorded 19 ready Container Apps; a September 25 shutdown record supersedes any implication that this deployment is still operating. The implementation demonstrates complete commerce workflows and explicit recovery controls. No revenue, customer count, transaction volume, uptime, or cloud-cost saving is claimed.
