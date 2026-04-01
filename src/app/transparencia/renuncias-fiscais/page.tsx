import { Metadata } from 'next';
import RenunciasClient from './RenunciasClient';

export const metadata: Metadata = {
  title: "Renúncias Fiscais | Portal da Transparência",
  description: "Demonstrativo de renúncias de receitas, isenções fiscais e políticas de incentivo tributário do município."
};

export default function RenunciasFiscaisPage() {
  return <RenunciasClient />;
}
