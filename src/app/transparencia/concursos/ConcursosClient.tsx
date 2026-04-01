"use client";

import { useState, useMemo } from 'react';
import { 
  FileText, Search, Download, UserPlus, 
  Calendar, CheckCircle2, Info, AlertTriangle, ChevronRight
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Concursos.module.css';

type Concurso = {
  id: string;
  edital: string;
  ano: string;
  titulo: string;
  tipo: "Concurso Público" | "Processo Seletivo";
  status: "Inscrições Abertas" | "Em Andamento" | "Homologado" | "Encerrado";
  data: string;
};

const MOCK_CONCURSOS: Concurso[] = [
  { id: "1", edital: "001/2024", ano: "2024", titulo: "Processo Seletivo Simplificado - Saúde", tipo: "Processo Seletivo", status: "Inscrições Abertas", data: "2024-03-15" },
  { id: "2", edital: "001/2023", ano: "2023", titulo: "Concurso Público para Provimento de Cargos Efetivos", tipo: "Concurso Público", status: "Homologado", data: "2023-11-20" },
  { id: "3", edital: "002/2023", ano: "2023", titulo: "Processo Seletivo - Estagiários de Direito", tipo: "Processo Seletivo", status: "Encerrado", data: "2023-08-05" },
];

export default function ConcursosClient() {
  const [busca, setBusca] = useState("");
  const [ano, setAno] = useState("2024");
  const [tipoFiltro, setTipoFiltro] = useState("");

  const filtrados = useMemo(() => {
    return MOCK_CONCURSOS.filter(c => {
      const matchAno = !ano || c.ano === ano;
      const matchTipo = !tipoFiltro || c.tipo === tipoFiltro;
      const matchBusca = !busca || c.titulo.toLowerCase().includes(busca.toLowerCase()) || c.edital.includes(busca);
      return matchAno && matchTipo && matchBusca;
    });
  }, [ano, tipoFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtrados.map(c => ({ "Edital": c.edital, "Título": c.titulo, "Tipo": c.tipo, "Status": c.status, "Data": c.data }));
    const filename = `concursos_lajes_pintadas_${ano}`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Concursos e Seleções - Exercício ${ano}`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Recursos Humanos", href: "/transparencia/servidores" },
    { label: "Concursos e Seleções" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Concursos e Seleções"
        description="Editais, convocações e resultados de processos admissionais do município de Lajes Pintadas."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as any}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><UserPlus size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_CONCURSOS.length}</strong>
              <span className={styles.statLabel}>Total de Editais</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as any}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>01</strong>
              <span className={styles.statLabel}>Inscrições Abertas</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as any}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><FileText size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>05</strong>
              <span className={styles.statLabel}>Atos Convocações</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as any}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><Info size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>100%</strong>
              <span className={styles.statLabel}>Índice Admissional</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear={ano}
          onYearChange={setAno}
          currentMonth=""
          onMonthChange={() => {}}
          onClear={() => { setBusca(""); setAno("2024"); setTipoFiltro(""); }}
          onExport={handleExport}
          availableYears={["2024", "2023", "2022"]}
          placeholder="Número do edital ou palavra-chave..."
        >
          <select 
            className="flex-1 bg-white border border-gray-200 p-3 rounded-lg font-bold text-sm outline-none"
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Tipo de Provimento</option>
            <option value="Concurso Público">Concurso Público</option>
            <option value="Processo Seletivo">Processo Seletivo</option>
          </select>
        </TransparencyFilters>

        {/* Results List */}
        <div className={styles.listContainer}>
          {filtrados.length > 0 ? filtrados.map(c => (
            <div key={c.id} className={styles.concursoCard}>
              <div className={styles.cardMain}>
                <div className={styles.cardHeader}>
                  <span className={styles.editalBadge}>Edital {c.edital}</span>
                  <div className={`${styles.statusBadge} ${
                    c.status === 'Inscrições Abertas' ? styles.statusAberto : 
                    c.status === 'Encerrado' ? styles.statusEncerrado : 
                    styles.statusAndamento
                  }`}>
                    {c.status}
                  </div>
                </div>
                <h3 className={styles.concursoTitle}>{c.titulo}</h3>
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}><Calendar size={14} /> <span>Publicado em {new Date(c.data).toLocaleDateString('pt-BR')}</span></div>
                  <div className={styles.metaItem}><Info size={14} /> <span>{c.tipo}</span></div>
                </div>
              </div>
              <button className={styles.btnAcessar}>
                Acessar Detalhes <ChevronRight size={18} />
              </button>
            </div>
          )) : (
            <div className={styles.noResults}>
               <AlertTriangle size={32} />
               <p>Nenhum concurso localizado para os filtros informados.</p>
            </div>
          )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
