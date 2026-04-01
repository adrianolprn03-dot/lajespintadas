import { Metadata } from 'next';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: "Perguntas Frequentes (FAQ) | Lajes Pintadas",
  description: "Dúvidas comuns sobre o acesso à informação, folha de pagamento, licitações e contratos do município."
};

export default function FAQPage() {
  return <FAQClient />;
}
