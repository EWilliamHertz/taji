export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 120 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="0" 
        y="32" 
        fontFamily="sans-serif" 
        fontWeight="900" 
        fontSize="36" 
        fill="currentColor" 
        letterSpacing="-1"
      >
        TAJI
      </text>
      <circle cx="85" cy="32" r="6" fill="#FACC15" />
      <path d="M0 38 H100" stroke="#115740" strokeWidth="4" />
    </svg>
  );
}
