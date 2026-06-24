import { useEffect, useState } from 'react';
import { SECURITY_TYPES, ROUTERS } from '../data/routers';

const SCORE_CLASS = {
  critical: 'score-critical',
  medium: 'score-medium',
  safe: 'score-safe',
  unknown: 'score-critical',
};

function AnimatedScore({ target, riskLevel }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const duration = 900;
    const steps = 40;
    const increment = target / steps;
    const interval = duration / steps;
    let count = 0;

    const timer = setInterval(() => {
      count++;
      const current = Math.min(Math.round(increment * count), target);
      setDisplayed(current);
      if (count >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [target]);

  const scoreClass = SCORE_CLASS[riskLevel] || 'score-critical';

  return (
    <div className={`score-circle ${scoreClass}`} aria-label={`Security score: ${target} out of 100`}>
      <span className="score-num" aria-live="polite">{displayed}</span>
      <span className="score-label">/ 100</span>
    </div>
  );
}

export default function RiskReport({ brand, secType, onNext, onBack }) {
  const sec = SECURITY_TYPES.find((s) => s.id === secType);
  const router = ROUTERS[brand];
  if (!sec) return null;

  const needsFix = secType !== 'wpa3';

  return (
    <section className="step-section">
      <div className="step-eyebrow">Your security report</div>
      <h1 className="step-title">
        {needsFix ? 'Your network needs attention' : 'Your network is secure'}
      </h1>

      <div className="score-row">
        <AnimatedScore target={sec.score} riskLevel={sec.riskLevel} />
        <div className="score-meta">
          <div className="score-risk-label">{sec.risk}</div>
          <div className="score-detail">
            Encryption: <strong>{sec.label}</strong>
          </div>
          {router && (
            <div className="score-detail">
              Router: <strong>{router.label}</strong>
              {router.isps ? ` — ${router.isps}` : ''}
            </div>
          )}
          {needsFix && (
            <div className="score-fix-nudge">Fix available below ↓</div>
          )}
        </div>
      </div>

      <div className="section-label">What attackers can do on your network</div>
      <ul className="threat-list">
        {sec.threats.map((t, i) => (
          <li
            key={i}
            className="threat-item"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span
              className={`threat-icon ${sec.riskLevel === 'safe' ? 'threat-icon-safe' : 'threat-icon-warn'}`}
              aria-hidden="true"
            >
              {sec.riskLevel === 'safe' ? '✓' : '⚠'}
            </span>
            <div>
              <div className="threat-name">{t.name}</div>
              <div className="threat-detail">{t.detail}</div>
            </div>
          </li>
        ))}
      </ul>

      <div className="step-actions">
        <button className="btn-ghost" onClick={onBack}>← Back</button>
        {needsFix ? (
          <button className="btn-primary" onClick={onNext}>Show me how to fix it →</button>
        ) : (
          <button className="btn-primary" onClick={onNext}>Verify my setup →</button>
        )}
      </div>
    </section>
  );
}