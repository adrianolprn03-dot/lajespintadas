"use client";

import { useState } from 'react';
import { UserCheck, Building2, Search, Download, AlertCircle, FileText } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Terceirizados.module.css';

type Terceirizado = {
  id: string;
  nome: string;
  funcao: string;
  empresa: string;
  vencimentoContrato: string;
  lotacao: string;
};

const MOCK_TERCEIRIZADOS: Terceirizado[] = [
  { id: "1", nome: "JOÃO PEDRO OLIVEIRA", funcao: "APOIO ADMINISTRATIVO", empresa: "SUPORTE LTDA", vencimentoContrato: "2026-12-31", lotacao: "GABINETE" },
  { id: "2", nome: "MARIANA GOMES", funcao: "AUXILIAR DE SERVICOS GERAIS", empresa: "LIMPEZA TOTAL EIRELI", vencimentoContrato: "2026-10-15", lotacao: "EDUCACAO" },
  { id: "3", nome: "RAIMUNDO NONATO", funcao: "VIGIA NOTURNO", empresa: "SEGURANCA FORTE S/A", vencimentoContrato: "2027-01-20", lotacao: "SAUDE" },
];

export default function TerceirizadosPage() {
  const [busca, setBusca] = useState("");

  const filtrados = MOCK_TERCEIRIZADOS.filter(t => 
    !busca || t.nome.toLowerCase().includes(busca.toLowerCase()) || t.funcao.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(t => ({
      "Profissional": t.nome,
      "Função / Cargo": t.funcao,
      "Empresa Contratada": t.empresa,
      "Vencimento Contrato": new Date(t.vencimentoContrato).toLocaleDateString("pt-BR"),
      "Lotação": t.lotacao
    }));
    if (format === "csv") exportToCSV(payload, "lista_terceirizados");
    else if (format === "json") exportToJSON(payload, "lista_terceirizados");
    else exportToPDF(payload, "lista_terceirizados", "Relação de Terceirizados e Postos de Trabalho");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Servidores", href: "/transparencia/servidores" },
    { label: "Terceirizados" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Terceirizados e Postos de Trabalho"
        description="Relação de profissionais vinculados a empresas prestadoras de serviço no âmbito municipal."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          onClear={() => setBusca("")}
          onExport={handleExport}
          currentYear="2026"
          onYearChange={() => {}}
          currentMonth=""
          onMonthChange={() => {}}
          availableYears={["2026"]}
          placeholder="Filtrar por nome ou função..."
        />

        <div className={styles.tableBlock}>
          <div className={styles.tableResponsive}>
            <table className={styles.customTable}>
              <thead>
                <tr>
                  <th>Profissional</th>
                  <th>Empresa Contratada</th>
                  <th>Função / Posto</th>
                  <th>Lotação</th>
                  <th>Vencimento do Contrato</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.length > 0 ? filtrados.map(t => (
                  <tr key={t.id}>
                    <td>
                      <div className={styles.userName}>
                        <UserCheck size={16} color="#059669" />
                        <strong>{t.nome}</strong>
                      </div>
                    </td>
                    <td>
                      <div className={styles.empSection}>
                        <Building2 size={14} color="#64748b" />
                        <span>{t.empresa}</span>
                      </div>
                    </td>
                    <td><span className={styles.funBadge}>{t.funcao}</span></td>
                    <td>{t.lotacao}</td>
                    <td className={styles.dateCell}>{new Date(t.vencimentoContrato).toLocaleDateString("pt-BR")}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className={styles.empty}>Nenhum registro encontrado.</td>
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
