"use client";

import { useState, useMemo } from 'react';
import { 
  FileBadge, Calendar, Download, 
  Search, Info, CheckCircle2, ChevronRight,
  TrendingUp, Scale
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './LRF.module.css';

type RelatorioFiscal = {
  id: string;
  titulo: string;
  tipo: "RREO" | "RGF";
  periodo: string;
  ano: number;
  dataPublicacao: string;
  link: string;
};

const MOCK_LRF: RelatorioFiscal[] = [
  { id: "1", titulo: "RREO - 1º Bimestre", tipo: "RREO", periodo: "Jan-Fev", ano: 2026, dataPublicacao: "2026-03-25", link: "#" },
  { id: "2", titulo: "RGF - 1º Quadrimestre", tipo: "RGF", periodo: "Jan-Abr", ano: 2026, dataPublicacao: "2026-05-15", link: "#" },
  { id: "3", titulo: "RREO - 6º Bimestre", tipo: "RREO", periodo: "Nov-Dez", ano: 2025, dataPublicacao: "2026-01-30", link: "#" },
  { id: "4", titulo: "RGF - 3º Quadrimestre", tipo: "RGF", periodo: "Set-Dez", ano: 2025, dataPublicacao: "2026-01-30", link: "#" },
];

export default function LRFClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [tipoFiltro, setTipoFiltro] = useState("");

  const filtrados = useMemo(() => {
    return MOCK_LRF.filter(r => {
      const matchAno = r.ano.toString() === ano;
      const matchTipo = !tipoFiltro || r.tipo === tipoFiltro;
      const matchBusca = !busca || r.titulo.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchTipo && matchBusca;
    });
  }, [ano, tipoFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(r => ({
      "Relatório": r.titulo,
      "Tipo": r.tipo,
      "Período": r.periodo,
      "Ano": r.ano,
      "Data Publicação": new Date(r.dataPublicacao).toLocaleDateString('pt-BR')
    }));
    if (format === "csv") exportToCSV(payload, "lrf_lajes_pintadas");
    else if (format === "json") exportToJSON(payload, "lrf_lajes_pintadas");
    else exportToPDF(payload, "lrf_lajes_pintadas", "Relatórios de Gestão Fiscal e Execução Orçamentária");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Transparência Fiscal (LRF)" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Transparência Fiscal (LRF)"
        description="Publicação de relatórios técnicos em conformidade com a Lei de Responsabilidade Fiscal (LC 101/2000)."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><FileBadge size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.length}</strong>
              <span className={styles.statLabel}>Total de Relatórios</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><TrendingUp size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.filter(r => r.tipo === 'RREO').length}</strong>
              <span className={styles.statLabel}>RREO Emitidos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Scale size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.filter(r => r.tipo === 'RGF').length}</strong>
              <span className={styles.statLabel}>RGF Emitidos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>100%</strong>
              <span className={styles.statLabel}>Status de Envio</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          availableYears={["2026", "2025", "2024", "2023"]}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth=""
          onMonthChange={() => {}}
          onClear={() => { setBusca(""); setTipoFiltro(""); }}
          onExport={handleExport}
          placeholder="Buscar RREO ou RGF..."
        >
          <select 
            className={styles.customSelect} 
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos os Relatórios</option>
            <option value="RREO">RREO (Execução Orçamentária)</option>
            <option value="RGF">RGF (Gestão Fiscal)</option>
          </select>
        </TransparencyFilters>


        <div className={styles.reportsGrid}>
          {filtrados.length > 0 ? filtrados.map(r => (
            <div key={r.id} className={styles.reportCard}>
               <div className={styles.cardMain}>
                  <div className={`${styles.typeBadge}`} data-type={r.tipo}>{r.tipo}</div>
                  <h3 className={styles.reportTitle}>{r.titulo}</h3>
                  <div className={styles.reportMeta}>
                    <div className={styles.metaItem}><Calendar size={14} /> Ciclo: {r.periodo}</div>
                    <div className={styles.metaItem}><CheckCircle2 size={14} className={styles.checkIcon} /> Publicado em {new Date(r.dataPublicacao).toLocaleDateString('pt-BR')}</div>
                  </div>
               </div>
               <button className={styles.btnDownload} onClick={() => alert("Download simulado.")}>
                  Download Metadados <Download size={14} />
               </button>
            </div>
          )) : (
            <div className={styles.emptyState}>
              <FileBadge size={48} />
              <p>Nenhum relatório técnico encontrado para esta seleção.</p>
            </div>
          )}
        </div>

        <div className={styles.complianceLegend}>
          <Scale size={32} color="#64748b" />
          <div className={styles.legendText}>
            <h4>Controle Social e LRF</h4>
            <p>O RREO e o RGF são instrumentos essenciais para a transparência da gestão fiscal, permitindo à sociedade acompanhar os gastos com pessoal, dívida pública e o cumprimento das metas orçamentárias.</p>
          </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
