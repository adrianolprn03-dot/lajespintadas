import { Metadata } from 'next';
import EmendasClient from './EmendasClient';

export const metadata: Metadata = {
  title: "Emendas Parlamentares | Lajes Pintadas",
  description: "Acompanhe todos os recursos destinados ao município por deputados e senadores, incluindo valores e andamento."
};

export default function EmendasPage() {
  return <EmendasClient />;
}
