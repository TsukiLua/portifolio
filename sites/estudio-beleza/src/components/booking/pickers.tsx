import Image from "next/image";
import { Check, Sparkles, Sun, Sunset } from "lucide-react";
import { dateParts, formatDateLong, parseISODate, type ISODate } from "@demo/core/date";
import { formatBRL, formatDuration } from "@demo/core/format";
import type { ResourceSlot } from "@demo/core/scheduling";
import type { Professional } from "@/data/team";
import { TREATMENT_CATEGORIES, treatments } from "@/data/treatments";
import { ANY_PRO, isMorning, isSelectableDay, type CalendarCell } from "@/lib/booking";

const chip =
  "cursor-pointer rounded-2xl border border-linen bg-white/70 transition-colors hover:border-sage has-checked:border-moss has-checked:bg-sage-soft has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-moss has-disabled:cursor-not-allowed has-disabled:bg-transparent has-disabled:text-mute/50 has-disabled:hover:border-linen";

export function TreatmentPicker({ selected, onToggle, limitReached }: { selected: string[]; onToggle: (id: string) => void; limitReached: boolean }) {
  return (
    <div className="space-y-8">
      {TREATMENT_CATEGORIES.map((cat) => (
        <fieldset key={cat.id}>
          <legend className="mb-3 font-serif text-xl text-moss-dark">{cat.id}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {treatments
              .filter((t) => t.category === cat.id)
              .map((t) => {
                const checked = selected.includes(t.id);
                return (
                  <label key={t.id} className={`${chip} flex items-start gap-3 p-4`}>
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={!checked && limitReached}
                      onChange={() => onToggle(t.id)}
                      className="sr-only"
                    />
                    <span aria-hidden className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${checked ? "border-moss bg-moss text-cream" : "border-mute/40"}`}>
                      {checked && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold">{t.name}</span>
                      <span className="text-sm text-mute">
                        {formatDuration(t.durationMin)} · {t.priceFrom ? "a partir de " : ""}
                        {formatBRL(t.price)}
                      </span>
                    </span>
                  </label>
                );
              })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export function ProPicker({ pros, value, onChange }: { pros: Professional[]; value: string | null; onChange: (id: string) => void }) {
  return (
    <fieldset>
      <legend className="sr-only">Profissional</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {pros.length > 1 && (
          <label className={`${chip} flex items-center gap-4 p-4 sm:col-span-2`}>
            <input type="radio" name="profissional" checked={value === ANY_PRO} onChange={() => onChange(ANY_PRO)} className="sr-only" />
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sage-soft text-moss">
              <Sparkles aria-hidden className="h-6 w-6" />
            </span>
            <span>
              <span className="block font-semibold">Sem preferência</span>
              <span className="text-sm text-mute">Mais horários: indicamos quem estiver livre.</span>
            </span>
          </label>
        )}
        {pros.map((p) => (
          <label key={p.id} className={`${chip} flex items-center gap-4 p-4`}>
            <input type="radio" name="profissional" checked={value === p.id} onChange={() => onChange(p.id)} className="sr-only" />
            <Image src={p.photo} alt="" sizes="56px" className="h-14 w-14 shrink-0 rounded-full object-cover" />
            <span>
              <span className="block font-semibold">{p.name}</span>
              <span className="text-sm text-mute">{p.role}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const WEEK_HEADER = ["D", "S", "T", "Q", "Q", "S", "S"];
const WEEK_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export function CalendarPicker({ weeks, value, onChange }: { weeks: CalendarCell[][]; value: ISODate | null; onChange: (d: ISODate) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 font-semibold">Data</legend>
      <div role="presentation" className="grid grid-cols-7 gap-1.5 text-center text-xs text-mute">
        {WEEK_HEADER.map((d, i) => (
          <span key={i} aria-hidden className="py-1">
            {d}
          </span>
        ))}
        {weeks.flat().map((cell) => {
          const parts = dateParts(cell.date);
          const enabled = isSelectableDay(cell);
          const showMonth = parts.day === "1" || cell === weeks[0]?.[0];
          return (
            <label
              key={cell.date}
              className={`${chip} relative flex aspect-square flex-col items-center justify-center p-0 text-base text-ink ${!cell.inWindow && !cell.past ? "opacity-40" : ""}`}
            >
              <input type="radio" name="data" checked={value === cell.date} disabled={!enabled} onChange={() => onChange(cell.date)} className="sr-only" />
              <span className={`font-semibold ${enabled ? "" : "line-through decoration-mute/40"}`}>{parts.day}</span>
              {showMonth && <span className="text-[10px] uppercase">{parts.month}</span>}
              <span className="sr-only">
                , {WEEK_NAMES[parseISODate(cell.date).getDay()]}
                {!enabled && (cell.past ? " (data passada)" : !cell.inWindow ? " (fora da agenda aberta)" : " (estúdio fechado)")}
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-mute">Domingos e segundas fechados. Agenda aberta para os próximos 30 dias.</p>
    </fieldset>
  );
}

export function TimePicker({ date, slots, value, onChange }: { date: ISODate; slots: ResourceSlot[]; value: string | null; onChange: (t: string) => void }) {
  const groups = [
    { label: "Manhã", icon: Sun, items: slots.filter(isMorning) },
    { label: "Tarde", icon: Sunset, items: slots.filter((s) => !isMorning(s)) },
  ].filter((g) => g.items.length > 0);
  const free = slots.filter((s) => s.available).length;

  return (
    <fieldset>
      <legend className="font-semibold">Horário</legend>
      <p className="mt-1 mb-4 text-sm text-mute first-letter:uppercase">
        {formatDateLong(date)} · {free === 0 ? "sem horários livres" : `${free} ${free === 1 ? "horário livre" : "horários livres"}`}
      </p>
      {free === 0 ? (
        <p role="status" className="rounded-2xl border border-dashed border-linen p-5 text-mute">
          Nenhum horário comporta todos os tratamentos neste dia. Escolha outra data, outra profissional ou reduza a seleção.
        </p>
      ) : (
        <div className="space-y-5">
          {groups.map(({ label, icon: Icon, items }) => (
            <div key={label}>
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wider text-mute uppercase">
                <Icon aria-hidden className="h-3.5 w-3.5" /> {label}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((slot) => (
                  <label key={slot.time} className={`${chip} rounded-full px-4 py-2.5 text-sm font-semibold tabular-nums has-disabled:line-through`}>
                    <input type="radio" name="horario" checked={value === slot.time} disabled={!slot.available} onChange={() => onChange(slot.time)} className="sr-only" />
                    {slot.time}
                    {!slot.available && <span className="sr-only"> (indisponível)</span>}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <p className="text-xs text-mute">Horários riscados estão ocupados. Agenda demonstrativa gerada automaticamente.</p>
        </div>
      )}
    </fieldset>
  );
}
