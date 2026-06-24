export default function HeroScreen({ onStart }) {
  return (
    <div className="hero-shell">
      <div className="hero-content">

        <div className="hero-eyebrow">
          <span className="hero-dot" aria-hidden="true"></span>
          Free security check — no app download required
        </div>

        <h1 className="hero-title">
          Is your home WiFi<br />actually secure?
        </h1>

        <p className="hero-sub">
          Most South African routers ship with outdated encryption by default.
          Your devices may be showing a "Weak Security" warning right now —
          and most people just ignore it.
        </p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">3 min</span>
            <span className="hero-stat-label">to complete the check</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">0</span>
            <span className="hero-stat-label">data collected or stored</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true"></div>
          <div className="hero-stat">
            <span className="hero-stat-num">5</span>
            <span className="hero-stat-label">SA router brands covered</span>
          </div>
        </div>

        <button className="hero-cta" onClick={onStart}>
          Check my WiFi now
        </button>

        <p className="hero-disclaimer">
          Runs entirely in your browser. Nothing is sent to any server.
        </p>
      </div>

      <div className="hero-threat-strip">
        <span className="strip-label">Attack vectors covered:</span>
        {['KRACK (CVE-2017-13077)', 'PMKID Attack', 'TKIP Forgery', 'Deauth Attack', 'Offline Handshake Cracking'].map((t) => (
          <span key={t} className="strip-tag">{t}</span>
        ))}
      </div>
    </div>
  );
}
