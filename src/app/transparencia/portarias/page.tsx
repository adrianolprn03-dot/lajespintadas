import { Metadata } from 'next';
import PortariasClient from './PortariasClient';

export const metadata: Metadata = {
  title: "Portarias Municipais | Lajes Pintadas",
  description: "Atos administrativos internos, nomeações, designações e regulamentações de pessoal da Prefeitura de Lajes Pintadas."
};

export default function PortariasPage() {
  return <PortariasClient />;
}
