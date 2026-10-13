import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";
import { buttonClasses } from "../ui/primitives";

/** "Ver projeto" (estudo de caso) sempre; "Abrir demonstração" só quando há URL configurada. */
export function ProjectLinks({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href={`/projetos/${project.slug}`} className={buttonClasses("dark", compact ? "min-h-11 px-5 text-sm" : "")}>
        Ver projeto <span className="sr-only">{project.name}</span>
        <ArrowRight aria-hidden className="h-4 w-4" />
      </Link>
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("outline", compact ? "min-h-11 px-5 text-sm" : "")}>
          Abrir demonstração <span className="sr-only">de {project.name} (nova aba)</span>
          <ExternalLink aria-hidden className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

export function StatusTag({ project }: { project: Project }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper px-2.5 py-1 font-mono text-[11px] text-mute">
      <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${project.status === "cliente" ? "bg-ok" : "bg-accent"}`} />
      {project.status === "cliente" ? "Projeto para cliente" : "Projeto demonstrativo"}
    </span>
  );
}
