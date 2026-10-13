import type { Vehicle } from "@/types/vehicle";
import { CATEGORY_LABELS, FUEL_LABELS, TRANSMISSION_LABELS, formatKm } from "@/lib/formatters";

/** Ficha técnica: só exibe campos disponíveis (nada inventado para preencher lacunas). */
export function VehicleSpecs({ vehicle }: { vehicle: Vehicle }) {
  const rows: [string, string | undefined][] = [
    ["Marca", vehicle.brand],
    ["Modelo", vehicle.model],
    ["Versão", vehicle.version],
    ["Ano de fabricação", String(vehicle.year)],
    ["Ano do modelo", String(vehicle.modelYear ?? vehicle.year)],
    ["Quilometragem", formatKm(vehicle.mileageKm)],
    ["Combustível", FUEL_LABELS[vehicle.fuel]],
    ["Câmbio", TRANSMISSION_LABELS[vehicle.transmission]],
    ["Cor", vehicle.color],
    ["Carroceria / tipo", CATEGORY_LABELS[vehicle.category].singular],
    ["Portas", vehicle.doors ? String(vehicle.doors) : undefined],
    ["Passageiros", vehicle.passengers ? String(vehicle.passengers) : undefined],
    ["Condição", vehicle.condition === "used" ? "Seminovo" : "Zero km"],
    ["Referência", vehicle.id],
  ];
  return (
    <dl className="grid overflow-hidden rounded-xl border border-line bg-surface sm:grid-cols-2">
      {rows
        .filter((row): row is [string, string] => !!row[1])
        .map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-line px-4 py-3 text-sm sm:odd:border-r">
            <dt className="text-steel">{label}</dt>
            <dd className="text-right font-semibold">{value}</dd>
          </div>
        ))}
    </dl>
  );
}
