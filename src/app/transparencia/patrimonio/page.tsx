import { Metadata } from 'next';
import PatrimonioClient from './PatrimonioClient';

export const metadata: Metadata = {
  title: "Patrimônio Público e Frota | Portal da Transparência",
  description: "Relação de bens imóveis, móveis e frota de veículos registrados em nome da prefeitura municipal."
};

export default function PatrimonioPage() {
  return <PatrimonioClient />;
}
