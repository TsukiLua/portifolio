"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import type { VehicleImage as VehicleImageData } from "@/types/vehicle";

/** next/image com fallback visual: se a foto falhar, mostra um aviso no lugar em vez de um ícone quebrado. */
export function VehicleImage({
  image,
  sizes,
  priority,
  className = "",
}: {
  image: VehicleImageData;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div role="img" aria-label={`${image.alt} (imagem indisponível)`} className={`flex flex-col items-center justify-center gap-2 bg-line text-steel ${className}`}>
        <ImageOff aria-hidden className="h-8 w-8" />
        <span className="text-sm">Imagem indisponível</span>
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
