"use client";

import { useSyncExternalStore } from "react";

/**
 * Data/hora atual apenas no navegador (no servidor retorna null), evitando divergência de
 * hidratação. Atualiza a cada 30 s para que horários do dia "vençam" sem recarregar a página.
 */
let cached: Date | null = null;

function getSnapshot() {
  const now = Date.now();
  if (!cached || now - cached.getTime() > 30_000) cached = new Date(now);
  return cached;
}

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 30_000);
  return () => window.clearInterval(id);
}

export function useNow(): Date | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
