---
date: "12/10/2025"
title: "CAN Bus Security Framework"
type: "professional"
madeAt: "UMD ENEE457"
category: ["Cybersecurity", "Academic", "Software","Simulation", "Research", "Full Stack"]
builtWith: ["Python", "React", "Websocket", "AES Encryption", "HMAC", "Node.js", "Multi-threading"]
link: "/canbus_paper.pdf"
---

Developed a real-time **Controller Area Network (CAN) Bus** security framework designed to mitigate the inherent vulnerabilities of modern automotive communication. The project features a multi-threaded ECU architecture and a comprehensive four-layer defense system, achieving 100% prevention of common automotive cyberattacks with sub-2ms latency.

## The Defense Architecture

Since the standard CAN protocol lacks native encryption or authentication, I implemented a robust security wrapper to protect inter-ECU communication.

- **4-Layer Defense Stack:**
    - **AES Encryption:** Ensures data confidentiality across the bus.
    - **HMAC (Hash-based Message Authentication Code):** Provides integrity verification, ensuring messages haven't been tampered with.
    - **Rate Limiting:** Protects against flooding/DoS attacks by throttling high-frequency anomalous traffic.
    - **IDS (Intrusion Detection System):** A logic-based monitor that flags spoofing and replay attacks in real-time.
- **Multi-threaded ECU Architecture:** Simulated a distributed network where each ECU operates as an independent thread, mimicking the concurrent nature of a vehicle's electronic ecosystem.

## Real-Time Monitoring & Visualization

To prove the efficacy of the defense layers, I built a full-stack dashboard that utilizes the simulation my group created to visualize live attack scenarios.

- **Full-Stack Dashboard:** Built with **React** on the frontend and a **Python/Node.js** backend.
- **Websocket Integration:** Utilized the Websocket protocol for low-latency, bi-directional communication, allowing the dashboard to display live bus traffic and security metrics without refreshing.
- **Attack Simulation:** The framework includes an "Attacker" module capable of launching spoofing, flooding, and replay attacks, which the system then identifies and blocks instantly.

## Performance Metrics

`Latency:` Optimized the cryptographic overhead to maintain **<2ms latency**, meeting the strict real-time requirements of automotive systems.
`Effectiveness:` Successfully detected and neutralized **100% of simulated attacks** during the final evaluation.