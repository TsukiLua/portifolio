import { Check } from "lucide-react";
import { formatBRL, formatDuration } from "@demo/core/format";
import { SERVICE_CATEGORIES, services } from "@/data/services";
import { RadioCard } from "./options";

export function ServiceStep({ value, onChange }: { value: string | null; onChange: (id: string) => void }) {
  return (
    <div className="space-y-10">
      {SERVICE_CATEGORIES.map((category) => (
        <fieldset key={category}>
          <legend className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ember">{category}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {services
              .filter((s) => s.category === category)
              .map((service) => (
                <RadioCard key={service.id} name="servico" value={service.id} checked={value === service.id} onChange={onChange} className="p-5">
                  <span className="flex items-start justify-between gap-4">
                    <span>
                      <span className="block font-bold">{service.name}</span>
                      <span className="mt-1 block text-sm text-ash">{formatDuration(service.durationMin)}</span>
                    </span>
                    <span className="font-display text-2xl font-bold">{formatBRL(service.price)}</span>
                  </span>
                  {value === service.id && (
                    <Check aria-hidden className="absolute -top-2.5 -right-2.5 h-6 w-6 rounded-full bg-ember p-1 text-coal" />
                  )}
                </RadioCard>
              ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
