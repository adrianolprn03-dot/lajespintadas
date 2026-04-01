"use client";

import { useState } from 'react';
import { 
  Users, FileText, ChevronDown, Download, UsersRound, Scale,
  BookOpen, HeartHandshake, ShieldCheck
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Conselhos.module.css';

type Conselho = {
  id: string;
  nome: string;
  sigla: string;
  icon: any;
};

const MOCK_CONSELHOS: Conselho[] = [
  { id: "saude", nome: "Conselho Municipal de Saúde", sigla: "CMS", icon: <Scale size={20} /> },
  { id: "educacao", nome: "Conselho Municipal de Educação", sigla: "CME", icon: <BookOpen size={20} /> },
  { id: "social", nome: "Cons. Mun. de Assistência Social", sigla: "CMAS", icon: <HeartHandshake size={20} /> },
];

const MOCK_MEMBROS = [
  { conselhoId: "saude", id: "m1", nome: "Dr. Roberto Freitas", funcao: "Presidente", segmento: "Poder Público Executivo", mandato: "2024 a 2026" },
  { conselhoId: "saude", id: "m2", nome: "Ana Paula Silva", funcao: "Vice-Presidente", segmento: "Usuários (Comunidade)", mandato: "2024 a 2026" },
  { conselhoId: "saude", id: "m3", nome: "Carlos Eduardo Costa", funcao: "Conselheiro Titular", segmento: "Trabalhadores da Saúde", mandato: "2024 a 2026" },
  
  { conselhoId: "educacao", id: "m4", nome: "Profª. Maria do Carmo", funcao: "Presidente", segmento: "Poder Executivo", mandato: "2025 a 2027" },
  { conselhoId: "educacao", id: "m5", nome: "José Oliveira Reis", funcao: "Conselheiro Titular", segmento: "Pais de Alunos", mandato: "2025 a 2027" },
  
  { conselhoId: "social", id: "m6", nome: "Luciana Alves Mendes", funcao: "Presidente", segmento: "Poder Executivo", mandato: "2024 a 2026" },
];

const MOCK_DOCUMENTOS = [
  { conselhoId: "saude", id: "d1", titulo: "Ata da Reunião Ordinária - 01/2026", data: "15/01/2026", tipo: "Ata", status: "Aprovada" },
  { conselhoId: "saude", id: "d2", titulo: "Resolução nº 001/2026 - Regulamento Interno", data: "10/02/2026", tipo: "Resolução", status: "Publicada" },
  
  { conselhoId: "educacao", id: "d3", titulo: "Pauta Reunião Extraordinária (Volta às Aulas)", data: "20/01/2026", tipo: "Ata", status: "Aprovada" },
  
  { conselhoId: "social", id: "d4", titulo: "Ata da Reunião Ordinária - Avaliação CRAS", data: "05/02/2026", tipo: "Ata", status: "Aprovada" },
];

export default function ConselhosClient() {
  const [activeConselho, setActiveConselho] = useState(MOCK_CONSELHOS[0].id);
  const [activeTab, setActiveTab] = useState<"MEMBROS" | "ATAS">("MEMBROS");
  const [busca, setBusca] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const conselhoAtual = MOCK_CONSELHOS.find(c => c.id === activeConselho)!;

  const membrosFiltrados = MOCK_MEMBROS.filter(m => 
    m.conselhoId === activeConselho && 
    (!busca || m.nome.toLowerCase().includes(busca.toLowerCase()) || m.segmento.toLowerCase().includes(busca.toLowerCase()))
  );

  const documentosFiltrados = MOCK_DOCUMENTOS.filter(d => 
    d.conselhoId === activeConselho && 
    (!busca || d.titulo.toLowerCase().includes(busca.toLowerCase()) || d.tipo.toLowerCase().includes(busca.toLowerCase()))
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    let payload;
    let filename;
    let title;

    if (activeTab === "MEMBROS") {
      payload = membrosFiltrados.map(m => ({
        "Nome Completo": m.nome,
        "Função no Conselho": m.funcao,
        "Segmento Representado": m.segmento,
        "Vigência do Mandato": m.mandato
      }));
      filename = `membros_${conselhoAtual.sigla.toLowerCase()}`;
      title = `Composição Oficial do ${conselhoAtual.nome}`;
    } else {
      payload = documentosFiltrados.map(d => ({
        "Título do Documento": d.titulo,
        "Tipo": d.tipo,
        "Data de Apreciação": d.data,
        "Status Operacional": d.status
      }));
      filename = `atas_${conselhoAtual.sigla.toLowerCase()}`;
      title = `Atas e Resoluções - ${conselhoAtual.nome}`;
    }

    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, title);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Conselhos Municipais" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Conselhos de Gestão Pública"
        description="Acesse a composição dos membros (representantes do governo e da sociedade civil), as atas e as resoluções dos Conselhos Municipais."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><ShieldCheck size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_CONSELHOS.length}</strong>
              <span className={styles.statLabel}>Conselhos Ativos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Users size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_MEMBROS.length}</strong>
              <span className={styles.statLabel}>Membros Totais</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><FileText size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_DOCUMENTOS.length}</strong>
              <span className={styles.statLabel}>Atas Publicadas</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><Scale size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>OK</strong>
              <span className={styles.statLabel}>Meta Art. 204 CF</span>
            </div>
          </div>
        </div>

        {/* Conselho Selector (Top Bar) */}
        <div className={styles.selectorBar}>
           <div className={styles.selectorLabel}>Vizualizando dados do Conselho:</div>
           
           <div className={styles.dropdownContainer}>
             <button 
                className={styles.dropdownBtn} 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
             >
                <div className={styles.selectedView}>
                  <div className={styles.iconCircle}>{conselhoAtual.icon}</div>
                  <div className={styles.selectedTexts}>
                    <strong>{conselhoAtual.nome}</strong>
                    <span>{conselhoAtual.sigla}</span>
                  </div>
                </div>
                <ChevronDown size={20} className={styles.chevron} />
             </button>

             {isDropdownOpen && (
               <div className={styles.dropdownMenu}>
                 {MOCK_CONSELHOS.map(c => (
                   <button 
                     key={c.id} 
                     className={`${styles.menuItem} ${activeConselho === c.id ? styles.itemActive : ''}`}
                     onClick={() => {
                        setActiveConselho(c.id);
                        setIsDropdownOpen(false);
                        setBusca("");
                     }}
                   >
                     <div className={styles.iconCircleSmall}>{c.icon}</div>
                     <strong>{c.sigla}</strong>
                     <span>- {c.nome}</span>
                   </button>
                 ))}
               </div>
             )}
           </div>
        </div>

        {/* Conselho Details Card (Compliance info) */}
        <div className={styles.complianceBox}>
          <ShieldCheck size={28} className={styles.complianceIcon} />
          <div className={styles.complianceTexts}>
             <h3>Controle Social Ativo</h3>
             <p>Os conselhos municipais são ferramentas vitais de participação democrática onde a sociedade civil decide, junto ao governo, as políticas públicas. Divulgar suas atas é uma exigência primária do <strong>Tribunal de Contas (PNTP)</strong>.</p>
          </div>
        </div>

        {/* Local Tabs */}
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'MEMBROS' ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab('MEMBROS'); setBusca(''); }}
          >
            <UsersRound size={18} /> Composição de Membros
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'ATAS' ? styles.tabActive : ''}`}
            onClick={() => { setActiveTab('ATAS'); setBusca(''); }}
          >
            <FileText size={18} /> Atas e Resoluções
          </button>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          onClear={() => setBusca("")}
          onExport={handleExport}
          currentYear=""
          availableYears={[]}
          onYearChange={() => {}}
          currentMonth=""
          onMonthChange={() => {}}
          placeholder={activeTab === 'MEMBROS' ? "Pesquisar membro pelo nome ou representação..." : "Pesquisar documento pelo título ou tipo..."}
        />

        {/* Lists Container */}
        {activeTab === 'MEMBROS' && (
          <div className={styles.listGrid}>
            {membrosFiltrados.length > 0 ? membrosFiltrados.map(membro => (
              <div key={membro.id} className={styles.memberCard}>
                <div className={styles.memberTop}>
                   <div className={styles.avatar}>
                      <Users size={24} color="#64748b" />
                   </div>
                   <div className={styles.roleTag}>
                      {membro.funcao}
                   </div>
                </div>
                <div className={styles.memberBody}>
                   <h3>{membro.nome}</h3>
                   
                   <div className={styles.infoLine}>
                     <span>Representação (Segmento)</span>
                     <strong>{membro.segmento}</strong>
                   </div>

                   <div className={styles.infoLine}>
                     <span>Vigência do Mandato Atual</span>
                     <p>{membro.mandato}</p>
                   </div>
                </div>
              </div>
            )) : (
              <div className={styles.emptyState}>Nenhum membro ativo encontrado para este filtro no {conselhoAtual.sigla}.</div>
            )}
          </div>
        )}

        {activeTab === 'ATAS' && (
          <div className={styles.docsList}>
            {documentosFiltrados.length > 0 ? documentosFiltrados.map(doc => (
              <div key={doc.id} className={styles.docRow}>
                 <div className={styles.docMain}>
                    <div className={styles.docIcon}><FileText size={24} color="#f97316" /></div>
                    <div className={styles.docTexts}>
                       <h3>{doc.titulo}</h3>
                       <div className={styles.docMetas}>
                          <span className={styles.docBadge}>{doc.tipo}</span>
                          <span className={styles.docDate}>Apreciada em: {doc.data}</span>
                       </div>
                    </div>
                 </div>
                 <button className={styles.btnDownload} onClick={() => alert("Download simulado do PDF do documento.")}>
                   <Download size={18} /> Baixar PDF
                 </button>
              </div>
            )) : (
              <div className={styles.emptyState}>Ainda não há documentos cadastrados para o filtro selecionado no {conselhoAtual.sigla}.</div>
            )}
          </div>
        )}

        <BannerPNTP />

      </div>
    </div>
  );
}
