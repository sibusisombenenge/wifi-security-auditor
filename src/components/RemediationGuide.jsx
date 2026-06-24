import { ROUTERS, SECURITY_TYPES } from '../data/routers';

export default function RemediationGuide({ brand, secType, onNext, onBack }) {
  const router = ROUTERS[brand] || ROUTERS['other'];
  const sec = SECURITY_TYPES.find((s) => s.id === secType);

  return (
    <section className="step-section">
      <div className="step-eyebrow">Step 3 of 4 — Fix it</div>
      <h1 className="step-title">How to secure your {router.label} router</h1>
      <p className="step-sub">
        This takes about 3 minutes. You'll need to be on the same WiFi network as your router.
      </p>

      <div className="fix-card">
        <div className="fix-gateway-row">
          <a
            className="gateway-link"
            href={`http://${router.gateway}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            Open router admin — {router.gateway} ↗
          </a>
          <div className="gateway-creds">{router.creds}</div>
        </div>

        <ol className="fix-steps">
          {router.steps.map((step, i) => (
            <li key={i} className="fix-step">
              <span className="fix-step-num">{i + 1}</span>
              <span
                className="fix-step-text"
                dangerouslySetInnerHTML={{ __html: step }}
              />
            </li>
          ))}
        </ol>

        <div className="fix-note">
          <strong>If you get locked out:</strong> Press and hold the reset button on the back of your
          router for 10 seconds to restore factory defaults, then try again.
        </div>
      </div>

      {sec?.riskLevel !== 'safe' && (
        <div className="fix-password-tip">
          <div className="tip-label">Also: use a strong WiFi password</div>
          <p>
            Even with WPA2-AES, a weak password can be cracked offline. Use a passphrase of
            at least <strong>16 characters</strong> mixing letters, numbers, and symbols.
            Example: <code>vK#9mP!qX2$nL7wR</code>
          </p>
        </div>
      )}

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        <button className="btn-primary" onClick={onNext}>
          I've made the changes — verify →
        </button>
      </div>
    </section>
  );
}
