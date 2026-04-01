import { Metadata } from 'next';
import ContratosClient from './ContratosClient';

export const metadata: Metadata = {
  title: "Contratos Administrativos | Lajes Pintadas",
  description: "Consulte os contratos celebrados pelo município, acompanhe a vigência, fornecedores e valores pactuados."
};

export default function ContratosPage() {
  return <ContratosClient />;
}
