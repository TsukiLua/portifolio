import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Clock, MapPin, Phone } from "lucide-react";
import { InterestForm } from "@/components/forms/InterestForm";
import { Container } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/vehicles/StatusBadge";
import { VehicleContactActions } from "@/components/vehicles/VehicleContactActions";
import { VehicleGallery } from "@/components/vehicles/VehicleGallery";
import { VehicleGrid } from "@/components/vehicles/VehicleGrid";
import { VehicleSpecs } from "@/components/vehicles/VehicleSpecs";
import { dealership, fullAddress, openingSummary } from "@/data/dealership";
import { getVehicleBySlug, vehicles } from "@/data/vehicles";
import { siteUrl } from "@/lib/config";
import { FUEL_LABELS, TRANSMISSION_LABELS, formatKm, formatPrice, formatYear, vehicleFullName } from "@/lib/formatters";
import { relatedVehicles } from "@/lib/vehicle-filters";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = getVehicleBySlug((await params).slug);
  if (!vehicle) return { title: "Veículo não encontrado" };
  const title = `${vehicleFullName(vehicle)} ${formatYear(vehicle)}`;
  const description = `${title}, ${formatKm(vehicle.mileageKm)}, ${TRANSMISSION_LABELS[vehicle.transmission].toLowerCase()}, ${FUEL_LABELS[vehicle.fuel].toLowerCase()}. ${formatPrice(vehicle.price)} na ${dealership.name}.`;
  return {
    title,
    description,
    alternates: { canonical: `/veiculos/${vehicle.slug}` },
    openGraph: { title, description, images: [{ url: vehicle.images[0].src.src, alt: vehicle.images[0].alt }] },
  };
}

const AVAILABILITY = { available: "https://schema.org/InStock", reserved: "https://schema.org/LimitedAvailability", sold: "https://schema.org/SoldOut" } as const;

export default async function VehiclePage({ params }: Props) {
  const vehicle = getVehicleBySlug((await params).slug);
  if (!vehicle) notFound();
  const name = vehicleFullName(vehicle);
  const related = relatedVehicles(vehicles, vehicle);

  // Dados estruturados coerentes com o que a página mostra (anúncio de veículo com oferta).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": vehicle.category === "motorcycle" ? "Motorcycle" : "Car",
    name,
    brand: { "@type": "Brand", name: vehicle.brand },
    model: vehicle.model,
    vehicleConfiguration: vehicle.version,
    productionDate: String(vehicle.year),
    vehicleModelDate: String(vehicle.modelYear ?? vehicle.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: vehicle.mileageKm, unitCode: "KMT" },
    color: vehicle.color,
    fuelType: FUEL_LABELS[vehicle.fuel],
    vehicleTransmission: TRANSMISSION_LABELS[vehicle.transmission],
    itemCondition: "https://schema.org/UsedCondition",
    sku: vehicle.id,
    image: vehicle.images.map((i) => `${siteUrl}${i.src.src}`),
    url: `${siteUrl}/veiculos/${vehicle.slug}`,
    offers: { "@type": "Offer", price: vehicle.price, priceCurrency: "BRL", availability: AVAILABILITY[vehicle.status] },
  };

  return (
    <Container className="pt-6 sm:pt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <nav aria-label="Trilha de navegação" className="text-sm text-steel">
        <ol className="flex flex-wrap items-center gap-1.5">
          {[
            { href: "/", label: "Início" },
            { href: "/estoque", label: "Estoque" },
            { href: `/estoque?marca=${encodeURIComponent(vehicle.brand)}`, label: vehicle.brand },
          ].map((c) => (
            <li key={c.href} className="flex items-center gap-1.5">
              <Link href={c.href} className="hover:text-ink">
                {c.label}
              </Link>
              <ChevronRight aria-hidden className="h-3.5 w-3.5" />
            </li>
          ))}
          <li aria-current="page" className="font-medium text-ink">
            {vehicle.model}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,1fr)] lg:gap-10">
        <div className="min-w-0">
          <VehicleGallery images={vehicle.images} title={name} />
        </div>

        <aside aria-labelledby="titulo-veiculo" className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold tracking-wider text-steel uppercase">{vehicle.brand}</p>
              <StatusBadge status={vehicle.status} showAvailable />
            </div>
            <h1 id="titulo-veiculo" className="font-display mt-1 text-3xl leading-tight font-extrabold">
              {vehicle.model} <span className="font-semibold text-steel">{vehicle.version}</span>
            </h1>
            <p className="mt-2 text-sm text-steel">
              {formatYear(vehicle)} · {formatKm(vehicle.mileageKm)} · {TRANSMISSION_LABELS[vehicle.transmission]} · {FUEL_LABELS[vehicle.fuel]}
            </p>
            <p className="mt-5 text-sm text-steel">{vehicle.status === "sold" ? "Vendido por" : "Preço"}</p>
            <p className={`font-display text-4xl font-extrabold ${vehicle.status === "sold" ? "text-steel line-through" : "text-wine"}`}>{formatPrice(vehicle.price)}</p>
            <p className="mt-1 text-xs text-steel">Ref. {vehicle.id} · Valor demonstrativo. Financiamento sujeito à análise de crédito.</p>
            <div className="mt-6">
              <VehicleContactActions vehicle={vehicle} />
            </div>
          </div>
          <div className="mt-4 space-y-2 rounded-xl border border-line bg-surface p-5 text-sm text-steel">
            <p className="font-semibold text-ink">{dealership.name}</p>
            <p className="flex gap-2"><MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" /> {fullAddress}</p>
            <p className="flex gap-2"><Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0" /> {openingSummary}</p>
            <p className="flex gap-2"><Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0" /> <a href={dealership.phoneHref} className="hover:text-ink">{dealership.phoneDisplay}</a> (fictício)</p>
          </div>
        </aside>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,1fr)] lg:gap-10">
        <div className="min-w-0 space-y-12">
          <section aria-labelledby="descricao">
            <h2 id="descricao" className="font-display text-2xl font-bold">Sobre este veículo</h2>
            <p className="mt-3 leading-relaxed text-graphite">{vehicle.description}</p>
            <h3 className="mt-6 font-semibold">Itens e equipamentos</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {vehicle.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wine" />
                  {f}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-steel">Anúncio demonstrativo: confirme itens, histórico e condições com o consultor antes da compra.</p>
          </section>
          <section aria-labelledby="ficha">
            <h2 id="ficha" className="font-display mb-4 text-2xl font-bold">Ficha do veículo</h2>
            <VehicleSpecs vehicle={vehicle} />
          </section>
        </div>
        {vehicle.status === "available" && (
          <section id="agendar-visita" aria-labelledby="agendar-titulo" className="scroll-mt-24">
            <h2 id="agendar-titulo" className="font-display text-2xl font-bold">Fale sobre este carro</h2>
            <p className="mt-2 mb-4 text-sm text-steel">Peça informações ou sugira uma data para ver o veículo pessoalmente.</p>
            <InterestForm slug={vehicle.slug} />
          </section>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="relacionados" className="mt-16">
          <h2 id="relacionados" className="font-display mb-6 text-2xl font-bold">Veículos semelhantes</h2>
          <VehicleGrid vehicles={related} />
        </section>
      )}
    </Container>
  );
}
