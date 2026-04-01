export interface Noticia {
  id: string;
  slug: string;
  titulo: string;
  resumo: string;
  conteudoHtml: string;
  dataPublicacao: string;
  imagemCapa: string;
  secretaria: string;
  autor: string;
}

export const NOTICIAS_MOCK: Noticia[] = [
  {
    id: "1",
    slug: "lajes-folia-2026",
    titulo: "Lajes Folia 2026 🎉🎊",
    resumo: "Vem aí o Lajes Folia 2026! O maior carnaval fora de época da região está de volta com grandes atrações nacionais e regionais.",
    conteudoHtml: `
      <p>A <strong>Prefeitura Municipal de Lajes Pintadas</strong> anuncia oficialmente o retorno do <em>Lajes Folia</em> para o exercício de 2026. O evento, que é tradição no município, contará com estrutura de ponta, segurança reforçada e atrações que prometem movimentar a economia local.</p>
      <quote>"Estamos preparando a maior edição da história. O Lajes Folia 2026 não é apenas uma festa, é um motor de desenvolvimento para o nosso comércio e turismo", destacou o Prefeito.</quote>
      <p>A programação completa será divulgada nas próximas semanas nos canais oficiais da prefeitura.</p>
    `,
    dataPublicacao: "2026-01-01",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2026/01/Lajes-Folia-2026.jpg",
    secretaria: "Cultura e Turismo",
    autor: "Assessoria de Comunicação"
  },
  {
    id: "2",
    slug: "atencao-beneficiarios-bpc",
    titulo: "Atenção, beneficiários do BPC em Lajes Pintadas!",
    resumo: "Comunicado importante para os beneficiários do Benefício de Prestação Continuada (BPC) sobre a atualização cadastral obrigatória.",
    conteudoHtml: `
      <p>A Secretaria Municipal de Assistência Social convoca todos os beneficiários do BPC (idosos e pessoas com deficiência) que não realizam a atualização do Cadastro Único há mais de dois anos.</p>
      <p>A não atualização dos dados pode acarretar na suspensão do benefício pelo Governo Federal. Procure o CRAS mais próximo portando documentos de todos os moradores da residência.</p>
    `,
    dataPublicacao: "2025-12-10",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2025/12/BPC-Lajes.jpg",
    secretaria: "Assistência Social",
    autor: "Coordenação do Cadastro Único"
  },
  {
    id: "3",
    slug: "dia-das-maes-live-homenagem",
    titulo: "Dia das Mães - Live em Homenagem",
    resumo: "A Prefeitura realizou uma live especial em homenagem a todas as mães do município com sorteio de brindes e apresentações culturais.",
    conteudoHtml: `
      <p>Em celebração ao Dia das Mães, a gestão municipal organizou uma transmissão ao vivo com o objetivo de aproximar e homenagear as mães lajes-pintadenses.</p>
      <p>O evento contou com a participação de artistas locais e a entrega de prêmios arrecadados através de parcerias com o comércio da cidade.</p>
    `,
    dataPublicacao: "2021-05-07",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2021/05/Dia-das-Maes.jpg",
    secretaria: "Gabinete do Prefeito",
    autor: "Assessoria de Comunicação"
  },
  {
    id: "4",
    slug: "boletim-coronavirus-atualizacao",
    titulo: "Boletim Coronavírus - Situação Epidemiológica",
    resumo: "Acompanhe as últimas notícias e a situação vacinal do município em relação ao enfrentamento do Coronavírus.",
    conteudoHtml: `
      <p>A Secretaria Municipal de Saúde divulga o boletim informativo sobre os casos registrados e o avanço da imunização em Lajes Pintadas.</p>
      <p>Reforçamos a importância da completude do esquema vacinal para toda a população acima de 5 anos de idade.</p>
    `,
    dataPublicacao: "2021-06-15",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2021/06/Boletim-Covid.jpg",
    secretaria: "Saúde",
    autor: "Vigilância Sanitária"
  }
];
