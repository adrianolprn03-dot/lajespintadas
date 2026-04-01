import { Metadata } from 'next';
import AgentesPoliticosClient from './AgentesPoliticosClient';

export const metadata: Metadata = {
  title: "Agentes Políticos | Portal da Transparência",
  description: "Consulta de subsídios de Prefeito, Vice-Prefeito, Secretários e demais agentes políticos de Lajes Pintadas."
};

export default function AgentesPoliticosPage() {
  return <AgentesPoliticosClient />;
}
