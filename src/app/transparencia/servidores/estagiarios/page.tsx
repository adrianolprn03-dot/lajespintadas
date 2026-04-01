"use client";

import { useState } from 'react';
import { GraduationCap, School, Search, Download, Info, Landmark } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Estagiarios.module.css';

type Estagiario = {
  id: string;
  nome: string;
  curso: string;
  instituicao: string;
  dataTermino: string;
  lotacao: string;
  bolsa: number;
};

const MOCK_ESTAGIARIOS: Estagiario[] = [
  { id: "1", nome: "JULIANA ALVES", curso: "DIREITO", instituicao: "UFRN", dataTermino: "2026-12-15", lotacao: "PROCURADORIA", bolsa: 1100.00 },
  { id: "2", nome: "FERNANDO COSTA", curso: "GESTAO PUBLICA", instituicao: "IFRN", dataTermino: "2026-08-30", lotacao: "ADMINISTRACAO", bolsa: 950.00 },
  { id: "3", nome: "BEATRIZ SANTOS", curso: "ENFERMAGEM", instituicao: "UNIRN", dataTermino: "2027-02-10", lotacao: "UBS CENTRO", bolsa: 950.00 },
];

export default function EstagiariosPage() {
  const [busca, setBusca] = useState("");

  const filtrados = MOCK_ESTAGIARIOS.filter(e => 
    !busca || e.nome.toLowerCase().includes(busca.toLowerCase()) || e.curso.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(e => ({
      "Estudante": e.nome,
      "Curso": e.curso,
      "Instituição": e.instituicao,
      "Lotação": e.lotacao,
      "Bolsa Auxílio": e.bolsa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }));
    if (format === "csv") exportToCSV(payload, "lista_estagiarios");
    else if (format === "json") exportToJSON(payload, "lista_estagiarios");
    else exportToPDF(payload, "lista_estagiarios", "Relação de Estagiários Municipais");
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Servidores", href: "/transparencia/servidores" },
    { label: "Estagiários" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Programa de Estágio Municipal"
        description="Transparência sobre a contratação de estudantes e convênios com instituições de ensino."
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
          placeholder="Nome do estagiário ou curso..."
        />

        <div className={styles.estagiariosList}>
          {filtrados.length > 0 ? filtrados.map(e => (
            <div key={e.id} className={styles.estagiarioCard}>
              <div className={styles.cardMain}>
                <div className={styles.profileSection}>
                  <div className={styles.iconCircle}><GraduationCap size={24} /></div>
                  <div className={styles.nameBlock}>
                    <h3>{e.nome}</h3>
                    <span className={styles.courseTag}>{e.curso}</span>
                  </div>
                </div>
                <div className={styles.detailsBlock}>
                  <div className={styles.detailItem}>
                    <School size={14} />
                    <span>{e.instituicao}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <Landmark size={14} />
                    <span>Lotação: {e.lotacao}</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardSide}>
                <div className={styles.bolsaValue}>
                  <span className={styles.bolsaLabel}>Bolsa Auxílio</span>
                  <strong>{e.bolsa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                </div>
                <div className={styles.validity}>
                  Válido até {new Date(e.dataTermino).toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.empty}>Nenhum estagiário encontrado.</div>
          )}
        </div>

        <div className={styles.infoFooter}>
          <Info size={20} />
          <p>O estágio na administração pública é regido pela Lei Federal nº 11.788/2008.</p>
        </div>
      </div>
    </div>
  );
}
