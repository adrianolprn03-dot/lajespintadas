"use client";

import { useState, useMemo } from 'react';
import { FileText, Download, Calendar, Tag, Search, FileSignature } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import { LEGISLACAO_MOCK } from '@/lib/legislacaoMock';
import styles from './Publicacoes.module.css';

// Mock Data keeping the same structure as old implementation
type Publicacao = {
  id: string;
  titulo: string;
  tipo: string;
  descricao: string;
  dataPublicacao: string;
  ano: number;
  secretaria: string;
  arquivo: string | null;
};

const TIPOS = [
  "Lei", "Decreto", "Portaria", "Diário Oficial", "Edital", "Aviso", "Resultado", 
  "Extrato de Contrato", "Convênio", "Resolução"
];

const MOCK_PUBLICACOES: Publicacao[] = LEGISLACAO_MOCK.map(l => ({
  id: l.id,
  titulo: `${l.tipo} nº ${l.identificador}`,
  tipo: l.tipo,
  descricao: l.titulo,
  dataPublicacao: l.dataPublicacao,
  ano: l.exercicio,
  secretaria: l.tipo === "Portaria" ? "Recursos Humanos" : "Gabinete do Prefeito",
  arquivo: l.pdfUrl || null
}));

export default function PublicacoesClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear().toString());
  const [mes, setMes] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");

  const publicacoesFiltradas = useMemo(() => {
    return MOCK_PUBLICACOES.filter(p => {
      const matchAno = p.ano.toString() === ano;
      const matchTipo = !tipoFiltro || p.tipo === tipoFiltro;
      const matchBusca = !busca || 
        p.titulo.toLowerCase().includes(busca.toLowerCase()) || 
        p.descricao.toLowerCase().includes(busca.toLowerCase());
      
      let matchMes = true;
      if (mes) {
        const pMes = new Date(p.dataPublicacao).getMonth() + 1;
        matchMes = pMes.toString() === mes;
      }

      return matchAno && matchTipo && matchBusca && matchMes;
    });
  }, [ano, mes, busca, tipoFiltro]);

  const handleClear = () => {
    setBusca("");
    setAno(new Date().getFullYear().toString());
    setMes("");
    setTipoFiltro("");
  };

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = publicacoesFiltradas.map(p => ({
      "Título": p.titulo,
      "Tipo": p.tipo,
      "Secretaria": p.secretaria,
      "Data": new Date(p.dataPublicacao).toLocaleDateString("pt-BR"),
      "Descrição": p.descricao,
    }));
    
    const filename = `publicacoes_${ano}`;
    const title = `Publicações Oficiais - Ano ${ano}`;
    
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, title);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Publicações Oficiais" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Publicações Oficiais e Diários"
        description="Acesso centralizado a editais, avisos, extratos, resultados e demais atos publicados pelo poder Executivo."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth={mes}
          onMonthChange={setMes}
          availableYears={["2026", "2025", "2024"]}
          onClear={handleClear}
          onExport={handleExport}
          placeholder="Buscar por título ou descrição..."
        >
          {/* Custom Select slot explicitly built for Publicações */}
          <select
            value={tipoFiltro}
            onChange={e => setTipoFiltro(e.target.value)}
            className={styles.customSelect}
            aria-label="Filtrar por Categoria Documental"
          >
            <option value="">Todas as Categorias</option>
            {TIPOS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </TransparencyFilters>

        {/* Dynamic Summary Cards */}
        <div className={styles.summaryGrid}>
          <div className={`${styles.sumCard} ${styles.scBlue}`}>
            <span className={styles.sumLabel}>Documentos Localizados</span>
            <strong className={styles.sumValue}>{publicacoesFiltradas.length}</strong>
          </div>
          <div className={`${styles.sumCard} ${styles.scGreen}`}>
            <span className={styles.sumLabel}>Tipologias Diferentes</span>
            <strong className={styles.sumValue}>
              {new Set(publicacoesFiltradas.map(p => p.tipo)).size}
            </strong>
          </div>
          <div className={`${styles.sumCard} ${styles.scPurple}`}>
            <span className={styles.sumLabel}>Exercício Vingente</span>
            <strong className={styles.sumValue}>{ano}</strong>
          </div>
        </div>

        {/* Reading List */}
        <div className={styles.documentList}>
          {publicacoesFiltradas.length === 0 ? (
            <div className={styles.emptyState}>
              <Search size={48} className={styles.emptyIcon} />
              <h4>Nenhum documento encontrado</h4>
              <p>Não há publicações registradas para os parâmetros selecionados neste exercício.</p>
              <button onClick={handleClear} className={styles.clearBtn}>Limpar Filtros</button>
            </div>
          ) : (
            publicacoesFiltradas.map(pub => {
              // Get color class based on document type
              let tagColorClass = styles.tagGray;
              if (pub.tipo === "Diário Oficial") tagColorClass = styles.tagBlue;
              if (pub.tipo === "Edital" || pub.tipo === "Aviso" || pub.tipo === "Lei") tagColorClass = styles.tagPurple;
              if (pub.tipo === "Resultado" || pub.tipo === "Convênio" || pub.tipo === "Portaria") tagColorClass = styles.tagGreen;
              if (pub.tipo === "Extrato de Contrato" || pub.tipo === "Decreto") tagColorClass = styles.tagOrange;

              return (
                <article key={pub.id} className={styles.docCard}>
                  
                  {/* Icon Area */}
                  <div className={styles.docIconWrapper}>
                    <FileSignature size={24} className={styles.docIcon} />
                  </div>

                  {/* Text Details Area */}
                  <div className={styles.docDetails}>
                    <div className={styles.docHeaderTags}>
                      <span className={`${styles.docTag} ${tagColorClass}`}>
                        <Tag size={12} /> {pub.tipo}
                      </span>
                      <span className={styles.docDate}>
                        <Calendar size={12} /> 
                        {new Date(pub.dataPublicacao).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </span>
                      <span className={styles.docDept}>
                        Secretaria: {pub.secretaria}
                      </span>
                    </div>

                    <h3 className={styles.docTitle}>{pub.titulo}</h3>
                    <p className={styles.docDesc}>{pub.descricao}</p>
                  </div>

                  {/* Action Area */}
                  <div className={styles.docAction}>
                    <a 
                      href={pub.arquivo || "#"} 
                      className={styles.downloadBtn}
                      onClick={e => { if(!pub.arquivo) { e.preventDefault(); alert("Documento simulado. O PDF não está anexado na base de dados (Mock)."); } }}
                    >
                      <Download size={16} />
                      Baixar {pub.tipo.includes("Diário") ? "Diário" : "Documento"}
                    </a>
                  </div>

                </article>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
