---
title: "Trackese — Java Desktop Attendance Tracking with CSV History"
label: "Desktop utility"
summary: "A Java Swing app for student lists, attendance entry, and batch-specific CSV history."
role: "Recorded source and documentation contributor"
contribution: "Application source snapshot, demo, and repository documentation."
stack: "Java · Swing · CSV"
outcome: "Local attendance entry and editable batch-specific history."
featured: false
order: 11
repository: "https://github.com/razibit/Trackese-Smart-Attendance-Tracker"
---

*Local classroom attendance with editable records.*

## Project header

**Category:** Desktop utility. **Role:** Recorded source and documentation contributor. **Timeline:** Repository activity March 2025. **Status:** Implemented desktop tool with demo; current use is unestablished.

## Problem, solution, and contribution

The app organizes attendance by batch/section and student, reducing the need to edit attendance files directly. My recorded contributions include the application source snapshot, demo, and documentation/license changes. No institutional deployment or formal team role is asserted.

## Architecture and results

Java Swing panels run on the event-dispatch thread. CSVHandler reads/rewrites attendance files, and batch/section definitions use Java serialization. Students can be entered by ID/range; present/absent actions and editable history persist locally. The available demonstration shows the application rather than measured time savings. The source has no documented challenge-resolution narrative or automated suite, so none is invented.
