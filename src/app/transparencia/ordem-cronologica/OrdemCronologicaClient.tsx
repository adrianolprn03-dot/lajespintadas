"use client";

import { useState, useEffect } from "react";
import { Info, Building, Calendar, Loader2, CheckCircle, List, History, Clock } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import TransparencyFilters from "@/components/transparencia/TransparencyFilters";
import { exportToCSV, exportToJSON, exportToPDF } from "@/lib/exportUtils";
import BannerPNTP from "@/components/transparencia/BannerPNTP";
import styles from "./Ordem.module.css";

type Pagamento = {
  id: string;
  ordem: number;
  fornecedor: string;
  cnpj: string;
  descricao: string;
  valor: number;
  dataEmpenho: string;
  dataLiquidacao: string;
  dataPagamento: string | null;
  secretaria: string;
  status: "pendente" | "pago" | "suspenso";
};

const statusConfig: Record<string, { label: string; classStatus: string }> = {
  pendente: { label: "Pendente", classStatus: styles.statusPendente },
  pago: { label: "Pago", classStatus: styles.statusPago },
  suspenso: { label: "Suspenso", classStatus: styles.statusSuspenso },
};

const MOCK_DATA: Pagamento[] = [
  {
    id: "1", ordem: 1, fornecedor: "Distribuidora de Materiais LTDA", cnpj: "00.000.000/0001-00",
    descricao: "Aquisição de material de expediente", valor: 4500.00,
    dataEmpenho: "2026-01-05", dataLiquidacao: "2026-01-12", dataPagamento: "2026-01-15",
    secretaria: "Administração", status: "pago"
  },
  {
    id: "2", ordem: 2, fornecedor: "Construtora Norte Sul EIRELI", cnpj: "00.000.001/0001-11",
    descricao: "Execução de serviços de manutenção predial", valor: 18300.00,
    dataEmpenho: "2026-01-08", dataLiquidacao: "2026-01-20", dataPagamento: null,
    secretaria: "Obras e Infra", status: "pendente"
  },
  {
    id: "3", ordem: 3, fornecedor: "Farmácia Saúde Popular ME", cnpj: "00.000.002/0001-22",
    descricao: "Aquisição de medicamentos básicos", valor: 12780.50,
    dataEmpenho: "2026-01-10", dataLiquidacao: "2026-01-22", dataPagamento: "2026-01-28",
    secretaria: "Saúde", status: "pago"
  },
];

function formatCurrency(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("pt-BR");
}

export default function OrdemCronologicaClient() {
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear().toString());
  const [mes, setMes] = useState((new Date().getMonth() + 1).toString());
  const [statusFiltro, setStatusFiltro] = useState("");

  useEffect(() => {
    setLoading(true);
    // Simular fetch da API na troca de mês/ano via Next Request ou Local Fetch
    const timer = setTimeout(() => {
      setPagamentos(MOCK_DATA);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [ano, mes, statusFiltro]);

  const filtrados = pagamentos.filter(p => {
    const b = busca.toLowerCase();
    const matchStatus = !statusFiltro || p.status === statusFiltro;
    const matchBusca = !busca || 
      p.fornecedor.toLowerCase().includes(b) || 
      p.descricao.toLowerCase().includes(b) ||
      p.cnpj.includes(b);
    return matchStatus && matchBusca;
  });

  const handleClearFilters = () => {
    setBusca("");
    setAno(new Date().getFullYear().toString());
    setMes((new Date().getMonth() + 1).toString());
    setStatusFiltro("");
  };

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(p => ({
      "Ordem Filas": p.ordem,
      "Fornecedor": p.fornecedor,
      "CNPJ": p.cnpj,
      "Descrição": p.descricao,
      "Secretaria": p.secretaria,
      "Liquidação": formatDate(p.dataLiquidacao),
      "Data Pagamento": p.dataPagamento ? formatDate(p.dataPagamento) : "Pendente",
      "Valor R$": formatCurrency(p.valor),
      "Status": statusConfig[p.status]?.label || p.status,
    }));

    const filename = `ordem_cronologica_${mes}_${ano}`;
    const title = `Ordem Cronológica de Pagamentos – ${mes}/${ano}`;

    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, title);
  };

  const totalPendente = filtrados.filter(p => p.status === "pendente").reduce((acc, p) => acc + p.valor, 0);
  const totalPago = filtrados.filter(p => p.status === "pago").reduce((acc, p) => acc + p.valor, 0);

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Ordem Cronológica de Pagamentos"
        description="Acompanhe a fila completa e oficial de pagamentos a fornecedores em conformidade estrita com o art. 141 da Nova Lei de Licitações (Lei nº 14.133/2021)."
        breadcrumbs={[
          { label: "Transparência", href: "/transparencia" },
          { label: "Ordem Cronológica" }
        ]}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Compliance Warning block */}
        <div className={styles.complianceMessage}>
          <Info size={28} className={styles.complianceIcon} />
          <div className={styles.complianceText}>
            <span className={styles.complianceLabel}>Transparência Ativa – PNTP {ano}</span>
            <p>Os pagamentos são efetuados com base na data de exigibilidade da obrigação e divididos por fonte de recursos, garantindo total igualdade de condições.</p>
          </div>
        </div>

        {/* Global Transparency Filters Component */}
        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth={mes}
          onMonthChange={setMes}
          onClear={handleClearFilters}
          onExport={handleExport}
          availableYears={["2026", "2025", "2024"]}
          placeholder="Fornecedor, CNPJ ou histórico..."
        >
          {/* Custom Inner Filter for Status */}
          <div className={styles.customStatusFilter}>
            <label>Status</label>
            <select value={statusFiltro} onChange={(e) => setStatusFiltro(e.target.value)}>
              <option value="">(Todos)</option>
              <option value="pendente">Pendente</option>
              <option value="pago">Pago</option>
              <option value="suspenso">Suspenso</option>
            </select>
          </div>
        </TransparencyFilters>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Clock size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatCurrency(totalPendente)}</strong>
              <span className={styles.statLabel}>Aguardando Pagamento</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatCurrency(totalPago)}</strong>
              <span className={styles.statLabel}>Total Pago (Mês)</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><List size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{filtrados.length}</strong>
              <span className={styles.statLabel}>Registros em Fila</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><History size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>12 Dias</strong>
              <span className={styles.statLabel}>Tempo Médio de Espera</span>
            </div>
          </div>
        </div>

        {/* Modern Data Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableScroll}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th style={{ width: "80px", textAlign: "center" }}>Ordem</th>
                  <th>Fornecedor / CNPJ</th>
                  <th>Descrição Detalhada</th>
                  <th>Secretaria / Lotação</th>
                  <th>Liquidação</th>
                  <th style={{ textAlign: "right" }}>Valor Bruto</th>
                  <th style={{ textAlign: "center" }}>Status Atual</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className={styles.loadingRow}>
                      <Loader2 className={styles.spinner} />
                      Carregando dados da API oficial...
                    </td>
                  </tr>
                ) : filtrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className={styles.emptyRow}>
                      Nenhum registro localizado para os critérios informados.
                    </td>
                  </tr>
                ) : (
                  filtrados.map((item) => (
                    <tr key={item.id}>
                      <td className={styles.colOrdem}>
                        <div className={styles.ordemBadge}>{item.ordem}º</div>
                      </td>
                      <td className={styles.colFornecedor}>
                        <strong>{item.fornecedor}</strong>
                        <span className={styles.cnpjFont}>{item.cnpj}</span>
                      </td>
                      <td className={styles.colDescricao}>
                        <p>{item.descricao}</p>
                      </td>
                      <td className={styles.colSecretaria}>
                        <Building size={14}/> {item.secretaria}
                      </td>
                      <td className={styles.colData}>
                        <Calendar size={14}/> {formatDate(item.dataLiquidacao)}
                      </td>
                      <td className={styles.colValor}>
                        {formatCurrency(item.valor)}
                      </td>
                      <td className={styles.colStatus}>
                        <span className={`${styles.statusBadge} ${statusConfig[item.status]?.classStatus}`}>
                          {statusConfig[item.status]?.label}
                        </span>
                      </td>
                    </tr>
                  ))
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
