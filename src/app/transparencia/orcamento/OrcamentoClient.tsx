"use client";

import { useState, useMemo } from 'react';
import { 
  Scale, FileText, Calendar, Download, 
  Info, Search, ChevronRight, CheckCircle2 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Orcamento.module.css';

type DocumentoOrcamentario = {
  id: string;
  titulo: string;
  tipo: "PPA" | "LDO" | "LOA";
  ano: number;
  dataPublicacao: string;
  descricao: string;
  link: string;
  tamanho: string;
};

const MOCK_ORCAMENTO: DocumentoOrcamentario[] = [
  { id: "1", titulo: "Lei Orçamentária Anual - LOA 2026", tipo: "LOA", ano: 2026, dataPublicacao: "2025-12-20", descricao: "Estima a receita e fixa a despesa do Município para o exercício financeiro de 2026.", link: "#", tamanho: "2.4 MB" },
  { id: "2", titulo: "Lei de Diretrizes Orçamentárias - LDO 2026", tipo: "LDO", ano: 2026, dataPublicacao: "2025-07-15", descricao: "Estabelece as metas e prioridades da administração pública para o exercício de 2026.", link: "#", tamanho: "1.8 MB" },
  { id: "3", titulo: "Plano Plurianual - PPA 2022-2025", tipo: "PPA", ano: 2025, dataPublicacao: "2021-08-30", descricao: "Planejamento estratégico de médio prazo que define diretrizes para 4 anos.", link: "#", tamanho: "4.5 MB" },
  { id: "4", titulo: "Lei Orçamentária Anual - LOA 2025", tipo: "LOA", ano: 2025, dataPublicacao: "2024-12-18", descricao: "Estima a receita e fixa a despesa do Município para o exercício financeiro de 2025.", link: "#", tamanho: "2.1 MB" },
];

export default function OrcamentoClient() {
  const [busca, setBusca] = useState("");
  const [anoFiltro, setAnoFiltro] = useState("2026");
  const [tipoFiltro, setTipoFiltro] = useState("");

  const filtrados = useMemo(() => {
    return MOCK_ORCAMENTO.filter(d => {
      const matchAno = d.ano.toString() === anoFiltro || d.tipo === "PPA"; // PPA costuma ser plurianual
      const matchTipo = !tipoFiltro || d.tipo === tipoFiltro;
      const matchBusca = !busca || d.titulo.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchTipo && matchBusca;
    });
  }, [anoFiltro, tipoFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(d => ({
      "Instrumento": d.tipo,
      "Título": d.titulo,
      "Ano": d.ano,
      "Data Publicação": new Date(d.dataPublicacao).toLocaleDateString('pt-BR'),
      "Resumo": d.descricao
    }));
    if (format === "csv") exportToCSV(payload, "planejamento_municipal");
    else if (format === "json") exportToJSON(payload, "planejamento_municipal");
    else exportToPDF(payload, "planejamento_municipal", "Instrumentos de Planejamento e Orçamento");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Planejamento" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Planejamento e Orçamento"
        description="Instrumentos legais que definem as prioridades e a aplicação dos recursos públicos (PPA, LDO e LOA)."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={anoFiltro}
          onYearChange={setAnoFiltro}
          currentMonth=""
          onMonthChange={() => {}}
          availableYears={["2026", "2025", "2024", "2023"]}
          onClear={() => { setBusca(""); setTipoFiltro(""); }}
          onExport={handleExport}
          placeholder="Pesquisar por título de lei ou ano..."
        >
          <select 
            className={styles.filterSelect}
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos os Instrumentos</option>
            <option value="LOA">LOA (Orcamento Anual)</option>
            <option value="LDO">LDO (Diretrizes)</option>
            <option value="PPA">PPA (Plurianual)</option>
          </select>
        </TransparencyFilters>

        {/* Informative Cards Section */}
        <div className={styles.infoSection}>
           <div className={styles.infoCard}>
              <div className={styles.infoIcon}><Scale size={24} /></div>
              <div className={styles.infoLabel}>Ciclo Orçamentário</div>
              <p>O orçamento público é o instrumento de planejamento que estima as receitas e fixa as despesas para o ano.</p>
           </div>
           <div className={styles.infoCard}>
              <div className={styles.infoIcon}><FileText size={24} /></div>
              <div className={styles.infoLabel}>PPA, LDO e LOA</div>
              <p>Três leis que trabalham juntas: o PPA para 4 anos, a LDO para diretrizes anuais e a LOA para o gasto efetivo.</p>
           </div>
        </div>

        {/* Documents Grid */}
        <div className={styles.docsGrid}>
          {filtrados.length > 0 ? filtrados.map(doc => (
            <div key={doc.id} className={styles.docCard}>
               <div className={styles.cardAccent} data-type={doc.tipo} />
               <div className={styles.cardMain}>
                  <div className={styles.cardHeader}>
                     <div className={styles.typeTag}>{doc.tipo}</div>
                     <div className={styles.yearBadge}>{doc.ano}</div>
                  </div>
                  <h3 className={styles.docTitle}>{doc.titulo}</h3>
                  <p className={styles.docDesc}>{doc.descricao}</p>
                  
                  <div className={styles.docMeta}>
                     <div className={styles.metaItem}>
                        <Calendar size={12} /> Publicado em {new Date(doc.dataPublicacao).toLocaleDateString('pt-BR')}
                     </div>
                     <div className={styles.metaItem}>
                        <CheckCircle2 size={12} className={styles.checkIcon} /> Consolidado
                     </div>
                  </div>

                  <div className={styles.cardFooter}>
                     <span className={styles.fileSize}>{doc.tamanho} • PDF</span>
                     <button className={styles.btnDownload} onClick={() => alert("Download simulado.")}>
                        Download <Download size={14} />
                     </button>
                  </div>
               </div>
            </div>
          )) : (
            <div className={styles.emptyState}>
               <Info size={48} />
               <p>Nenhum instrumento de planejamento encontrado para esta seleção.</p>
            </div>
          )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
