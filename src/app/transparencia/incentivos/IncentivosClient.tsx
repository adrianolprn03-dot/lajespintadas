"use client";

import { useState, useMemo } from 'react';
import { 
  Palette, Music, Film, Search, 
  Download, FileText, Landmark,
  Award, HeartPulse, Info, CheckCircle2, Users 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Incentivos.module.css';

type Incentivo = {
  id: string;
  titulo: string;
  tipo: "CULTURA" | "ESPORTE" | "LAZER";
  lei: string;
  beneficiario: string;
  objeto: string;
  valor: number;
  ano: number;
  status: "PAGO" | "HABILITADO" | "EM_ANALISE";
};

const MOCK_INCENTIVOS: Incentivo[] = [
  { id: "1", titulo: "Edital Lei Paulo Gustavo - Cinema Itinerante", tipo: "CULTURA", lei: "Lei Complementar nº 195/2022", beneficiario: "Associação Cultural de Lajes Pintadas", objeto: "Exibição de filmes em comunidades rurais e oficinas de audiovisual.", valor: 15000.00, ano: 2026, status: "PAGO" },
  { id: "2", titulo: "Incentivo ao Futebol Amador - Copa Juventude", tipo: "ESPORTE", lei: "Lei Municipal nº 750/2018", beneficiario: "Liga Esportiva Municipal", objeto: "Custeio de arbitragem e material esportivo para o campeonato municipal.", valor: 8500.00, ano: 2026, status: "HABILITADO" },
  { id: "3", titulo: "Projeto Música na Praça (Aldir Blanc 2)", tipo: "CULTURA", lei: "Lei Federal nº 14.399/2022", beneficiario: "Artistas Locais Unidos", objeto: "Apresentações musicais semanais no anfiteatro do centro.", valor: 12000.00, ano: 2025, status: "PAGO" },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function IncentivosClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [catFiltro, setCatFiltro] = useState("");

  const filtrados = useMemo(() => {
    return MOCK_INCENTIVOS.filter(i => {
      const matchAno = i.ano.toString() === ano;
      const matchCat = !catFiltro || i.tipo === catFiltro;
      const matchBusca = !busca || 
          i.beneficiario.toLowerCase().includes(busca.toLowerCase()) || 
          i.titulo.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchCat && matchBusca;
    });
  }, [ano, catFiltro, busca]);

  const totalEmpregado = filtrados.reduce((s, i) => s + i.valor, 0);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(i => ({
      "Projeto/Ação": i.titulo,
      "Modalidade": i.tipo,
      "Beneficiário": i.beneficiario,
      "Valor": formatBRL(i.valor),
      "Base Legal": i.lei,
      "Status": i.status
    }));
    if (format === "csv") exportToCSV(payload, "incentivos_culturais_esportivos");
    else if (format === "json") exportToJSON(payload, "incentivos_culturais_esportivos");
    else exportToPDF(payload, "incentivos_culturais_esportivos", "Transparência de Incentivos Culturais e Esportivos");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Incentivos Culturais e Esportivos" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Incentivos Culturais e Esportivos"
        description="Transparência sobre a destinação de recursos para fomento à cultura, arte e esporte no município."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#ec4899' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ec4899' }}><Palette size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(totalEmpregado)}</strong>
              <span className={styles.statLabel}>Investimento Total</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Music size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.filter(i => i.tipo === 'CULTURA').length}</strong>
              <span className={styles.statLabel}>Projetos Culturais</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Award size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.filter(i => i.tipo === 'ESPORTE').length}</strong>
              <span className={styles.statLabel}>Projetos Esportivos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><Users size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{new Set(filtrados.map(i => i.beneficiario)).size}</strong>
              <span className={styles.statLabel}>Beneficiários</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          availableYears={["2026", "2025", "2024"]}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth=""
          onMonthChange={() => {}}
          onClear={() => { setBusca(""); setCatFiltro(""); }}
          onExport={handleExport}
          placeholder="Buscar por beneficiário ou projeto..."
        >
          <select 
            className={styles.customSelect}
            value={catFiltro}
            onChange={(e) => setCatFiltro(e.target.value)}
          >
            <option value="">Todas as Modalidades</option>
            <option value="CULTURA">Cultura (Lei Paulo Gustavo/Aldir Blanc)</option>
            <option value="ESPORTE">Esporte e Juventude</option>
            <option value="LAZER">Lazer e Recreação</option>
          </select>
        </TransparencyFilters>


        {/* Incentivos Grid */}
        <div className={styles.incentivosGrid}>
          {filtrados.length > 0 ? filtrados.map(i => (
            <div key={i.id} className={styles.incentivoCard}>
               <div className={styles.cardHeader}>
                  <span className={styles.typeBadge}>{i.tipo}</span>
                  <span className={styles.yearTag}>Exercício {i.ano}</span>
               </div>
               <div className={styles.cardBody}>
                  <h3>{i.titulo}</h3>
                  <p className={styles.desc}>"{i.objeto}"</p>
                  <div className={styles.beneficiarioBox}>
                     <div className={styles.beneficiarioLabel}>Beneficiário:</div>
                     <div className={styles.beneficiarioName}>{i.beneficiario}</div>
                  </div>
                  <div className={styles.leiInfo} style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#94a3b8' }}>
                     <strong>Base Legal:</strong> {i.lei}
                  </div>
               </div>
               <div className={styles.cardFooter}>
                  <div className={styles.amount}>
                     <span className={styles.amountLabel}>Valor do Incentivo</span>
                     <strong className={styles.amountVal}>{formatBRL(i.valor)}</strong>
                  </div>
                  <div className={styles.statusSection} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: i.status === 'PAGO' ? '#34d399' : '#fbbf24', fontSize: '0.75rem', fontWeight: 700 }}>
                     <CheckCircle2 size={14} /> {i.status}
                  </div>
               </div>
            </div>
          )) : (
            <div className={styles.emptyState}>
               <Info size={48} />
               <p>Nenhum registro de incentivo localizado para os filtros selecionados.</p>
            </div>
          )}
        </div>

        {/* PNTP Legend Banner */}
        <div className={styles.pntpBanner}>
           <div className={styles.bannerIcon}><Award size={32} /></div>
           <div className={styles.bannerText}>
              <h4>Transparência no Fomento Cultural</h4>
              <p>Conforme os requisitos do PNTP 2025, o município deve dar ampla publicidade à aplicação das leis de incentivo federal (Paulo Gustavo e Aldir Blanc) e aos convênios locais de fomento ao esporte.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
