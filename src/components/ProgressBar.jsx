export default function ProgressBar({ current, total }) {
  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`progress-segment ${i < current ? 'done' : i === current ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}
