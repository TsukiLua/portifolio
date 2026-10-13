import Link from "next/link";
import { CarFront } from "lucide-react";
import { buttonClasses, Container } from "@/components/ui/primitives";

export default function VehicleNotFound() {
  return (
    <Container className="flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
      <CarFront aria-hidden className="h-12 w-12 text-steel" />
      <h1 className="font-display mt-4 text-3xl font-extrabold">Veículo não encontrado</h1>
      <p className="mt-3 max-w-md text-steel">O anúncio pode ter sido removido ou o endereço está incorreto. Veja os carros disponíveis no estoque.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/estoque" className={buttonClasses("primary")}>Ver estoque</Link>
        <Link href="/contato" className={buttonClasses("outline")}>Falar com a loja</Link>
      </div>
    </Container>
  );
}
