import { CalendarX2, LoaderCircle } from "lucide-react";
import { dateParts, formatDateLong, type ISODate } from "@demo/core/date";
import type { CalendarDay, ResourceSlot } from "@demo/core/scheduling";
import { getBarber } from "@/data/team";
import { RadioCard } from "./options";

interface Props {
  ready: boolean;
  days: CalendarDay[];
  date: ISODate | null;
  onDateChange: (date: ISODate) => void;
  slots: ResourceSlot[];
  time: string | null;
  onTimeChange: (time: string) => void;
  showBarber: boolean;
}

export function ScheduleStep({ ready, days, date, onDateChange, slots, time, onTimeChange, showBarber }: Props) {
  if (!ready) {
    return (
      <p className="flex items-center gap-3 text-ash" role="status">
        <LoaderCircle aria-hidden className="h-5 w-5 animate-spin" /> Carregando agenda…
      </p>
    );
  }

  const available = slots.filter((s) => s.available);
  const selected = slots.find((s) => s.time === time);

  return (
    <div className="space-y-10">
      <fieldset>
        <legend className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-ember">Data</legend>
        <div className="-mx-5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-0">
          <div className="flex gap-2">
            {days.map((day) => {
              const parts = dateParts(day.date);
              return (
                <RadioCard
                  key={day.date}
                  name="data"
                  value={day.date}
                  checked={date === day.date}
                  onChange={onDateChange}
                  disabled={!day.open}
                  className="w-[4.5rem] shrink-0 py-3 text-center"
                >
                  <span className="block text-xs uppercase text-ash">{parts.weekday}</span>
                  <span className="block font-display text-3xl font-bold leading-tight">{parts.day}</span>
                  <span className="block text-xs uppercase text-ash">{day.open ? parts.month : "Fechado"}</span>
                  <span className="sr-only">{formatDateLong(day.date)}</span>
                </RadioCard>
              );
            })}
          </div>
        </div>
      </fieldset>

      {date && (
        <fieldset>
          <legend className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-ember">Horário</legend>
          <p className="mb-4 text-sm text-ash first-letter:uppercase">
            {formatDateLong(date)} · {available.length} {available.length === 1 ? "horário livre" : "horários livres"}
          </p>
          {available.length === 0 ? (
            <div className="flex items-start gap-3 border border-dashed border-smoke p-6 text-ash" role="status">
              <CalendarX2 aria-hidden className="h-5 w-5 shrink-0 text-ember" />
              <p>Sem horários livres neste dia. Escolha outra data ou outro barbeiro.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {slots.map((slot) => (
                <RadioCard
                  key={slot.time}
                  name="horario"
                  value={slot.time}
                  checked={time === slot.time}
                  onChange={onTimeChange}
                  disabled={!slot.available}
                  className="py-3 text-center font-bold tabular-nums has-disabled:line-through"
                >
                  {slot.time}
                  {!slot.available && <span className="sr-only"> (indisponível)</span>}
                </RadioCard>
              ))}
            </div>
          )}
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ash">
            <span>Horários riscados estão ocupados ou muito próximos do horário atual.</span>
            <span>Agenda demonstrativa, gerada automaticamente.</span>
          </p>
          {selected?.available && showBarber && (
            <p className="mt-4 text-sm" role="status">
              Disponível com: <strong>{selected.resourceIds.map((id) => getBarber(id)?.name).join(", ")}</strong>
            </p>
          )}
        </fieldset>
      )}
    </div>
  );
}
