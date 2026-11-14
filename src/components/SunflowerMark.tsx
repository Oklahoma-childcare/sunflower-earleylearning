export function SunflowerMark({ size = 42, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <g fill="#E9B848">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx="50" cy="22" rx="11" ry="20" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="21" fill="#633D25" />
      <circle cx="45" cy="44" r="2" fill="#AD7952" />
      <circle cx="55" cy="52" r="2" fill="#AD7952" />
      <circle cx="44" cy="57" r="2" fill="#AD7952" />
      <circle cx="58" cy="42" r="2" fill="#AD7952" />
    </svg>
  );
}
