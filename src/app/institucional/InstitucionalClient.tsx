"use client";

import { useState } from 'react';
import { 
  Building, MapPin, Phone, Mail, 
  Clock, Download, Users, FileBarChart,
  User, Network
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import TransparencyFilters from '@/components/transparencia/TransparencyFilters';
import { exportToCSV, exportToJSON, exportToPDF } from '@/lib/exportUtils';
import styles from './Institucional.module.css';

type Secretaria = {
  id: string;
  nome: string;
  sigla: string;
  gestor: string;
  cargo: string;
  endereco: string;
  telefone: string;
  email: string;
  horario: string;
};

const MOCK_ESTRUTURA: Secretaria[] = [
  { 
    id: "gabinete", nome: "Gabinete do Prefeito", sigla: "GP",
    gestor: "João Silva Sauro", cargo: "Prefeito Municipal",
    endereco: "Praça Cívica, 01 - Centro Administrativo", telefone: "(84) 3400-0001",
    email: "gabinete@lajespintadas.rn.gov.br", horario: "Segunda a Sexta, das 07h às 13h"
  },
  { 
    id: "saude", nome: "Secretaria Municipal de Saúde", sigla: "SMS",
    gestor: "Dra. Maria das Graças", cargo: "Secretária de Saúde",
    endereco: "Rua Projetada A, S/N - Bairro Esperança", telefone: "(84) 3400-0002",
    email: "saude@lajespintadas.rn.gov.br", horario: "Segunda a Sexta, das 07h às 17h"
  },
  { 
    id: "educacao", nome: "Secretaria Municipal de Educação e Cultura", sigla: "SEMEC",
    gestor: "Prof. Antônio Carlos", cargo: "Secretário de Educação",
    endereco: "Av. Principal, 123 - Centro", telefone: "(84) 3400-0003",
    email: "educacao@lajespintadas.rn.gov.br", horario: "Segunda a Sexta, das 07h às 13h"
  },
  { 
    id: "obras", nome: "Secretaria Municipal de Obras e Urbanismo", sigla: "SMOU",
    gestor: "Eng. Pedro Alves", cargo: "Secretário de Obras",
    endereco: "Rodovia RN-123, Km 2 - Galpão Central", telefone: "(84) 3400-0004",
    email: "obras@lajespintadas.rn.gov.br", horario: "Segunda a Sexta, das 07h às 13h"
  },
  { 
    id: "assistencia", nome: "Sec. M. de Assistência Social e Trabalho", sigla: "SEMAST",
    gestor: "Ana Lúcia Gomes", cargo: "Secretária de Assistência",
    endereco: "Rua do Comércio, 45 - CRAS", telefone: "(84) 3400-0005",
    email: "social@lajespintadas.rn.gov.br", horario: "Segunda a Sexta, das 07h às 13h"
  }
];

export default function InstitucionalClient() {
  const [busca, setBusca] = useState("");

  const orgaosFiltrados = MOCK_ESTRUTURA.filter(s => 
    !busca || 
    s.nome.toLowerCase().includes(busca.toLowerCase()) || 
    s.gestor.toLowerCase().includes(busca.toLowerCase()) || 
    s.sigla.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExport = (format: "pdf" | "csv" | "json") => {
    const payload = orgaosFiltrados.map(s => ({
      "Órgão": s.nome,
      "Gestor(a) Responsável": s.gestor,
      "Cargo": s.cargo,
      "Endereço": s.endereco,
      "Telefone": s.telefone,
      "E-mail": s.email,
      "Atendimento": s.horario
    }));

    if (format === "csv") exportToCSV(payload, "lista_contatos_institucionais");
    else if (format === "json") exportToJSON(payload, "estrutura_institucional");
    else exportToPDF(payload, "estrutura_institucional", "Guia de Contatos: Estrutura Administrativa");
  };

  const breadcrumbs = [
    { label: "O Município", href: "/municipio" },
    { label: "Estrutura Institucional" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Estrutura Organizacional"
        description="Conheça a composição administrativa da Prefeitura, os gestores responsáveis por cada secretaria e os contatos oficiais de atendimento ao cidadão."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Superior Action Bar */}
        <div className={styles.actionBar}>
          <div className={styles.actionBarText}>
             <Network size={28} color="#2563eb" />
             <div>
                <h3>Organograma Municipal</h3>
                <p>Visualize a subordinação hierárquica e a organograma completo da prefeitura estabelecida por Lei Municipal.</p>
             </div>
          </div>
          <button 
             className={styles.btnPrintOrg} 
             onClick={() => alert("Simulação de download do Organograma em PDF")}
             title="Baixar Organograma em PDF"
          >
             <Download size={18} /> Baixar Diagrama (PDF)
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
          placeholder="Pesquise por uma secretaria, sigla ou nome do gestor..."
        />

        {/* Directory Grid */}
        <div className={styles.directoryGrid}>
          {orgaosFiltrados.length > 0 ? orgaosFiltrados.map(orgao => (
            <div key={orgao.id} className={styles.deptCard}>
              <div className={styles.cardHeader}>
                <div className={styles.siglaBox}>{orgao.sigla}</div>
                <h2>{orgao.nome}</h2>
              </div>
              
              <div className={styles.managerSection}>
                 <div className={styles.avatar}>
                    <User size={24} color="#64748b" />
                 </div>
                 <div className={styles.managerInfo}>
                    <span className={styles.cargo}>{orgao.cargo}</span>
                    <strong className={styles.managerName}>{orgao.gestor}</strong>
                 </div>
              </div>

              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <MapPin size={18} className={styles.contactIcon} />
                  <span>{orgao.endereco}</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone size={18} className={styles.contactIcon} />
                  <span><strong>{orgao.telefone}</strong></span>
                </div>
                <div className={styles.contactItem}>
                  <Mail size={18} className={styles.contactIcon} />
                  <span><a href={`mailto:${orgao.email}`}>{orgao.email}</a></span>
                </div>
                <div className={styles.contactItem}>
                  <Clock size={18} className={styles.contactIcon} />
                  <span>Atendimento: {orgao.horario}</span>
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.emptyState}>
              <Users size={48} color="#cbd5e1" />
              <p>Nenhuma secretaria ou gestor encontrado correspondente à sua busca.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
