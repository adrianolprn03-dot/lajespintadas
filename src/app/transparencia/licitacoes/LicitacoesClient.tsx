"use client";

import { useState, useMemo } from 'react';
import { 
  Gavel, Calendar, Building2, Search, ExternalLink, Download, 
  CheckCircle2, Clock, XCircle, AlertTriangle, FileText, Banknote
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Licitacoes.module.css';


type Licitacao = {
  id: string;
  numero: string;
  objeto: string;
  modalidade: string;
  secretaria: string;
  valorEstimado: number;
  dataAbertura: string;
  status: "Aberta" | "Em Andamento" | "Concluída" | "Cancelada";
  ano: number;
};

const MOCK_LICITACAO: Licitacao[] = [
  { id: "1", numero: "001/2026", objeto: "Aquisição de Merenda Escolar para o ano letivo de 2026", modalidade: "Pregão Eletrônico", secretaria: "Educação", valorEstimado: 245000.00, dataAbertura: "2026-02-15", status: "Aberta", ano: 2026 },
  { id: "2", numero: "002/2026", objeto: "Contratação de empresa para reforma da Praça Central", modalidade: "Concorrência", secretaria: "Obras", valorEstimado: 580000.00, dataAbertura: "2026-03-20", status: "Em Andamento", ano: 2026 },
  { id: "3", numero: "005/2025", objeto: "Serviços de consultoria em gestão hospitalar", modalidade: "Tomada de Preços", secretaria: "Saúde", valorEstimado: 85000.00, dataAbertura: "2025-11-10", status: "Concluída", ano: 2025 },
  { id: "4", numero: "010/2025", objeto: "Compra de equipamentos de informática (Cancelado)", modalidade: "Dispensa", secretaria: "Administração", valorEstimado: 12000.00, dataAbertura: "2025-05-05", status: "Cancelada", ano: 2025 },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function LicitacoesClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [statusFiltro, setStatusFiltro] = useState("");
  const [modalidade, setModalidade] = useState("");

  const filtradas = useMemo(() => {
    return MOCK_LICITACAO.filter(l => {
      const matchAno = l.ano.toString() === ano;
      const matchStatus = !statusFiltro || l.status === statusFiltro;
      const matchModalidade = !modalidade || l.modalidade === modalidade;
      const matchBusca = !busca || 
        l.objeto.toLowerCase().includes(busca.toLowerCase()) || 
        l.numero.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchStatus && matchModalidade && matchBusca;
    });
  }, [ano, statusFiltro, modalidade, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(l => ({
      "Número": l.numero,
      "Objeto": l.objeto,
      "Modalidade": l.modalidade,
      "Secretaria": l.secretaria,
      "Valor": formatBRL(l.valorEstimado),
      "Status": l.status
    }));
    const filename = `licitacoes_lajes_pintadas_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relatório de Licitações - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Licitações" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Licitações e Processos"
        description="Editais, chamadas públicas e processos licitatórios em conformidade com a Lei 14.133/2021."
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
          onClear={() => { setBusca(""); setStatusFiltro(""); setModalidade(""); }}
          onExport={handleExport}
          placeholder="Número do processo ou objeto..."
        >
          <div className={styles.filterGroup}>
            <select 
              className={styles.filterSelect}
              value={modalidade}
              onChange={(e) => setModalidade(e.target.value)}
            >
              <option value="">Todas as Modalidades</option>
              <option value="Pregão Eletrônico">Pregão Eletrônico</option>
              <option value="Concorrência">Concorrência</option>
              <option value="Dispensa">Dispensa</option>
            </select>
            <select 
              className={styles.filterSelect}
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
            >
              <option value="">Todos os Status</option>
              <option value="Aberta">Processos Abertos</option>
              <option value="Em Andamento">Em Andamento</option>
              <option value="Concluída">Finalizados</option>
            </select>
          </div>
        </TransparencyFilters>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Gavel size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtradas.length}</strong>
              <span className={styles.statLabel}>Processos Localizados</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtradas.filter(l => l.status === 'Aberta').length}</strong>
              <span className={styles.statLabel}>Editais Abertos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Clock size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtradas.filter(l => l.status === 'Em Andamento').length}</strong>
              <span className={styles.statLabel}>Em Andamento</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><Banknote size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filtradas.reduce((s,l) => s + l.valorEstimado, 0))}</strong>
              <span className={styles.statLabel}>Volume Estimado</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className={styles.tableBlock}>
          <div className={styles.tableResponsive}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Nº Processo / Ano</th>
                  <th>Objeto</th>
                  <th>Modalidade</th>
                  <th className={styles.rightAlign}>Valor Estimado</th>
                  <th>Status</th>
                  <th className={styles.centerAlign}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtradas.length > 0 ? filtradas.map(l => (
                  <tr key={l.id} className={styles.tableRow}>
                    <td className={styles.numberCell}>
                      <strong>{l.numero}</strong>
                      <span>{l.ano}</span>
                    </td>
                    <td className={styles.objectCell}>
                      <p title={l.objeto}>{l.objeto}</p>
                      <div className={styles.secLabel}><Building2 size={10} /> {l.secretaria}</div>
                    </td>
                    <td><span className={styles.catBadge}>{l.modalidade}</span></td>
                    <td className={`${styles.rightAlign} ${styles.priceCell}`}>{formatBRL(l.valorEstimado)}</td>
                    <td>
                      <div className={`${styles.statusBadge} ${styles['status' + l.status.replace(/\s+/g,'')]}`}>
                        {l.status === 'Aberta' && <CheckCircle2 size={12} />}
                        {l.status === 'Em Andamento' && <Clock size={12} />}
                        {l.status === 'Concluída' && <FileText size={12} />}
                        {l.status === 'Cancelada' && <XCircle size={12} />}
                        {l.status}
                      </div>
                    </td>
                    <td className={styles.centerAlign}>
                      <button className={styles.btnAction} onClick={() => alert("Acesso ao edital simulado.")}>
                        Editais <ExternalLink size={12} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className={styles.emptyTable}>Nenhum processo encontrado com esses filtros.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
