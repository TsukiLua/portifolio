import Image from "next/image";
import type { ProjectImage } from "@/types/project";

/** Moldura de navegador em CSS para capturas reais de desktop. */
export function BrowserFrame({
  image,
  label,
  sizes,
  priority,
  className = "",
}: {
  image: ProjectImage;
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-xl border border-ink/10 bg-paper shadow-[0_30px_60px_-30px_rgb(15_15_18/0.35)] ${className}`}>
      <div aria-hidden className="flex items-center gap-2 border-b border-ink/10 bg-canvas px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-2 truncate rounded-md bg-paper px-3 py-0.5 font-mono text-[10px] text-mute">{label}</span>
      </div>
      <Image src={image.src} alt={image.alt} sizes={sizes} priority={priority} placeholder="blur" className="block h-auto w-full" />
    </figure>
  );
}

/** Moldura de celular para capturas mobile (390×844). */
export function PhoneFrame({ image, sizes, className = "" }: { image: ProjectImage; sizes: string; className?: string }) {
  return (
    <figure className={`overflow-hidden rounded-[1.75rem] border-[5px] border-ink bg-ink shadow-[0_30px_60px_-25px_rgb(15_15_18/0.5)] ${className}`}>
      <Image src={image.src} alt={image.alt} sizes={sizes} placeholder="blur" className="block h-auto w-full rounded-[1.35rem]" />
    </figure>
  );
}
