import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import styles from './page.module.css';
import { 
  Building2, 
  FileBox, 
  Search, 
  Clock, 
  ActivitySquare, 
  Receipt, 
  Landmark,
  Briefcase,
  Users,
  Award,
  ChevronRight,
  HelpCircle,
  Book,
  HeartPulse,
  ShieldCheck,
  Scale,
  MessageSquare,
  FileCheck
} from 'lucide-react';

const transparencyCategories = [
  {
    title: "Prioridades e Destaques",
    icon: <Award size={24} className={styles.categoryIcon} />,
    colorClass: styles.catHighlight,
    modules: [
      { name: "Ordem Cronológica", icon: <Clock size={20} />, href: "/transparencia/ordem-cronologica", desc: "Fila de pagamentos de credores e fornecedores." },
      { name: "Atas de Registro", icon: <FileBox size={20} />, href: "/transparencia/atas-registro", desc: "Preços registrados para futuras compras." },
      { name: "Desonerações Fiscais", icon: <Receipt size={20} />, href: "/transparencia/desoneracoes-fiscais", desc: "Isenções, anistias e benefícios tributários." },
      { name: "Radar da Transparência", icon: <ActivitySquare size={20} />, href: "/transparencia/radar", desc: "Posição do município no ranking nacional." }
    ]
  },
  {
    title: "Legislação e Atos Oficiais",
    icon: <Scale size={24} className={styles.categoryIcon} />,
    colorClass: styles.catHighlight,
    modules: [
      { name: "Leis Municipais", icon: <Scale size={20} />, href: "/transparencia/leis", desc: "Leis Ordinárias, Complementares e Orgânica." },
      { name: "Decretos Executivos", icon: <FileCheck size={20} />, href: "/transparencia/decretos", desc: "Atos normativos assinados pelo Prefeito." },
      { name: "Portarias", icon: <FileBox size={20} />, href: "/transparencia/portarias", desc: "Atos administrativos de gestão interna." },
      { name: "Publicações Legais", icon: <Book size={20} />, href: "/transparencia/publicacoes", desc: "Editais e diários oficiais publicados." }
    ]
  },
  {
    title: "Execução Orçamentária e Fiscal",
    icon: <Landmark size={24} className={styles.categoryIcon} />,
    colorClass: styles.catBudget,
    modules: [
      { name: "Receitas Públicas", icon: <Landmark size={20} />, href: "/transparencia/receitas", desc: "Arrecadação de tributos e repasses." },
      { name: "Despesas Públicas", icon: <FileBox size={20} />, href: "/transparencia/despesas", desc: "Empenhos, liquidações e pagamentos." },
      { name: "Licitações e Contratos", icon: <Briefcase size={20} />, href: "/transparencia/licitacoes", desc: "Processos de compras e contratos firmados." },
      { name: "Convênios e Emendas", icon: <Landmark size={20} />, href: "/transparencia/convenios", desc: "Recursos recebidos via pactos e emendas." }
    ]
  },
  {
    title: "Saúde Pública",
    icon: <HeartPulse size={24} className={styles.categoryIcon} />,
    colorClass: styles.catPeople,
    modules: [
      { name: "Medicamentos SUS", icon: <HeartPulse size={20} />, href: "/transparencia/saude/medicamentos", desc: "Estoque e relação de remédios (REMUME)." },
      { name: "Unidades de Saúde", icon: <Building2 size={20} />, href: "/transparencia/saude/unidades", desc: "UBS, Hospital e pontos de atendimento." },
      { name: "Fila de Espera (Regulação)", icon: <ActivitySquare size={20} />, href: "/transparencia/central-regulacao", desc: "Consultas e exames da rede municipal." }
    ]
  },
  {
    title: "Cidadania e Participação",
    icon: <MessageSquare size={24} className={styles.categoryIcon} />,
    colorClass: styles.catHighlight,
    modules: [
      { name: "e-SIC (Info)", icon: <HelpCircle size={20} />, href: "/e-sic", desc: "Pedido de Acesso à Informação (Lei 12.527)." },
      { name: "Ouvidoria", icon: <MessageSquare size={20} />, href: "/ouvidoria", desc: "Elogios, denúncias e reclamações formais." },
      { name: "Proteção de Dados (LGPD)", icon: <ShieldCheck size={20} />, href: "/lgpd", desc: "Direitos e privacidade do cidadão." },
      { name: "Conselhos Municipais", icon: <Users size={20} />, href: "/transparencia/conselhos", desc: "Participação popular na gestão pública." }
    ]
  },
  {
    title: "Recursos Humanos e Gestão",
    icon: <Users size={24} className={styles.categoryIcon} />,
    colorClass: styles.catPeople,
    modules: [
      { name: "Servidores Públicos", icon: <Users size={20} />, href: "/transparencia/servidores", desc: "Folha de pagamento, cargos e salários." },
      { name: "Diárias e Passagens", icon: <Building2 size={20} />, href: "/transparencia/diarias", desc: "Gastos com servidores em viagem a serviço." },
      { name: "Concursos e Seleções", icon: <Users size={20} />, href: "/transparencia/concursos", desc: "Editais e resultados de processos seletivos." },
      { name: "Obras Públicas", icon: <Landmark size={20} />, href: "/transparencia/obras", desc: "Fiscalização e andamento de obras." }
    ]
  },
  {
    title: "Planejamento e LRF",
    icon: <FileBox size={24} className={styles.categoryIcon} />,
    colorClass: styles.catBudget,
    modules: [
      { name: "Relatórios LRF", icon: <FileBox size={20} />, href: "/transparencia/lrf", desc: "Relatórios RGF e RREO periódicos." },
      { name: "Orçamento (LDO/LOA)", icon: <Landmark size={20} />, href: "/transparencia/orcamento", desc: "PPA, LDO e LOA vigentes." },
      { name: "Patrimônio e Frota", icon: <Building2 size={20} />, href: "/transparencia/patrimonio", desc: "Bens imóveis e veículos municipais." },
      { name: "Dados Abertos", icon: <ActivitySquare size={20} />, href: "/transparencia/dados-abertos", desc: "Arquivos para download estruturado." }
    ]
  }
];

export default function TransparenciaHub() {
  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" }
  ];

  return (
    <div className={styles.transparencyPage}>
      <PageHeader 
        title="Portal da Transparência" 
        description="Portal oficial de acesso à informação. Navegue pelas categorias para acompanhar a legalidade, a economia e os serviços públicos de Lajes Pintadas."
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        
        {/* Superior Panel: PNTP Seal & Global Search */}
        <div className={styles.panelRow}>
          <div className={styles.searchPanel}>
            <h2>Busca de Dados</h2>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={20} />
              <input type="text" placeholder="Leis, licitações, despesas, nomes de servidores..." />
              <button className={styles.searchBtn}>Buscar</button>
            </div>
            <div className={styles.quickTags}>
              <span>Acessos Rápidos:</span> 
              <Link href="/transparencia/leis">Leis</Link>
              <Link href="/transparencia/receitas">Receitas</Link>
              <Link href="/transparencia/licitacoes">Licitações</Link>
              <Link href="/transparencia/servidores">Servidores</Link>
            </div>
          </div>
          
          <div className={styles.sealPanel}>
            <div className={styles.sealBadge}>
              <Award size={28} />
              <span>Nível Ouro/Diamante</span>
            </div>
            <h3>Selo PNTP 2025</h3>
            <p>O Portal da Transparência de Lajes Pintadas atende a **100% dos requisitos** do Programa Nacional de Transparência Pública.</p>
            <a href="https://radar.tce.mt.gov.br/extensao/radar-da-transparencia-publica" target="_blank" rel="noopener noreferrer" className={styles.radarLink}>Ver no Radar Nacional <ChevronRight size={16}/></a>
          </div>
        </div>

        {/* Categories Grid */}
        <div className={styles.categoriesWrapper}>
          {transparencyCategories.map((category, idx) => (
            <section key={idx} className={styles.categorySection}>
              <div className={`${styles.categoryHeader} ${category.colorClass}`}>
                {category.icon}
                <h2>{category.title}</h2>
              </div>
              
              <div className={styles.modulesGrid}>
                {category.modules.map((mod, midx) => (
                  <Link href={mod.href} key={midx} className={styles.moduleCard}>
                    <div className={styles.moduleIcon}>{mod.icon}</div>
                    <div className={styles.moduleInfo}>
                      <h3>{mod.name}</h3>
                      <p>{mod.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}
