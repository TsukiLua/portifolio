import { BadgeCheck, Clock, Star, Tag } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { STATUS_LABELS } from "@/lib/formatters";

/** Estado do anúncio sempre com ícone + texto (não depende só de cor). */
export function StatusBadge({ status, showAvailable = false }: { status: Vehicle["status"]; showAvailable?: boolean }) {
  if (status === "available" && !showAvailable) return null;
  const style = {
    available: "bg-ok/10 text-ok",
    reserved: "bg-warn/10 text-warn",
    sold: "bg-ink text-white",
  }[status];
  const Icon = { available: BadgeCheck, reserved: Clock, sold: Tag }[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}>
      <Icon aria-hidden className="h-3.5 w-3.5" />
      {STATUS_LABELS[status]}
    </span>
  );
}

export function FeaturedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-wine px-2.5 py-1 text-xs font-semibold text-white">
      <Star aria-hidden className="h-3.5 w-3.5 fill-current" />
      Destaque
    </span>
  );
}
