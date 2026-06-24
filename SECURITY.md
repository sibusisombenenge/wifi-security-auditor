# Security Policy

## Threat Model

SA WiFi Guard is a client-side educational tool. It collects no user data, makes no external network requests, and stores nothing server-side. The attack surface is intentionally minimal.

### What this app does
- Runs entirely in the browser
- Accepts user input (router brand, security type selection)
- Renders router-specific remediation instructions
- Links to local router admin interfaces (e.g. `http://192.168.8.1`)

### What this app does NOT do
- Scan WiFi networks (browsers cannot access hardware-level WiFi data)
- Send any data to a remote server
- Store passwords, credentials, or network names
- Use cookies or local storage

---

## Hardening Decisions

### Content Security Policy
A strict CSP is set in `index.html`:
```
default-src 'self';
style-src 'self' 'unsafe-inline';
script-src 'self';
connect-src 'none';
img-src 'self' data:;
```
`connect-src 'none'` prevents the app from making any outbound HTTP requests even if injected script attempts to do so.

### No dangerouslySetInnerHTML on user input
The only use of `dangerouslySetInnerHTML` is on static strings defined in `src/data/routers.js` (router step instructions containing `<strong>` and `<code>` tags). These are not derived from user input and are not injectable.

### No external dependencies at runtime
The app uses no CDN-loaded scripts or third-party analytics. All code is bundled locally.

### Gateway links use `rel="noreferrer noopener"`
Links to local router admin interfaces (`http://192.168.8.1` etc.) use `target="_blank" rel="noreferrer noopener"` to prevent tab-napping.

### HTTPS enforcement
When deployed to Vercel, HTTP requests are automatically redirected to HTTPS. The router gateway links intentionally use `http://` because router admin interfaces do not support HTTPS.

---

## Reporting a Vulnerability

If you find a security issue in this project, please open a GitHub issue or contact the maintainer directly. Do not publicly disclose vulnerabilities before they are patched.

---

## Known Limitations

- **No real WiFi scanning**: The browser sandbox prevents reading WiFi encryption type. This app relies on user-reported input.
- **Router instructions may be outdated**: Router firmware updates can change admin interface layouts. Steps are accurate as of 2025 for the listed models.
- **Gateway links are HTTP**: Local router admin pages do not use HTTPS. This is a limitation of router hardware, not this app.
