"use client";

/**
 * Lista de interesse DEMONSTRATIVA: guarda apenas referências de produtos e variantes no
 * localStorage do navegador (nenhum dado pessoal). Não é carrinho, pedido ou reserva.
 */
import { useSyncExternalStore } from "react";
import { getProductById } from "../data/products";

export interface ListItem {
  key: string;
  productId: string;
  color?: string;
  size?: string;
}

const STORAGE_KEY = "mare:lista-interesse:v1";
const MAX_ITEMS = 30;
const EMPTY: ListItem[] = [];
export const OPEN_LIST_EVENT = "mare:abrir-lista";

let cache: ListItem[] | null = null;
const listeners = new Set<() => void>();

const itemKey = (i: Omit<ListItem, "key">) => [i.productId, i.color ?? "", i.size ?? ""].join("|");

function read(): ListItem[] {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as unknown;
    if (!Array.isArray(raw)) return EMPTY;
    return raw
      .filter((i): i is Omit<ListItem, "key"> => typeof i?.productId === "string" && !!getProductById(i.productId))
      .slice(0, MAX_ITEMS)
      .map((i) => ({ productId: i.productId, color: i.color, size: i.size, key: itemKey(i) }));
  } catch {
    return EMPTY;
  }
}

function write(items: ListItem[]) {
  cache = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items.map(({ productId, color, size }) => ({ productId, color, size }))));
  } catch {
    // Armazenamento indisponível (modo privado, cota): a lista vale só nesta aba.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = read();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => (cache ??= read());
const getServerSnapshot = () => EMPTY;

export function useInterestList(): ListItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Retorna false se o item já estava na lista. */
export function addToList(item: Omit<ListItem, "key">): boolean {
  const items = getSnapshot();
  const key = itemKey(item);
  if (items.some((i) => i.key === key)) return false;
  write([...items, { ...item, key }].slice(-MAX_ITEMS));
  return true;
}

export const removeFromList = (key: string) => write(getSnapshot().filter((i) => i.key !== key));
export const clearList = () => write([]);
export const openList = () => window.dispatchEvent(new Event(OPEN_LIST_EVENT));
