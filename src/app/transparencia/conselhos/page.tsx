import { Metadata } from 'next';
import ConselhosClient from './ConselhosClient';

export const metadata: Metadata = {
  title: "Conselhos Municipais | Portal da Transparência",
  description: "Composição (membros ativos), resoluções e atas das reuniões dos conselhos de políticas públicas do município."
};

export default function ConselhosPage() {
  return <ConselhosClient />;
}
