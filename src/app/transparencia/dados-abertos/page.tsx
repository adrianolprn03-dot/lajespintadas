import { Metadata } from 'next';
import DadosAbertosClient from './DadosAbertosClient';

export const metadata: Metadata = {
  title: "Dados Abertos | Lajes Pintadas",
  description: "Acesse e baixe as bases de dados municipais em formatos abertos (JSON e CSV) para livre reutilização."
};

export default function DadosAbertosPage() {
  return <DadosAbertosClient />;
}
