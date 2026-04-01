import { Metadata } from 'next';
import FolhaPagamentoClient from './FolhaPagamentoClient';

export const metadata: Metadata = {
  title: "Folha de Pagamento | Portal da Transparência",
  description: "Consulta detalhada de remunerações, cargos e vencimentos dos servidores de Lajes Pintadas."
};

export default function FolhaPagamentoPage() {
  return <FolhaPagamentoClient />;
}
