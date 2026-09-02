# SA WiFi Guard — WiFi Security Auditor

A tool for identifying weak wireless encryption configurations and educating South African users on real-world attack vectors (MITM, KRACK, PMKID, TKIP exploitation) with router-specific remediation guides.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Python-blue)

---

## The Problem

Most non-technical users ignore "Weak Security" warnings on their devices. They don't understand WPA/WPA2-TKIP vulnerabilities, don't know how to log into a router, and are afraid of breaking their internet connection. This is especially common in South Africa, where ISP-supplied routers often ship with outdated default configurations.

No SA-specific tool currently exists to guide everyday users through diagnosing and fixing their WiFi security.

---

## What This Does

SA WiFi Guard is a web-based security auditor that:

- Walks users through a guided self-check wizard to diagnose their WiFi security configuration
- Generates a personalised risk score based on encryption type, WPS status, and password strength
- Maps their configuration to real attack vectors with plain-language explanations
- Provides router-specific, step-by-step remediation guides for common South African hardware
- Includes a before/after verification flow to confirm fixes worked

---

## Architecture


```
┌─────────────────────────────────┐
│  React Frontend                 │
│  - Interactive self-check wizard│
│  - Risk scoring engine          │
│  - Router-specific guides (SA)  │
│  - Attack vector visualizations │
│  - Password generator           │
│  - Before/after verification    │
└──────────┬──────────────────────┘
           │
     ┌─────┴─────┐
     │            │
 Option A     Option B
 Guided       Python Agent
 Self-Check   (optional download)
 Wizard       for auto-detection
 (default)    via OS commands
```

**Option A — Guided Self-Check Wizard (default, works for everyone)**
User answers simple questions → app diagnoses their security → generates personalised fix instructions.

**Option B — Companion Python Agent (power users)**
Downloadable script that queries the OS for WiFi details automatically:
- Windows: `netsh wlan show interfaces`
- macOS: `airport -I`
- Linux: `nmcli`

Sends results to the frontend via localhost. Mirrors how real enterprise security tools (e.g. Nessus, Qualys) use a lightweight agent paired with a web dashboard.

---

## Attack Vectors Covered

| Attack | Description |
|---|---|
| **Offline Dictionary / Brute-Force** | Attacker captures the 4-way handshake and cracks the password offline |
| **KRACK (CVE-2017-13077)** | Replay attack against WPA2 handshake — resets nonces, enabling decryption |
| **PMKID Attack** | Crack WPA2 without a connected client by requesting the PMKID directly from the AP |
| **Deauth Attack** | Unencrypted management frames in WPA2 allow forced disconnections |
| **TKIP Weaknesses** | Mathematically broken — attackers can reverse-engineer keys from captured frames |

---

## SA-Specific Router Support

Targeting the exact hardware common in South Africa:

| Router | ISPs | Gateway |
|---|---|---|
| Huawei B535 | Rain, Vodacom, MTN | 192.168.8.1 |
| Huawei B618 | Various | 192.168.8.1 |
| ZTE MF253 | Rain, Vuma Reach | 192.168.0.1 |
| TP-Link Archer | Openserve fibre | 192.168.0.1 |
| Tenda (various) | Budget/generic | 192.168.0.1 |

Each router guide includes: the correct gateway IP, default credentials, and exact navigation steps to switch to WPA2-AES or WPA3.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Visualisations | D3.js / CSS animations |
| Companion Agent | Python (CLI) |
| Backend (if needed) | Python — Flask / FastAPI |
| Deployment | Vercel (frontend), Railway (backend) |

---

## App Security

This tool practises what it preaches:

- HTTPS only — HTTP redirected
- Content Security Policy headers enforced
- All companion agent output sanitised before rendering
- Rate limiting on any backend endpoints
- Stateless analysis — no sensitive data stored server-side

See [`SECURITY.md`](./SECURITY.md) for the full threat model and hardening decisions.

---

## Threat Model

**Assets:** User's WiFi configuration data (processed locally, never stored)  
**Threats:** XSS injection via companion agent output, CSRF, data exfiltration  
**Mitigations:** Input sanitisation, CSP headers, stateless architecture, HTTPS enforcement  

---

## Project Status

| Feature | Status |
|---|---|
| Self-check wizard UI | Implemented |
| Risk scoring engine | Implemented |
| SA router remediation guides | Implemented |
| Attack vector visualisations | Planned |
| Python companion agent | Planned |
| Before/after verification | Implemented |
| Password generator | Planned |

---

## Why This Exists

South Africa has a significant gap: no tool exists that combines WiFi security diagnostics with ISP- and router-specific remediation guidance in plain language. Existing tools like Fing or WiFi Analyzer require native app installs and are not SA-specific. This project aims to close that gap with a browser-based tool anyone can use.

---

## References

- [CVE-2017-13077 — KRACK Attack](https://www.krackattacks.com/)
- [PMKID Attack — Jens Steube (2018)](https://hashcat.net/forum/thread-7717.html)
- [WPA3 Specification — Wi-Fi Alliance](https://www.wi-fi.org/discover-wi-fi/security)
- [TKIP Vulnerabilities — IEEE 802.11](https://ieeexplore.ieee.org/document/5290213)

---

*Built by Sibusiso Mbenenge — Computer Science student, University of the Witwatersrand*
