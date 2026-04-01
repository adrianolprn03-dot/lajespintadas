"use client";

import { useState, useMemo } from 'react';
import { 
  HeartPulse, Search, Pill, AlertCircle, 
  CheckCircle2, Box, AlertTriangle, Info 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Medicamentos.module.css';

type Medicamento = {
  id: string;
  nome: string;
  categoria: string;
  observacao: string;
  status: "Disponível" | "Estoque Baixo" | "Em Falta";
};

const MOCK_MEDICAMENTOS: Medicamento[] = [
  { id: "1", nome: "Paracetamol 500mg", categoria: "Analgésicos", observacao: "Uso adulto e pediátrico.", status: "Disponível" },
  { id: "2", nome: "Amoxicilina 500mg", categoria: "Antibióticos", observacao: "Exige retenção de receita.", status: "Estoque Baixo" },
  { id: "3", nome: "Losartana Potássica 50mg", categoria: "Hipertensão", observacao: "Uso contínuo.", status: "Disponível" },
  { id: "4", nome: "Glibenclamida 5mg", categoria: "Diabetes", observacao: "Uso contínuo.", status: "Em Falta" },
];

export default function MedicamentosClient() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [statusFiltro, setStatusFiltro] = useState("");

  const filtradas = useMemo(() => {
    return MOCK_MEDICAMENTOS.filter(m => {
      const matchCategoria = !categoria || m.categoria === categoria;
      const matchStatus = !statusFiltro || m.status === statusFiltro;
      const matchBusca = !busca || m.nome.toLowerCase().includes(busca.toLowerCase());
      return matchCategoria && matchStatus && matchBusca;
    });
  }, [categoria, statusFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(m => ({ "Medicamento": m.nome, "Categoria": m.categoria, "Status": m.status, "Observação": m.observacao }));
    const filename = `medicamentos_sus_lajes_pintadas`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Relação Municipal de Medicamentos (REMUME)`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Saúde", href: "/transparencia/saude" },
    { label: "Medicamentos SUS" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Medicamentos SUS"
        description="Consulte a Relação Municipal de Medicamentos Essenciais (REMUME) e a disponibilidade de estoque."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as any}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><Pill size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_MEDICAMENTOS.length}</strong>
              <span className={styles.statLabel}>Itens Padronizados</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as any}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><CheckCircle2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_MEDICAMENTOS.filter(m => m.status === 'Disponível').length}</strong>
              <span className={styles.statLabel}>Em Estoque</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as any}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Box size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_MEDICAMENTOS.filter(m => m.status === 'Estoque Baixo').length}</strong>
              <span className={styles.statLabel}>Estoque Baixo</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as any}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Info size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>100%</strong>
              <span className={styles.statLabel}>REMUME Ativo</span>
            </div>
          </div>
        </div>

        {/* Info Alert */}
        <div className={styles.infoAlert}>
          <AlertCircle size={24} className="text-red-500 shrink-0" />
          <div className={styles.infoContent}>
            <h4>Orientações para Retirada</h4>
            <p>A dispensação exige receita médica original do SUS, documento com foto e Cartão do SUS.</p>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear=""
          onYearChange={() => {}}
          currentMonth=""
          onMonthChange={() => {}}
          onClear={() => { setBusca(""); setCategoria(""); setStatusFiltro(""); }}
          onExport={handleExport}
          availableYears={["2024"]}
          placeholder="Nome do medicamento ou princípio ativo..."
        >
          <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
            <select 
              className="flex-1 bg-white border border-gray-200 p-3 rounded-lg font-bold text-sm outline-none"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas as Categorias</option>
              <option value="Analgésicos">Analgésicos</option>
              <option value="Antibióticos">Antibióticos</option>
              <option value="Hipertensão">Hipertensão</option>
              <option value="Diabetes">Diabetes</option>
            </select>
          </div>
        </TransparencyFilters>

        {/* Medicine Grid */}
        <div className={styles.mediciGrid}>
          {filtradas.length > 0 ? filtradas.map(m => (
            <div key={m.id} className={styles.mediciCard}>
              <div className={styles.cardHeader}>
                <div className={styles.medIcon}><HeartPulse size={20} /></div>
                <span className={styles.catBadge}>{m.categoria}</span>
              </div>
              <h3 className={styles.medTitle}>{m.nome}</h3>
              <p className={styles.medDesc}>{m.observacao}</p>
              
              <div className={styles.cardFooter}>
                <div className={`${styles.statusBadge} ${
                  m.status === 'Disponível' ? styles.statusDisponivel : 
                  m.status === 'Estoque Baixo' ? styles.statusEstoqueBaixo : 
                  styles.statusEmFalta
                }`}>
                  {m.status === 'Disponível' && <CheckCircle2 size={12} />}
                  {m.status === 'Estoque Baixo' && <Box size={12} />}
                  {m.status === 'Em Falta' && <AlertTriangle size={12} />}
                  {m.status}
                </div>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              Nenhum medicamento localizado.
            </div>
          )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
