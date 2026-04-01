"use client";

import { useState, useMemo } from 'react';
import { 
  Users, Wallet, Calendar, Search, 
  ArrowRight, Info, Building2, Landmark,
  ShieldCheck, ArrowUpRight 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Emendas.module.css';

type Emenda = {
  id: string;
  autor: string;
  partido: string;
  tipo: string;
  ano: number;
  valorPrevisto: number;
  valorEmpenhado: number;
  valorPago: number;
  objeto: string;
  status: string;
};

const MOCK_EMENDAS: Emenda[] = [
  { id: "1", autor: "ROGÉRIO MARINHO", partido: "PL", tipo: "Emenda Individual", ano: 2026, valorPrevisto: 1200000.00, valorEmpenhado: 1200000.00, valorPago: 0, objeto: "Pavimentação asfáltica e drenagem de vias urbanas no Bairro Novo.", status: "Empenhada" },
  { id: "2", autor: "NATÁLIA BONAVIDES", partido: "PT", tipo: "Emenda de Bancada", ano: 2026, valorPrevisto: 850000.00, valorEmpenhado: 850000.00, valorPago: 850000.00, objeto: "Aquisição de equipamentos de saúde para o Centro de Especialidades.", status: "Paga" },
  { id: "3", autor: "GENERAL GIRÃO", partido: "PL", tipo: "Emenda de Relator (RP9)", ano: 2025, valorPrevisto: 500000.00, valorEmpenhado: 500000.00, valorPago: 500000.00, objeto: "Perfuração de poços artesianos na zona rural (Comunidade Malhada).", status: "Paga" },
  { id: "4", autor: "BENES LEOCÁDIO", partido: "UNIÃO", tipo: "Emenda Individual", ano: 2025, valorPrevisto: 300000.00, valorEmpenhado: 0, valorPago: 0, objeto: "Custeio para a área de assistência social - CRAS.", status: "Prevista" },
];

function fmt(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function EmendasClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");

  const filtradas = useMemo(() => {
    return MOCK_EMENDAS.filter(e => {
      const b = busca.toLowerCase();
      const matchAno = e.ano.toString() === ano;
      const matchBusca = !busca || 
        e.autor.toLowerCase().includes(b) || 
        e.objeto.toLowerCase().includes(b) || 
        e.partido.toLowerCase().includes(b);
      return matchAno && matchBusca;
    });
  }, [ano, busca]);

  const stats = useMemo(() => {
    return {
      previsto: filtradas.reduce((s, e) => s + e.valorPrevisto, 0),
      pago: filtradas.reduce((s, e) => s + e.valorPago, 0),
      autores: new Set(filtradas.map(e => e.autor)).size
    };
  }, [filtradas]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(e => ({
      "Autor": `${e.autor} (${e.partido})`,
      "Tipo": e.tipo,
      "Valor Previsto": fmt(e.valorPrevisto),
      "Valor Pago": fmt(e.valorPago),
      "Objeto": e.objeto,
      "Status": e.status
    }));
    const filename = `emendas_parlamentares_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relatório de Emendas Parlamentares - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Emendas Parlamentares" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Emendas Parlamentares"
        description="Acompanhamento detalhado de recursos destinados ao município por deputados e senadores."
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
          onClear={() => { setBusca(""); }}
          onExport={handleExport}
          placeholder="Buscar por parlamentar, partido ou objeto..."
        />

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Users size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{stats.autores}</strong>
              <span className={styles.statLabel}>Parlamentares</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><Landmark size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{fmt(stats.previsto)}</strong>
              <span className={styles.statLabel}>Valor Previsto</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Wallet size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{fmt(stats.pago)}</strong>
              <span className={styles.statLabel}>Valor Pago</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><ShieldCheck size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{stats.previsto > 0 ? ((stats.pago / stats.previsto) * 100).toFixed(1) : "0"}%</strong>
              <span className={styles.statLabel}>Taxa de Execução</span>
            </div>
          </div>
        </div>

        {/* List of Emendas */}
        <div className={styles.emendasList}>
           {filtradas.length > 0 ? filtradas.map(emenda => (
             <div key={emenda.id} className={styles.emendaCard}>
                <div className={styles.cardTop}>
                   <div className={styles.parlamentarSection}>
                      <div className={styles.avatarWrap}>
                         <div className={styles.avatarIcon}><Users size={24}/></div>
                         <div className={styles.partyBadge}>{emenda.partido}</div>
                      </div>
                      <div className={styles.parlamentarInfo}>
                         <h3>{emenda.autor}</h3>
                         <div className={styles.parlamentarMeta}>
                            <span className={styles.typeTag}>{emenda.tipo}</span>
                            <span className={styles.dot} />
                            <span className={styles.statusTag} data-status={emenda.status}>{emenda.status}</span>
                         </div>
                      </div>
                   </div>
                   <div className={styles.valuesSection}>
                      <div className={styles.valItem}>
                         <span className={styles.valLabel}>Valor Previsto</span>
                         <strong className={styles.valTarget}>{fmt(emenda.valorPrevisto)}</strong>
                      </div>
                      <div className={styles.valItem}>
                         <span className={styles.valLabel}>Valor Pago</span>
                         <strong className={styles.valPaid}>{fmt(emenda.valorPago)}</strong>
                      </div>
                   </div>
                </div>

                <div className={styles.oggettoSection}>
                   <div className={styles.objHeader}>
                      <ShieldCheck size={16} /> <strong>Objeto da Emenda</strong>
                   </div>
                   <p className={styles.objText}>"{emenda.objeto}"</p>
                </div>

                <div className={styles.cardFooter}>
                   <div className={styles.importMeta}>
                      <Calendar size={14} /> Dados atualizados via Transferegov • Exercício {emenda.ano}
                   </div>
                   <button className={styles.btnDetail} onClick={() => alert("Acesso ao portal federal simulado.")}>
                      Portal da Transparência Federal <ArrowUpRight size={14} />
                   </button>
                </div>
             </div>
           )) : (
             <div className={styles.emptyState}>
                <Search size={48} />
                <p>Nenhuma emenda parlamentar localizada para este exercício.</p>
             </div>
           )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
