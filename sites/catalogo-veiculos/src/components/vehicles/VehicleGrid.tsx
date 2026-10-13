import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "./VehicleCard";

/** 1 coluna no celular, 2 no tablet e 3 em telas grandes (ou 2/3 quando há barra lateral). */
export function VehicleGrid({ vehicles, withSidebar = false, priorityCount = 0 }: { vehicles: Vehicle[]; withSidebar?: boolean; priorityCount?: number }) {
  return (
    <ul className={`grid gap-5 sm:grid-cols-2 ${withSidebar ? "xl:grid-cols-3" : "lg:grid-cols-3"}`}>
      {vehicles.map((v, i) => (
        <li key={v.id}>
          <VehicleCard vehicle={v} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
