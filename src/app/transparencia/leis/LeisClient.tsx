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
import styles from './Leis.module.css';

type Lei = {
  id: string;
  numero: string;
  ano: string;
  tipo: "Ordinária" | "Complementar" | "Orgânica";
  ementa: string;
  data: string;
  status: "Vigente" | "Revogada" | "Alterada";
};

const MOCK_LEIS: Lei[] = [
  { id: "1", numero: "450/2023", ano: "2023", tipo: "Ordinária", ementa: "Dispõe sobre o Plano Plurianual para o quadriênio 2024-2027.", data: "2023-11-15", status: "Vigente" },
  { id: "2", numero: "012/2023", ano: "2023", tipo: "Complementar", ementa: "Altera o Código Tributário Municipal e dá outras providências.", data: "2023-10-10", status: "Vigente" },
  { id: "3", numero: "448/2023", ano: "2023", tipo: "Ordinária", ementa: "Estima a receita e fixa a despesa para o exercício de 2024 (LOA).", data: "2023-12-01", status: "Vigente" },
  { id: "4", numero: "445/2022", ano: "2022", tipo: "Ordinária", ementa: "Denomina logradouro público oficial.", data: "2022-05-20", status: "Vigente" },
];

export default function LeisClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2024");
  const [tipoFiltro, setTipoFiltro] = useState("");

  const filtradas = useMemo(() => {
    return MOCK_LEIS.filter(lei => {
      const matchAno = !ano || lei.ano === ano;
      const matchTipo = !tipoFiltro || lei.tipo === tipoFiltro;
      const matchBusca = !busca || lei.numero.includes(busca) || lei.ementa.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchTipo && matchBusca;
    });
  }, [ano, tipoFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(l => ({ "Número": l.numero, "Tipo": l.tipo, "Ementa": l.ementa, "Data": l.data, "Status": l.status }));
    const filename = `leis_municipais_lajes_pintadas_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Leis Municipais - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Legislação", href: "/transparencia/legislacao" },
    { label: "Leis Municipais" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Leis Municipais"
        description="Acesse a legislação oficial do município: Leis Ordinárias, Complementares e a Lei Orgânica Municipal."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as any}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Gavel size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_LEIS.length}</strong>
              <span className={styles.statLabel}>Total de Atos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as any}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_LEIS.filter(l => l.ano === '2023').length}</strong>
              <span className={styles.statLabel}>Publicadas em 2023</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as any}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><FileText size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>05</strong>
              <span className={styles.statLabel}>Leis Complementares</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as any}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><Info size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>100%</strong>
              <span className={styles.statLabel}>Índice de Transparência</span>
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
          onClear={() => { setBusca(""); setAno("2024"); setTipoFiltro(""); }}
          onExport={handleExport}
          availableYears={["2024", "2023", "2022", "2021", "2020"]}
          placeholder="Número da lei ou termo da ementa..."
        >
          <select 
            className="flex-1 bg-white border border-gray-200 p-3 rounded-lg font-bold text-sm outline-none"
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos os Tipos</option>
            <option value="Ordinária">Leis Ordinárias</option>
            <option value="Complementar">Leis Complementares</option>
            <option value="Orgânica">Lei Orgânica</option>
          </select>
        </TransparencyFilters>

        {/* Results Table */}
        <div className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.resultsTable}>
              <thead>
                <tr>
                  <th>Número/Ano</th>
                  <th>Tipo</th>
                  <th>Ementa</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.length > 0 ? filtradas.map(lei => (
                  <tr key={lei.id}>
                    <td className={styles.numeroCell}>
                      <strong>{lei.numero}</strong>
                    </td>
                    <td><span className={styles.typeBadge}>{lei.tipo}</span></td>
                    <td className={styles.ementaCell}>{lei.ementa}</td>
                    <td>{new Date(lei.data).toLocaleDateString('pt-BR')}</td>
                    <td>
                      <button className={styles.btnDownload} title="Baixar PDF">
                        <Download size={16} /> PDF
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className={styles.noResults}>
                      Nenhuma lei encontrada para os filtros selecionados.
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
