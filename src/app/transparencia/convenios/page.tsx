import { Metadata } from 'next';
import ConveniosClient from './ConveniosClient';

export const metadata: Metadata = {
  title: "Convênios e Repasses | Lajes Pintadas",
  description: "Consulte os acordos e termos de cooperação firmados entre o município e outros entes federativos (União/Estado)."
};

export default function ConveniosPage() {
  return <ConveniosClient />;
}
