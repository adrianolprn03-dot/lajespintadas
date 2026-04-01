import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Users, Wallet, Briefcase, UserCheck, 
  UserPlus, GraduationCap, ShieldCheck, ExternalLink 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import styles from './Servidores.module.css';

export const metadata: Metadata = {
  title: "Quadro de Pessoal | Lajes Pintadas",
  description: "Portal central de Recursos Humanos: consulte a folha de pagamento, cargos, remunerações e concursos."
};

const CATEGORIES = [
  {
    title: "Folha de Pagamento",
    desc: "Consulta detalhada de servidores, cargos e remunerações mensais.",
    icon: <Wallet />,
    href: "/transparencia/servidores/folha-pagamento",
    badge: "PNTP GOLD",
    color: "#059669"
  },
  {
    title: "Agentes Políticos",
    desc: "Subsídios de Prefeito, Vice, Secretários e demais agentes políticos.",
    icon: <ShieldCheck />,
    href: "/transparencia/servidores/agentes-politicos",
    badge: "LAI",
    color: "#3b82f6"
  },
  {
    title: "Cargos e Salários",
    desc: "Tabelas de vencimentos, referências e descrição de cargos públicos.",
    icon: <Briefcase />,
    href: "/transparencia/servidores/cargos-e-salarios",
    badge: "LRF",
    color: "#8b5cf6"
  },
  {
    title: "Terceirizados",
    desc: "Relação de prestadores de serviço e postos de trabalho contratados.",
    icon: <UserCheck />,
    href: "/transparencia/servidores/terceirizados",
    badge: "PNTP 2025",
    color: "#f59e0b"
  },
  {
    title: "Estagiários",
    desc: "Informações sobre programas de estágio e estudantes ativos.",
    icon: <GraduationCap />,
    href: "/transparencia/servidores/estagiarios",
    badge: "LAI",
    color: "#ec4899"
  },
  {
    title: "Concursos e Seleções",
    desc: "Editais, resultados e convocações de processos seletivos.",
    icon: <UserPlus />,
    href: "/transparencia/concursos",
    badge: "DADOS ABERTOS",
    color: "#6366f1"
  }
];

export default function ServidoresHubPage() {
  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Quadro de Pessoal" }
  ];

  return (
    <div className={styles.hubWrapper}>
      <PageHeader
        title="Quadro de Pessoal"
        description="Transparência total sobre a gestão de pessoas e remunerações do município."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.gridContainer}`}>
        <div className={styles.cardGrid}>
          {CATEGORIES.map((cat, idx) => (
            <Link key={idx} href={cat.href} className={styles.catCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconBox} style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                  {cat.icon}
                </div>
                <div className={styles.cardBadge}>{cat.badge}</div>
              </div>
              
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.desc}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.clickLabel}>Acessar Módulo</span>
                <div className={styles.dotLine}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* External Systems Note */}
        <div className={styles.infoBanner}>
          <div className={styles.bannerIcon}><ShieldCheck size={24} /></div>
          <div className={styles.bannerText}>
            <h4>Segurança e Privacidade (LGPD)</h4>
            <p>Todos os dados de remuneração são publicados em conformidade com a Lei de Acesso à Informação, com mascaramento de dados sensíveis para proteção à privacidade dos servidores.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
