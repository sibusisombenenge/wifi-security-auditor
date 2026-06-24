import { useEffect, useRef } from 'react';

const THREATS = [
  { label: 'KRACK',  pct: 0.08, delay: 0.5,  dist: 210, dur: 1.0  },
  { label: 'MITM',   pct: 0.22, delay: 0.85, dist: 200, dur: 0.95 },
  { label: 'PMKID',  pct: 0.38, delay: 1.25, dist: 215, dur: 1.05 },
  { label: 'TKIP',   pct: 0.55, delay: 0.65, dist: 205, dur: 0.9  },
  { label: 'DEAUTH', pct: 0.70, delay: 1.65, dist: 210, dur: 1.0  },
  { label: '0DAY',   pct: 0.88, delay: 1.1,  dist: 200, dur: 0.88 },
];

const FRAG_COLORS = ['#f39c12', '#5dade2', '#ffffff', '#aed6f1', '#f9e79f'];

const STATUSES = [
  [0.3,  'Detecting threats'],
  [0.85, 'KRACK attack incoming'],
  [1.25, 'PMKID probe detected'],
  [1.65, 'Deauth flood incoming'],
  [2.2,  'Analysing traffic'],
  [2.75, 'Hardening encryption'],
];

export default function LoadingScreen({ onDone }) {
  const stageRef = useRef(null);
  const timersRef = useRef([]);
  const dotsRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const statusLine = stage.querySelector('#statusLine');
    const endWrap = stage.querySelector('#endWrap');
    const topArc = stage.querySelector('#topArcStroke');
    const arcText = stage.querySelector('#arcText');

    function animateDots(baseText) {
      let count = 0;
      if (dotsRef.current) clearInterval(dotsRef.current);
      dotsRef.current = setInterval(() => {
        count = (count % 3) + 1;
        statusLine.textContent = baseText + '.'.repeat(count);
      }, 380);
    }

    function stopDots() {
      if (dotsRef.current) { clearInterval(dotsRef.current); dotsRef.current = null; }
    }

    function spawnFragments(x, y) {
      for (let i = 0; i < 12; i++) {
        const f = document.createElement('div');
        f.style.cssText = `position:absolute;border-radius:1px;animation:fragOut 0.65s linear forwards;z-index:6;pointer-events:none;`;
        const size = 2 + Math.random() * 6;
        const angle = Math.random() * Math.PI * 2;
        const dist = 12 + Math.random() * 45;
        const fx = Math.cos(angle) * dist;
        const fy = Math.sin(angle) * dist;
        const fr = (Math.random() - 0.5) * 400;
        f.style.left = x + 'px';
        f.style.top = y + 'px';
        f.style.width = size + 'px';
        f.style.height = size + 'px';
        f.style.background = FRAG_COLORS[Math.floor(Math.random() * FRAG_COLORS.length)];
        f.style.setProperty('--fx', fx + 'px');
        f.style.setProperty('--fy', fy + 'px');
        f.style.setProperty('--fr', fr + 'deg');
        stage.appendChild(f);
        setTimeout(() => f.remove(), 750);
      }
    }

    THREATS.forEach(t => {
      const x = Math.floor(t.pct * window.innerWidth);
      const el = document.createElement('div');
      el.style.cssText = `position:absolute;top:-30px;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:0.1em;color:rgba(255,80,80,0.92);z-index:5;pointer-events:none;`;
      el.style.left = x + 'px';
      el.style.setProperty('--dist', t.dist + 'px');
      el.style.animation = `fall ${t.dur}s linear ${t.delay}s forwards`;
      el.textContent = t.label;
      stage.appendChild(el);
      const impactTime = (t.delay + t.dur * 0.74) * 1000;
      const tid = setTimeout(() => spawnFragments(x + 20, -30 + t.dist), impactTime);
      timersRef.current.push(tid);
    });

    STATUSES.forEach(([delay, msg]) => {
      const tid = setTimeout(() => animateDots(msg), delay * 1000);
      timersRef.current.push(tid);
    });

    const sealTid = setTimeout(() => {
      topArc.setAttribute('stroke', '#ffffff');
      setTimeout(() => {
        arcText.style.opacity = '1';
      }, 400);
    }, 3100);
    timersRef.current.push(sealTid);

    const doneTid = setTimeout(() => {
      stopDots();
      statusLine.textContent = '';
      endWrap.style.opacity = '1';
      setTimeout(() => { if (onDone) onDone(); }, 1200);
    }, 3700);
    timersRef.current.push(doneTid);

    return () => {
      stopDots();
      timersRef.current.forEach(clearTimeout);
    };
  }, [onDone]);

  return (
    <div ref={stageRef} style={{
      background: '#0a1628',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        @keyframes fall {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          74%  { transform: translateY(var(--dist)) scale(1); opacity: 1; }
          82%  { transform: translateY(var(--dist)) scale(1.25); opacity: 1; }
          100% { transform: translateY(var(--dist)) scale(0); opacity: 0; }
        }
        @keyframes fragOut {
          0%   { transform: translate(0,0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--fx),var(--fy)) rotate(var(--fr)); opacity: 0; }
        }
      `}</style>

      <svg width="200" height="175" viewBox="0 0 200 175" fill="none" aria-hidden="true">
        <defs>
          <path id="arcPath" d="M10 92 Q100 10 190 92"/>
        </defs>
        <path
          id="topArcStroke"
          d="M10 92 Q100 10 190 92"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          style={{ transition: 'stroke 0.6s' }}
        />
        <text
          id="arcText"
          fontFamily="IBM Plex Sans, sans-serif"
          fontSize="10.5"
          fontWeight="700"
          letterSpacing="4"
          fill="#0a1628"
          style={{ opacity: 0, transition: 'opacity 0.8s' }}
        >
          <textPath href="#arcPath" startOffset="50%" textAnchor="middle">
            SA WIFI GUARD
          </textPath>
        </text>
        <path d="M36 114 Q100 54 164 114" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none"/>
        <path d="M63 136 Q100 108 137 136" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none"/>
        <circle cx="100" cy="158" r="10" fill="#ffffff"/>
      </svg>

      <p id="statusLine" style={{
        color: 'rgba(255,255,255,0.35)',
        fontSize: '10px',
        fontWeight: 500,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginTop: '1.5rem',
        fontFamily: "'IBM Plex Mono', monospace",
        minHeight: '15px',
      }}>&nbsp;</p>

      <div id="endWrap" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        marginTop: '1.5rem',
        opacity: 0,
        transition: 'opacity 0.6s',
      }}>
        <p style={{
          color: '#ffffff',
          fontSize: '22px',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          margin: 0,
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>WIFI GUARDED</p>
        <p style={{
          color: '#4ade80',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          margin: 0,
          fontFamily: "'IBM Plex Mono', monospace",
        }}>All threats neutralised</p>
      </div>
    </div>
  );
}