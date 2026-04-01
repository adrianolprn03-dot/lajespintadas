import { Metadata } from 'next';
import DesoneracoesClient from './DesoneracoesClient';

export const metadata: Metadata = {
  title: "Desonerações Fiscais e Renúncias | Portal da Transparência",
  description: "Consulta de isenções, anistias e remissões tributárias concedidas pelo município de Lajes Pintadas."
};

export default function DesoneracoesFiscaisPage() {
  return <DesoneracoesClient />;
}
