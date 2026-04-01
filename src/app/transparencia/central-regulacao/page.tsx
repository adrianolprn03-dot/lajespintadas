import { Metadata } from 'next';
import CentralRegulacaoClient from './CentralRegulacaoClient';

export const metadata: Metadata = {
  title: "Central de Regulação | Portal da Transparência",
  description: "Transparência das listas de espera para consultas, exames e cirurgias eletivas do SUS."
};

export default function CentralRegulacaoPage() {
  return <CentralRegulacaoClient />;
}
