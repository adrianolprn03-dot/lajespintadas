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
    slug: "prefeitura-inaugura-nova-ubs-no-bairro-centro",
    titulo: "Prefeitura inaugura nova Unidade Básica de Saúde no Centro para ampliar atendimento",
    resumo: "A nova UBS visa atender mais de 5 mil famílias da região, reduzindo filas e descentralizando os serviços médicos.",
    conteudoHtml: `
      <p>A <strong>Prefeitura Municipal de Lajes Pintadas</strong> inaugurou, na manhã desta sexta-feira, a nova Unidade Básica de Saúde (UBS) do Bairro Centro. O espaço, construído com recursos próprios e emendas parlamentares, conta com salas de vacinação, consultórios médicos e odontológicos totalmente equipados.</p>
      <quote>"Esta é uma conquista histórica para a nossa população. Com a nova UBS, reduziremos o tempo de espera agendamentos em mais de 40%", afirmou o Prefeito durante a cerimônia de corte do laço.</quote>
      <p>A unidade funcionará de segunda a sexta-feira, das 07h às 17h, oferecendo também programas voltados à Saúde da Família e prevenção de doenças crônicas.</p>
    `,
    dataPublicacao: "2026-03-28",
    imagemCapa: "/noticia-1.jpg", // We will use placeholder gradients if this file fails to load
    secretaria: "Saúde",
    autor: "Assessoria de Comunicação"
  },
  {
    id: "2",
    slug: "abertas-matriculas-rede-municipal-ensino-2026",
    titulo: "Abertas as matrículas para a Rede Municipal de Ensino em 2026",
    resumo: "Pais e responsáveis já podem realizar a pré-matrícula de forma totalmente digital através da nova página de Serviços.",
    conteudoHtml: `
      <p>A Secretaria Municipal de Educação iniciou nesta segunda-feira o período de matrículas online para o ano letivo de 2026. A novidade deste ano é o <strong>Portal de Matrícula Digital</strong>, desenvolvido para evitar filas nas portas das escolas e democratizar o acesso às vagas remanescentes.</p>
      <p>Para o Ensino Fundamental II, foram adicionadas 200 novas vagas no sistema, além da ativação de três novas linhas de transporte escolar nas zonas rurais do município.</p>
      <ul>
        <li>O prazo final para rematrículas vai até o dia 15 do próximo mês.</li>
        <li>Documentos necessários: CPF do responsável, comprovante de residência e certidão de nascimento do aluno.</li>
      </ul>
    `,
    dataPublicacao: "2026-03-25",
    imagemCapa: "/noticia-2.jpg",
    secretaria: "Educação",
    autor: "Assessoria de Comunicação"
  },
  {
    id: "3",
    slug: "obras-calcamento-zona-rural-entregues",
    titulo: "Obras de recapeamento asfáltico e calçamento da Zona Rural são entregues antes do prazo",
    resumo: "Mais de 15 quilômetros de vias foram pavimentadas no último semestre, trazendo qualidade de vida para as famílias rurais.",
    conteudoHtml: `
      <p>A tão aguardada pavimentação das vias adjacentes à região oeste do município foi oficialmente concluída nesta semana. As equipes da <em>Secretaria de Obras e Infraestrutura</em> trabalharam em ritmo acelerado para entregar o trecho antes do início do inverno.</p>
      <p>A estrada agora conta com escoamento de águas pluviais, iluminação em LED e sinalização viária completa. Moradores da região relataram que o tráfego de caminhões e ônibus escolares já apresenta grande melhora na segurança.</p>
    `,
    dataPublicacao: "2026-03-20",
    imagemCapa: "/noticia-3.jpg",
    secretaria: "Infraestrutura",
    autor: "Redação Oficial"
  },
  {
    id: "4",
    slug: "prestacao-contas-primeiro-trimestre-audiencia",
    titulo: "Gestão convoca a sociedade para Audiência Pública de Prestação de Contas",
    resumo: "Em conformidade com a Lei de Responsabilidade Fiscal, a gestão apresentará as finanças do trimestre neste mês.",
    conteudoHtml: `
      <p>O Prefeito e os órgãos de controle interno do município farão, na próxima terça-feira (22), a exibição do balancete público referente ao Primeiro Trimestre de 2026. A audiência acontecerá no plenário da Câmera Municipal de Vereadores e será aberta a todos.</p>
      <p>O cidadão também poderá acompanhar as planilhas completas de execução orçamentária no <strong>Novo Portal da Transparência</strong>, que estreia na mesma semana com o cobiçado Selo Ouro.</p>
    `,
    dataPublicacao: "2026-03-15",
    imagemCapa: "/noticia-4.jpg",
    secretaria: "Finanças",
    autor: "Controladoria Geral"
  }
];
