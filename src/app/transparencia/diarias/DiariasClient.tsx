"use client";

import { useState, useMemo } from 'react';
import { 
  Plane, User, MapPin, Calendar, Wallet, 
  ArrowRight, Info, Search, Building2, Briefcase
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Diarias.module.css';

type Diaria = {
  id: string;
  servidor: string;
  cargo: string;
  destino: string;
  motivo: string;
  dataInicio: string;
  dataFim: string;
  valorTotal: number;
  quantidade: number;
  secretaria: string;
  ano: number;
  mes: string;
};

const MOCK_DIARIAS: Diaria[] = [
  { id: "1", servidor: "JOSE ALBERTINO DA SILVA", cargo: "Motorista", destino: "Natal/RN", motivo: "Transporte de pacientes para exames de alta complexidade em clínicas conveniadas.", dataInicio: "2026-03-10", dataFim: "2026-03-10", valorTotal: 80.00, quantidade: 1, secretaria: "Saúde", ano: 2026, mes: "03" },
  { id: "2", servidor: "MARIA DAS GRAÇAS MOURA", cargo: "Secretária de Educação", destino: "Brasília/DF", motivo: "Participação no Fórum Nacional de Dirigentes Municipais de Educação (UNDIME).", dataInicio: "2026-03-15", dataFim: "2026-03-18", valorTotal: 1850.00, quantidade: 3.5, secretaria: "Educação", ano: 2026, mes: "03" },
  { id: "3", servidor: "RICARDO PEREIRA LIMA", cargo: "Assessor Técnico", destino: "Caicó/RN", motivo: "Vistoria técnica em equipamentos de infraestrutura hídrica na zona rural.", dataInicio: "2026-02-22", dataFim: "2026-02-22", valorTotal: 120.00, quantidade: 1, secretaria: "Obras", ano: 2026, mes: "02" },
  { id: "4", servidor: "ANA LUCIA FERREIRA", cargo: "Prefeita Municipal", destino: "Natal/RN", motivo: "Audiência na governadoria para assinatura de convênios de pavimentação.", dataInicio: "2026-01-12", dataFim: "2026-01-12", valorTotal: 150.00, quantidade: 1, secretaria: "Gabinete", ano: 2026, mes: "01" },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function DiariasClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [mes, setMes] = useState("");
  const [secretaria, setSecretaria] = useState("");

  const filtradas = useMemo(() => {
    return MOCK_DIARIAS.filter(d => {
      const b = busca.toLowerCase();
      const matchAno = d.ano.toString() === ano;
      const matchMes = !mes || d.mes === mes;
      const matchSec = !secretaria || d.secretaria === secretaria;
      const matchBusca = !busca || 
        d.servidor.toLowerCase().includes(b) || 
        d.destino.toLowerCase().includes(b) || 
        d.motivo.toLowerCase().includes(b);
      return matchAno && matchMes && matchSec && matchBusca;
    });
  }, [ano, mes, secretaria, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(d => ({
      "Favorecido": d.servidor,
      "Cargo": d.cargo,
      "Destino": d.destino,
      "Missão": d.motivo,
      "Período": `${new Date(d.dataInicio).toLocaleDateString('pt-BR')} a ${new Date(d.dataFim).toLocaleDateString('pt-BR')}`,
      "Valor": formatBRL(d.valorTotal)
    }));
    const filename = `diarias_lajes_pintadas_${ano}_${mes || 'todos'}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relatório de Concessão de Diárias - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Diárias" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Diárias de Viagem"
        description="Consulte os valores pagos a servidores e agentes públicos para cobertura de despesas em missões oficiais."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Wallet size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filtradas.reduce((s,d) => s + d.valorTotal, 0))}</strong>
              <span className={styles.statLabel}>Investimento em Diárias</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Plane size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtradas.length}</strong>
              <span className={styles.statLabel}>Missões Registradas</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><MapPin size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>Natal/RN</strong>
              <span className={styles.statLabel}>Destino mais Frequente</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><ArrowRight size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>2.4%</strong>
              <span className={styles.statLabel}>Consumo Orçamentário</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth={mes}
          onMonthChange={setMes}
          availableYears={["2026", "2025", "2024"]}
          onClear={() => { setBusca(""); setMes(""); setSecretaria(""); }}
          onExport={handleExport}
          placeholder="Nome do servidor, destino ou motivo..."
        >
          <select 
            className={styles.filterSelect}
            value={secretaria}
            onChange={(e) => setSecretaria(e.target.value)}
          >
            <option value="">Todas as Secretarias</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Obras">Obras</option>
            <option value="Gabinete">Gabinete</option>
          </select>
        </TransparencyFilters>


        {/* Diarias Card List */}
        <div className={styles.diariasList}>
           {filtradas.length > 0 ? filtradas.map(diaria => (
             <div key={diaria.id} className={styles.diariaCard}>
                <div className={styles.cardHeader}>
                   <div className={styles.userSection}>
                      <div className={styles.userIcon}><User size={24} /></div>
                      <div className={styles.userInfo}>
                         <h3>{diaria.servidor}</h3>
                         <div className={styles.userMeta}>
                            <span><Briefcase size={12} /> {diaria.cargo}</span>
                            <span className={styles.dotSeparator} />
                            <span className={styles.secTag}><Building2 size={12} /> {diaria.secretaria}</span>
                         </div>
                      </div>
                   </div>
                   <div className={styles.priceSection}>
                      <span className={styles.priceLabel}>Valor Recebido</span>
                      <strong className={styles.priceVal}>{formatBRL(diaria.valorTotal)}</strong>
                   </div>
                </div>

                <div className={styles.missionSection}>
                   <div className={styles.missionTitle}>
                      <MapPin size={16} />
                      <strong>Destino: {diaria.destino}</strong>
                   </div>
                   <p className={styles.missionDesc}>"{diaria.motivo}"</p>
                </div>

                <div className={styles.cardFooter}>
                   <div className={styles.dateTimeline}>
                      <div className={styles.datePoint}>
                         <span>PARTIDA</span>
                         <strong>{new Date(diaria.dataInicio).toLocaleDateString('pt-BR')}</strong>
                      </div>
                      <ArrowRight className={styles.timelineIcon} size={16} />
                      <div className={styles.datePoint}>
                         <span>RETORNO</span>
                         <strong>{new Date(diaria.dataFim).toLocaleDateString('pt-BR')}</strong>
                      </div>
                      <div className={styles.vLine} />
                      <div className={styles.datePoint}>
                         <span>QUANTIDADE</span>
                         <strong className={styles.qtyTag}>{diaria.quantidade} Diária(s)</strong>
                      </div>
                   </div>
                   <button className={styles.btnPortaria} onClick={() => alert("Visualização de Portaria simulada.")}>
                      Portaria de Concessão <Info size={14} />
                   </button>
                </div>
             </div>
           )) : (
             <div className={styles.emptyState}>
                <Search size={48} />
                <p>Nenhuma diária encontrada para os filtros selecionados.</p>
             </div>
           )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
