import { Metadata } from 'next';
import InstitucionalClient from './InstitucionalClient';

export const metadata: Metadata = {
  title: "Estrutura Institucional | Portal Oficial",
  description: "Conheça a estrutura organizacional da Prefeitura Municipal: secretarias, gabinetes, gestores, endereços e telefones de contato (Obrigatório PNTP)."
};

export default function InstitucionalPage() {
  return <InstitucionalClient />;
}
