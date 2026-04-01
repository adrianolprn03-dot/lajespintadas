import { Metadata } from 'next';
import UnidadesClient from './UnidadesClient';

export const metadata: Metadata = {
  title: "Unidades de Saúde | Lajes Pintadas",
  description: "Encontre o Hospital, as Unidades Básicas de Saúde (UBS) e centros de atendimento em Lajes Pintadas: endereços, horários e contatos."
};

export default function UnidadesPage() {
  return <UnidadesClient />;
}
