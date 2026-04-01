"use client";

import { useState, useMemo } from 'react';
import { 
  Handshake, Building, Calendar, Wallet, 
  ArrowRight, Info, Search, CheckCircle2, 
  XCircle, Clock 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Convenios.module.css';

type Convenio = {
  id: string;
  numero: string;
  objeto: string;
  concedente: string;
  valorRepasse: number;
  contrapartida: number;
  dataInicio: string;
  dataFim: string;
  secretaria: string;
  status: "Vigente" | "Concluído" | "Cancelado";
  ano: number;
};

const MOCK_CONVENIOS: Convenio[] = [
  { id: "1", numero: "950123/2026", objeto: "Reestruturação da rede de iluminação pública por LED em todo o centro urbano.", concedente: "Ministério das Cidades", valorRepasse: 2500000.00, contrapartida: 125000.00, dataInicio: "2026-03-01", dataFim: "2027-03-01", secretaria: "Obras", status: "Vigente", ano: 2026 },
  { id: "2", numero: "882456/2025", objeto: "Construção de Quadra Poliesportiva Coberta na Escola Municipal Maria do Céu.", concedente: "FNDE", valorRepasse: 750000.00, contrapartida: 37500.00, dataInicio: "2025-06-10", dataFim: "2026-06-10", secretaria: "Educação", status: "Vigente", ano: 2026 },
  { id: "3", numero: "771098/2024", objeto: "Aquisição de Patrulha Mecanizada para apoio à agricultura familiar.", concedente: "Governo do Estado / SEDRAF", valorRepasse: 450000.00, contrapartida: 45000.00, dataInicio: "2024-02-15", dataFim: "2025-02-15", secretaria: "Agricultura", status: "Concluído", ano: 2025 },
];

function fmt(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ConveniosClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [statusFiltro, setStatusFiltro] = useState("");

  const filtrados = useMemo(() => {
    return MOCK_CONVENIOS.filter(c => {
      const b = busca.toLowerCase();
      const matchAno = c.ano.toString() === ano;
      const matchStatus = !statusFiltro || c.status === statusFiltro;
      const matchBusca = !busca || 
        c.numero.toLowerCase().includes(b) || 
        c.objeto.toLowerCase().includes(b) || 
        c.concedente.toLowerCase().includes(b);
      return matchAno && matchStatus && matchBusca;
    });
  }, [ano, statusFiltro, busca]);

  const totalRepasse = useMemo(() => filtrados.reduce((s, c) => s + c.valorRepasse, 0), [filtrados]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(c => ({
      "Nº Convênio": c.numero,
      "Concedente": c.concedente,
      "Objeto": c.objeto,
      "Valor Repasse": fmt(c.valorRepasse),
      "Contrapartida": fmt(c.contrapartida),
      "Status": c.status
    }));
    const filename = `convenios_lajes_pintadas_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relatório de Convênios e Repasses - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Convênios" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Convênios e Repasses"
        description="Acompanhe os acordos de cooperação firmados entre o município e outros entes federativos."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth=""
          onMonthChange={() => {}}
          availableYears={["2026", "2025", "2024"]}
          onClear={() => { setBusca(""); setStatusFiltro(""); }}
          onExport={handleExport}
          placeholder="Nº do convênio, objeto ou concedente..."
        >
          <select 
            className={styles.filterSelect}
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos os Status</option>
            <option value="Vigente">Vigente</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </TransparencyFilters>

        {/* Dashboard Resumo */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statsBox} ${styles.sbBlue}`}>
             <div className={styles.sbIcon}><Handshake size={24} /></div>
             <div className={styles.sbInfo}>
                <span className={styles.sbLabel}>ACORDOS ATIVOS</span>
                <strong className={styles.sbValue}>{filtrados.length} Convênios</strong>
             </div>
          </div>
          <div className={`${styles.statsBox} ${styles.sbEmerald}`}>
             <div className={styles.sbIcon}><Wallet size={24} /></div>
             <div className={styles.sbInfo}>
                <span className={styles.sbLabel}>TOTAL EM REPASSES</span>
                <strong className={styles.sbValue}>{fmt(totalRepasse)}</strong>
             </div>
          </div>
        </div>

        {/* List of Convenios */}
        <div className={styles.conveniosList}>
           {filtrados.length > 0 ? filtrados.map(conv => (
             <div key={conv.id} className={styles.convenioCard}>
                <div className={styles.cardHeader}>
                   <div className={styles.titleSection}>
                      <div className={styles.convTypeIcon}><Building size={20} /></div>
                      <div className={styles.convMainInfo}>
                         <h3>Convênio Nº {conv.numero}</h3>
                         <div className={styles.convMeta}>
                            <span>Vigência: {new Date(conv.dataInicio).toLocaleDateString('pt-BR')} a {new Date(conv.dataFim).toLocaleDateString('pt-BR')}</span>
                            <span className={styles.dot} />
                            <span className={styles.secLabel}>{conv.secretaria}</span>
                         </div>
                      </div>
                   </div>
                   <div className={styles.statusBadge} data-status={conv.status}>
                      {conv.status === "Vigente" ? <Clock size={14} /> : conv.status === "Concluído" ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                      {conv.status}
                   </div>
                </div>

                <div className={styles.oggettoSection}>
                   <p className={styles.objText}>"{conv.objeto}"</p>
                </div>

                <div className={styles.footerDetails}>
                   <div className={styles.partnerInfo}>
                      <span className={styles.partnerLabel}>Ente Concedente</span>
                      <strong className={styles.partnerName}>{conv.concedente}</strong>
                   </div>
                   <div className={styles.moneySection}>
                      <div className={styles.moneyItem}>
                         <span className={styles.moneyLabel}>Repasse</span>
                         <strong className={styles.repasseVal}>{fmt(conv.valorRepasse)}</strong>
                      </div>
                      <div className={styles.moneyItem}>
                         <span className={styles.moneyLabel}>Contrapartida</span>
                         <strong className={styles.contrapartidaVal}>{fmt(conv.contrapartida)}</strong>
                      </div>
                   </div>
                </div>

                <div className={styles.actionRow}>
                   <button className={styles.btnDetail} onClick={() => alert("Visualização de instrumento simulada.")}>
                      Ver Instrumento na Íntegra <ArrowRight size={14} />
                   </button>
                </div>
             </div>
           )) : (
             <div className={styles.emptyState}>
                <Handshake size={48} />
                <p>Nenhum convênio localizado para os critérios selecionados.</p>
             </div>
           )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
