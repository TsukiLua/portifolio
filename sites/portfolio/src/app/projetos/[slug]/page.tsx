import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { ProjectLinks, StatusTag } from "@/components/projects/ProjectLinks";
import { BrowserFrame, PhoneFrame } from "@/components/ui/frames";
import { buttonClasses, Container, Label } from "@/components/ui/primitives";
import { getProject, projects } from "@/data/projects";
import { projectMessage, whatsappLink } from "@/lib/contact";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Projeto não encontrado" };
  const title = `${project.name} — ${project.category}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: { title, description: project.summary, images: [{ url: project.cover.src.src, alt: project.cover.alt }] },
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title} className="grid gap-3 border-t border-ink/10 py-8 md:grid-cols-[14rem_1fr] md:gap-10">
      <h2 className="font-mono text-xs tracking-wider text-mute uppercase">{title}</h2>
      <div className="text-lg leading-relaxed text-graphite">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;
  const desktops = [project.cover, ...project.gallery.filter((g) => g.device === "desktop")];
  const mobiles = project.gallery.filter((g) => g.device === "mobile");

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <Link href="/#projetos" className="inline-flex min-h-10 items-center gap-1.5 text-sm text-mute hover:text-ink">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Todos os projetos
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Label>{project.category}</Label>
          <StatusTag project={project} />
        </div>
        <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">{project.name}</h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-graphite">{project.summary}</p>
        {project.status === "demonstrativo" && (
          <p className="mt-4 max-w-2xl rounded-xl bg-accent-soft p-4 text-sm text-accent-dark">
            Projeto demonstrativo criado para este portfólio: marca, conteúdo e dados são fictícios e não houve cliente
            contratante. Por isso não há métricas de resultado — a página descreve o objetivo e o que foi construído.
          </p>
        )}
        <div className="mt-8">
          <ProjectLinks project={project} />
        </div>
      </Container>

      <Container className="mt-12">
        <BrowserFrame image={project.cover} label={project.cover.caption} priority sizes="(min-width: 1152px) 1088px, 94vw" />
      </Container>

      <Container className="mt-14">
        <Block title="Visão geral">
          <p>{project.solution}</p>
        </Block>
        <Block title="Objetivo">
          <p>{project.objective}</p>
        </Block>
        <Block title="Público-alvo">
          <p>{project.audience}</p>
        </Block>
        <Block title="Problema">
          <p>{project.problem}</p>
        </Block>
        <Block title="Funcionalidades">
          <ul className="grid gap-2 text-base sm:grid-cols-2">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2">
                <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-accent" /> {f}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Decisões de UX/UI">
          <ul className="space-y-3 text-base">
            {project.uxDecisions.map((d) => (
              <li key={d} className="flex gap-2">
                <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {d}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Tecnologias">
          <ul className="flex flex-wrap gap-2 text-sm">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-full border border-ink/15 bg-paper px-3 py-1 font-mono">
                {t}
              </li>
            ))}
          </ul>
        </Block>
      </Container>

      <section aria-labelledby="capturas" className="mt-10 border-y border-ink/10 bg-paper py-16">
        <Container>
          <h2 id="capturas" className="text-3xl font-semibold tracking-tight">Capturas de tela</h2>
          <p className="mt-2 text-mute">Imagens reais do projeto em execução.</p>
          <div className={`mt-10 grid gap-8 ${mobiles.length ? "lg:grid-cols-[1fr_16rem]" : ""}`}>
            <div className="grid gap-8 md:grid-cols-2">
              {desktops.slice(1).map((img) => (
                <div key={img.caption}>
                  <BrowserFrame image={img} label={img.caption} sizes="(min-width: 768px) 40vw, 94vw" />
                  <p className="mt-3 text-sm text-mute">{img.caption}</p>
                </div>
              ))}
            </div>
            {mobiles.map((img) => (
              <div key={img.caption} className="mx-auto w-56 lg:w-full">
                <PhoneFrame image={img} sizes="16rem" />
                <p className="mt-3 text-center text-sm text-mute">{img.caption}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-white sm:p-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Quer algo parecido para o seu negócio?</h2>
            <p className="mt-2 text-white/70">Conte como funciona hoje e o que você precisa. A conversa inicial é sem compromisso.</p>
          </div>
          <a href={whatsappLink(projectMessage(project.name))} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "shrink-0")}>
            <MessageCircle aria-hidden className="h-4 w-4" /> Solicitar projeto semelhante
          </a>
        </div>
        <nav aria-label="Outros projetos" className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link href={`/projetos/${prev.slug}`} className="group rounded-2xl border border-ink/10 bg-paper p-5 hover:border-ink/30">
            <span className="flex items-center gap-1.5 font-mono text-xs text-mute">
              <ArrowLeft aria-hidden className="h-3.5 w-3.5" /> Anterior
            </span>
            <span className="mt-1 block text-lg font-semibold group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link href={`/projetos/${next.slug}`} className="group rounded-2xl border border-ink/10 bg-paper p-5 text-right hover:border-ink/30">
            <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-mute">
              Próximo <ArrowRight aria-hidden className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 block text-lg font-semibold group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
