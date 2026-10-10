export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="font-serif text-3xl tracking-[0.22em] sm:text-4xl">MARÉ</span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.42em] text-stone">moda natural</span>
    </span>
  );
}

export function DemoBar() {
  return (
    <p className="bg-ink px-5 py-2 text-center text-[11px] tracking-[0.08em] text-shell/85">
      Catálogo de demonstração · marca, produtos e preços fictícios · pedidos são combinados pelo WhatsApp
    </p>
  );
}
