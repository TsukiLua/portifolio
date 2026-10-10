import Link from "next/link";
import { buttonClasses, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[55vh] flex-col items-center justify-center py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-clay">Erro 404</p>
      <h1 className="mt-4 font-serif text-5xl">Esta página saiu da coleção</h1>
      <p className="mt-4 max-w-md text-stone">O endereço pode ter mudado ou a peça não está mais no catálogo.</p>
      <Link href="/catalogo" className={buttonClasses("solid", "mt-8")}>
        Ver catálogo
      </Link>
    </Container>
  );
}
