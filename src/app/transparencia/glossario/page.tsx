import { Metadata } from 'next';
import GlossarioClient from './GlossarioClient';

export const metadata: Metadata = {
  title: "Glossário da Transparência | Lajes Pintadas",
  description: "Entenda os termos técnicos e conceitos utilizados na administração pública municipal."
};

export default function GlossarioPage() {
  return <GlossarioClient />;
}
