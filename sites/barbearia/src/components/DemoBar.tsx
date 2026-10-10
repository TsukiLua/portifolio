import { Info } from "lucide-react";

export function DemoBar() {
  return (
    <div className="border-b border-smoke bg-char text-ash">
      <p className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-5 py-1.5 text-center text-[11px] tracking-wide sm:text-xs">
        <Info aria-hidden className="h-3.5 w-3.5 shrink-0 text-ember" />
        Site de demonstração · marca, equipe, preços e avaliações são fictícios
      </p>
    </div>
  );
}
