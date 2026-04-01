"use client";

import { useState, useMemo } from 'react';
import { 
  FileText, User, Building, Calendar, Wallet, CheckCircle, 
  Clock, XCircle, Search, Download, Info, History
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Contratos.module.css';

type Contrato = {
  id: string;
  numero: string;
  objeto: string;
  valor: number;
  fornecedor: string;
  dataInicio: string;
  dataFim: string;
  status: "Vigente" | "Finalizado" | "Cancelado";
  secretaria: string;
};

const MOCK_CONTRATOS: Contrato[] = [
  { id: "1", numero: "045/2026", objeto: "Locação de veículos para transporte escolar da zona rural", valor: 125000.00, fornecedor: "Transportes Nordeste EIRELI", dataInicio: "2026-01-10", dataFim: "2026-12-31", status: "Vigente", secretaria: "Educação" },
  { id: "2", numero: "012/2026", objeto: "Aquisição de medicamentos para a farmácia básica municipal", valor: 89600.50, fornecedor: "Med Distribuidora S/A", dataInicio: "2026-02-01", dataFim: "2026-08-01", status: "Vigente", secretaria: "Saúde" },
  { id: "3", numero: "098/2025", objeto: "Reforma e ampliação da Unidade de Saúde do Bairro Esperança", valor: 450000.00, fornecedor: "Construtora Rocha Viva", dataInicio: "2025-05-15", dataFim: "2026-03-15", status: "Finalizado", secretaria: "Obras" },
  { id: "4", numero: "005/2025", objeto: "Serviços de limpeza urbana e coleta de lixo", valor: 1200000.00, fornecedor: "Clean Cidade LTDA", dataInicio: "2025-01-01", dataFim: "2025-12-31", status: "Finalizado", secretaria: "Administração" },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ContratosClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [statusFiltro, setStatusFiltro] = useState("");

  const filtrados = useMemo(() => {
    return MOCK_CONTRATOS.filter(c => {
      const b = busca.toLowerCase();
      const matchAno = c.dataInicio.startsWith(ano);
      const matchStatus = !statusFiltro || c.status === statusFiltro;
      const matchBusca = !busca || 
        c.objeto.toLowerCase().includes(b) || 
        c.fornecedor.toLowerCase().includes(b) || 
        c.numero.includes(b);
      return matchAno && matchStatus && matchBusca;
    });
  }, [ano, statusFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(c => ({
      "Contrato №": c.numero,
      "Fornecedor": c.fornecedor,
      "Objeto": c.objeto,
      "Vigência": `${new Date(c.dataInicio).toLocaleDateString("pt-BR")} a ${new Date(c.dataFim).toLocaleDateString("pt-BR")}`,
      "Valor Total": formatBRL(c.valor),
      "Status": c.status
    }));
    const filename = `contratos_lajes_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relatório de Contratos Administrativos - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Contratos" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Contratos Administrativos"
        description="Acompanhe o detalhamento de todos os instrumentos contratuais celebrados, vigentes ou finalizados."
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
          onClear={() => { setBusca(""); setStatusFiltro(""); }}
          onExport={handleExport}
          placeholder="Número do contrato, fornecedor ou objeto..."
        >
          <select 
            className={styles.filterSelect}
            value={statusFiltro}
            onChange={(e) => setStatusFiltro(e.target.value)}
          >
            <option value="">Todos os Status</option>
            <option value="Vigente">Contratos Vigentes</option>
            <option value="Finalizado">Contratos Finalizados</option>
            <option value="Cancelado">Contratos Cancelados</option>
          </select>
        </TransparencyFilters>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Wallet size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filtrados.reduce((s,c) => s + c.valor, 0))}</strong>
              <span className={styles.statLabel}>Volume Total</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.filter(c => c.status === "Vigente").length}</strong>
              <span className={styles.statLabel}>Em Vigência</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#64748b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#64748b' }}><History size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.filter(c => c.status === "Finalizado").length}</strong>
              <span className={styles.statLabel}>Finalizados</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Info size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.length > 0 ? formatBRL(filtrados.reduce((s,c) => s + c.valor, 0) / filtrados.length) : "R$ 0,00"}</strong>
              <span className={styles.statLabel}>Média por Contrato</span>
            </div>
          </div>
        </div>

        {/* Main List of Contracts */}
        <div className={styles.contractsList}>
          {filtrados.length > 0 ? filtrados.map(contrato => (
            <div key={contrato.id} className={styles.contractCard}>
              <div className={styles.cardSide}>
                <div className={styles.sideIcon}>
                   <FileText size={28} />
                </div>
                <div className={styles.statusIndicator} data-status={contrato.status.toLowerCase()} />
              </div>

              <div className={styles.cardMain}>
                <div className={styles.cardHeader}>
                  <div className={styles.headerLeft}>
                    <h3>Contrato № {contrato.numero}</h3>
                    <div className={styles.secTag}><Building size={12} /> {contrato.secretaria}</div>
                  </div>
                  <div className={`${styles.statusBadge} ${styles['bg' + contrato.status]}`}>
                    {contrato.status === 'Vigente' && <CheckCircle size={12} />}
                    {contrato.status === 'Finalizado' && <Clock size={12} />}
                    {contrato.status === 'Cancelado' && <XCircle size={12} />}
                    {contrato.status}
                  </div>
                </div>

                <div className={styles.objetivoBlock}>
                   <p>"{contrato.objeto}"</p>
                </div>

                <div className={styles.dataGrid}>
                   <div className={styles.dataItem}>
                     <span className={styles.dataLabel}>Contratado / Fornecedor</span>
                     <div className={styles.dataValue}>
                       <User size={14} className={styles.valIcon} />
                       <strong>{contrato.fornecedor}</strong>
                     </div>
                   </div>

                   <div className={styles.dataItem}>
                     <span className={styles.dataLabel}>Período de Vigência</span>
                     <div className={styles.dataValue}>
                        <Calendar size={14} className={styles.valIcon} />
                        <strong>{new Date(contrato.dataInicio).toLocaleDateString('pt-BR')} — {new Date(contrato.dataFim).toLocaleDateString('pt-BR')}</strong>
                     </div>
                   </div>

                   <div className={`${styles.dataItem} ${styles.rightAlign}`}>
                     <span className={styles.dataLabel}>Valor do Instrumento</span>
                     <strong className={styles.priceValue}>{formatBRL(contrato.valor)}</strong>
                   </div>
                </div>

                <div className={styles.cardActions}>
                   <button className={styles.btnDocs} onClick={() => alert("Documentação vinculada não encontrada nesta simulação.")}>
                      Documentos e Aditivos <Download size={14} />
                   </button>
                   <button className={styles.btnInfo}>
                      Mais Detalhes <Info size={14} />
                   </button>
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.emptyState}>
              <Search size={48} />
              <h4>Nenhum Contrato Encontrado</h4>
              <p>Refine sua busca ou altere o ano de exercício selecionado.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
