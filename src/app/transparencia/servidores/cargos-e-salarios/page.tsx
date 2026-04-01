"use client";

import { useState } from 'react';
import { 
  Briefcase, Landmark, Info, Download, 
  Search, FileText, ChevronRight 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Cargos.module.css';

type Cargo = {
  id: string;
  nome: string;
  nivel: string;
  vencimentoBase: number;
  vagasOcupadas: number;
  vagasTotais: number;
};

const MOCK_CARGOS: Cargo[] = [
  { id: "1", nome: "AGENTE ADMINISTRATIVO", nivel: "FUNDAMENTAL", vencimentoBase: 1412.00, vagasOcupadas: 45, vagasTotais: 50 },
  { id: "2", nome: "ASSISTENTE ADMINISTRATIVO", nivel: "MEDIO", vencimentoBase: 1850.00, vagasOcupadas: 32, vagasTotais: 40 },
  { id: "3", nome: "PROFESSOR NIVEL I", nivel: "SUPERIOR", vencimentoBase: 4580.57, vagasOcupadas: 180, vagasTotais: 200 },
  { id: "4", nome: "MEDICO PLANTONISTA", nivel: "SUPERIOR", vencimentoBase: 12500.00, vagasOcupadas: 12, vagasTotais: 15 },
  { id: "5", nome: "ENFERMEIRO PADRAO", nivel: "SUPERIOR", vencimentoBase: 4750.00, vagasOcupadas: 24, vagasTotais: 30 },
];

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function CargosSalariosPage() {
  const [busca, setBusca] = useState("");

  const filtrados = MOCK_CARGOS.filter(c => 
    !busca || c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(c => ({
      "Cargo": c.nome,
      "Nível": c.nivel,
      "Vencimento Base": formatBRL(c.vencimentoBase),
      "Vagas Ocupadas": c.vagasOcupadas,
      "Vagas Totais": c.vagasTotais
    }));
    if (format === "csv") exportToCSV(payload, "tabela_cargos_salarios");
    else if (format === "json") exportToJSON(payload, "tabela_cargos_salarios");
    else exportToPDF(payload, "tabela_cargos_salarios", "Tabela de Vencimentos - Quadro de Pessoal");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Servidores", href: "/transparencia/servidores" },
    { label: "Cargos e Salários" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Cargos e Tabelas de Vencimentos"
        description="Consulte a estrutura de cargos, níveis de escolaridade e o vencimento base oficial do quadro de pessoal."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          availableYears={["2026"]}
          onClear={() => setBusca("")}
          onExport={handleExport}
          currentYear="2026"
          onYearChange={() => {}}
          currentMonth=""
          onMonthChange={() => {}}
          placeholder="Pesquisar cargo ou nível..."
        />

        <div className={styles.tableTableArea}>
          <div className={styles.tableResponsive}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Nomenclatura do Cargo</th>
                  <th>Requisito / Nível</th>
                  <th style={{ textAlign: 'right' }}>Vencimento Base</th>
                  <th style={{ textAlign: 'center' }}>Vagas (Ocup/Total)</th>
                  <th style={{ textAlign: 'center' }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length > 0 ? filtrados.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className={styles.cargoInfo}>
                        <Briefcase size={16} color="#3b82f6" />
                        <strong>{c.nome}</strong>
                      </div>
                    </td>
                    <td><span className={styles.nivelBadge}>{c.nivel}</span></td>
                    <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatBRL(c.vencimentoBase)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <div className={styles.vagasBox}>
                        <strong>{c.vagasOcupadas}</strong> / {c.vagasTotais}
                      </div>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button className={styles.btnAction} onClick={() => alert("Visualização de atribuições simulada.")}>
                        <FileText size={14} /> Atribuições
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className={styles.empty}>Nenhum cargo localizado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Informative Note */}
        <div className={styles.noteBox}>
          <Info size={24} />
          <div className={styles.noteText}>
            <p><strong>Atenção:</strong> Os valores exibidos referem-se ao vencimento base (salário base). Vantagens temporárias, adicionais de tempo de serviço, gratificações de função e produtividade podem ser consultadas individualmente na <strong>Folha de Pagamento</strong>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
