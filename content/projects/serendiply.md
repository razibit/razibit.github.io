---
title: "Serendiply — Anonymous Text and Video Chat with Interest-Based Matching"
label: "Real-time communication"
summary: "A web chat platform combining WebRTC video, Redis-backed matching, real-time messaging, and reporting workflows."
role: "Full-stack implementation contributor"
contribution: "Chat, Redis matching, WebRTC signaling, reports, and recovery paths."
stack: "Next.js · TypeScript · WebRTC · Socket.IO · Redis"
outcome: "Implemented text/video and moderation workflows with concurrent matching recovery."
featured: true
order: 2
---

*Matching strangers while handling real-time session changes.*

## Project header

**Category:** Real-time communication. **Role:** Full-stack implementation contributor. **Timeline:** April–December 2025 main development; subsequent maintenance and September 2026 rename. **Status:** Implemented web platform; current hosted availability is unestablished. **Previous name:** Owmegle.

## Overview and problem

Anonymous chat must pair users, establish a conversation, and handle skips, stops, and disconnects that can happen at any time. Matching around shared interests adds competing queue paths. A connection that works once is insufficient if concurrent actions leave users stranded or paired inconsistently.

## Solution and my contribution

I developed text/video interfaces, Redis-backed matching, WebRTC/ICE handling, image sharing, report and IP-ban workflows, and deployment configuration. The repository also includes a separate administration application. These statements describe my documented implementation work without assigning a formal team title or sole authorship.

## Technical architecture

A pnpm/Turborepo TypeScript monorepo separates the Next.js public client and administration client from an Express API and Socket.IO signaling service. Socket.IO carries matching, signaling, and message events; WebRTC carries peer video. Redis manages mode-specific interest/random queues, transient state, and cross-instance messaging. Supabase/PostgreSQL stores selected session and moderation records; MongoDB persists chat logs; R2 stores images. Cloudflare TURN credential issuance assists peer connectivity. Docker and Cloud Run materials document the delivery setup historically.

## Key engineering work

The matchmaking implementation atomically claims waiting users and restores a partner when the requesting user stops mid-match. Image workflows combine hashing, duplicate lookup, upload validation, rate limiting, metadata, and safe/flagged storage paths. Reports, keyword/repetition checks, IP-ban handling, and administrative screens supply separate moderation mechanisms.

## Challenges and solutions

Concurrent match/stop actions were addressed through queue claims and explicit restoration. Missing static assets in a Next.js standalone monorepo container were addressed by tracking and copying public assets into the served build. These are documented repairs rather than measured throughput improvements.

## Technology stack

**Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS. **API and real-time:** Express, Socket.IO, WebRTC. **Data:** Redis, Supabase/PostgreSQL, MongoDB. **Storage/connectivity:** Cloudflare R2 and TURN. **Browser models:** TensorFlow.js, NSFW.js, BlazeFace. **Delivery:** Docker and historical Cloud Run workflows.

## Results and limitations

The source implements text/video conversations, matching, image sharing, reports, and administration. Browser classification is an aid, not a server-side safety guarantee: documented upload paths trust client classification and include an incomplete room-verification helper. Current availability, adoption, moderation effectiveness, end-to-end encryption, native clients, and payment features are not claimed. The separate BERT-Tiny moderation project is not an implemented Serendiply integration.
