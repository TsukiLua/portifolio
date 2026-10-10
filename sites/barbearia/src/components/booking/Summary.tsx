import { formatBRL, formatDuration } from "@demo/core/format";
import { formatDateLong } from "@demo/core/date";
import type { Service } from "@/data/services";

export interface SummaryData {
  service?: Service;
  barberName?: string;
  date?: string | null;
  time?: string | null;
  name?: string;
  phone?: string;
  notes?: string;
}

export function Summary({ data, title = "Resumo" }: { data: SummaryData; title?: string }) {
  const rows: [string, string | undefined][] = [
    ["Serviço", data.service ? `${data.service.name} · ${formatDuration(data.service.durationMin)}` : undefined],
    ["Barbeiro", data.barberName],
    ["Data", data.date ? formatDateLong(data.date) : undefined],
    ["Horário", data.time ?? undefined],
    ["Nome", data.name?.trim() || undefined],
    ["WhatsApp", data.phone || undefined],
    ["Observações", data.notes?.trim() || undefined],
  ];
  const visible = rows.filter(([label, value]) => value || ["Serviço", "Barbeiro", "Data", "Horário"].includes(label));

  return (
    <section aria-label={title} className="border border-smoke bg-char">
      <h3 className="border-b border-smoke px-5 py-4 text-xs font-bold uppercase tracking-[0.2em] text-ember">{title}</h3>
      <dl className="divide-y divide-smoke px-5 text-sm">
        {visible.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-6 py-3">
            <dt className="text-ash">{label}</dt>
            <dd className="text-right font-semibold first-letter:uppercase">{value ?? <span className="font-normal text-ash/70">—</span>}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-baseline justify-between border-t border-smoke px-5 py-4">
        <span className="text-sm text-ash">Total (pago na barbearia)</span>
        <span className="font-display text-3xl font-bold">{data.service ? formatBRL(data.service.price) : "—"}</span>
      </div>
    </section>
  );
}
