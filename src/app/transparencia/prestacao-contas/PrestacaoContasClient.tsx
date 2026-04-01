"use client";

import { useState } from 'react';
import { 
  FileCheck, Calendar, Download, 
  ShieldCheck, Info, Search, FileBadge,
  Award, TrendingUp
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './PrestacaoContas.module.css';

type DocumentoPrestacao = {
  id: string;
  titulo: string;
  ano: number;
  dataPublicacao: string;
  tipo: string;
  link: string;
  status: "APROVADO" | "EM_ANALISE" | "PENDENTE";
};

const MOCK_PRESTACAO: DocumentoPrestacao[] = [
  { id: "1", titulo: "Prestação de Contas Anual - Exercício 2024", ano: 2024, dataPublicacao: "2025-03-30", tipo: "Balanço Geral", link: "#", status: "EM_ANALISE" },
  { id: "2", titulo: "Parecer Prévio do TCE/RN - Contas 2023", ano: 2023, dataPublicacao: "2024-11-10", tipo: "Parecer Técnico", link: "#", status: "APROVADO" },
  { id: "3", titulo: "Relatório de Gestão Consolidado 2024", ano: 2024, dataPublicacao: "2025-03-30", tipo: "Relatório de Gestão", link: "#", status: "EM_ANALISE" },
  { id: "4", titulo: "Balanço Geral Consolidado 2022", ano: 2022, dataPublicacao: "2023-04-15", tipo: "Balanço Geral", link: "#", status: "APROVADO" },
];

export default function PrestacaoContasClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2024");

  const filtrados = MOCK_PRESTACAO.filter(d => 
    d.ano.toString() === ano && 
    (!busca || d.titulo.toLowerCase().includes(busca.toLowerCase()))
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(d => ({
       "Título": d.titulo,
       "Ano": d.ano,
       "Categoria": d.tipo,
       "Data": new Date(d.dataPublicacao).toLocaleDateString('pt-BR'),
       "Situação": d.status
    }));
    if (format === "csv") exportToCSV(payload, "prestacao_contas");
    else if (format === "json") exportToJSON(payload, "prestacao_contas");
    else exportToPDF(payload, "prestacao_contas", "Relatórios de Prestação de Contas Municipais");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Prestação de Contas" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Prestação de Contas Anual"
        description="Transparência sobre os balanços, relatórios contábeis e prestações de contas oficiais aprovadas pelo TCE."
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
          availableYears={["2026", "2025", "2024", "2023", "2022"]}
          onClear={() => { setBusca(""); }}
          onExport={handleExport}
          placeholder="Filtrar balanços ou relatórios..."
        />

        {/* Dash/Summary cards logic here could be added if needed */}
        <div className={styles.complianceBox}>
           <div className={styles.compBadge}><ShieldCheck size={20} /> LRF & LAI</div>
           <div className={styles.compBadge}><Award size={20} /> PNTP Nível Ouro</div>
           <p className={styles.compText}>Todos os balanços anuais e pareceres técnicos do Tribunal de Contas são publicados para controle social.</p>
        </div>

        <div className={styles.docsList}>
           {filtrados.length > 0 ? filtrados.map(doc => (
             <div key={doc.id} className={styles.docRow}>
                <div className={styles.docMain}>
                   <div className={styles.docIcon}><FileBadge size={28} /></div>
                   <div className={styles.docInfo}>
                      <h3>{doc.titulo}</h3>
                      <div className={styles.docMeta}>
                         <span><Calendar size={14} /> Exercício {doc.ano}</span>
                         <span className={styles.dot} />
                         <span>{doc.tipo}</span>
                         <span className={styles.dot} />
                         <span style={{color: doc.status === 'APROVADO' ? '#059669' : '#ca8a04'}}>{doc.status}</span>
                      </div>
                   </div>
                </div>
                <button className={styles.btnDownload} onClick={() => alert("Visualização de documento PDF simulada.")}>
                   <Download size={18} /> <span>PDF</span>
                </button>
             </div>
           )) : (
             <div className={styles.emptyState}>
                <Search size={48} />
                <p>Nenhum documento de prestação de contas encontrado para os critérios selecionados.</p>
             </div>
           )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
