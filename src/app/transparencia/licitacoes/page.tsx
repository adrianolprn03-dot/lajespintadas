import { Metadata } from 'next';
import LicitacoesClient from './LicitacoesClient';

export const metadata: Metadata = {
  title: "Licitações e Processos | Lajes Pintadas",
  description: "Acesse editais, resultados de julgamento e acompanhe os processos licitatórios do município em tempo real."
};

export default function LicitacoesPage() {
  return <LicitacoesClient />;
}
