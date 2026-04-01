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
    dataPublicacao: "2026-01-15",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2026/01/619563080_18095041379509357_5616020108341988668_n.jpg",
    secretaria: "Cultura e Turismo",
    autor: "Assessoria de Comunicação"
  },
  {
    id: "2",
    slug: "abertas-matriculas-2026",
    titulo: "Matrículas abertas para a Rede Municipal de Ensino! 📚✅",
    resumo: "A Secretaria Municipal de Educação abre o período de matrículas para o ano letivo de 2026. Garanta a vaga dos seus filhos.",
    conteudoHtml: `
      <p>A <strong>Secretaria de Educação de Lajes Pintadas</strong> comunica a todos os pais e responsáveis que o período de matrículas e rematrículas para o ano letivo de 2026 já está aberto.</p>
      <p>As inscrições podem ser realizadas diretamente nas unidades escolares ou através da central de atendimento da secretaria. Documentos necessários: Certidão de Nascimento, CPF do aluno e do responsável, Comprovante de Residência e Cartão de Vacina atualizado.</p>
    `,
    dataPublicacao: "2026-01-10",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2026/01/613109857_18094293488509357_6860618616731646036_n.jpg",
    secretaria: "Educação",
    autor: "Secretaria de Educação"
  },
  {
    id: "3",
    slug: "atencao-beneficiarios-bpc",
    titulo: "Atenção, beneficiários do BPC em Lajes Pintadas! 🚨",
    resumo: "Comunicado importante para os beneficiários do Benefício de Prestação Continuada (BPC) sobre a atualização cadastral obrigatória no CRAS.",
    conteudoHtml: `
      <p>A Secretaria Municipal de Assistência Social convoca todos os beneficiários do BPC (idosos e pessoas com deficiência) que não realizam a atualização do Cadastro Único há mais de dois anos.</p>
      <p>A não atualização dos dados pode acarretar na suspensão do benefício pelo Governo Federal. Procure o CRAS mais próximo portando documentos de todos os moradores da residência.</p>
    `,
    dataPublicacao: "2026-01-05",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2026/01/616163423_18094611479509357_9215864156769518290_n.jpg",
    secretaria: "Assistência Social",
    autor: "Coordenação do Cadastro Único"
  },
  {
    id: "4",
    slug: "67-anos-emancipacao-politica",
    titulo: "67 Anos de Emancipação Política de Lajes Pintadas 🎈✨",
    resumo: "Comemoramos com orgulho os 67 anos de história, lutas e conquistas do nosso amado município.",
    conteudoHtml: `
      <p>No dia de hoje, Lajes Pintadas celebra mais um ano de sua gloriosa Emancipação Política. Uma data para recordar nossa história e renovar o compromisso com o desenvolvimento da nossa terra.</p>
      <p>A Prefeitura Municipal parabeniza a todos os munícipes que constroem, dia após dia, o futuro da nossa cidade.</p>
    `,
    dataPublicacao: "2026-01-01",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2026/01/608014082_18092984579509357_2715271798587260183_n.jpg",
    secretaria: "Gabinete do Prefeito",
    autor: "Assessoria de Comunicação"
  },
  {
    id: "5",
    slug: "dia-das-maes-homenagem",
    titulo: "Dia das Mães - Homenagem Especial",
    resumo: "Homenagem as mães lajes-pintadenses. Celebrando o amor e a dedicação de quem cuida da nossa gente.",
    conteudoHtml: `
      <p>Em celebração ao Dia das Mães, a gestão municipal organizou uma homenagem especial para todas as mães do município.</p>
      <p>O evento contou com a participação de artistas locais e a entrega de prêmios arrecadados através de parcerias com o comércio da cidade.</p>
    `,
    dataPublicacao: "2021-10-30",
    imagemCapa: "https://lajespintadas.rn.gov.br/wp-content/uploads/2021/10/247918613_259957106068574_4789045959025086757_n.jpg",
    secretaria: "Gabinete do Prefeito",
    autor: "Assessoria de Comunicação"
  }
];
