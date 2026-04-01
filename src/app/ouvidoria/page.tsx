import { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare, AlertTriangle, UserPlus, Info, Files, ArrowRight, BarChart2, CheckCircle2, Clock, ThumbsUp } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import styles from './Ouvidoria.module.css';

export const metadata: Metadata = {
  title: "Participação Cidadã: Ouvidoria e e-SIC | Lajes Pintadas",
  description: "Faça sua manifestação, denúncia, sugestão ou solicite informações públicas amparadas pela LAI."
};

const MANIFESTACOES = [
  {
    tipo: "Reclamação ou Denúncia",
    descricao: "Identificou alguma irregularidade ou serviço mal prestado? Faça sua manifestação de forma anônima ou identificada.",
    icon: <AlertTriangle size={30} />,
    href: "/ouvidoria/nova-manifestacao?tipo=denuncia",
    cardColor: styles.cardRed
  },
  {
    tipo: "Solicitação de Serviço",
    descricao: "Peça reparo em iluminação pública, buracos na via, recolhimento de lixo ou manutenção de patrimônio.",
    icon: <Files size={30} />,
    href: "/ouvidoria/nova-manifestacao?tipo=solicitacao",
    cardColor: styles.cardBlue
  },
  {
    tipo: "Sugestão ou Elogio",
    descricao: "Contribuir com a melhoria da cidade ou elogiar o bom atendimento de um setor ou servidor.",
    icon: <MessageSquare size={30} />,
    href: "/ouvidoria/nova-manifestacao?tipo=sugestao",
    cardColor: styles.cardTeal
  },
  {
    tipo: "Acesso à Informação (e-SIC)",
    descricao: "Solicite dados públicos não disponíveis ativamente no portal, regido pela Lei de Acesso à Informação (LAI).",
    icon: <Info size={30} />,
    href: "/e-sic",
    cardColor: styles.cardPurple
  }
];

const STATS_OUVIDORIA = [
  { icon: <MessageSquare size={20} />, valor: "287", label: "Manifestações Recebidas (2025)", color: "#3b82f6" },
  { icon: <CheckCircle2 size={20} />, valor: "94,7%", label: "Taxa de Resolução", color: "#10b981" },
  { icon: <Clock size={20} />, valor: "12,4 dias", label: "Tempo Médio de Resposta", color: "#f59e0b" },
  { icon: <ThumbsUp size={20} />, valor: "87%", label: "Satisfação dos Usuários", color: "#8b5cf6" },
];

export default function OuvidoriaHubPage() {
  const breadcrumbs = [
    { label: "Ouvidoria e Participação" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Ouvidoria e Participação Cidadã"
        description="Este é o seu canal direto com a Prefeitura. Todas as demandas geram um Protocolo Eletrônico com prazo de resposta garantido por lei."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>

        {/* Stats Dashboard */}
        <div className={styles.statsRow}>
          {STATS_OUVIDORIA.map((s, i) => (
            <div key={i} className={styles.statCard} style={{ '--accent': s.color } as React.CSSProperties}>
              <div className={styles.statIcon} style={{ color: s.color }}>{s.icon}</div>
              <div className={styles.statInfo}>
                <strong className={styles.statVal}>{s.valor}</strong>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Helper Banner */}
        <div className={styles.helperBanner}>
          <div className={styles.helperIcon}>
            <UserPlus size={24} />
          </div>
          <div className={styles.helperText}>
            <h2>Bem-vindo à Ouvidoria 100% Digital</h2>
            <p>Escolha abaixo qual o tipo da sua manifestação. O processo leva em média apenas 2 minutos e pode ser acompanhado pelo seu CPF ou via Código de Protocolo.</p>
          </div>
        </div>

        {/* Options Grid */}
        <div className={styles.optionsGrid}>
          {MANIFESTACOES.map((item, idx) => (
            <Link href={item.href} key={idx} className={`${styles.optionCard} ${item.cardColor}`}>
              <div className={styles.cardIcon}>{item.icon}</div>
              <h3>{item.tipo}</h3>
              <p>{item.descricao}</p>

              <div className={styles.cardAction}>
                Registrar agora <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* Informative Sections */}
        <div className={styles.infoRow}>
          <div className={styles.infoBlock}>
            <div className={styles.infoBlockHeader}>
              <BarChart2 size={20} />
              <h3>Acompanhe sua Solicitação</h3>
            </div>
            <p>Já possui um protocolo registrado? Acompanhe o andamento da sua demanda sem filas e burocracia.</p>
            <div className={styles.trackForm}>
              <input type="text" placeholder="Código de Protocolo (ex: OUV-2025-0142)..." className={styles.trackInput} />
              <button className={styles.trackButton}>Consultar</button>
            </div>
            <div className={styles.trackHint}>
              <CheckCircle2 size={13} />
              <span>O código foi enviado para o e-mail cadastrado no momento do registro.</span>
            </div>
          </div>

          <div className={styles.infoBlock}>
            <div className={styles.infoBlockHeader}>
              <Clock size={20} />
              <h3>Prazo de Retorno Legal</h3>
            </div>
            <ul className={styles.prazoList}>
              <li>
                <strong>Ouvidoria (Denúncias/Reclamações):</strong>
                <span>Até 30 dias (prorrogáveis por mais 30).</span>
              </li>
              <li>
                <strong>e-SIC (Lei de Acesso à Informação):</strong>
                <span>Até 20 dias (prorrogáveis por mais 10).</span>
              </li>
              <li>
                <strong>Solicitações de Serviço Urbano:</strong>
                <span>Até 15 dias para análise e encaminhamento.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
