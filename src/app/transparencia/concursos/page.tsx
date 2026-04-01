import { Metadata } from 'next';
import ConcursosClient from './ConcursosClient';

export const metadata: Metadata = {
  title: "Concursos e Seleções | Lajes Pintadas",
  description: "Acompanhe os editais, resultados e convocações de concursos públicos e processos seletivos simplificados do município."
};

export default function ConcursosPage() {
  return <ConcursosClient />;
}
