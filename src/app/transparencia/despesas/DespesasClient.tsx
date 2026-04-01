"use client";

import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Banknote, Building2, Tag, Calendar, User, Search, Filter, 
  ArrowDownRight, FileText, Download, LayoutGrid, List, CheckCircle2, Clock
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Despesas.module.css';

type Despesa = {
  id: string;
  descricao: string;
  categoria: string;
  secretaria: string;
  fornecedor: string;
  valor: number;
  mes: number;
  ano: number;
  status: "Empenhado" | "Liquidado" | "Pago";
};

const MOCK_DESPESAS: Despesa[] = [
  { id: "1", descricao: "Aquisição de Merenda Escolar - Lote 01", categoria: "Custeio", secretaria: "Educação", fornecedor: "Distribuidora de Alimentos LTDA", valor: 45000.00, mes: 3, ano: 2026, status: "Pago" },
  { id: "2", descricao: "Manutenção de Ambulâncias - Frota Municipal", categoria: "Serviços", secretaria: "Saúde", fornecedor: "Oficina Mecânica São José", valor: 12500.00, mes: 3, ano: 2026, status: "Liquidado" },
  { id: "3", descricao: "Folha de Pagamento - Servidores Efetivos", categoria: "Pessoal", secretaria: "Administração", fornecedor: "Servidores Diversos", valor: 850000.00, mes: 3, ano: 2026, status: "Pago" },
  { id: "4", descricao: "Construção de Pavimentação - Bairro Sul", categoria: "Investimento", secretaria: "Obras", fornecedor: "Construtora Horizonte", valor: 120000.00, mes: 3, ano: 2026, status: "Empenhado" },
  { id: "5", descricao: "Locação de Software de Gestão Pública", categoria: "Custeio", secretaria: "Administração", fornecedor: "Tech Soluções Governamentais", valor: 8200.00, mes: 2, ano: 2026, status: "Pago" },
];

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function DespesasClient() {
  const [view, setView] = useState<"cards" | "tabela">("cards");
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [mes, setMes] = useState("3");
  const [secretaria, setSecretaria] = useState("");

  const filteredDespesas = useMemo(() => {
    return MOCK_DESPESAS.filter(d => {
      const matchAno = d.ano.toString() === ano;
      const matchMes = !mes || d.mes.toString() === mes;
      const matchSec = !secretaria || d.secretaria === secretaria;
      const matchBusca = !busca || 
        d.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        d.fornecedor.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchMes && matchSec && matchBusca;
    });
  }, [ano, mes, secretaria, busca]);

  const totalEmpenhado = filteredDespesas.reduce((acc, curr) => acc + curr.valor, 0);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filteredDespesas.map(d => ({
      "Descrição": d.descricao,
      "Secretaria": d.secretaria,
      "Fornecedor": d.fornecedor,
      "Fase": d.status,
      "Valor": formatBRL(d.valor)
    }));
    const filename = `despesa_lajes_${mes}_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relatório de Despesas - ${MESES[Number(mes)-1]}/${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Despesas Públicas" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Despesas e Gastos"
        description="Transparência total na aplicação dos recursos: empenhos, liquidações e pagamentos a fornecedores."
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
          onClear={() => { setBusca(""); setSecretaria(""); }}
          onExport={handleExport}
          placeholder="Buscar por fornecedor ou objeto..."
        >
          <select 
            className={styles.filterSelect}
            value={secretaria}
            onChange={(e) => setSecretaria(e.target.value)}
          >
            <option value="">Todas as Secretarias</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Obras">Obras</option>
            <option value="Administração">Administração</option>
          </select>
        </TransparencyFilters>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Banknote size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(totalEmpenhado)}</strong>
              <span className={styles.statLabel}>Total Empenhado</span>
            </div>
            <ArrowDownRight className={styles.scTrend} size={14} />
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filteredDespesas.filter(d => d.status === 'Pago').reduce((s,d) => s+d.valor, 0))}</strong>
              <span className={styles.statLabel}>Valor Pago</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Clock size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filteredDespesas.filter(d => d.status !== 'Pago').reduce((s,d) => s+d.valor, 0))}</strong>
              <span className={styles.statLabel}>Restos a Pagar</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><FileText size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filteredDespesas.length}</strong>
              <span className={styles.statLabel}>Registros Localizados</span>
            </div>
          </div>
        </div>

        {/* View Selection */}
        <div className={styles.viewTabs}>
          <button 
            className={`${styles.tabItem} ${view === "cards" ? styles.tabActive : ""}`}
            onClick={() => setView("cards")}
          >
            <LayoutGrid size={16} /> Grade de Detalhes
          </button>
          <button 
            className={`${styles.tabItem} ${view === "tabela" ? styles.tabActive : ""}`}
            onClick={() => setView("tabela")}
          >
            <List size={16} /> Listagem Simplificada
          </button>
        </div>

        {/* Main Content Area */}
        {view === "cards" ? (
          <div className={styles.cardsGrid}>
            {filteredDespesas.length > 0 ? filteredDespesas.map(d => (
              <div key={d.id} className={styles.expenseCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.secBadge}><Building2 size={12} /> {d.secretaria}</div>
                  <div className={`${styles.statusBadge} ${styles['status' + d.status]}`}>{d.status}</div>
                </div>
                
                <h3 className={styles.cardTitle}>{d.descricao}</h3>
                
                <div className={styles.cardDetails}>
                  <div className={styles.detailRow}>
                    <User size={14} /> <span>{d.fornecedor}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <Tag size={14} /> <span>{d.categoria}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <Calendar size={14} /> <span>{MESES[d.mes-1]} / {d.ano}</span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <div className={styles.priceWrap}>
                    <span className={styles.priceLabel}>Valor Liquidado</span>
                    <strong className={styles.priceValue}>{formatBRL(d.valor)}</strong>
                  </div>
                  <button className={styles.btnDetail} onClick={() => alert("Visualização de Nota Fiscal simulada.")}>
                    Nota <Download size={14} />
                  </button>
                </div>
              </div>
            )) : (
              <div className={styles.emptyResults}>
                <Search size={48} />
                <p>Nenhuma despesa localizada com os filtros atuais.</p>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.tableBlock}>
            <table className={styles.thinTable}>
              <thead>
                <tr>
                  <th>Descrição da Despesa</th>
                  <th>Fornecedor</th>
                  <th className={styles.rightAlign}>Valor</th>
                </tr>
              </thead>
              <tbody>
                {filteredDespesas.map(d => (
                  <tr key={d.id}>
                    <td><strong>{d.descricao}</strong><br/><small>{d.secretaria}</small></td>
                    <td>{d.fornecedor}</td>
                    <td className={`${styles.rightAlign} ${styles.priceCell}`}>{formatBRL(d.valor)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
