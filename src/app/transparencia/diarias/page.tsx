import { Metadata } from 'next';
import DiariasClient from './DiariasClient';

export const metadata: Metadata = {
  title: "Diárias de Viagem | Lajes Pintadas",
  description: "Acesse a relação de diárias concedidas a servidores e agentes políticos para missões oficiais."
};

export default function DiariasPage() {
  return <DiariasClient />;
}
