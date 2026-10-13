import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { featuredProject, otherProjects } from "@/data/projects";
import type { Project } from "@/types/project";
import { ProjectLinks, StatusTag } from "../projects/ProjectLinks";
import { BrowserFrame, PhoneFrame } from "../ui/frames";
import { Container, Em, Label, SectionHeading } from "../ui/primitives";

function FeaturedCard({ project }: { project: Project }) {
  const mobile = project.gallery.find((g) => g.device === "mobile");
  return (
    <article aria-labelledby={`projeto-${project.slug}`} className="grid gap-10 rounded-3xl border border-ink/10 bg-paper p-5 sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:p-10">
      <div className="relative order-last pb-6 lg:order-first lg:pb-0">
        <BrowserFrame image={project.gallery[0] ?? project.cover} label="estoque · filtros" sizes="(min-width: 1024px) 50vw, 90vw" className="w-[90%] sm:w-[85%]" />
        {mobile && <PhoneFrame image={mobile} sizes="(min-width: 1024px) 12vw, 28vw" className="absolute right-0 -bottom-2 w-[28%] sm:w-[24%]" />}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <Label>Destaque · {project.category}</Label>
          <StatusTag project={project} />
        </div>
        <h3 id={`projeto-${project.slug}`} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.name}
        </h3>
        <p className="mt-3 text-lg text-graphite">{project.summary}</p>
        <div className="mt-6 rounded-2xl bg-canvas p-4">
          <p className="font-mono text-[11px] text-mute uppercase">Problema</p>
          <p className="mt-1 text-sm leading-relaxed text-graphite">{project.problem}</p>
        </div>
        <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          {project.features.slice(0, 6).map((f) => (
            <li key={f} className="flex gap-2">
              <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {f}
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-xs text-mute">{project.technologies.join(" · ")}</p>
        <div className="mt-7 lg:mt-auto lg:pt-8">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article aria-labelledby={`projeto-${project.slug}`} className="group flex flex-col overflow-hidden rounded-3xl border border-ink/10 bg-paper">
      <Link href={`/projetos/${project.slug}`} tabIndex={-1} aria-hidden className="block overflow-hidden border-b border-ink/10 bg-canvas">
        <Image
          src={project.cover.src}
          alt=""
          placeholder="blur"
          sizes="(min-width: 768px) 45vw, 92vw"
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>{project.category}</Label>
          <StatusTag project={project} />
        </div>
        <h3 id={`projeto-${project.slug}`} className="mt-3 text-2xl font-semibold tracking-tight">
          {project.name}
        </h3>
        <p className="mt-2 text-graphite">{project.summary}</p>
        <p className="mt-4 text-sm leading-relaxed text-mute">
          <span className="font-medium text-graphite">Problema: </span>
          {project.problem}
        </p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Principais funcionalidades">
          {project.features.slice(0, 3).map((f) => (
            <li key={f} className="rounded-full bg-canvas px-3 py-1 text-xs text-graphite">
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          <ProjectLinks project={project} compact />
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projetos" aria-labelledby="projetos-titulo" className="scroll-mt-16 py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="projetos-titulo"
          label="01 — Projetos"
          title={
            <>
              Projetos pensados para <Em>problemas reais</Em> de pequenos negócios
            </>
          }
          intro="Todos os projetos abaixo são demonstrativos: foram criados para este portfólio, com marcas e dados fictícios, e funcionam de verdade. As imagens são capturas das próprias interfaces."
        />
        <div className="mt-12 space-y-6">
          <FeaturedCard project={featuredProject} />
          <div className="grid gap-6 md:grid-cols-2">
            {otherProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
