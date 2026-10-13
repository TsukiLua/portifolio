import type { Metadata } from "next";
import { Container } from "@/components/ui/primitives";
import { dealership } from "@/data/dealership";

export const metadata: Metadata = {
  title: "Política de privacidade (demonstrativa)",
  description: "Como esta demonstração trata os dados digitados nos formulários.",
  alternates: { canonical: "/privacidade" },
};

const sections = [
  {
    title: "Quais dados os formulários pedem",
    text: "Nome, telefone, e-mail (opcional), assunto, mensagem e, no caso de visita, a data e o período preferidos. Pedimos apenas o necessário para responder ao seu contato.",
  },
  {
    title: "O que acontece com eles nesta demonstração",
    text: "Nada é enviado a servidores nem armazenado. Os dados ficam apenas na página aberta no seu navegador e são descartados ao sair ou recarregar.",
  },
  {
    title: "WhatsApp",
    text: "Ao clicar em um botão de WhatsApp, abrimos o aplicativo ou o site do WhatsApp (serviço de terceiros) com uma mensagem preenchida. O envio só acontece se você decidir enviá-la, e a partir daí vale a política de privacidade do WhatsApp.",
  },
  {
    title: "Cookies e medição de audiência",
    text: "Esta demonstração não usa cookies de rastreamento nem ferramentas de analytics.",
  },
  {
    title: "Seus direitos (LGPD)",
    text: "Em uma loja real, você poderia pedir acesso, correção ou exclusão dos seus dados pelo canal de contato informado, nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018).",
  },
];

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl pt-10 sm:pt-14">
      <h1 className="font-display text-4xl font-extrabold">Política de privacidade</h1>
      <p className="mt-3 rounded-lg bg-wine-soft p-4 text-sm text-wine-dark">
        Texto <strong>demonstrativo</strong> da {dealership.name}, loja fictícia. Não constitui orientação jurídica: uma loja real
        deve ter sua política revisada por profissional habilitado.
      </p>
      <div className="mt-8 space-y-8">
        {sections.map((s, i) => (
          <section key={s.title} aria-labelledby={`secao-${i}`}>
            <h2 id={`secao-${i}`} className="text-xl font-bold">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-graphite">{s.text}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
