import Link from "next/link";
import { buttonClasses, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Página não encontrada</h1>
      <p className="mt-3 text-muted">Este endereço não existe, mas o seu orçamento pode começar agora.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonClasses("outline")}>
          Ir para o início
        </Link>
        <Link href="/#orcamento" className={buttonClasses("primary")}>
          Pedir orçamento
        </Link>
      </div>
    </Container>
  );
}
