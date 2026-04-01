"use client";

import { useState } from 'react';
import { 
  Receipt, ShieldCheck, Download, Info, 
  Search, FileText, Landmark, Percent,
  TrendingDown, CheckCircle2 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Desoneracoes.module.css';

type Desoneracao = {
  id: string;
  titulo: string;
  tipo: "ISENCAO" | "ANISTIA" | "REMISSÃO" | "SUBSÍDIO";
  descricao: string;
  lei: string;
  impactoEstimado: number;
  status: "VIGENTE" | "ENCERRADO";
  ano: number;
};

const MOCK_DESONERACOES: Desoneracao[] = [
  { id: "1", titulo: "Isenção de IPTU para Aposentados", tipo: "ISENCAO", descricao: "Isenção total do imposto predial para cidadãos com renda de até 2 salários mínimos e único imóvel.", lei: "Lei Municipal nº 850/2020", impactoEstimado: 45000.00, status: "VIGENTE", ano: 2026 },
  { id: "2", titulo: "Programa de Recuperação Fiscal (REFIS 2025)", tipo: "ANISTIA", descricao: "Anistia de multas e juros para pagamento de débitos tributários consolidados até 2024.", lei: "Lei Municipal nº 912/2025", impactoEstimado: 120000.00, status: "VIGENTE", ano: 2026 },
  { id: "3", titulo: "Subsídio ao Transporte Escolar Universitário", tipo: "SUBSÍDIO", descricao: "Custeio parcial de transporte para estudantes em cursos de graduação em outras cidades.", lei: "Lei Municipal nº 780/2018", impactoEstimado: 85000.00, status: "VIGENTE", ano: 2025 },
  { id: "4", titulo: "Anistia de Taxas de Licenciamento (Pandemia)", tipo: "ANISTIA", descricao: "Perdão de taxas de licenciamento para microempreendedores individuais no período crítico.", lei: "Lei Municipal nº 810/2021", impactoEstimado: 12000.00, status: "ENCERRADO", ano: 2024 },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function DesoneracoesClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");

  const filtrados = MOCK_DESONERACOES.filter(d => 
    d.ano.toString() === ano && 
    (!busca || d.titulo.toLowerCase().includes(busca.toLowerCase()) || d.tipo.toLowerCase().includes(busca.toLowerCase()))
  );

  const totalImpacto = filtrados.reduce((s, d) => s + d.impactoEstimado, 0);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(d => ({
      "Benefício": d.titulo,
      "Modalidade": d.tipo,
      "Base Legal": d.lei,
      "Impacto Financeiro": formatBRL(d.impactoEstimado),
      "Situação": d.status
    }));
    if (format === "csv") exportToCSV(payload, "desoneracoes_fiscais");
    else if (format === "json") exportToJSON(payload, "desoneracoes_fiscais");
    else exportToPDF(payload, "desoneracoes_fiscais", "Relatório de Desonerações e Renúncias Fiscais");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Desonerações Fiscais" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Desonerações Fiscais e Renúncias"
        description="Transparência sobre isenções, anistias e remissões que impactam a receita municipal em prol do desenvolvimento social."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><TrendingDown size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(totalImpacto)}</strong>
              <span className={styles.statLabel}>Renúncia Estimada</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><FileText size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.filter(d => d.status === 'VIGENTE').length}</strong>
              <span className={styles.statLabel}>Instrumentos Ativos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><ShieldCheck size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>450</strong>
              <span className={styles.statLabel}>Cidadãos Beneficiados</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Landmark size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>OK</strong>
              <span className={styles.statLabel}>Meta de Responsabilidade</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          availableYears={["2026", "2025", "2024"]}
          onClear={() => setBusca("")}
          onExport={handleExport}
          currentMonth=""
          onMonthChange={() => {}}
          placeholder="Pesquisar por benefício ou lei..."
        />

        {/* Categories Grid (Benefits) */}
        <div className={styles.benefitsGrid}>
          {filtrados.length > 0 ? filtrados.map(benefit => (
            <div key={benefit.id} className={styles.benefitCard}>
              <div className={styles.cardTop}>
                <span className={styles.typeBadge}>{benefit.tipo}</span>
                <span className={styles.statusTag} style={{ color: benefit.status === 'VIGENTE' ? '#10b981' : '#94a3b8' }}>
                  <CheckCircle2 size={14} /> {benefit.status}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3>{benefit.titulo}</h3>
                <p className={styles.desc}>{benefit.descricao}</p>
                <div className={styles.legalSection}>
                  <Landmark size={20} color="#64748b" />
                  <div className={styles.legalText}>
                    <span>Base Legal Oficial:</span><br/>
                    <strong>{benefit.lei}</strong>
                  </div>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.impact}>
                  <span className={styles.impactLabel}>Impacto na Receita</span>
                  <strong className={styles.impactVal}>{formatBRL(benefit.impactoEstimado)}</strong>
                </div>
                <button className={styles.btnDoc} onClick={() => alert("Visualização de justificativa legal simulada.")}>
                   Lei <FileText size={14} />
                </button>
              </div>
            </div>
          )) : (
            <div className={styles.empty}>Nenhum registro de desoneração localizado para este exercício.</div>
          )}
        </div>

        {/* LRF Compliance Legend */}
        <div className={styles.complianceLegend}>
          <div className={styles.legendIcon}>
            <Percent size={32} color="#fbbf24" />
          </div>
          <div className={styles.legendText}>
            <h4>Transparência da Renúncia de Receita</h4>
            <p>Conforme o Art. 14 da Lei de Responsabilidade Fiscal (LC 101/2000), toda renúncia de receita deve vir acompanhada de estimativa do impacto orçamentário-financeiro e demonstração de que a medida não afetará as metas de resultados fiscais.</p>
          </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
