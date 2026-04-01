"use client";

import { useState } from 'react';
import { 
  Building, Car, MapPin, Search, 
  Building2, Bus, Ambulance, Info, Download, Hash, Landmark, ShieldCheck
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Patrimonio.module.css';

type Veiculo = {
  id: string;
  tipo: "Ambulância" | "Ônibus" | "Utilitário" | "Máquina" | "Passeio";
  placa: string;
  orgao: string;
  uso: string;
  ano: string;
  status: "Ativo" | "Manutenção" | "Inativo";
};

type Imovel = {
  id: string;
  nome: string;
  tipo: "Próprio" | "Alugado" | "Cedido";
  endereco: string;
  orgao: string;
  finalidade: string;
};

const MOCK_FROTA: Veiculo[] = [
  { id: "v1", tipo: "Ambulância", placa: "QXB-9812", orgao: "Secretaria de Saúde", uso: "Remoção de Pacientes (SAMU)", ano: "2023", status: "Ativo" },
  { id: "v2", tipo: "Ônibus", placa: "RTY-7654", orgao: "Secretaria de Educação", uso: "Transporte Escolar Rural", ano: "2021", status: "Ativo" },
  { id: "v3", tipo: "Utilitário", placa: "ABC-1234", orgao: "Secretaria de Obras", uso: "Apoio Técnico e Manutenção", ano: "2018", status: "Manutenção" },
  { id: "v4", tipo: "Máquina", placa: "SEM PLACA", orgao: "Secretaria de Agricultura", uso: "Trator - Aração de Terras", ano: "2019", status: "Ativo" },
];

const MOCK_IMOVEIS: Imovel[] = [
  { id: "i1", nome: "Centro de Saúde Dona Neném", tipo: "Próprio", endereco: "Rua Projetada, S/N - Centro", orgao: "Secretaria de Saúde", finalidade: "Atendimento Básico à Saúde" },
  { id: "i2", nome: "Escola Municipal João e Maria", tipo: "Próprio", endereco: "Av. Principal, 123", orgao: "Secretaria de Educação", finalidade: "Ensino Fundamental I e II" },
  { id: "i3", nome: "Galpão de Máquinas (Garagem Municipal)", tipo: "Alugado", endereco: "Rodovia RN-123, Km 2", orgao: "Secretaria de Obras", finalidade: "Guarda da Frota Pesada" },
  { id: "i4", nome: "Sede da Prefeitura Municipal", tipo: "Próprio", endereco: "Praça Cívica, 01 - Centro", orgao: "Gabinete do Prefeito", finalidade: "Administração Geral" },
];

function getCarIcon(tipo: string) {
  switch(tipo) {
    case 'Ambulância': return <Ambulance size={20} />;
    case 'Ônibus': return <Bus size={20} />;
    default: return <Car size={20} />;
  }
}

export default function PatrimonioClient() {
  const [activeTab, setActiveTab] = useState<"FROTA" | "IMOVEIS">("IMOVEIS");
  const [busca, setBusca] = useState("");

  const frotaFiltrada = MOCK_FROTA.filter(v => 
    !busca || 
    v.placa.toLowerCase().includes(busca.toLowerCase()) || 
    v.orgao.toLowerCase().includes(busca.toLowerCase()) ||
    v.tipo.toLowerCase().includes(busca.toLowerCase())
  );

  const imoveisFiltrados = MOCK_IMOVEIS.filter(i => 
    !busca || 
    i.nome.toLowerCase().includes(busca.toLowerCase()) || 
    i.endereco.toLowerCase().includes(busca.toLowerCase()) ||
    i.orgao.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    let payload;
    let title;
    let filename;
    
    if (activeTab === "FROTA") {
      payload = frotaFiltrada.map(v => ({
        "Tipo": v.tipo,
        "Placa": v.placa,
        "Órgão Vinculado": v.orgao,
        "Finalidade de Uso": v.uso,
        "Ano": v.ano,
        "Status": v.status
      }));
      title = "Relação da Frota de Veículos";
      filename = "frota_veiculos";
    } else {
      payload = imoveisFiltrados.map(i => ({
        "Nome do Imóvel": i.nome,
        "Tipo de Vínculo": i.tipo,
        "Endereço": i.endereco,
        "Órgão Responsável": i.orgao,
        "Finalidade": i.finalidade
      }));
      title = "Relação de Bens Imóveis";
      filename = "bens_imoveis";
    }
    
    if (format === "csv") exportToCSV(payload, filename);
    else if (format === "json") exportToJSON(payload, filename);
    else exportToPDF(payload, filename, title);
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Patrimônio Público" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Patrimônio e Frota"
        description="Consulte a relação completa de bens imóveis, veículos oficiais e equipamentos pertencentes ao patrimônio do município."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* 4-Stat Dashboard */}
        <div className={styles.statsRow}>
          <div className={styles.statCard} style={{ '--accent': '#3b82f6' } as any}>
            <div className={styles.statIcon} style={{ color: '#3b82f6' }}><Building2 size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_IMOVEIS.length}</strong>
              <span className={styles.statLabel}>Bens Imóveis</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#10b981' } as any}>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><Car size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>{MOCK_FROTA.filter(v => v.status === 'Ativo').length}</strong>
              <span className={styles.statLabel}>Frota Ativa</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#f59e0b' } as any}>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><Landmark size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>R$ 4.8M</strong>
              <span className={styles.statLabel}>Valor Estimado</span>
            </div>
          </div>
          <div className={styles.statCard} style={{ '--accent': '#ef4444' } as any}>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><ShieldCheck size={20} /></div>
            <div className={styles.statInfo}>
              <strong className={styles.statVal}>OK</strong>
              <span className={styles.statLabel}>Meta Lei 4.320</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'IMOVEIS' ? styles.active : ''}`}
            onClick={() => { setActiveTab('IMOVEIS'); setBusca(''); }}
          >
            <Building2 size={20} />
            Bens Imóveis
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'FROTA' ? styles.active : ''}`}
            onClick={() => { setActiveTab('FROTA'); setBusca(''); }}
          >
            <Car size={20} />
            Frota de Veículos
          </button>
        </div>

        <TransparencyFilters
          searchValue={busca}
          onSearch={setBusca}
          onClear={() => setBusca("")}
          onExport={handleExport}
          currentYear=""
          availableYears={[]}
          onYearChange={() => {}}
          currentMonth=""
          onMonthChange={() => {}}
          placeholder={activeTab === 'IMOVEIS' ? "Pesquisar por nome, endereço ou órgão..." : "Pesquisar por placa, tipo ou órgão..."}
        />

        {/* Lists */}
        {activeTab === 'IMOVEIS' ? (
          <div className={styles.listGrid}>
            {imoveisFiltrados.map(imovel => (
              <div key={imovel.id} className={styles.assetCard}>
                <div className={styles.cardTop}>
                  <Building size={24} className={styles.assetIcon} />
                  <span className={`${styles.typeBadge} ${imovel.tipo === 'Próprio' ? styles.badgeGreen : styles.badgeBlue}`}>
                    {imovel.tipo}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <h3>{imovel.nome}</h3>
                  <div className={styles.infoRow}>
                    <MapPin size={16} /> <span>{imovel.endereco}</span>
                  </div>
                  <div className={styles.infoBlock}>
                    <span className={styles.label}>Órgão Responsável</span>
                    <strong>{imovel.orgao}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.listGrid}>
            {frotaFiltrada.map(veiculo => (
              <div key={veiculo.id} className={styles.assetCard}>
                <div className={styles.cardTop}>
                  <div className={styles.vehicleIcon}>
                    {getCarIcon(veiculo.tipo)}
                  </div>
                  <span className={`${styles.statusBadge} ${veiculo.status === 'Ativo' ? styles.bgGreen : styles.bgRed}`}>
                    {veiculo.status}
                  </span>
                </div>
                <div className={styles.cardBody}>
                  <h3>{veiculo.tipo}</h3>
                  <div className={styles.plateRow}>
                    <Hash size={16} /> <span className={styles.plate}>{veiculo.placa}</span>
                  </div>
                  <div className={styles.infoBlock}>
                    <span className={styles.label}>Vinculação</span>
                    <strong>{veiculo.orgao}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <BannerPNTP />

      </div>
    </div>
  );
}
