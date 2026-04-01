"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ActivitySquare, Stethoscope, TestTube, Cross, Ambulance, Info, Phone, ExternalLink, ListChecks, CheckCircle2, ShieldAlert } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Central.module.css';

const FILAS = [
  { tipo: "Consultas Especializadas", icon: <Stethoscope size={28} />, cardStyle: styles.cardBlue, total: 287, espera: "15 a 60 dias úteis", exemplo: "Cardiologia, Ortopedia..." },
  { tipo: "Exames de Imagem/Lab.", icon: <TestTube size={28} />, cardStyle: styles.cardTeal, total: 143, espera: "7 a 30 dias úteis", exemplo: "Tomografia, Ressonância..." },
  { tipo: "Cirurgias Eletivas", icon: <Cross size={28} />, cardStyle: styles.cardPurple, total: 62, espera: "30 a 120 dias úteis", exemplo: "Herniorrafia, Colelitíase..." },
  { tipo: "Urgências Referenciadas", icon: <Ambulance size={28} />, cardStyle: styles.cardRed, total: 18, espera: "Prioritário (Até 24h)", exemplo: "Casos graves com regulação." },
];

type FilaDetalhada = {
  id: string;
  procedimento: string;
  categoria: string;
  pacientesAguardando: number;
  tempoMedio: string;
  ano: number;
};

const MOCK_DETALHADA: FilaDetalhada[] = [
  { id: "c1", procedimento: "Consulta Ortopédica", categoria: "Consultas Especializadas", pacientesAguardando: 45, tempoMedio: "20 dias", ano: 2026 },
  { id: "c2", procedimento: "Consulta Cardiológica", categoria: "Consultas Especializadas", pacientesAguardando: 78, tempoMedio: "45 dias", ano: 2026 },
  { id: "e1", procedimento: "Tomografia Computadorizada", categoria: "Exames de Imagem/Lab.", pacientesAguardando: 22, tempoMedio: "15 dias", ano: 2026 },
  { id: "e2", procedimento: "Ressonância Magnética", categoria: "Exames de Imagem/Lab.", pacientesAguardando: 60, tempoMedio: "30 dias", ano: 2026 },
  { id: "s1", procedimento: "Cirurgia de Herniorrafia", categoria: "Cirurgias Eletivas", pacientesAguardando: 15, tempoMedio: "90 dias", ano: 2026 },
  { id: "s2", procedimento: "Cirurgia de Catarata", categoria: "Cirurgias Eletivas", pacientesAguardando: 47, tempoMedio: "120 dias", ano: 2026 },
];

export default function CentralRegulacaoClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");

  const procedimentos = MOCK_DETALHADA.filter(d => 
    d.ano.toString() === ano && 
    (!busca || d.procedimento.toLowerCase().includes(busca.toLowerCase()) || d.categoria.toLowerCase().includes(busca.toLowerCase()))
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = procedimentos.map(d => ({
      "Procedimento / Especialidade": d.procedimento,
      "Categoria": d.categoria,
      "Pacientes na Fila": d.pacientesAguardando,
      "Tempo Médio de Espera": d.tempoMedio
    }));
    if (format === "csv") exportToCSV(payload, "filas_de_regulacao");
    else if (format === "json") exportToJSON(payload, "filas_de_regulacao");
    else exportToPDF(payload, "filas_de_regulacao", "Relatório de Filas da Regulação (Conformidade LAI/LGPD)");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Central de Regulação" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader 
        title="Central de Regulação em Saúde" 
        description="Acompanhe as filas de espera agregadas para consultas, exames e cirurgias eletivas no SUS municipal, garantindo equidade e cumprimento da LGPD."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Compliance Warning */}
        <div className={styles.complianceMessage}>
          <Info size={28} className={styles.complianceIcon} />
          <div className={styles.complianceText}>
            <span className={styles.complianceLabel}>Transparência Ativa – Saúde Pública (LGPD)</span>
            <p>A publicação atende à Lei 12.527/2011 (LAI). Os dados pessoais dos pacientes são protegidos e exibidos apenas de forma agregada nesta visão pública. Para consultar sua posição individual, procure sua UBS.</p>
          </div>
        </div>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><ListChecks size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{FILAS.reduce((s,f) => s + f.total, 0)}</strong>
              <span className={styles.statLabel}>Pacientes em Fila</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>88%</strong>
              <span className={styles.statLabel}>Meta de Atendimento</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Stethoscope size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>24 Dias</strong>
              <span className={styles.statLabel}>Média de Espera</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><ShieldAlert size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{FILAS[3].total}</strong>
              <span className={styles.statLabel}>Casos Prioritários</span>
            </div>
          </div>
        </div>

        {/* Queues (Filas) Cards */}
        <div className={styles.queuesGrid}>
          {FILAS.map((fila, idx) => (
            <div key={idx} className={`${styles.queueCard} ${fila.cardStyle}`}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>{fila.icon}</div>
                <h2>{fila.tipo}</h2>
              </div>
              <div className={styles.metricsGrid}>
                <div className={styles.metricBox}>
                  <span className={styles.metricLabel}>Pacientes na Fila</span>
                  <span className={styles.metricValue}>{fila.total}</span>
                </div>
                <div className={styles.metricBox}>
                  <span className={styles.metricLabel}>Espera Média</span>
                  <span className={styles.metricSub}>{fila.espera}</span>
                </div>
              </div>
              <div className={styles.proceduresBox}>
                <span className={styles.proceduresLabel}>Exemplos</span>
                <p>{fila.exemplo}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Procedures List with Filters */}
        <div className={styles.detailsHeader}>
          <ListChecks size={28} color="#0f766e" /> Detalhamento de Filas por Procedimento
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          availableYears={["2026", "2025"]}
          onClear={() => setBusca("")}
          onExport={handleExport}
          currentMonth=""
          onMonthChange={() => {}}
          placeholder="Pesquisar por especialidade ou cirurgia..."
        />

        <div className={styles.listContainer}>
          {procedimentos.length > 0 ? procedimentos.map(item => (
            <div key={item.id} className={styles.listItem}>
               <div className={styles.itemMain}>
                 <h3>{item.procedimento}</h3>
                 <div className={styles.itemMeta}>
                   <span>{item.categoria}</span>
                 </div>
               </div>
               <div className={styles.itemWait}>
                  <span>Espera Prevista</span>
                  <strong>{item.tempoMedio}</strong>
               </div>
               <div className={styles.itemCount}>
                  <span>Pacientes Aguardando</span>
                  <strong>{item.pacientesAguardando}</strong>
               </div>
            </div>
          )) : (
            <div className={styles.emptyState}>Nenhuma fila encontrada para este filtro.</div>
          )}
        </div>

        {/* Info & Contact Blocks */}
        <div className={styles.infoRow} style={{marginTop: '4rem'}}>
          <div className={styles.infoBlock}>
            <h2 className={styles.infoTitle}>
              <ActivitySquare className={styles.infoIconMain} />
              Como Funciona a Regulação
            </h2>
            <div className={styles.infoContent}>
              <p>A <strong>Central de Regulação de Saúde</strong> organiza e garante o acesso equânime dos cidadãos aos serviços de saúde de média e alta complexidade, respeitando critérios clínicos de prioridade e a ordem cronológica.</p>
              <p>O processo inicia com a solicitação do <strong>médico da Atenção Básica (UBS)</strong>. Após triagem e análise por um médico regulador municipal, o caso é enquadrado em grau de risco e inserido no SISREG ou sistema estadual.</p>
              <p>O paciente é notificado imediatamente por telefone ou Agente Comunitário assim que o procedimento for agendado com o prestador.</p>
            </div>
          </div>

          <div className={styles.contactBlock}>
            <h3 className={styles.contactTitle}>Atendimento</h3>
            <div className={styles.contactItems}>
              <div className={styles.contactItem}>
                <span>Secretaria de Regulação</span>
                <p>Secretaria Municipal de Saúde</p>
              </div>
              <div className={styles.contactItem}>
                <span>Horário de Funcionamento</span>
                <p>Segunda a Sexta, 07h às 13h</p>
              </div>
              <a href="tel:8434000000" className={styles.phoneLink}>
                <div className={styles.phoneIcon}><Phone size={16} /></div>
                (84) 3400-0000
              </a>
            </div>
            
            <Link href="/servicos/unidades" className={styles.externalLink}>
              Ver Unidades Básicas (UBS) <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
