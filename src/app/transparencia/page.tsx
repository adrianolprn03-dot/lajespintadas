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
  Book
} from 'lucide-react';

const transparencyCategories = [
  {
    title: "Prioridades e Destaques",
    icon: <Award size={24} className={styles.categoryIcon} />,
    colorClass: styles.catHighlight,
    modules: [
      { name: "Central de Regulação", icon: <ActivitySquare size={20} />, href: "/transparencia/central-regulacao", desc: "Fila de espera do SUS, exames e consultas." },
      { name: "Ordem Cronológica", icon: <Clock size={20} />, href: "/transparencia/ordem-cronologica", desc: "Fila de pagamentos de credores e fornecedores." },
      { name: "Desonerações Fiscais", icon: <Receipt size={20} />, href: "/transparencia/desoneracoes-fiscais", desc: "Isenções, anistias e benefícios tributários." },
      { name: "Atas de Registro", icon: <FileBox size={20} />, href: "/transparencia/atas-registro", desc: "Preços registrados para futuras compras." }
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
    title: "Planejamento e Gestão (LRF)",
    icon: <FileBox size={24} className={styles.categoryIcon} />,
    colorClass: styles.catBudget,
    modules: [
      { name: "Relatórios LRF", icon: <FileBox size={20} />, href: "/transparencia/lrf", desc: "Relatórios RGF e RREO (Gestão Fiscal)." },
      { name: "Orçamento (LDO/LOA)", icon: <Landmark size={20} />, href: "/transparencia/orcamento", desc: "PPA, LDO e LOA (Planejamento Anual)." },
      { name: "Prestação de Contas", icon: <Award size={20} />, href: "/transparencia/prestacao-contas", desc: "Contas anuais do Prefeito e do Município." },
      { name: "Dados Abertos", icon: <ActivitySquare size={20} />, href: "/transparencia/dados-abertos", desc: "Arquivos estruturados para livre uso." }
    ]
  },
  {
    title: "Recursos Humanos & Cidadania",
    icon: <Users size={24} className={styles.categoryIcon} />,
    colorClass: styles.catPeople,
    modules: [
      { name: "Servidores Públicos", icon: <Users size={20} />, href: "/transparencia/servidores", desc: "Folha de pagamento, cargos e salários." },
      { name: "Diárias e Passagens", icon: <Building2 size={20} />, href: "/transparencia/diarias", desc: "Gastos com servidores em viagem a serviço." },
      { name: "Incentivos Culturais", icon: <Award size={20} />, href: "/transparencia/incentivos", desc: "Recursos para cultura (Lei Paulo Gustavo)." },
      { name: "Obras Públicas", icon: <Landmark size={20} />, href: "/transparencia/obras", desc: "Andamento, fotos e medições de obras." },
      { name: "Conselhos Municipais", icon: <Users size={20} />, href: "/transparencia/conselhos", desc: "Composição e atas dos conselhos de gestão." }
    ]
  },
  {
    title: "Transparência Ativa e Apoio",
    icon: <HelpCircle size={24} className={styles.categoryIcon} />,
    colorClass: styles.catHighlight,
    modules: [
      { name: "Glossário", icon: <Book size={20} />, href: "/transparencia/glossario", desc: "Dicionário de termos técnicos e financeiros." },
      { name: "Dúvidas Frequentes", icon: <HelpCircle size={20} />, href: "/transparencia/faq", desc: "Respostas rápidas para as principais dúvidas." },
      { name: "Radar Nacional", icon: <ActivitySquare size={20} />, href: "/transparencia/radar", desc: "Posição do município no ranking nacional." }
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
        description="Acompanhe em tempo real a execução fiscal e orçamentária do município. Aqui você encontra dados abertos sobre receitas, despesas, contratos e servidores, garantindo o seu direito de acesso à informação (Lei nº 12.527/2011)."
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        
        {/* Superior Panel: PNTP Seal & Global Search */}
        <div className={styles.panelRow}>
          <div className={styles.searchPanel}>
            <h2>O que você procura?</h2>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={20} />
              <input type="text" placeholder="Buscar por portarias, licitações, despesas..." />
              <button className={styles.searchBtn}>Localizar</button>
            </div>
            <div className={styles.quickTags}>
              <span>Sugestões:</span> 
              <Link href="/transparencia/ordem-cronologica">pagamentos</Link>
              <Link href="#">diárias</Link>
              <Link href="#">contratos</Link>
            </div>
          </div>
          
          <div className={styles.sealPanel}>
            <div className={styles.sealBadge}>
              <Award size={28} />
              <span>Transparência Integrada</span>
            </div>
            <h3>Selo Diamante PNTP</h3>
            <p>O Portal da Transparência de Lajes Pintadas atende a **100% dos requisitos** do Programa Nacional de Transparência Pública (PNTP).</p>
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
