import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/primitives";
import { InventoryExplorer } from "@/components/vehicles/InventoryExplorer";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { vehicles } from "@/data/vehicles";
import { sortVehicles } from "@/lib/vehicle-filters";

export const metadata: Metadata = {
  title: "Estoque de seminovos",
  description: "Hatches, SUVs, sedãs, picapes e esportivos. Filtre por marca, preço, ano, quilometragem, câmbio e combustível.",
  alternates: { canonical: "/estoque" },
};

/** HTML estático com todo o estoque, exibido antes da hidratação (e sem JavaScript). */
function StaticInventory() {
  return (
    <div>
      <div className="border-b border-line pb-8">
        <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Nosso estoque</h1>
        <p className="mt-3 font-semibold">{vehicles.length} veículos</p>
      </div>
      <div className="mt-8 lg:ml-[19rem]">
        <VehicleGrid vehicles={sortVehicles(vehicles, "relevancia")} withSidebar priorityCount={3} />
      </div>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <Container className="pt-10 sm:pt-14">
      <Suspense fallback={<StaticInventory />}>
        <InventoryExplorer />
      </Suspense>
    </Container>
  );
}
