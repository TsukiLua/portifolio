import Link from "next/link";
import { Calendar, Fuel, Gauge, Settings2 } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { FUEL_LABELS, TRANSMISSION_SHORT, formatKm, formatPrice, formatYear, vehicleFullName } from "@/lib/formatters";
import { vehicleWhatsAppLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../ui/icons";
import { buttonClasses } from "../ui/primitives";
import { FeaturedBadge, StatusBadge } from "./StatusBadge";
import { VehicleImage } from "./VehicleImage";

export function VehicleCard({ vehicle, priority, headingLevel = "h3" }: { vehicle: Vehicle; priority?: boolean; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const sold = vehicle.status === "sold";
  const specs = [
    { icon: Calendar, label: "Ano", value: formatYear(vehicle) },
    { icon: Gauge, label: "Quilometragem", value: formatKm(vehicle.mileageKm) },
    { icon: Settings2, label: "Câmbio", value: TRANSMISSION_SHORT[vehicle.transmission] },
    { icon: Fuel, label: "Combustível", value: FUEL_LABELS[vehicle.fuel] },
  ];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-shadow duration-200 hover:shadow-lg hover:shadow-ink/5">
      <div className="relative overflow-hidden bg-line">
        <VehicleImage
          image={vehicle.images[0]}
          priority={priority}
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          className={`aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${sold ? "opacity-70 grayscale" : ""}`}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {vehicle.featured && !sold && <FeaturedBadge />}
          <StatusBadge status={vehicle.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold tracking-wider text-steel uppercase">{vehicle.brand}</p>
        <Heading className="mt-1 text-lg leading-snug font-bold">
          <Link href={`/veiculos/${vehicle.slug}`} className="after:absolute after:inset-0 hover:text-wine">
            {vehicle.model} <span className="font-medium text-steel">{vehicle.version}</span>
          </Link>
        </Heading>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          {specs.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2 text-graphite">
              <Icon aria-hidden className="h-4 w-4 shrink-0 text-steel" />
              <dt className="sr-only">{label}</dt>
              <dd className="truncate">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto pt-5">
          <p className="text-xs text-steel">{sold ? "Vendido por" : "Preço"}</p>
          <p className={`font-display text-2xl font-bold ${sold ? "text-steel line-through" : ""}`}>{formatPrice(vehicle.price)}</p>
          <div className="relative z-10 mt-4 flex gap-2">
            <Link href={`/veiculos/${vehicle.slug}`} className={buttonClasses("dark", "min-h-11 flex-1")} tabIndex={-1} aria-hidden>
              Ver detalhes
            </Link>
            <a
              href={vehicleWhatsAppLink(vehicle)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Conversar sobre ${vehicleFullName(vehicle)} no WhatsApp (abre em nova aba)`}
              className={buttonClasses("outline", "min-h-11 px-3")}
            >
              <WhatsAppIcon className="h-5 w-5 text-[#1a7f4b]" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
