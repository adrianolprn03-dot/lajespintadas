import { Metadata } from 'next';
import ObrasClient from './ObrasClient';

export const metadata: Metadata = {
  title: "Obras Públicas | Lajes Pintadas",
  description: "Acompanhe o andamento, investimentos, prazos e fotos das obras de infraestrutura em execução no município."
};

export default function ObrasPage() {
  return <ObrasClient />;
}
