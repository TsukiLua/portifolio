/** Configuração por ambiente. Veja `.env.example`. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

/** Indexação só é liberada explicitamente (depois de preencher o perfil e publicar no domínio final). */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
