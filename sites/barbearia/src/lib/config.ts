/** Configuração por ambiente. Veja `.env.example`. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001";

/** Número do WhatsApp da barbearia. Vazio = o link abre o WhatsApp para o visitante escolher o contato. */
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

/** Demonstrações não são indexadas, a menos que liberado explicitamente. */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
