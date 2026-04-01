"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  Hammer, MapPin, Calendar, Building, HardHat, Search, 
  ArrowRight, Download, Camera, CheckCircle2, Clock, AlertTriangle,
  X, FileText, BarChart3, ChevronRight, ExternalLink, Image as ImageIcon, Wallet
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Obras.module.css';

type Medicao = {
  numero: number;
  periodo: string;
  progresso: number;
  valor: number;
};

type Obra = {
  id: string;
  titulo: string;
  descricao: string;
  local: string;
  valor: number;
  status: "Em Andamento" | "Concluída" | "Paralisada" | "Licitação";
  progresso: number;
  dataInicio: string;
  previsaoTermino: string;
  empresa: string;
  cnpj: string;
  numeroContrato: string;
  modalidadeLicitacao: string;
  fonteCusteio: string;
  imagem: string | null;
  medicoes: Medicao[];
};

const MOCK_OBRAS: Obra[] = [
  { 
    id: "1", 
    titulo: "Pavimentação Asfáltica da Rua Principal", 
    descricao: "Execução de drenagem e pavimentação em CBUQ de 1.5km de via urbana com guias e sarjetas.", 
    local: "Centro - Lajes Pintadas/RN", 
    valor: 1250000.00, 
    status: "Em Andamento", 
    progresso: 65, 
    dataInicio: "2025-08-01", 
    previsaoTermino: "2026-06-30", 
    empresa: "Construtora Horizonte LTDA", 
    cnpj: "12.345.678/0001-90",
    numeroContrato: "023/2025",
    modalidadeLicitacao: "Tomada de Preços nº 002/2025",
    fonteCusteio: "FNDE / Recurso Federal (Pav. Urbana)",
    imagem: null,
    medicoes: [
      { numero: 1, periodo: "Ago-Set/2025", progresso: 20, valor: 210000 },
      { numero: 2, periodo: "Out-Nov/2025", progresso: 45, valor: 320000 },
      { numero: 3, periodo: "Dez/2025-Jan/2026", progresso: 65, valor: 285000 },
    ]
  },
  { 
    id: "2", 
    titulo: "Reforma Geral da Escola Municipal Dom Bosco", 
    descricao: "Substituição de cobertura, pintura interna e externa, adequação das instalações elétricas e ampliação do refeitório.", 
    local: "Bairro Esperança - Lajes Pintadas/RN", 
    valor: 340000.00, 
    status: "Concluída", 
    progresso: 100, 
    dataInicio: "2025-01-15", 
    previsaoTermino: "2025-12-20", 
    empresa: "Engenharia São Pedro EIRELI", 
    cnpj: "98.765.432/0001-01",
    numeroContrato: "007/2025",
    modalidadeLicitacao: "Pregão Eletrônico nº 018/2024",
    fonteCusteio: "Recurso Próprio Municipal",
    imagem: null,
    medicoes: [
      { numero: 1, periodo: "Jan-Mar/2025", progresso: 30, valor: 85000 },
      { numero: 2, periodo: "Abr-Jun/2025", progresso: 68, valor: 130000 },
      { numero: 3, periodo: "Jul-Set/2025", progresso: 88, valor: 80000 },
      { numero: 4, periodo: "Out-Dez/2025", progresso: 100, valor: 45000 },
    ]
  },
  { 
    id: "3", 
    titulo: "Construção de Unidade Básica de Saúde (UBS)", 
    descricao: "Implantação de UBS Tipo I com consultórios médicos e odontológicos, sala de vacinas e farmácia básica.", 
    local: "Zona Rural - Sítio Novo - Lajes Pintadas/RN", 
    valor: 850000.00, 
    status: "Em Andamento", 
    progresso: 15, 
    dataInicio: "2026-01-10", 
    previsaoTermino: "2026-11-15", 
    empresa: "Delta Construções S/A", 
    cnpj: "55.123.987/0001-44",
    numeroContrato: "002/2026",
    modalidadeLicitacao: "Tomada de Preços nº 001/2026",
    fonteCusteio: "Ministério da Saúde / Requalifica UBS",
    imagem: null,
    medicoes: [
      { numero: 1, periodo: "Jan-Fev/2026", progresso: 15, valor: 127500 },
    ]
  },
  { 
    id: "4", 
    titulo: "Ampliação da Rede de Abastecimento de Água", 
    descricao: "Instalação de 3.2km de tubulação PEAD, estação de tratamento compacta e reservatório aéreo de 50m³.", 
    local: "Bairro do Sol - Lajes Pintadas/RN", 
    valor: 120000.00, 
    status: "Paralisada", 
    progresso: 40, 
    dataInicio: "2025-06-05", 
    previsaoTermino: "2026-02-01", 
    empresa: "Águas de Lajes ME", 
    cnpj: "33.221.100/0001-77",
    numeroContrato: "019/2025",
    modalidadeLicitacao: "Dispensa de Licitação nº 041/2025",
    fonteCusteio: "Convênio FUNASA / CAERN",
    imagem: null,
    medicoes: [
      { numero: 1, periodo: "Jun-Jul/2025", progresso: 25, valor: 28000 },
      { numero: 2, periodo: "Ago-Set/2025", progresso: 40, valor: 20000 },
    ]
  },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function StatusBadgeStyle(status: string) {
  switch(status) {
    case "Em Andamento": return styles.bgEmAndamento;
    case "Concluída": return styles.bgConcluda;
    case "Paralisada": return styles.bgParalisada;
    case "Licitação": return styles.bgLicitao;
    default: return "";
  }
}

export default function ObrasClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);

  const filtradas = useMemo(() => {
    return MOCK_OBRAS.filter(o => {
      const b = busca.toLowerCase();
      const matchAno = !ano || o.dataInicio.startsWith(ano);
      const matchStatus = !statusFiltro || o.status === statusFiltro;
      const matchBusca = !busca || o.titulo.toLowerCase().includes(b) || o.local.toLowerCase().includes(b);
      return matchAno && matchStatus && matchBusca;
    });
  }, [ano, statusFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(o => ({
      "Obra": o.titulo,
      "Local": o.local,
      "Investimento": formatBRL(o.valor),
      "Progresso": `${o.progresso}%`,
      "Status": o.status,
      "Contrato": o.numeroContrato,
      "Empresa": o.empresa,
    }));
    if (format === "csv") exportToCSV(payload, "obras_municipais");
    else if (format === "json") exportToJSON(payload, "obras_municipais");
    else exportToPDF(payload, "obras_municipais", "Relatório de Obras Públicas - Lajes Pintadas");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Obras" }
  ];

  const totalInvestimento = MOCK_OBRAS.reduce((s, o) => s + o.valor, 0);
  const emAndamento = MOCK_OBRAS.filter(o => o.status === "Em Andamento").length;
  const concluidas = MOCK_OBRAS.filter(o => o.status === "Concluída").length;

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Acompanhamento de Obras"
        description="Consulte prazos, investimentos e o progresso real de cada intervenção urbana no município."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Wallet size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(totalInvestimento)}</strong>
              <span className={styles.statLabel}>Investimento Total</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Hammer size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{emAndamento}</strong>
              <span className={styles.statLabel}>Obras em Andamento</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{concluidas}</strong>
              <span className={styles.statLabel}>Obras Concluídas</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#ec4899' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ec4899' }}><HardHat size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>120</strong>
              <span className={styles.statLabel}>Empregos Gerados</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          onClear={() => { setBusca(""); setStatusFiltro(""); setAno(""); }}
          onExport={handleExport}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth=""
          onMonthChange={() => {}}
          availableYears={["2026", "2025", "2024"]}
          placeholder="Nome da obra ou localidade..."
        >
          <select
            className={styles.filterSelect}
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos os Status</option>
            <option value="Em Andamento">Obras em Andamento</option>
            <option value="Concluída">Obras Concluídas</option>
            <option value="Paralisada">Obras Paralisadas</option>
            <option value="Licitação">Em Licitação</option>
          </select>
        </TransparencyFilters>


        {/* Obras Grid */}
        <div className={styles.obrasGrid}>
          {filtradas.length > 0 ? filtradas.map(obra => (
            <div key={obra.id} className={styles.obraItem}>
              {/* Image / Header */}
              <div className={styles.obraGraphic}>
                {obra.imagem ? (
                  <Image src={obra.imagem} alt={obra.titulo} fill className={styles.obraImg} />
                ) : (
                  <div className={styles.placeholderImg}>
                    <Camera size={48} />
                    <span>Registros fotográficos disponíveis</span>
                  </div>
                )}
                <div className={`${styles.statusBadge} ${StatusBadgeStyle(obra.status)}`}>
                  {obra.status}
                </div>
              </div>

              {/* Content */}
              <div className={styles.obraInfo}>
                <div className={styles.locality}>
                  <MapPin size={12} /> {obra.local}
                </div>
                <h3 className={styles.obraTitle}>{obra.titulo}</h3>
                <p className={styles.obraDesc}>&quot;{obra.descricao}&quot;</p>

                <div className={styles.metaBox}>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Investimento</span>
                    <span className={styles.metaVal}>{formatBRL(obra.valor)}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Executor</span>
                    <span className={styles.metaVal}><Building size={12} /> {obra.empresa}</span>
                  </div>
                </div>

                <div className={styles.progressWrap}>
                  <div className={styles.progressHeader}>
                    <span>Progresso Realizado</span>
                    <strong>{obra.progresso}%</strong>
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${obra.progresso}%` }}></div>
                  </div>
                </div>

                <div className={styles.obraDates}>
                  <div className={styles.dateBlock}>
                    <Calendar size={12} /> Início: {new Date(obra.dataInicio).toLocaleDateString('pt-BR')}
                  </div>
                  <div className={styles.dateBlock}>
                    <Clock size={12} /> Previsão: {new Date(obra.previsaoTermino).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                <button className={styles.btnDetail} onClick={() => setSelectedObra(obra)}>
                  Detalhes Técnicos e Medições <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )) : (
            <div className={styles.emptyObras}>
              <HardHat size={64} />
              <p>Nenhuma obra localizada para estes critérios.</p>
            </div>
          )}
        </div>

      </div>

      {/* ============================================================
          MODAL DE DETALHES TÉCNICOS
          ============================================================ */}
      {selectedObra && (
        <div className={styles.modalOverlay} onClick={() => setSelectedObra(null)}>
          <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div>
                <div className={`${styles.modalStatusBadge} ${StatusBadgeStyle(selectedObra.status)}`}>
                  {selectedObra.status}
                </div>
                <h2 className={styles.modalTitle}>{selectedObra.titulo}</h2>
                <div className={styles.modalSubtitle}><MapPin size={14} /> {selectedObra.local}</div>
              </div>
              <button className={styles.modalClose} onClick={() => setSelectedObra(null)}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.modalBody}>

              {/* Galeria de Fotos (Placeholder) */}
              <div className={styles.galeriaSection}>
                <h4 className={styles.sectionTitle}><ImageIcon size={16} /> Galeria de Fotos</h4>
                <div className={styles.galeriaGrid}>
                  {[1, 2, 3].map(n => (
                    <div key={n} className={styles.galeriaPlaceholder}>
                      <Camera size={24} />
                      <span>Foto {n} – Registro {n === 1 ? "Inicial" : n === 2 ? "Medição nº " + n : "Atual"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dados Contratuais */}
              <div className={styles.contractSection}>
                <h4 className={styles.sectionTitle}><FileText size={16} /> Dados Contratuais</h4>
                <div className={styles.contractGrid}>
                  <div className={styles.contractItem}>
                    <span className={styles.contractLabel}>Contrato</span>
                    <strong className={styles.contractVal}>Nº {selectedObra.numeroContrato}</strong>
                  </div>
                  <div className={styles.contractItem}>
                    <span className={styles.contractLabel}>Licitação</span>
                    <strong className={styles.contractVal}>{selectedObra.modalidadeLicitacao}</strong>
                  </div>
                  <div className={styles.contractItem}>
                    <span className={styles.contractLabel}>Empresa Executora</span>
                    <strong className={styles.contractVal}>{selectedObra.empresa}</strong>
                  </div>
                  <div className={styles.contractItem}>
                    <span className={styles.contractLabel}>CNPJ</span>
                    <strong className={styles.contractVal}>{selectedObra.cnpj}</strong>
                  </div>
                  <div className={styles.contractItem}>
                    <span className={styles.contractLabel}>Fonte de Custeio</span>
                    <strong className={styles.contractVal}>{selectedObra.fonteCusteio}</strong>
                  </div>
                  <div className={styles.contractItem}>
                    <span className={styles.contractLabel}>Valor Total da Obra</span>
                    <strong className={styles.contractVal} style={{ color: '#059669', fontSize: '1.1rem' }}>{formatBRL(selectedObra.valor)}</strong>
                  </div>
                </div>
              </div>

              {/* Cronograma de Medições */}
              <div className={styles.medicoesSection}>
                <h4 className={styles.sectionTitle}><BarChart3 size={16} /> Cronograma de Medições</h4>
                <div className={styles.medicoesTable}>
                  <div className={styles.medicoesHeader}>
                    <span>Medição</span>
                    <span>Período</span>
                    <span>Progresso</span>
                    <span>Valor Medido</span>
                  </div>
                  {selectedObra.medicoes.map(m => (
                    <div key={m.numero} className={styles.medicaoRow}>
                      <span className={styles.medicaoNum}>Nº {m.numero}</span>
                      <span>{m.periodo}</span>
                      <span>
                        <div className={styles.miniProgressBar}>
                          <div className={styles.miniProgressFill} style={{ width: `${m.progresso}%` }} />
                        </div>
                        <small>{m.progresso}%</small>
                      </span>
                      <span className={styles.medicaoVal}>{formatBRL(m.valor)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documentos */}
              <div className={styles.docsSection}>
                <h4 className={styles.sectionTitle}><Download size={16} /> Documentos Anexos</h4>
                <div className={styles.docsList}>
                  {["Edital de Licitação", "Contrato de Obra", "Projeto Técnico (Memorial Descritivo)", "ART/RRT do Responsável Técnico"].map(doc => (
                    <button key={doc} className={styles.docItem} onClick={() => alert(`Download simulado: ${doc}`)}>
                      <FileText size={16} />
                      <span>{doc}</span>
                      <Download size={14} className={styles.downloadIcon} />
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className={styles.modalFooter}>
              <span className={styles.modalFooterInfo}>
                <CheckCircle2 size={14} /> Dados atualizados em {new Date().toLocaleDateString('pt-BR')}
              </span>
              <button className={styles.modalCloseBtn} onClick={() => setSelectedObra(null)}>
                Fechar <X size={14} />
              </button>
            </div>

          </div>
        </div>
      )}

      <div className="container">
        <BannerPNTP />
      </div>
    </div>
  );
}
