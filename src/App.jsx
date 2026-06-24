//App.jsx

import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import HeroScreen from './components/HeroScreen';
import BrandStep from './components/BrandStep';
import SecurityStep from './components/SecurityStep';
import RiskReport from './components/RiskReport';
import RemediationGuide from './components/RemediationGuide';
import VerifyStep from './components/VerifyStep';
import ProgressBar from './components/ProgressBar';
import './styles/app.css';

export default function App() {
  const [step, setStep] = useState(-2);
  const [brand, setBrand] = useState(null);
  const [secType, setSecType] = useState(null);

  const go = (n) => setStep(n);

  const restart = () => {
    setBrand(null);
    setSecType(null);
    go(-1);
  };

  if (step === -2) {
    return <LoadingScreen onDone={() => go(-1)} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <span className="app-logo" onClick={restart} style={{ cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2L3 6v4c0 4.4 3 8.5 7 9.5 4-1 7-5.1 7-9.5V6L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            SA WiFi Guard
          </span>
          <span className="app-tagline">Free WiFi security check for South Africans</span>
        </div>
      </header>

      <main className={step === -1 ? 'app-main-hero' : 'app-main'}>
        {step >= 0 && step < 4 && (
          <ProgressBar current={step} total={4} />
        )}
        {step === -1 && <HeroScreen onStart={() => go(0)} />}
        {step === 0 && <BrandStep selected={brand} onSelect={setBrand} onNext={() => go(1)} />}
        {step === 1 && <SecurityStep selected={secType} onSelect={setSecType} onNext={() => go(2)} onBack={() => go(0)} />}
        {step === 2 && <RiskReport brand={brand} secType={secType} onNext={() => go(3)} onBack={() => go(1)} />}
        {step === 3 && <RemediationGuide brand={brand} secType={secType} onNext={() => go(4)} onBack={() => go(2)} />}
        {step === 4 && <VerifyStep onRestart={restart} />}
      </main>

      <footer className="app-footer">
        <p>SA WiFi Guard — built for non-technical South Africans. No data is collected or transmitted.</p>
        <p>
          <a href="https://github.com/sibusisombenenge/wifi-security-auditor" target="_blank" rel="noreferrer">GitHub</a>
          {' · '}
          <a href="/SECURITY.md" target="_blank" rel="noreferrer">Security policy</a>
        </p>
      </footer>
    </div>
  );
}
