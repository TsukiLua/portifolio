import Form from "next/form";
import { Search } from "lucide-react";

/** Busca que funciona mesmo sem JavaScript (GET para /catalogo?q=). */
export function SearchForm({ id, className = "" }: { id: string; className?: string }) {
  return (
    <Form action="/catalogo" role="search" className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Buscar produtos
      </label>
      <input
        id={id}
        name="q"
        type="search"
        placeholder="Buscar peças"
        maxLength={60}
        className="h-11 w-full border-b border-ink/30 bg-transparent pr-10 pl-1 text-sm placeholder:text-stone focus:border-ink focus:outline-none"
      />
      <button type="submit" aria-label="Buscar" className="absolute top-0 right-0 flex h-11 w-10 items-center justify-center text-ink hover:text-clay">
        <Search aria-hidden className="h-4 w-4" />
      </button>
    </Form>
  );
}
