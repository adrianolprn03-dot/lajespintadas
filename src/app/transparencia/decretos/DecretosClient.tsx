"use client";

import { useState, useMemo } from 'react';
import { 
  FileText, Search, Download, Gavel, 
  Calendar, CheckCircle2, Info, AlertTriangle 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Decretos.module.css';

type Decreto = {
  id: string;
  numero: string;
  ano: string;
  ementa: string;
  data: string;
  status: "Publicado" | "Revogado" | "Alterado";
};

const MOCK_DECRETOS: Decreto[] = [
  { id: "1", numero: "045/2024", ano: "2024", ementa: "Dispõe sobre a programação financeira para o exercício de 2024.", data: "2024-01-02", status: "Publicado" },
  { id: "2", numero: "044/2023", ano: "2023", ementa: "Nomeia membros do conselho municipal de saúde.", data: "2023-12-15", status: "Publicado" },
  { id: "3", numero: "043/2023", ano: "2023", ementa: "Declarado ponto facultativo nas repartições públicas municipais.", data: "2023-11-20", status: "Publicado" },
];

export default function DecretosClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2024");

  const filtradas = useMemo(() => {
    return MOCK_DECRETOS.filter(d => {
      const matchAno = !ano || d.ano === ano;
      const matchBusca = !busca || d.numero.includes(busca) || d.ementa.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchBusca;
    });
  }, [ano, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(d => ({ "Número": d.numero, "Ementa": d.ementa, "Data": d.data, "Status": d.status }));
    const filename = `decretos_municipais_lajes_pintadas_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Decretos Municipais - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Legislação", href: "/transparencia/legislacao" },
    { label: "Decretos" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Decretos Municipais"
        description="Consulte os Decretos do Poder Executivo publicados oficialmente."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as any}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Gavel size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_DECRETOS.length}</strong>
              <span className={styles.statLabel}>Total de Decretos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as any}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_DECRETOS.filter(d => d.ano === '2024').length}</strong>
              <span className={styles.statLabel}>Publicadas em 2024</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as any}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><FileText size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>02</strong>
              <span className={styles.statLabel}>Prazos Vigentes</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as any}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><Info size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>100%</strong>
              <span className={styles.statLabel}>Consolidação</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth=""
          onMonthChange={() => {}}
          onClear={() => { setBusca(""); setAno("2024"); }}
          onExport={handleExport}
          availableYears={["2024", "2023", "2022", "2021"]}
          placeholder="Número do decreto ou termo da ementa..."
        />

        {/* Results Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th>Número/Ano</th>
                  <th>Ementa</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.length > 0 ? filtradas.map(d => (
                  <tr key={d.id}>
                    <td className={styles.numeroCell}>
                      <strong>{d.numero}</strong>
                    </td>
                    <td className={styles.ementaCell}>{d.ementa}</td>
                    <td>{new Date(d.data).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button className={styles.btnDownload} title="Baixar PDF">
                        <Download size={16} /> PDF
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className={styles.noResults}>
                      Nenhum decreto encontrado para os filtros selecionados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
