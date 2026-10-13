import Link from "next/link";
import { buttonClasses, Container, Label } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[55vh] flex-col items-start justify-center py-20">
      <Label>Erro 404</Label>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Página não encontrada</h1>
      <p className="mt-4 max-w-md text-mute">O endereço pode estar incorreto. Volte ao início ou veja os projetos.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClasses("dark")}>Ir para o início</Link>
        <Link href="/#projetos" className={buttonClasses("outline")}>Ver projetos</Link>
      </div>
    </Container>
  );
}
