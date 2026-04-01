"use client";

import { useState } from 'react';
import { 
  BarChart3, FileText, Download, Info, 
  Search, Percent, Calculator, Landmark, ShieldCheck
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Renuncias.module.css';

type Renuncia = {
  id: string;
  categoria: string;
  descricao: string;
  lei: string;
  valorEstimado: number;
  ano: number;
};

const MOCK_RENUNCIAS: Renuncia[] = [
  { id: "1", categoria: "Isenções Tributárias", descricao: "Isenção de IPTU – Imóveis de entidades beneficentes", lei: "Lei 312/2018", valorEstimado: 48500, ano: 2024 },
  { id: "2", categoria: "Isenções Tributárias", descricao: "Isenção de ISS – Profissionais autônomos de baixa renda", lei: "LC 28/2017", valorEstimado: 22800, ano: 2024 },
  { id: "3", categoria: "Isenções Tributárias", descricao: "Isenção de ITBI – Programas habitacionais populares", lei: "Lei 298/2016", valorEstimado: 15000, ano: 2024 },
  { id: "4", categoria: "Reduções de Alíquotas", descricao: "Redução de ISS – Microempreendedores Individuais (MEI)", lei: "LC Municipal 28/2017", valorEstimado: 31200, ano: 2024 },
  { id: "5", categoria: "Reduções de Alíquotas", descricao: "Desconto de IPTU – Pagamento à vista (5%)", lei: "Lei 312/2018", valorEstimado: 18700, ano: 2024 },
  { id: "6", categoria: "Anistias e Parcelamentos", descricao: "Anistia de multas e juros – REFIS Municipal", lei: "Lei 389/2023", valorEstimado: 76400, ano: 2024 },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function RenunciasClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2024");

  const filtrados = MOCK_RENUNCIAS.filter(d => 
    d.ano.toString() === ano && 
    (!busca || d.descricao.toLowerCase().includes(busca.toLowerCase()) || d.categoria.toLowerCase().includes(busca.toLowerCase()))
  );

  const totalEstimado = filtrados.reduce((s, d) => s + d.valorEstimado, 0);
  const totalCategorias = new Set(filtrados.map(f => f.categoria)).size;

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(d => ({
      "Categoria": d.categoria,
      "Descrição": d.descricao,
      "Base Legal": d.lei,
      "Valor Estimado (R$)": formatBRL(d.valorEstimado)
    }));
    if (format === "csv") exportToCSV(payload, "renuncias_fiscais");
    else if (format === "json") exportToJSON(payload, "renuncias_fiscais");
    else exportToPDF(payload, "renuncias_fiscais", "Demonstrativo de Renúncias de Receita");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Renúncias Fiscais" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Renúncias de Receitas"
        description="Demonstrativo de isenções, reduções de alíquotas e parcelamentos especiais que impactam a arrecadação segundo o art. 14 da LRF."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Compliance Warning */}
        <div className={styles.complianceBox}>
          <Info size={24} className={styles.complianceIcon} />
          <div className={styles.complianceText}>
            <strong>Obrigação Legal – Art. 14 da LRF</strong>
            <p>A concessão ou ampliação de incentivo tributário da qual decorra renúncia de receita deve ser acompanhada de estimativa do impacto orçamentário-financeiro.</p>
          </div>
        </div>

        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Calculator size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{formatBRL(totalEstimado)}</strong>
              <span className={styles.statLabel}>Valor Total das Renúncias</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><BarChart3 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{totalCategorias}</strong>
              <span className={styles.statLabel}>Categorias Ativas</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><Percent size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>1.2%</strong>
              <span className={styles.statLabel}>Impacto na Receita</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as React.CSSProperties}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><ShieldCheck size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>OK</strong>
              <span className={styles.statLabel}>Meta Art. 14 LRF</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          availableYears={["2025", "2024", "2023"]}
          onClear={() => setBusca("")}
          onExport={handleExport}
          currentMonth=""
          onMonthChange={() => {}}
          placeholder="Pesquisar por descrição ou categoria..."
        />

        {/* Benefits List */}
        <div className={styles.listContainer}>
          {filtrados.length > 0 ? filtrados.map(item => (
            <div key={item.id} className={styles.listItem}>
              <div className={styles.itemHeader}>
                <span className={styles.categoryBadge}>{item.categoria}</span>
              </div>
              
              <div className={styles.itemBody}>
                <h3>{item.descricao}</h3>
                
                <div className={styles.legalInfo}>
                  <Landmark size={18} color="#64748b" />
                  <span>Base Legal: <strong>{item.lei}</strong></span>
                </div>
              </div>

              <div className={styles.itemFooter}>
                <div className={styles.valueBox}>
                  <span>Impacto Estimado</span>
                  <strong>{formatBRL(item.valorEstimado)}</strong>
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.emptyState}>Nenhum registro encontrado para a busca.</div>
          )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
