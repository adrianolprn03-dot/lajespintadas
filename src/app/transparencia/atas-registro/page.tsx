import { Metadata } from 'next';
import AtasRegistroClient from './AtasRegistroClient';

export const metadata: Metadata = {
  title: "Atas de Registro de Preços | Lajes Pintadas",
  description: "Acompanhe os fornecedores pré-qualificados e os preços registrados para futuras compras governamentais."
};

export default function AtasRegistroPage() {
  return <AtasRegistroClient />;
}
