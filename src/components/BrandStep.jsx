import { ROUTERS } from '../data/routers';

export default function BrandStep({ selected, onSelect, onNext }) {
  return (
    <section className="step-section">
      <div className="step-eyebrow">Step 1 of 4</div>
      <h1 className="step-title">What brand is your router?</h1>
      <p className="step-sub">
        Look at the physical box in your home — the one your internet cable plugs into.
        The brand name is printed on the front or top.
      </p>

      <div className="brand-grid">
        {Object.entries(ROUTERS).map(([id, router]) => (
          <button
            key={id}
            className={`brand-card ${selected === id ? 'selected' : ''}`}
            onClick={() => onSelect(id)}
            aria-pressed={selected === id}
          >
            <div className="brand-icon" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="14" width="20" height="6" rx="2"/>
                <path d="M6 14V8a6 6 0 0 1 12 0v6"/>
                <circle cx="18" cy="17" r="1" fill="currentColor"/>
              </svg>
            </div>
            <div className="brand-name">{router.label}</div>
            {router.isps && <div className="brand-isps">{router.isps}</div>}
          </button>
        ))}
      </div>

      <div className="step-actions">
        <button
          className="btn-primary"
          disabled={!selected}
          onClick={onNext}
        >
          Next →
        </button>
      </div>
    </section>
  );
}
