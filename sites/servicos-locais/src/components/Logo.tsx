export function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5">
      <svg aria-hidden viewBox="0 0 36 36" className="h-8 w-8 sm:h-9 sm:w-9">
        <rect width="36" height="36" rx="10" fill="var(--color-brand)" />
        <path d="M8 17.5 18 9l10 8.5V27a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-9.5Z" fill="#fff" />
        <path d="m13.5 19.5 3.2 3.2 6-6.2" fill="none" stroke="var(--color-brand)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`whitespace-nowrap text-lg font-extrabold sm:text-xl tracking-tight ${invert ? "text-white" : "text-ink"}`}>
        Casa <span className={invert ? "text-sun" : "text-brand"}>em Dia</span>
      </span>
    </span>
  );
}
