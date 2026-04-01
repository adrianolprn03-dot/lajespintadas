import { Metadata } from 'next';
import IncentivosClient from './IncentivosClient';

export const metadata: Metadata = {
  title: "Incentivos Culturais e Esportivos | Lajes Pintadas",
  description: "Acompanhe a aplicação de recursos do fomento à cultura (Lei Paulo Gustavo, Aldir Blanc) e apoios ao esporte."
};

export default function IncentivosPage() {
  return <IncentivosClient />;
}
