"use client";

import { useState, useMemo } from 'react';
import { 
  FileText, Search, Download, Gavel, 
  Calendar, CheckCircle2, Info, User
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Portarias.module.css';

type Portaria = {
  id: string;
  numero: string;
  ano: string;
  ementa: string;
  data: string;
  status: "Publicado" | "Revogado";
};

const MOCK_PORTARIAS: Portaria[] = [
  { id: "1", numero: "010/2024", ano: "2024", ementa: "Nomeia o Secretário Municipal de Administração.", data: "2024-01-05", status: "Publicado" },
  { id: "2", numero: "011/2024", ano: "2024", ementa: "Concede licença prêmio a servidor público municipal.", data: "2024-01-10", status: "Publicado" },
  { id: "3", numero: "450/2023", ano: "2023", ementa: "Nomeia comissão de licitação para o exercício 2024.", data: "2023-12-28", status: "Publicado" },
];

export default function PortariasClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2024");

  const filtradas = useMemo(() => {
    return MOCK_PORTARIAS.filter(p => {
      const matchAno = !ano || p.ano === ano;
      const matchBusca = !busca || p.numero.includes(busca) || p.ementa.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchBusca;
    });
  }, [ano, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(p => ({ "Número": p.numero, "Ementa": p.ementa, "Data": p.data, "Status": p.status }));
    const filename = `portarias_lajes_pintadas_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Portarias Municipais - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Legislação", href: "/transparencia/legislacao" },
    { label: "Portarias" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Portarias"
        description="Acesse as Portarias Administrativas publicadas pela Prefeitura Municipal."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as any}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><FileText size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_PORTARIAS.length}</strong>
              <span className={styles.statLabel}>Total de Portarias</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as any}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><User size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>12</strong>
              <span className={styles.statLabel}>Atos de RH</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as any}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>05</strong>
              <span className={styles.statLabel}>Concessões</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as any}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Info size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>100%</strong>
              <span className={styles.statLabel}>Publicidade</span>
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
          placeholder="Número da portaria ou termo da ementa..."
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
                {filtradas.length > 0 ? filtradas.map(p => (
                  <tr key={p.id}>
                    <td className={styles.numeroCell}>
                      <strong>{p.numero}</strong>
                    </td>
                    <td className={styles.ementaCell}>{p.ementa}</td>
                    <td>{new Date(p.data).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button className={styles.btnDownload} title="Baixar PDF">
                        <Download size={16} /> PDF
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className={styles.noResults}>
                      Nenhuma portaria encontrada para os filtros selecionados.
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
