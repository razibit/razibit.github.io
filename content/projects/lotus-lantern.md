---
title: "Lotus Lantern — Windows Music-Reactive Lighting with an OpenRGB-to-BLE Bridge"
label: "Hardware/software integration"
summary: "A local Node.js bridge that converts OpenRGB DDP color output into BLE commands for a tested LED controller."
role: "Bridge implementation contributor"
contribution: "UDP connector, OpenRGB bridge, launcher, profiles, and demonstrations."
stack: "Node.js · DDP/UDP · BLE · OpenRGB"
outcome: "Recorded local music-reactive lighting workflow with ELK-BLEDDM."
featured: false
order: 10
repository: "https://github.com/razibit/Lotus-Lantern-for-Windows-PC"
---

*Connecting desktop lighting effects to a Bluetooth strip.*

## Project header

**Category:** Hardware/software integration. **Role:** Bridge implementation contributor. **Timeline:** Documented June–September 2026 work. **Status:** Local utility with recorded demonstration.

## Problem, solution, and contribution

The compatible strip needs BLE commands while OpenRGB produces lighting frames. I implemented the connector and subsequent OpenRGB-based bridge, launcher, profiles, and documentation. OpenRGB Effects supplies Audio Party colors; the bridge does not itself capture system audio. BLE device code adapts the upstream homebridge implementation.

## Architecture and engineering

OpenRGB emits DDP/UDP to the local machine. A Node.js/noble-winrt bridge averages multi-pixel RGB values for the single-color controller and writes service FFF0/characteristic FFF3. A newest-pending-color slot avoids accumulating stale updates; the configured 200 ms write interval is a setting, not measured latency.

## Results and limitations

Recorded demos document the local workflow with ELK-BLEDDM. Other controllers can use different protocols. The September refactor supersedes earlier Python audio-visualizer descriptions. No adoption or universal hardware claim is made.
