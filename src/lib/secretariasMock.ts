export interface Secretaria {
  id: string;
  nome: string;
  gestor: string;
  descricao: string;
  emailContact?: string;
  horarioAtendimento?: string;
  endereco?: string;
}

export const SECRETARIAS_MOCK: Secretaria[] = [
  {
    id: "controladoria",
    nome: "Controladoria Municipal",
    gestor: "FRANCISCO ADRIANO BEZERRA DA SILVA",
    descricao: "A Controladoria Geral do Município tem por finalidade a conferência e acompanhamento das demonstrações contábeis e licitatórias.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "procuradoria",
    nome: "Procuradoria Municipal",
    gestor: "FABIOLA CUNHA SOUZA DE OLIVEIRA",
    descricao: "Órgão que tem por finalidade a representação do Município em juízo ou extrajudicialmente e assessoramento jurídico às unidades administrativas.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "administracao",
    nome: "Secretaria de Administração",
    gestor: "SIDCLEY GOMES DA SILVA",
    descricao: "Responsável pela gestão administrativa, recursos humanos, patrimônio, compras e licitações.",
    emailContact: "administracao@lajespintadas.rn.gov.br",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "agricultura",
    nome: "Secretaria de Agricultura",
    gestor: "NELIO MENDES LUCENA",
    descricao: "Responsável por promover o desenvolvimento agrícola, fornecendo apoio técnico e infraestrutura para manutenção e proteção ambiental.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "assistencia-social",
    nome: "Secretaria de Assistência Social",
    gestor: "FRANCISCA APARECIDA DE FRANÇA GOMES",
    descricao: "Implementa programas sociais, Cadastro Único e atende famílias em situação de vulnerabilidade e risco social.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "educacao",
    nome: "Secretaria de Educação",
    gestor: "ANA DARK PEREIRA DA SILVA",
    descricao: "Responsável pelas escolas municipais, creches, frota de transporte escolar, merenda escolar e programas educacionais integrados.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "financas",
    nome: "Secretaria de Finanças",
    gestor: "FERNANDO LUIZ DE LIMA GOMES",
    descricao: "Controla as finanças, despesas públicas, elaboração do orçamento municipal, Portal da Transparência e a prestação de contas.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "obras",
    nome: "Secretaria de Obras e Serviços Urbanos",
    gestor: "JULIO CARLOS FERREIRA DE OLIVEIRA",
    descricao: "Gerencia obras públicas, habitação, pavimentações, drenagem, coleta de lixo, iluminação e a conservação da infraestrutura urbana.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "saude",
    nome: "Secretaria de Saúde",
    gestor: "NIVALDO ALVES DA SILVA",
    descricao: "Coordena os serviços de saúde pública, regulação de exames, frota de ambulâncias, postos de saúde da família e equipes de vacinação.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "tributacao",
    nome: "Secretaria de Tributação",
    gestor: "ERNESTO LUIS GOMES DE ALMEIDA",
    descricao: "Dirige a arrecadação de tributos (IPTU, ISS, ITBI), fiscalização contábil, alvarás, certidões negativas e Dívida Ativa.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  },
  {
    id: "turismo",
    nome: "Secretaria de Turismo e Esporte",
    gestor: "JOSÉ CÉLIO BEZERRA FEITOSA",
    descricao: "Promove e gerencia o esporte amador, campeonatos locais, eventos comemorativos, cultura municipal e atrações turísticas da cidade.",
    horarioAtendimento: "07h às 13h - Segunda a Sexta",
    endereco: "Rua José Ferreira Sobrinho, 100, Centro - Lajes Pintadas/RN"
  }
];
