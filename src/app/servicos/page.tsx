import { Metadata } from 'next';
import ServicosClient from './ServicosClient';

export const metadata: Metadata = {
  title: "Carta de Serviços ao Cidadão | Lajes Pintadas",
  description: "Consulte o guia completo de serviços prestados pela Prefeitura de Lajes Pintadas, com prazos, locais e documentos necessários."
};

export default function CartaServicosPage() {
  return <ServicosClient />;
}
