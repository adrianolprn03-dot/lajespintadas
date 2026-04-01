"use client";

import { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie
} from 'recharts';
import { 
  Coins, TrendingUp, Table as TableIcon, ChartBar, Wallet, Info, 
  ArrowUpRight, Download, Filter, ArrowDownLeft
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Receitas.module.css';

// Mock Data structure
type Receita = {
  id: string;
  descricao: string;
  categoria: string;
  valor: number;
  mes: number;
  ano: number;
};

const MOCK_RECEITAS: Receita[] = [
  { id: "1", descricao: "Fundo de Participação dos Municípios (FPM)", categoria: "Transferências", valor: 1250000.50, mes: 1, ano: 2026 },
  { id: "2", descricao: "Fundo de Manutenção da Educação (FUNDEB)", categoria: "Transferências", valor: 850000.00, mes: 1, ano: 2026 },
  { id: "3", descricao: "Arrecadação de IPTU Mensal", categoria: "Impostos", valor: 45000.00, mes: 1, ano: 2026 },
  { id: "4", descricao: "Imposto sobre Serviços (ISS)", categoria: "Impostos", valor: 78000.00, mes: 1, ano: 2026 },
  { id: "5", descricao: "Taxas de Licenciamento e Vigilância", categoria: "Taxas", valor: 12000.00, mes: 1, ano: 2026 },
  { id: "6", descricao: "FPM - Segunda Parcela", categoria: "Transferências", valor: 1100000.00, mes: 2, ano: 2026 },
  { id: "7", descricao: "ICMS - Repasse Estadual", categoria: "Transferências", valor: 320000.00, mes: 2, ano: 2026 },
];

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#64748b'];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ReceitasClient() {
  const [view, setView] = useState<"tabela" | "grafico">("tabela");
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");
  const [mes, setMes] = useState("");
  const [categoria, setCategoria] = useState("");

  const filteredData = useMemo(() => {
    return MOCK_RECEITAS.filter(r => {
      const matchAno = r.ano.toString() === ano;
      const matchMes = !mes || r.mes.toString() === mes;
      const matchCategoria = !categoria || r.categoria === categoria;
      const matchBusca = !busca || r.descricao.toLowerCase().includes(busca.toLowerCase());
      return matchAno && matchMes && matchCategoria && matchBusca;
    });
  }, [ano, mes, categoria, busca]);

  const chartData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: MESES[i],
      valor: MOCK_RECEITAS
        .filter(r => r.ano.toString() === ano && r.mes === i + 1)
        .reduce((sum, r) => sum + r.valor, 0)
    }));
  }, [ano]);

  const pieData = useMemo(() => {
    const cats = [...new Set(filteredData.map(r => r.categoria))];
    return cats.map(c => ({
      name: c,
      value: filteredData.filter(r => r.categoria === c).reduce((sum, r) => sum + r.valor, 0)
    }));
  }, [filteredData]);

  const totalArrecadado = filteredData.reduce((acc, curr) => acc + curr.valor, 0);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filteredData.map(r => ({
      "Descrição": r.descricao,
      "Categoria": r.categoria,
      "Competência": `${r.mes}/${r.ano}`,
      "Valor": formatBRL(r.valor)
    }));
    const filename = `receitas_lajes_pintadas_${ano}`;
    const title = `Relatório de Receitas - Exercício ${ano}`;
    
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, title);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Receitas" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Receitas Públicas"
        description="Acompanhe a arrecadação e as fontes de recursos que sustentam as políticas públicas e serviços essenciais."
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
          onClear={() => { setBusca(""); setMes(""); setCategoria(""); }}
          onExport={handleExport}
          placeholder="Filtrar por nome da receita..."
        >
          <select 
            className={styles.filterSelect}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
            <option value="Transferências">Transferências</option>
            <option value="Impostos">Impostos</option>
            <option value="Taxas">Taxas</option>
          </select>
        </TransparencyFilters>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Wallet size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(totalArrecadado)}</strong>
              <span className={styles.statLabel}>Total Arrecadado</span>
            </div>
            <div className={styles.scTrend}><ArrowUpRight size={12} /> 8.4%</div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><TrendingUp size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filteredData.filter(r => r.categoria === 'Transferências').reduce((s,r) => s + r.valor, 0))}</strong>
              <span className={styles.statLabel}>Repasses Externos</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><Coins size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(filteredData.filter(r => r.categoria !== 'Transferências').reduce((s,r) => s + r.valor, 0))}</strong>
              <span className={styles.statLabel}>Receitas Próprias</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><ArrowDownLeft size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(totalArrecadado / (mes ? 1 : 12))}</strong>
              <span className={styles.statLabel}>Média Mensal</span>
            </div>
          </div>
        </div>

        {/* View Switcher and Visualization Wrapper */}
        <div className={styles.vizWrapper}>
          <div className={styles.vizTabs}>
            <button 
              className={`${styles.tabBtn} ${view === "tabela" ? styles.tabActive : ""}`}
              onClick={() => setView("tabela")}
            >
              <TableIcon size={16} /> Ver Tabela
            </button>
            <button 
              className={`${styles.tabBtn} ${view === "grafico" ? styles.tabActive : ""}`}
              onClick={() => setView("grafico")}
            >
              <ChartBar size={16} /> Análise Gráfica
            </button>
          </div>

          <div className={styles.vizContent}>
            {view === "tabela" ? (
              <div className={styles.tableResponsive}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Fonte de Receita</th>
                      <th>Classificação</th>
                      <th className={styles.centerAlign}>Referência</th>
                      <th className={styles.rightAlign}>Valor (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? filteredData.map(r => (
                      <tr key={r.id}>
                        <td>
                          <div className={styles.sourceCell}>
                            <Coins size={14} className={styles.tableIcon} />
                            <span>{r.descricao}</span>
                          </div>
                        </td>
                        <td><span className={styles.catBadge}>{r.categoria}</span></td>
                        <td className={styles.centerAlign}>{MESES[r.mes-1]} / {r.ano}</td>
                        <td className={`${styles.rightAlign} ${styles.priceCell}`}>{formatBRL(r.valor)}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className={styles.noData}>Nenhum registro encontrado para este filtro.</td>
                      </tr>
                    )}
                  </tbody>
                  {filteredData.length > 0 && (
                    <tfoot>
                      <tr>
                        <td colSpan={3}>Subtotal Filtrado</td>
                        <td className={styles.rightAlign}>{formatBRL(totalArrecadado)}</td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            ) : (
              <div className={styles.analyticsLayout}>
                <div className={styles.barChartWrap}>
                  <div className={styles.chartHeader}>
                    <h4>Evolução Mensal ({ano})</h4>
                    <p>Total agregado por mês de competência</p>
                  </div>
                  <div className={styles.chartBody}>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748B', fontSize: 11, fontWeight: 700 }}
                        />
                        <YAxis 
                          hide 
                        />
                        <Tooltip 
                          cursor={{ fill: 'rgba(16, 185, 129, 0.05)' }} 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                          formatter={(v: any) => [formatBRL(Number(v)), "Arrecadado"]}
                        />
                        <Bar dataKey="valor" radius={[6, 6, 0, 0]} barSize={35}>
                          {chartData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.valor > 0 ? '#10b981' : '#E2E8F0'} 
                              fillOpacity={entry.valor > 0 ? 0.9 : 0.4}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className={styles.sideCharts}>
                  <div className={styles.pieChartWrap}>
                    <h4>Mix de Receitas</h4>
                    <div className={styles.pieInner}>
                      <ResponsiveContainer width="100%" height={180}>
                        <PieChart>
                          <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={45}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cellpie-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                             contentStyle={{ borderRadius: '12px', border: 'none', fontSize: '12px' }}
                             formatter={(v: any) => [formatBRL(Number(v)), ""]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className={styles.pieLegend}>
                          {pieData.map((d, i) => (
                             <div key={i} className={styles.legendItem}>
                                <span className={styles.dot} style={{ backgroundColor: COLORS[i % COLORS.length] }}></span>
                                {d.name}
                             </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
