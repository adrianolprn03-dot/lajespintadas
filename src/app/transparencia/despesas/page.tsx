import { Metadata } from 'next';
import DespesasClient from './DespesasClient';

export const metadata: Metadata = {
  title: "Despesas Públicas | Lajes Pintadas",
  description: "Acesse o detalhamento dos gastos municipais, contratos, fornecedores e a execução orçamentária fiscal."
};

export default function DespesasPage() {
  return <DespesasClient />;
}
