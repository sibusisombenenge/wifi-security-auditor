export const ROUTERS = {
  huawei: {
    label: 'Huawei',
    isps: 'Rain, Vodacom, MTN',
    gateway: '192.168.8.1',
    creds: 'Username: admin — Password: check sticker on the bottom of your router',
    steps: [
      'Open a browser on any device connected to your WiFi.',
      'Type <code>192.168.8.1</code> into the address bar and press Enter.',
      'Log in with username <code>admin</code> and the password printed on the sticker under your router.',
      'Click <strong>Settings</strong> → <strong>WiFi</strong> → <strong>WLAN Basic Settings</strong>.',
      'Find the <strong>Security Mode</strong> dropdown and select <strong>WPA2-PSK</strong>.',
      'Set <strong>Encryption</strong> to <strong>AES</strong>.',
      'Click <strong>Save</strong>. Your devices will briefly disconnect and reconnect — this is normal.',
    ],
  },
  zte: {
    label: 'ZTE',
    isps: 'Rain, Vuma Reach',
    gateway: '192.168.1.1',
    creds: 'Username: admin — Password: admin (or check sticker)',
    steps: [
      'Open a browser and go to <code>192.168.1.1</code>.',
      'Log in — check the sticker on your router for the password.',
      'Navigate to <strong>Network</strong> → <strong>WLAN</strong> → <strong>Security</strong>.',
      'Change Security Mode to <strong>WPA2-PSK</strong>.',
      'Set Encryption Type to <strong>AES</strong>.',
      'Click <strong>Apply</strong>. Reconnect your devices.',
    ],
  },
  tplink: {
    label: 'TP-Link',
    isps: 'Openserve fibre',
    gateway: '192.168.0.1',
    creds: 'Username: admin — Password: admin',
    steps: [
      'Open a browser and go to <code>192.168.0.1</code> or <code>tplinkwifi.net</code>.',
      'Log in with <code>admin</code> / <code>admin</code>, or your custom password.',
      'Click <strong>Wireless</strong> → <strong>Wireless Security</strong>.',
      'Select <strong>WPA2-Personal</strong>.',
      'Set <strong>Encryption</strong> to <strong>AES</strong>.',
      'Click <strong>Save</strong> and reboot if prompted.',
    ],
  },
  tenda: {
    label: 'Tenda',
    isps: 'Budget / generic SA routers',
    gateway: '192.168.0.1',
    creds: 'Username: (leave blank) — Password: admin',
    steps: [
      'Open a browser and go to <code>192.168.0.1</code>.',
      'Leave the username blank and enter <code>admin</code> as the password.',
      'Click <strong>Wireless Settings</strong> → <strong>WiFi Security</strong>.',
      'Select <strong>WPA2-PSK</strong>.',
      'Set Encryption to <strong>AES</strong>.',
      'Save and reconnect your devices.',
    ],
  },
  other: {
    label: 'Other / Not sure',
    isps: '',
    gateway: '192.168.0.1',
    creds: 'Check the sticker on the back or bottom of your router',
    steps: [
      'On your phone, go to WiFi Settings → tap your network → look for "Router" or "Gateway" IP (usually 192.168.0.1 or 192.168.1.1).',
      'Type that IP into a browser.',
      'Log in using the credentials on the sticker on your router.',
      'Look for a section called <strong>Wireless Security</strong> or <strong>WiFi Security</strong>.',
      'Select <strong>WPA2-PSK</strong> and set Encryption to <strong>AES</strong>.',
      'Save and reconnect your devices.',
    ],
  },
};

export const SECURITY_TYPES = [
  {
    id: 'wep',
    label: 'WEP',
    risk: 'Critical',
    riskLevel: 'critical',
    description: 'Completely broken — cracked in under 60 seconds with free tools.',
    score: 5,
    threats: [
      { name: 'Instant network cracking', detail: 'WEP is mathematically broken. Free tools crack it in under 60 seconds regardless of password strength.' },
      { name: 'Full traffic interception', detail: 'Anyone nearby can read every packet you send — emails, passwords, banking sessions.' },
      { name: 'Network takeover', detail: 'An attacker can join your network and access every connected device: phones, laptops, smart TVs.' },
    ],
  },
  {
    id: 'wpa-tkip',
    label: 'WPA / WPA2 (TKIP)',
    risk: 'High risk',
    riskLevel: 'critical',
    description: 'This causes the "Weak Security" warning on Apple devices. Vulnerable to KRACK and handshake capture.',
    score: 22,
    threats: [
      { name: 'KRACK attack (CVE-2017-13077)', detail: 'A 2017 vulnerability lets attackers reset your encryption key mid-session, making all traffic readable.' },
      { name: 'Offline handshake cracking', detail: 'An attacker captures your login handshake and guesses your password offline at millions of attempts per second.' },
      { name: 'Deauthentication attacks', detail: 'Unencrypted management frames let attackers force your devices to disconnect — repeatedly.' },
      { name: 'TKIP key forgery', detail: 'The TKIP protocol is mathematically broken — encryption keys can be reverse-engineered without the password.' },
    ],
  },
  {
    id: 'wpa2-aes',
    label: 'WPA2 (AES / CCMP)',
    risk: 'Moderate',
    riskLevel: 'medium',
    description: 'Current industry standard. Secure if your password is strong — no OS warning shown.',
    score: 65,
    threats: [
      { name: 'Weak password exposure', detail: 'WPA2-AES is secure, but relies entirely on password strength. Short or common passwords can still be brute-forced offline.' },
      { name: 'PMKID attack (2018)', detail: 'Attackers can request a key identifier directly from your router and crack it without waiting for anyone to connect.' },
    ],
  },
  {
    id: 'wpa3',
    label: 'WPA3',
    risk: 'Secure',
    riskLevel: 'safe',
    description: 'Latest standard. SAE handshake eliminates offline attacks and deauth exploits.',
    score: 94,
    threats: [
      { name: 'No critical vulnerabilities', detail: 'WPA3 uses SAE (Simultaneous Authentication of Equals), which makes offline dictionary attacks and KRACK impossible. Well done.' },
    ],
  },
  {
    id: 'unsure',
    label: "I'm not sure",
    risk: 'Unknown',
    riskLevel: 'unknown',
    description: "We'll assume worst case and show you how to check and fix it.",
    score: 15,
    threats: [
      { name: 'Unknown exposure', detail: 'Without knowing your security type, we treat this as worst case. Follow the fix guide to check and upgrade.' },
      { name: 'Likely TKIP by default', detail: 'Most SA ISP routers ship with WPA2/TKIP defaults, which is vulnerable to KRACK and handshake capture attacks.' },
    ],
  },
];

export const VERIFICATION_STEPS = {
  ios: [
    'Open <strong>Settings</strong> on your iPhone or iPad.',
    'Tap <strong>WiFi</strong>.',
    'Tap your network name.',
    'If you no longer see a "Weak Security" warning, your encryption is now WPA2 or better.',
  ],
  android: [
    'Open <strong>Settings</strong> → <strong>WiFi</strong>.',
    'Tap your network name.',
    'Look for the <strong>Security</strong> field.',
    'It should now say <strong>WPA2</strong> or <strong>WPA3</strong>, not WPA/TKIP.',
  ],
  windows: [
    'Press <strong>Win + R</strong>, type <code>cmd</code>, press Enter.',
    'Run: <code>netsh wlan show interfaces</code>',
    'Look for <strong>Authentication</strong> — should say <strong>WPA2-Personal</strong>.',
    'Look for <strong>Cipher</strong> — should say <strong>CCMP</strong>, not TKIP.',
  ],
  macos: [
    'Hold <strong>Option (⌥)</strong> and click the WiFi icon in your menu bar.',
    'Look for the <strong>Security</strong> field.',
    'It should say <strong>WPA2 Personal</strong> or <strong>WPA3 Personal</strong>.',
  ],
};
