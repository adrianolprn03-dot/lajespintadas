"use client";

import { useState } from 'react';
import { 
  User, Shield, Calendar, Download,
  History, Info, Landmark
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Agentes.module.css';

type AgentePolitico = {
  id: string;
  nome: string;
  cargo: string;
  bruto: number;
  liquido: number;
  dataPosse: string;
  leiFixadora: string;
};

const MOCK_AGENTES: AgentePolitico[] = [
  { id: "1", nome: "ANA LUCIA FERREIRA", cargo: "PREFEITA MUNICIPAL", bruto: 22000.00, liquido: 16500.00, dataPosse: "2025-01-01", leiFixadora: "Lei nº 1.234/2024" },
  { id: "2", nome: "CARLOS ALBERTO MEDEIROS", cargo: "VICE-PREFEITO", bruto: 14000.00, liquido: 10800.00, dataPosse: "2025-01-01", leiFixadora: "Lei nº 1.234/2024" },
  { id: "3", nome: "RODRIGO OLIVEIRA LIMA", cargo: "SECRETARIO DE ADMINISTRACAO", bruto: 8500.00, liquido: 6700.00, dataPosse: "2025-01-10", leiFixadora: "Lei nº 1.234/2024" },
  { id: "4", nome: "MARIA DO CARMO SALES", cargo: "SECRETARIA DE SAUDE", bruto: 8500.00, liquido: 6700.00, dataPosse: "2025-01-10", leiFixadora: "Lei nº 1.234/2024" },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function AgentesPoliticosClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2026");

  const filtrados = MOCK_AGENTES.filter(a => 
    !busca || a.nome.toLowerCase().includes(busca.toLowerCase()) || a.cargo.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(a => ({
      "Agente": a.nome,
      "Cargo": a.cargo,
      "Subsídio Bruto": formatBRL(a.bruto),
      "Rendimento Líquido": formatBRL(a.liquido),
      "Data da Posse": new Date(a.dataPosse).toLocaleDateString("pt-BR"),
      "Base Legal": a.leiFixadora
    }));
    const filename = `agentes_politicos_lajes_${ano}`;
    
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Tabela de Subsídios - Agentes Políticos (Exercício ${ano})`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Servidores", href: "/transparencia/servidores" },
    { label: "Agentes Políticos" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Agentes Políticos e Subsídios"
        description="Transparência total sobre a remuneração dos ocupantes de cargos eletivos e primeiro escalão municipal."
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
          availableYears={["2026", "2025"]}
          onClear={() => setBusca("")}
          onExport={handleExport}
          placeholder="Filtrar por nome ou cargo político..."
        />

        <div className={styles.agentesGrid}>
          {filtrados.length > 0 ? filtrados.map(a => (
            <div key={a.id} className={styles.agenteCard}>
              <div className={styles.cardHeader}>
                <div className={styles.avatarCircle}>
                  <User size={48} />
                </div>
                <strong className={styles.agenteName}>{a.nome}</strong>
                <span className={styles.agenteCargo}>{a.cargo}</span>
              </div>
              
              <div className={styles.cardBody}>
                <span className={styles.subsidyLabel}>Subsídio Mensal (Bruto)</span>
                <strong className={styles.subsidyValue}>{formatBRL(a.bruto)}</strong>
                
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Rendimento Líquido</span>
                  <span className={`${styles.detailVal} ${styles.valGreen}`}>{formatBRL(a.liquido)}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Data da Posse</span>
                  <span className={styles.detailVal}>{new Date(a.dataPosse).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Legislação Base</span>
                  <span className={styles.detailVal}>{a.leiFixadora}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button className={styles.btnHist} onClick={() => alert("Histórico de evolução de subsídios simulado.")}>
                  <History size={16} /> Ver Evolução Histórica
                </button>
              </div>
            </div>
          )) : (
            <div className="empty-results" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
              <Info size={48} color="#94a3b8" />
              <p style={{ marginTop: '1rem', color: '#64748b' }}>Nenhum agente político localizado para os critérios aplicados.</p>
            </div>
          )}
        </div>

        {/* Legal Disclaimer Footer Card */}
        <div className={styles.complianceFooter}>
          <div className={styles.complianceIconWrap}>
            <Shield size={32} />
          </div>
          <div className={styles.complianceInfo}>
            <h3>Instrumento de Planejamento Fiscal</h3>
            <p>Os subsídios e as remunerações obedecem ao teto constitucional e são fixados pelo Poder Legislativo para cada legislatura, em observância ao Art. 29, inciso V da Constituição Federal e à Lei de Responsabilidade Fiscal (LC 101/2000).</p>
          </div>
        </div>

      </div>
    </div>
  );
}
