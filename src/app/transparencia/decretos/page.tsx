import { Metadata } from 'next';
import DecretosClient from './DecretosClient';

export const metadata: Metadata = {
  title: "Decretos Municipais | Lajes Pintadas",
  description: "Consulte os Decretos do Poder Executivo de Lajes Pintadas: regulamentações, nomeações, convocações e atos administrativos."
};

export default function DecretosPage() {
  return <DecretosClient />;
}
