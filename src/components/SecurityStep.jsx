import { SECURITY_TYPES } from '../data/routers';

const RISK_BADGE = {
  critical: 'badge-danger',
  medium: 'badge-warn',
  safe: 'badge-safe',
  unknown: 'badge-warn',
};

export default function SecurityStep({ selected, onSelect, onNext, onBack }) {
  return (
    <section className="step-section">
      <div className="step-eyebrow">Step 2 of 4</div>
      <h1 className="step-title">What security type does your WiFi use?</h1>
      <p className="step-sub">
        On your phone: go to <strong>WiFi Settings</strong> → tap your network name → look for "Security" or "Encryption".
        On a laptop: click the WiFi icon and look for your network details.
      </p>

      <div className="sec-list">
        {SECURITY_TYPES.map((sec) => (
          <button
            key={sec.id}
            className={`sec-option ${selected === sec.id ? 'selected' : ''}`}
            onClick={() => onSelect(sec.id)}
            aria-pressed={selected === sec.id}
          >
            <span className={`badge ${RISK_BADGE[sec.riskLevel]}`}>{sec.risk}</span>
            <div className="sec-detail">
              <div className="sec-name">{sec.label}</div>
              <div className="sec-desc">{sec.description}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" disabled={!selected} onClick={onNext}>
          Check my risk →
        </button>
      </div>
    </section>
  );
}
