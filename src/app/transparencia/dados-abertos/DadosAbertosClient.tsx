"use client";

import { useState } from 'react';
import { 
  Database, FileCode, FileSpreadsheet, 
  Download, Search, Info, ShieldCheck, 
  ExternalLink, BarChart, Server
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './DadosAbertos.module.css';

type Dataset = {
  id: string;
  titulo: string;
  descricao: string;
  formato: ("JSON" | "CSV" | "XML")[];
  lastUpdate: string;
  categoria: string;
  lei: string;
};

const DATASETS: Dataset[] = [
  { id: "1", titulo: "Quadro de Servidores", descricao: "Lista completa de agentes públicos com cargo, lotação e remuneração mensal.", formato: ["JSON", "CSV"], lastUpdate: "31/03/2026", categoria: "Recursos Humanos", lei: "Lei 12.527/2011" },
  { id: "2", titulo: "Receitas Municipais", descricao: "Dados detalhados sobre a arrecadação e fontes de recursos do município.", formato: ["JSON", "CSV"], lastUpdate: "31/03/2026", categoria: "Finanças", lei: "LC 131/2009" },
  { id: "3", titulo: "Despesas e Empenhos", descricao: "Execução orçamentária detalhada por elemento de despesa e fornecedor.", formato: ["JSON", "CSV"], lastUpdate: "31/03/2026", categoria: "Finanças", lei: "LC 131/2009" },
  { id: "4", titulo: "Licitações Públicas", descricao: "Processos de compras governamentais, dispensas e inexigibilidades.", formato: ["JSON", "CSV"], lastUpdate: "30/03/2026", categoria: "Administração", lei: "Lei 14.133/2021" },
  { id: "5", titulo: "Obras Públicas", descricao: "Cronograma, georreferenciamento e medições de obras em andamento.", formato: ["JSON"], lastUpdate: "28/03/2026", categoria: "Infraestrutura", lei: "PNTP 2025" },
];

export default function DadosAbertosClient() {
  const [busca, setBusca] = useState("");
  const [catFiltro, setCatFiltro] = useState("");

  const filtrados = DATASETS.filter(d => 
    (!catFiltro || d.categoria === catFiltro) &&
    (!busca || d.titulo.toLowerCase().includes(busca.toLowerCase()) || d.categoria.toLowerCase().includes(busca.toLowerCase()))
  );

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Dados Abertos" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Dados Abertos e Interoperabilidade"
        description="Conjuntos de dados estruturados para livre reutilização, promovendo a transparência ativa e a inovação tecnológica."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Database size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{DATASETS.length}</strong>
              <span className={styles.statLabel}>Datasets Ativos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><FileSpreadsheet size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>3</strong>
              <span className={styles.statLabel}>Formatos (CSV/JSON/XML)</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><BarChart size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>18</strong>
              <span className={styles.statLabel}>Atualizações (Mês)</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><ShieldCheck size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>Aberto</strong>
              <span className={styles.statLabel}>Licença de Uso</span>
            </div>
          </div>
        </div>

        {/* Policy Shield Card */}
        <div className={styles.infoHub}>
           <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Server size={32} /></div>
              <div className={styles.infoText}>
                 <h3>Ciência de Dados e Governo Aberto</h3>
                 <p>Os dados são fornecidos sem restrições de uso (Decreto 8.777/2016). Os arquivos seguem os padrões de interoperabilidade e-Ping.</p>
                 <div className={styles.complianceRow}>
                    <span className={styles.compItem}><ShieldCheck size={14}/> Creative Commons 4.0</span>
                    <span className={styles.compItem}><Server size={14}/> CKAN / OpenData standard</span>
                 </div>
              </div>
           </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear=""
          onYearChange={() => {}}
          currentMonth=""
          onMonthChange={() => {}}
          availableYears={["2026"]}
          onClear={() => { setBusca(""); setCatFiltro(""); }}
          onExport={() => alert("Selecione um formato nos cards para baixar.")}
          placeholder="Pesquisar conjuntos de dados (Base SQL/API)..."
        >
           <select 
              className={styles.filterSelect}
              value={catFiltro}
              onChange={(e) => setCatFiltro(e.target.value)}
           >
              <option value="">Todas as Sugestões</option>
              <option value="Finanças">Finanças e Orçamento</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Infraestrutura">Infraestrutura</option>
           </select>
        </TransparencyFilters>

        {/* Improved Datasets Grid */}
        <div className={styles.datasetGrid}>
           {filtrados.length > 0 ? filtrados.map(ds => (
             <div key={ds.id} className={styles.dsCard}>
                <div className={styles.dsHeader}>
                   <div className={styles.dsLabel}>CONJUNTO DE DADOS</div>
                   <div className={styles.dsLei}>{ds.lei}</div>
                </div>
                <h3 className={styles.dsTitle}>{ds.titulo}</h3>
                <p className={styles.dsDesc}>{ds.descricao}</p>
                
                <div className={styles.dsMeta}>
                   <div className={styles.metaBox}>
                      <span>Categoria</span>
                      <strong>{ds.categoria}</strong>
                   </div>
                   <div className={styles.metaBox}>
                      <span>Último Update</span>
                      <strong>{ds.lastUpdate}</strong>
                   </div>
                </div>

                <div className={styles.dsFooter}>
                   <div className={styles.formatGroup}>
                      {ds.formato.map(f => (
                        <span key={f} className={styles.formatBadge} data-f={f}>{f}</span>
                      ))}
                   </div>
                   <div className={styles.actionGroup}>
                      <button className={styles.btnAction} onClick={() => alert("Download seguro iniciado.")}>
                         Download <Download size={14} />
                      </button>
                   </div>
                </div>
             </div>
           )) : (
             <div className={styles.emptyState}>
                <Info size={48} />
                <p>Nenhum conjunto de dados técnico disponível para esta seleção.</p>
             </div>
           )}
        </div>

        {/* Visual Legend */}
        <div className={styles.licenseFooter}>
           <BarChart size={24} />
           <p>Qualquer cidadão pode consumir estes dados via requisições diretas em formato JSON. Transparência é um direito do povo.</p>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
