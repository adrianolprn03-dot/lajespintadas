"use client";

import { useState, useMemo } from 'react';
import { 
  Users, Wallet, TrendingUp, Search, 
  ShieldCheck, Download, AlertCircle, FileText, 
  MapPin, Briefcase 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './FolhaPagamento.module.css';

type ServidorFolha = {
  id: string;
  nome: string;
  cpf: string;
  cargo: string;
  secretaria: string;
  bruto: number;
  descontos: number;
  liquido: number;
  ano: number;
  mes: string;
};

const MOCK_FOLHA: ServidorFolha[] = [
  { id: "1", nome: "MARCOS ANTONIO DE SOUZA", cpf: "123.456.789-00", cargo: "ASSESSOR JURIDICO", secretaria: "ADMINISTRACAO", bruto: 12500.00, descontos: 3200.00, liquido: 9300.00, ano: 2026, mes: "03" },
  { id: "2", nome: "ANA PAULA FERREIRA", cpf: "234.567.890-11", cargo: "PROFESSOR NIVEL II", secretaria: "EDUCACAO", bruto: 5400.45, descontos: 980.20, liquido: 4420.25, ano: 2026, mes: "03" },
  { id: "3", nome: "JOSE ROBERTO SILVA", cpf: "345.678.901-22", cargo: "TECNICO EM ENFERMAGEM", secretaria: "SAUDE", bruto: 3800.00, descontos: 450.00, liquido: 3350.00, ano: 2026, mes: "03" },
  { id: "4", nome: "LUCIANA MOURA", cpf: "456.789.012-33", cargo: "AGENTE ADMINISTRATIVO", secretaria: "FINANCAS", bruto: 4200.00, descontos: 610.00, liquido: 3590.00, ano: 2026, mes: "02" },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function maskCPF(cpf: string) {
  // Mascaramento LGPD: ***.456.***-**
  const parts = cpf.split('.');
  if (parts.length < 3) return "***.***.***-**";
  return `***.${parts[1]}.***-**`;
}

export default function FolhaPagamentoClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [mes, setMes] = useState("03");
  const [secretaria, setSecretaria] = useState("");

  const filtrados = useMemo(() => {
    return MOCK_FOLHA.filter(s => {
      const b = busca.toLowerCase();
      const matchAno = s.ano.toString() === ano;
      const matchMes = !mes || s.mes === mes;
      const matchSec = !secretaria || s.secretaria === secretaria;
      const matchBusca = !busca || 
        s.nome.toLowerCase().includes(b) || 
        s.cargo.toLowerCase().includes(b);
      return matchAno && matchMes && matchSec && matchBusca;
    });
  }, [ano, mes, secretaria, busca]);

  const stats = useMemo(() => {
    const totalBruto = filtrados.reduce((s, x) => s + x.bruto, 0);
    const totalLiquido = filtrados.reduce((s, x) => s + x.liquido, 0);
    return {
      count: filtrados.length,
      bruto: totalBruto,
      liquido: totalLiquido
    };
  }, [filtrados]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(s => ({
      "Nome": s.nome,
      "CPF (Mascarado)": maskCPF(s.cpf),
      "Cargo": s.cargo,
      "Secretaria": s.secretaria,
      "Rendimento Bruto": formatBRL(s.bruto),
      "Descontos": formatBRL(s.descontos),
      "Rendimento Líquido": formatBRL(s.liquido)
    }));
    const filename = `folha_pagamento_lajes_${mes}_${ano}`;
    const period = `${mes}/${ano}`;

    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relatório de Folha de Pagamento - Competência ${period}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Servidores", href: "/transparencia/servidores" },
    { label: "Folha de Pagamento" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Folha de Pagamento"
        description="Consulta individualizada de remunerações, cargos e funções dos servidores municipais."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Compliance Note */}
        <div className={styles.complianceNote}>
          <ShieldCheck className={styles.complianceIcon} size={28} />
          <div className={styles.complianceText}>
            <h4>Conformidade LGPD (Lei 13.709/2018)</h4>
            <p>Para proteção à privacidade, o CPF dos servidores é exibido de forma mascarada. Os dados financeiros são públicos conforme decisão do STF (ARE 652777).</p>
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
          placeholder="Buscar servidor pelo nome ou cargo..."
        >
          <select 
            className="filter-select" 
            value={secretaria}
            onChange={(e) => setSecretaria(e.target.value)}
            style={{ padding: '0.625rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.875rem', outline: 'none' }}
          >
            <option value="">Todas as Secretarias</option>
            <option value="ADMINISTRACAO">Administração</option>
            <option value="SAUDE">Saúde</option>
            <option value="EDUCACAO">Educação</option>
            <option value="FINANCAS">Finanças</option>
          </select>
        </TransparencyFilters>

        {/* Stats Summary */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.siBlue}`}><Users size={24} /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Servidores no Filtro</span>
              <strong className={styles.statValue}>{stats.count}</strong>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.siAmber}`}><Wallet size={24} /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Bruto Estimado</span>
              <strong className={styles.statValue}>{formatBRL(stats.bruto)}</strong>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.siEmerald}`}><TrendingUp size={24} /></div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total Líquido (Período)</span>
              <strong className={styles.statValue}>{formatBRL(stats.liquido)}</strong>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className={styles.tableSection}>
          <div className={styles.tableResponsive}>
            <table className={styles.folhaTable}>
              <thead>
                <tr>
                  <th>Servidor / Documento</th>
                  <th>Cargo / Lotação</th>
                  <th style={{ textAlign: 'right' }}>Rend. Bruto</th>
                  <th style={{ textAlign: 'right' }}>Descontos</th>
                  <th style={{ textAlign: 'right' }}>Vlr. Líquido</th>
                  <th style={{ textAlign: 'center' }}>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length > 0 ? filtrados.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.servidorCell}>
                        <span className={styles.servidorName}>{s.nome}</span>
                        <span className={styles.servidorCpf}>CPF: {maskCPF(s.cpf)}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.cargoCell}>
                        <span className={styles.cargoTitle}><Briefcase size={12} style={{ display: 'inline', marginRight: '4px' }} /> {s.cargo}</span>
                        <span className={styles.secLabel}><MapPin size={10} /> {s.secretaria}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }} className={styles.moneyCell}>{formatBRL(s.bruto)}</td>
                    <td style={{ textAlign: 'right', color: '#ef4444' }} className={styles.moneyCell}>- {formatBRL(s.descontos)}</td>
                    <td style={{ textAlign: 'right' }} className={`${styles.moneyCell} ${styles.liquidValue}`}>{formatBRL(s.liquido)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className={styles.btnDetail} onClick={() => alert("Módulo detalhado de proventos simulado.")}>
                        Holerite <FileText size={14} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6}>
                      <div className={styles.emptyState}>
                        <AlertCircle size={48} />
                        <p>Nenhum servidor encontrado com os critérios de filtro atuais.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
