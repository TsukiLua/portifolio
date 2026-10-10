import Link from "next/link";
import { buttonClasses, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[55vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-serif text-lg text-clay italic">Página não encontrada</p>
      <h1 className="mt-3 font-serif text-5xl text-moss-dark">Este caminho não leva a lugar nenhum</h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonClasses("outline")}>Ir para o início</Link>
        <Link href="/agendar" className={buttonClasses("primary")}>Solicitar horário</Link>
      </div>
    </Container>
  );
}
