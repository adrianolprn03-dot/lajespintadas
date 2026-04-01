import { Metadata } from 'next';
import OrcamentoClient from './OrcamentoClient';

export const metadata: Metadata = {
  title: "Planejamento e Orçamento | Lajes Pintadas",
  description: "Consulte o PPA, LDO e LOA do município e acompanhe como os recursos públicos são planejados e destinados."
};

export default function OrcamentoPage() {
  return <OrcamentoClient />;
}
