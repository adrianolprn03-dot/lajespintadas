import { Metadata } from 'next';
import LeisClient from './LeisClient';

export const metadata: Metadata = {
  title: "Leis Municipais | Lajes Pintadas",
  description: "Acesse as Leis Municipais, Leis Ordinárias, Complementares e a Lei Orgânica de Lajes Pintadas em conformidade com a Lei de Acesso à Informação."
};

export default function LeisPage() {
  return <LeisClient />;
}
