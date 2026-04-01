import { Metadata } from 'next';
import ReceitasClient from './ReceitasClient';

export const metadata: Metadata = {
  title: "Receitas Públicas | Lajes Pintadas",
  description: "Acompanhe detalhadamente a arrecadação municipal, fontes de recursos e evolução financeira do município."
};

export default function ReceitasPage() {
  return <ReceitasClient />;
}
