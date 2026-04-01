import { Metadata } from 'next';
import PublicacoesClient from './PublicacoesClient';

export const metadata: Metadata = {
  title: "Publicações Oficiais (Diário) | Lajes Pintadas",
  description: "Acesso integral aos atos administrativos, Diários Oficiais, editais, portarias e resultados de licitações municipais."
};

export default function PublicacoesPage() {
  return <PublicacoesClient />;
}
