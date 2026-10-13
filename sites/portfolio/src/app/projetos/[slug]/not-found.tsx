import Link from "next/link";
import { buttonClasses, Container, Label } from "@/components/ui/primitives";

export default function ProjectNotFound() {
  return (
    <Container className="flex min-h-[55vh] flex-col items-start justify-center py-20">
      <Label>Erro 404</Label>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Projeto não encontrado</h1>
      <p className="mt-4 max-w-md text-mute">Esse projeto não existe ou mudou de endereço. Veja os projetos disponíveis no portfólio.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/#projetos" className={buttonClasses("dark")}>Ver projetos</Link>
        <Link href="/#contato" className={buttonClasses("outline")}>Falar comigo</Link>
      </div>
    </Container>
  );
}
