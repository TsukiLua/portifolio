import { pendingProfileFields } from "@/data/profile";

/** Aviso exibido SOMENTE em `npm run dev`, listando dados pessoais ainda com valor de exemplo. */
export function DevChecklist() {
  if (process.env.NODE_ENV !== "development") return null;
  const pending = pendingProfileFields();
  if (pending.length === 0) return null;
  return (
    <aside aria-label="Pendências de configuração" className="fixed bottom-4 left-4 z-50 max-w-xs rounded-xl border border-ink/15 bg-paper p-4 text-xs shadow-xl">
      <p className="font-semibold">Configure antes de publicar (só aparece em dev):</p>
      <ul className="mt-2 list-inside list-disc space-y-0.5 font-mono text-mute">
        {pending.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </aside>
  );
}
