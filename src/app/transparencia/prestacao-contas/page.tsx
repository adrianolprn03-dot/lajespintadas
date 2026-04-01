import { Metadata } from 'next';
import PrestacaoContasClient from './PrestacaoContasClient';

export const metadata: Metadata = {
  title: "Prestação de Contas | Lajes Pintadas",
  description: "Acesse os balanços anuais, relatórios contábeis e prestações de contas oficiais do município."
};

export default function PrestacaoContasPage() {
  return <PrestacaoContasClient />;
}
