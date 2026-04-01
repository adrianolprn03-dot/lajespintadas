import { Metadata } from 'next';
import MedicamentosClient from './MedicamentosClient';

export const metadata: Metadata = {
  title: "Medicamentos SUS | Lajes Pintadas",
  description: "Consulte a Relação Municipal de Medicamentos Essenciais (REMUME) e a disponibilidade de estoque na rede municipal de saúde."
};

export default function MedicamentosPage() {
  return <MedicamentosClient />;
}
