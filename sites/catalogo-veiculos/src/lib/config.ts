/** Configuração por ambiente. Veja `.env.example`. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3005";

/** Demonstrações não são indexadas, a menos que liberado explicitamente. */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
