import OrdemCronologicaClient from './OrdemCronologicaClient';

// Server-side wrapper metadata if needed
export const metadata = {
  title: "Ordem Cronológica | Lajes Pintadas",
  description: "Acompanhamento da fila cronológica de pagamentos de credores."
};

export default function OrdemCronologica() {
  return <OrdemCronologicaClient />;
}
