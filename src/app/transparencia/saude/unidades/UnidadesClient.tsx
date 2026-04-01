"use client";

import { useState, useMemo } from 'react';
import { 
  Building2, Search, MapPin, Phone, Clock, 
  Activity, Hospital, Navigation
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Unidades.module.css';

type Unidade = {
  id: string;
  nome: string;
  tipo: "Unidade Básica" | "Hospital" | "Especializada";
  endereco: string;
  horario: string;
  telefone: string;
};

const MOCK_UNIDADES: Unidade[] = [
  { id: "1", nome: "Hospital Municipal de Lajes Pintadas", tipo: "Hospital", endereco: "Rua Principal, 100 - Centro", horario: "24 horas (Plantão)", telefone: "(84) 3298-0001" },
  { id: "2", nome: "UBS Maria José da Conceição (Sede)", tipo: "Unidade Básica", endereco: "Av. Floriano Peixoto, S/N - Centro", horario: "07:00 às 17:00", telefone: "(84) 3298-0002" },
  { id: "3", nome: "UBS Bairro Esperança", tipo: "Unidade Básica", endereco: "Rua Nova, 45 - Bairro Esperança", horario: "07:30 às 13:30", telefone: "(84) 3298-0005" },
];

export default function UnidadesClient() {
  const [busca, setBusca] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");

  const filtradas = useMemo(() => {
    return MOCK_UNIDADES.filter(u => {
      const matchTipo = !tipoFiltro || u.tipo === tipoFiltro;
      const matchBusca = !busca || u.nome.toLowerCase().includes(busca.toLowerCase()) || u.endereco.toLowerCase().includes(busca.toLowerCase());
      return matchTipo && matchBusca;
    });
  }, [tipoFiltro, busca]);

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = filtradas.map(u => ({ "Unidade": u.nome, "Tipo": u.tipo, "Endereço": u.endereco, "Horário": u.horario, "Contato": u.telefone }));
    const filename = `unidades_saude_lajes_pintadas`;
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, `Rede Municipal de Saúde - Unidades`);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Saúde", href: "/transparencia/saude" },
    { label: "Unidades de Saúde" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Unidades de Saúde"
        description="Localize o Hospital e as Unidades Básicas de Saúde da rede municipal."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as any}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Hospital size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>01</strong>
              <span className={styles.statLabel}>Hospital Municipal</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as any}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Activity size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>03</strong>
              <span className={styles.statLabel}>UBS Ativas</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#8b5cf6' } as any}>
            <div className={styles.statIcon} style={{ color: '#8b5cf6' }}><MapPin size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>02</strong>
              <span className={styles.statLabel}>Zonas Atendidas</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as any}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Phone size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>24h</strong>
              <span className={styles.statLabel}>Plantão Ativo</span>
            </div>
          </div>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          currentYear=""
          onYearChange={() => {}}
          currentMonth=""
          onMonthChange={() => {}}
          onClear={() => { setBusca(""); setTipoFiltro(""); }}
          onExport={handleExport}
          availableYears={["2024"]}
          placeholder="Nome da unidade ou endereço..."
        />

        {/* Units Grid */}
        <div className={styles.unitsGrid}>
          {filtradas.length > 0 ? filtradas.map(unit => (
            <div key={unit.id} className={styles.unitCard}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span className={styles.unitType}>{unit.tipo}</span>
                <h3 className={styles.unitTitle}>{unit.nome}</h3>
              </div>
              
              <div className={styles.unitInfoGroup}>
                <div className={styles.infoLine}>
                  <MapPin size={16} />
                  <span>{unit.endereco}</span>
                </div>
                <div className={styles.infoLine}>
                  <Clock size={16} />
                  <span>{unit.horario}</span>
                </div>
                <div className={styles.infoLine}>
                  <Phone size={16} />
                  <span>{unit.telefone}</span>
                </div>
              </div>

              <div className={styles.unitAction}>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(unit.nome)}`} target="_blank" rel="noopener noreferrer" className={styles.btnMap}>
                  <Navigation size={14} /> Como Chegar
                </a>
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              Nenhuma unidade localizada.
            </div>
          )}
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
