import { useState } from 'react';
import { VERIFICATION_STEPS } from '../data/routers';

const DEVICES = [
  { id: 'ios', label: 'iPhone / iPad' },
  { id: 'android', label: 'Android' },
  { id: 'windows', label: 'Windows' },
  { id: 'macos', label: 'macOS' },
];

export default function VerifyStep({ onRestart }) {
  const [device, setDevice] = useState('ios');
  const steps = VERIFICATION_STEPS[device];

  return (
    <section className="step-section">
      <div className="step-eyebrow">Step 4 of 4 — Verify</div>
      <h1 className="step-title">Confirm your changes worked</h1>
      <p className="step-sub">
        Select your device below to see how to confirm your WiFi is now secure.
        The "Weak Security" warning should be gone.
      </p>

      <div className="device-tabs" role="tablist">
        {DEVICES.map((d) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={device === d.id}
            className={`device-tab ${device === d.id ? 'active' : ''}`}
            onClick={() => setDevice(d.id)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <ol className="verify-steps">
        {steps.map((step, i) => (
          <li key={i} className="verify-step">
            <span className="verify-step-num">{i + 1}</span>
            <span
              className="verify-step-text"
              dangerouslySetInnerHTML={{ __html: step }}
            />
          </li>
        ))}
      </ol>

      <div className="verify-success-card">
        <div className="success-icon" aria-hidden="true">✓</div>
        <div>
          <div className="success-title">All clear? You're protected.</div>
          <div className="success-sub">
            WPA2-AES or WPA3 with a strong password means your network traffic is encrypted
            and offline cracking attacks are no longer practical.
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onRestart}>
          Start over for another network
        </button>
      </div>
    </section>
  );
}
