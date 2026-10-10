"use client";

import type { ReactNode } from "react";

export const SELECT_SERVICE_EVENT = "casa:selecionar-servico";

/**
 * Leva ao formulário de orçamento já com o serviço escolhido.
 * Sem JavaScript, continua funcionando como âncora comum para #orcamento.
 */
export function RequestServiceLink({ serviceId, className, children }: { serviceId: string; className?: string; children: ReactNode }) {
  return (
    <a
      href="#orcamento"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<string>(SELECT_SERVICE_EVENT, { detail: serviceId }))}
    >
      {children}
    </a>
  );
}
