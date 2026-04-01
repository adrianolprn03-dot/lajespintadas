import { Metadata } from 'next';
import LRFClient from './LRFClient';

export const metadata: Metadata = {
  title: "Transparência Fiscal (LRF) | Lajes Pintadas",
  description: "Acesse os Relatórios Resumidos da Execução Orçamentária (RREO) e os Relatórios de Gestão Fiscal (RGF) em conformidade com a LRF."
};

export default function LRFPage() {
  return <LRFClient />;
}
