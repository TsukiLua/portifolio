import Link from "next/link";
import { buttonClasses, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-7xl font-extrabold text-wine">404</p>
      <h1 className="font-display mt-2 text-3xl font-extrabold">Página não encontrada</h1>
      <p className="mt-3 max-w-md text-steel">Esse caminho não existe. Que tal voltar para o estoque?</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/estoque" className={buttonClasses("primary")}>Ver estoque</Link>
        <Link href="/" className={buttonClasses("outline")}>Ir para o início</Link>
      </div>
    </Container>
  );
}
