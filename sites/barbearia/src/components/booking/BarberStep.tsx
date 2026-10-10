import Image from "next/image";
import { Shuffle } from "lucide-react";
import type { Barber } from "@/data/team";
import { ANY_BARBER } from "@/lib/booking";
import { RadioCard } from "./options";

export function BarberStep({
  barbers,
  value,
  onChange,
}: {
  barbers: Barber[];
  value: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Escolha o barbeiro</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        <RadioCard name="barbeiro" value={ANY_BARBER} checked={value === ANY_BARBER} onChange={onChange} className="flex items-center gap-4 p-4 sm:col-span-2">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center bg-smoke text-ember">
            <Shuffle aria-hidden className="h-6 w-6" />
          </span>
          <span>
            <span className="block font-bold">Sem preferência</span>
            <span className="text-sm text-ash">Mostramos todos os horários livres e indicamos o barbeiro disponível.</span>
          </span>
        </RadioCard>
        {barbers.map((barber) => (
          <RadioCard key={barber.id} name="barbeiro" value={barber.id} checked={value === barber.id} onChange={onChange} className="flex items-center gap-4 p-4">
            <Image src={barber.photo} alt="" sizes="64px" className="h-16 w-16 shrink-0 object-cover" />
            <span>
              <span className="block font-bold">{barber.name}</span>
              <span className="text-sm text-ash">{barber.role}</span>
            </span>
          </RadioCard>
        ))}
      </div>
    </fieldset>
  );
}
