export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg aria-hidden viewBox="0 0 32 32" className="h-8 w-8" fill="none">
        <rect x="1" y="1" width="30" height="30" stroke="currentColor" strokeWidth="2" />
        <path d="M16 6c1.5 4 6 6.5 6 11.5a6 6 0 0 1-12 0c0-2.6 1.4-4.1 2.6-5.3.3 1.6 1 2.6 2 3.1C14.2 12 14.8 9 16 6Z" fill="var(--color-ember)" />
      </svg>
      <span className="font-display text-2xl font-extrabold uppercase tracking-[0.08em]">Brasa</span>
    </span>
  );
}
