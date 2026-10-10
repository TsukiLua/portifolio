"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/data/products";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  if (!current) return null;

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {images.length > 1 && (
        <ul className="flex gap-3 md:flex-col" aria-label={`Fotos de ${name}`}>
          {images.map((img, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver foto ${i + 1} de ${images.length}`}
                aria-pressed={i === index}
                className={`block w-20 border transition-opacity ${i === index ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <Image src={img.src} alt="" sizes="80px" className="aspect-[4/5] w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex-1 bg-sand">
        <Image
          key={index}
          src={current.src}
          alt={current.alt}
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[4/5] w-full object-cover"
        />
      </div>
    </div>
  );
}
