import Link from "next/link";
import { buttonClasses, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-display text-8xl font-extrabold text-ember">404</p>
      <h1 className="mt-4 font-display text-4xl font-bold uppercase">Página não encontrada</h1>
      <p className="mt-3 text-ash">O endereço pode ter mudado. Que tal voltar ao início ou marcar seu horário?</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonClasses("outline")}>
          Ir para o início
        </Link>
        <Link href="/agendar" className={buttonClasses("primary")}>
          Agendar horário
        </Link>
      </div>
    </Container>
  );
}
