import { Metadata } from 'next';
import Link from 'next/link';
import { Activity, Star, ShieldAlert, Info, ExternalLink, BarChart3, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Radar.module.css';

export const metadata: Metadata = {
  title: "Radar da Transparência Pública | Lajes Pintadas",
  description: "Acompanhe a avaliação de conformidade do município no Programa Nacional de Transparência Pública (ATRICON/TCU)."
};

const DIMENSOES = [
  {
    nome: "Receitas e Despesas",
    descricao: "Publicação fluída de receitas, liquidações e pagamentos em tempo real.",
    criterios: ["Receitas por categoria", "Fornecedor identificado", "Exportação aberta", "Tempo Real"],
    cor: styles.dimBlue
  },
  {
    nome: "Licitações e Contratos",
    descricao: "Acesso a editais, certames, contratos e aditivos padronizados.",
    criterios: ["Editais completos", "Resultado publicado", "Contratos vigentes", "Íntegras Pdfs"],
    cor: styles.dimPurple
  },
  {
    nome: "Folha de Pagamento",
    descricao: "Relação de servidores, cargos e remunerações individualizadas.",
    criterios: ["Nome e Matrícula", "Remuneração bruta", "Diárias pagas", "Descontos legais"],
    cor: styles.dimTeal
  },
  {
    nome: "Acesso à Informação (e-SIC)",
    descricao: "Canal passivo de solicitação de informação e estatísticas anuais.",
    criterios: ["Formulário digital", "Protocolo de Rastreio", "Prazo Legal (20d)", "Relatório estatístico"],
    cor: styles.dimOrange
  },
  {
    nome: "Instrumentos de Planejamento",
    descricao: "Publicação do PPA, LDO, LOA e execução orçamentária fiscal bimestral.",
    criterios: ["LDO / LOA / PPA", "Relatórios RGF", "Relatórios RREO", "Audiências Públicas"],
    cor: styles.dimRed
  },
  {
    nome: "Acessibilidade e Tecnologia",
    descricao: "Portal responsivo (Mobile-First) adaptado para todos os cidadãos.",
    criterios: ["WCAG 2.1 AA", "Alto Contraste", "Auditoria de UI", "Carga super Rápida"],
    cor: styles.dimGray
  }
];

export default function RadarPage() {
  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Radar da Transparência" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Radar da Transparência Pública"
        description="Acompanhe a avaliação do nosso município no Programa Nacional de Transparência da Associação dos Membros dos Tribunais de Contas do Brasil."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Star size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>Ouro</strong>
              <span className={styles.statLabel}>Selo Previsto</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Activity size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>92.45%</strong>
              <span className={styles.statLabel}>Índice de Transparência</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>108 / 115</strong>
              <span className={styles.statLabel}>Critérios Atendidos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><ShieldAlert size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>25/03/2026</strong>
              <span className={styles.statLabel}>Última Auditoria</span>
            </div>
          </div>
        </div>

        
        {/* Main Banner Hero */}
        <div className={styles.heroBanner}>
          <div className={styles.heroBackdrop}></div>
          <div className={styles.heroContent}>
            
            <div className={styles.heroTextContent}>
              <div className={styles.pntpTag}>
                <Star size={14} className={styles.starIcon} /> 
                PNTP 2025 - Programa Nacional de Transparência
              </div>
              <h2>Compromisso com o Selo Ouro</h2>
              <p>O Radar Nacional (PNTP) avalia periodicamente os portais governamentais utilizando robôs automatizados do TCU para checar 100% de conformidade com a LAI e a LRF. Nossa arquitetura web e banco de dados foram reconstruídos este ano inteiramente focados em gabaritar este prêmio.</p>
              
              <Link
                href="https://radardatransparencia.atricon.org.br"
                target="_blank"
                className={styles.pntpBtn}
              >
                Acessar Portal da ATRICON <ExternalLink size={16} />
              </Link>
            </div>

            <div className={styles.heroEmblemWrap}>
              <div className={styles.heroEmblem}>
                <ShieldAlert size={48} className={styles.emblemIcon} />
                <span className={styles.emblemMeta}>Meta Oficial</span>
                <span className={styles.emblemTitle}>OURO</span>
                <span className={styles.emblemYear}>Exercício 2025/2026</span>
              </div>
            </div>

          </div>
        </div>

        {/* Warning Toast */}
        <div className={styles.warningToast}>
          <Info size={24} className={styles.toastIcon} />
          <p>
            As avaliações ocorrem nos ciclos de controle externo. Os resultados oficiais, quando emitidos e validados pela corte de contas (TCE-RN), serão ancorados em tempo real nesta página através das APIs federais de compliance.
          </p>
        </div>

        {/* Dimension Title */}
        <div className={styles.sectionHeader}>
          <Activity size={24} className={styles.shIcon} />
          <h3>Dimensões Críticas Avaliadas pelo Robô</h3>
        </div>

        {/* Dimension Cards */}
        <div className={styles.dimGrid}>
          {DIMENSOES.map((dim, idx) => (
            <div key={idx} className={`${styles.dimCard} ${dim.cor}`}>
              
              <div className={styles.dimCardHeader}>
                <div className={styles.dimIconWrap}>
                  <BarChart3 size={20} />
                </div>
                <h4>{dim.nome}</h4>
              </div>
              
              <p className={styles.dimDesc}>{dim.descricao}</p>
              
              <ul className={styles.criteriosList}>
                {dim.criterios.map((crit, cIdx) => (
                  <li key={cIdx}>
                    <CheckCircle2 size={12} className={styles.checkIcon} />
                    {crit}
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
