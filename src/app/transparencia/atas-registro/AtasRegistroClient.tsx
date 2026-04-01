"use client";

import { useState, useMemo } from 'react';
import { Target, Search, Calendar, FileSignature, CheckCircle2, ShieldAlert, XCircle, Download, Landmark, Wallet } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Atas.module.css';

type Ata = {
  id: string;
  numero: string;
  objeto: string;
  fornecedor: string;
  cnpj: string;
  valor: number;
  dataRegistro: string;
  dataVencimento: string;
  secretaria: string;
  status: "vigente" | "vencida" | "cancelada";
};

const MOCK_ATA: Ata[] = [
  {
      id: "1", numero: "001/2026", objeto: "Registro de preços para aquisição de gêneros alimentícios e merenda escolar",
      fornecedor: "Distribuidora Alimentos Norte LTDA", cnpj: "12.345.678/0001-99",
      valor: 95000, dataRegistro: "2026-01-10", dataVencimento: "2027-01-10",
      secretaria: "Educação", status: "vigente"
  },
  {
      id: "2", numero: "002/2026", objeto: "Registro de preços para material de limpeza e higienização ambulatorial",
      fornecedor: "Produtos de Limpeza Sul EIRELI", cnpj: "98.765.432/0001-11",
      valor: 38500, dataRegistro: "2026-01-25", dataVencimento: "2027-01-25",
      secretaria: "Saúde", status: "vigente"
  },
  {
      id: "3", numero: "005/2025", objeto: "Registro de preços para aquisição de combustíveis (Gasolina e Diesel)",
      fornecedor: "Posto de Combustíveis Central ME", cnpj: "11.222.333/0001-44",
      valor: 180000, dataRegistro: "2025-03-01", dataVencimento: "2026-02-28",
      secretaria: "Infraestrutura", status: "vencida"
  },
  {
    id: "4", numero: "010/2025", objeto: "Contratação de empresa de tecnologia para locação de software de gestão (Cancelada por ordem judicial)",
    fornecedor: "Tech Governamental S/A", cnpj: "33.444.555/0001-66",
    valor: 120000, dataRegistro: "2025-05-10", dataVencimento: "2026-05-10",
    secretaria: "Administração", status: "cancelada"
  }
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function AtasRegistroClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear().toString());
  const [statusFiltro, setStatusFiltro] = useState("");

  const filtradas = useMemo(() => {
    return MOCK_ATA.filter(a => {
      const b = busca.toLowerCase();
      const matchAno = a.dataRegistro.startsWith(ano);
      const matchStatus = !statusFiltro || a.status === statusFiltro;
      const matchBusca = !busca || 
          a.objeto.toLowerCase().includes(b) || 
          a.fornecedor.toLowerCase().includes(b) || 
          a.numero.includes(b);
      
      return matchAno && matchStatus && matchBusca;
    });
  }, [busca, ano, statusFiltro]);

  const handleClearFilters = () => {
    setBusca("");
    setAno(new Date().getFullYear().toString());
    setStatusFiltro("");
  };

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(a => ({
        "Número ARP": a.numero,
        "Objeto": a.objeto,
        "Fornecedor": a.fornecedor,
        "CNPJ": a.cnpj,
        "Secretaria": a.secretaria,
        "Data Registro": new Date(a.dataRegistro).toLocaleDateString("pt-BR"),
        "Data Vencimento": new Date(a.dataVencimento).toLocaleDateString("pt-BR"),
        "Aporte Total Estimado": formatBRL(a.valor),
        "Situação Atual": a.status.toUpperCase(),
    }));

    const filename = `atas_precos_${ano}`;
    const title = `Relação de Atas de Registro de Preços - ${ano}`;

    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, title);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Atas de Registro de Preços" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Atas de Registro de Preços"
        description="Consulte os instrumentos homologados (ARP) contendo fornecedores pré-qualificados e preços fixados para compras governamentais futuras."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><FileSignature size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtradas.filter(a => a.status === "vigente").length}</strong>
              <span className={styles.statLabel}>Atas Vigentes</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Wallet size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filtradas.reduce((s, a) => s + a.valor, 0))}</strong>
              <span className={styles.statLabel}>Total Registrado</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Landmark size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>R$ 3.1M</strong>
              <span className={styles.statLabel}>Saldo Disponível</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><ShieldAlert size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>OK</strong>
              <span className={styles.statLabel}>Lei 14.133/21</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
            searchValue={busca}
            onSearch={setBusca}
            currentYear={ano}
            onYearChange={setAno}
            currentMonth={""}
            onMonthChange={() => {}} // Não usamos mês isolado aqui
            availableYears={["2026", "2025", "2024"]}
            onClear={handleClearFilters}
            onExport={handleExport}
            placeholder="Buscar por número, fornecedor ou objeto..."
        >
            <select
                value={statusFiltro}
                onChange={(e) => setStatusFiltro(e.target.value)}
                className={styles.customSelect}
            >
                <option value="">Status da Ata (Todos)</option>
                <option value="vigente">Vigente (Válida)</option>
                <option value="vencida">Vencida</option>
                <option value="cancelada">Cancelada / Suspensa</option>
            </select>
        </TransparencyFilters>


        {/* List of Detail Cards */}
        <div className={styles.cardList}>
          {filtradas.length === 0 ? (
            <div className={styles.emptyState}>
              <Target size={48} className={styles.emptyIcon} />
              <h4>Nenhum Registro de Preço Localizado</h4>
              <p>Tente ajustar os termos da sua pesquisa ou altere o ano de exercício.</p>
              <button onClick={handleClearFilters} className={styles.clearBtn}>Restaurar Filtros</button>
            </div>
          ) : (
            filtradas.map(ata => {
              // Parse status styling
              let statusLabel = "";
              let StatusIcon = CheckCircle2;
              let statusClass = styles.statusGreen;
              
              if (ata.status === "vigente") {
                statusLabel = "Ativa / Vigente";
              } else if (ata.status === "vencida") {
                statusLabel = "Prazo Vencido";
                StatusIcon = ShieldAlert;
                statusClass = styles.statusGray;
              } else {
                statusLabel = "Cancelada";
                StatusIcon = XCircle;
                statusClass = styles.statusRed;
              }

              return (
                <div key={ata.id} className={styles.ataCard}>
                  
                  {/* Top: Header -> Numero e Status */}
                  <div className={styles.cardHeader}>
                    <div className={styles.headerLeft}>
                      <div className={styles.iconCircle}>
                        <FileSignature size={24} />
                      </div>
                      <div className={styles.titleBlock}>
                        <h3>ARP Nº {ata.numero}</h3>
                        <span className={styles.secTag}><Landmark size={12}/> {ata.secretaria}</span>
                      </div>
                    </div>
                    
                    <div className={`${styles.statusBadge} ${statusClass}`}>
                      <StatusIcon size={14} /> {statusLabel}
                    </div>
                  </div>

                  {/* Body: Object */}
                  <div className={styles.objetoBox}>
                    <span>Objeto do Registro:</span>
                    <p>"{ata.objeto}"</p>
                  </div>

                  {/* Grid Data */}
                  <div className={styles.dataGrid}>
                    <div className={styles.dataBlock}>
                      <span>Fornecedor Registrado</span>
                      <strong>{ata.fornecedor}</strong>
                      <span className={styles.cnpjFont}>CNPJ: {ata.cnpj}</span>
                    </div>
                    
                    <div className={styles.dataBlock}>
                      <span>Período de Validade</span>
                      <div className={styles.dateFlow}>
                        <Calendar size={14} />
                        {new Date(ata.dataRegistro).toLocaleDateString('pt-BR')} 
                        <span className={styles.arrowIcon}>→</span> 
                        {new Date(ata.dataVencimento).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <div className={`${styles.dataBlock} ${styles.alignRight}`}>
                      <span>Limite Máximo (R$)</span>
                      <strong className={styles.priceHighlight}>{formatBRL(ata.valor)}</strong>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className={styles.cardActions}>
                    <button className={styles.btnDownload} onClick={() => alert("Ata simulada. Sem anexo PDF vinculado.")}>
                      <Download size={14} /> Baixar Inteiro Teor (PDF)
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
