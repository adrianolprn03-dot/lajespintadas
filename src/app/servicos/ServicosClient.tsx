"use client";

import { useState, useMemo } from 'react';
import { 
  Book, Search, ArrowRight, MapPin, 
  Clock, FileText, Info, HelpCircle 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import styles from './Servicos.module.css';

type ServicoPublico = {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  local: string;
  prazo: string;
  documentos: string;
};

const MOCK_SERVICOS: ServicoPublico[] = [
  { id: "1", nome: "Emissão de IPTU", categoria: "Tributos", descricao: "Solicitação de carnês e consulta de débitos do Imposto Predial e Territorial Urbano.", local: "Setor de Tributação - Sede da Prefeitura", prazo: "Imediato", documentos: "CPF ou Inscrição Imobiliária" },
  { id: "2", nome: "Matrícula Escolar", categoria: "Educação", descricao: "Inscrição de novos alunos na rede municipal de ensino.", local: "Secretaria de Educação ou Unidades Escolares", prazo: "Conforme calendário letivo", documentos: "Docs do Aluno, Comprovante de Residência" },
  { id: "3", nome: "Atendimento Médico Especializado", categoria: "Saúde", descricao: "Marcação de consultas com especialistas via Sisreg.", local: "Centro de Saúde Municipal", prazo: "Sob agendamento (Fila de Regulação)", documentos: "RG, Cartão do SUS e Encaminhamento" },
  { id: "4", nome: "Solicitação de Iluminação Pública", categoria: "Infraestrutura", descricao: "Pedido de reparo ou troca de lâmpadas em vias públicas.", local: "Ouvidoria ou Secretaria de Obras", prazo: "Até 5 dias úteis", documentos: "Endereço e Ponto de Referência" },
  { id: "5", nome: "Cadastro Único (Bolsa Família)", categoria: "Assistência Social", descricao: "Inscrição e atualização cadastral para programas sociais federais.", local: "CRAS - Centro de Referência de Assistência Social", prazo: "30 a 60 minutos", documentos: "Docs de todos os membros da família" },
];

export default function ServicosClient() {
  const [busca, setBusca] = useState("");
  const [catFiltro, setCatFiltro] = useState("");

  const categorias = useMemo(() => Array.from(new Set(MOCK_SERVICOS.map(s => s.categoria))), []);

  const filtrados = useMemo(() => {
    return MOCK_SERVICOS.filter(s => {
      const b = busca.toLowerCase();
      const matchCat = !catFiltro || s.categoria === catFiltro;
      const matchBusca = !busca || 
        s.nome.toLowerCase().includes(b) || 
        s.descricao.toLowerCase().includes(b);
      return matchCat && matchBusca;
    });
  }, [busca, catFiltro]);

  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Carta de Serviços" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Carta de Serviços ao Cidadão"
        description="O seu guia completo para entender como, onde e em que prazo acessar os serviços públicos municipais."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Intro Info Banner */}
        <div className={styles.introBox}>
           <div className={styles.introIcon}><Book size={32}/></div>
           <div className={styles.introText}>
              <h3>Compromisso com o Usuário e Qualidade</h3>
              <p>A Carta de Serviços (Lei 13.460/2017) é o instrumento que informa sobre os serviços prestados, as formas de acesso e os compromissos de atendimento do município.</p>
           </div>
        </div>

        {/* Dynamic Filters Section */}
        <div className={styles.filterSection}>
           <div className={styles.searchWrap}>
              <Search size={22} />
              <input 
                type="text" 
                placeholder="Qual serviço você procura? Ex: IPTU, Matrícula, Saúde..." 
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
           </div>
           <div className={styles.catWrap}>
              <button 
                className={catFiltro === "" ? styles.catBtnActive : styles.catBtn}
                onClick={() => setCatFiltro("")}
              >
                Todos os Serviços
              </button>
              {categorias.map(cat => (
                <button 
                  key={cat}
                  className={catFiltro === cat ? styles.catBtnActive : styles.catBtn}
                  onClick={() => setCatFiltro(cat)}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Services Results Grid */}
        <div className={styles.servicesGrid}>
           {filtrados.length > 0 ? filtrados.map(serv => (
             <div key={serv.id} className={styles.serviceCard}>
                <div className={styles.cardHeader}>
                   <div className={styles.catBadge}>{serv.categoria}</div>
                   <h4 className={styles.servName}>{serv.nome}</h4>
                   <p className={styles.servDesc}>{serv.descricao}</p>
                </div>

                <div className={styles.servDetails}>
                   <div className={styles.detailItem}>
                      <MapPin size={18} className={styles.iconLoc}/>
                      <div className={styles.detailText}>
                         <span>Unidade de Atendimento</span>
                         <strong>{serv.local}</strong>
                      </div>
                   </div>
                   <div className={styles.detailItem}>
                      <Clock size={18} className={styles.iconTime}/>
                      <div className={styles.detailText}>
                         <span>Prazo Médio Estimado</span>
                         <strong>{serv.prazo}</strong>
                      </div>
                   </div>
                   <div className={styles.detailItem}>
                      <FileText size={18} className={styles.iconDoc}/>
                      <div className={styles.detailText}>
                         <span>Documentos Necessários</span>
                         <strong>{serv.documentos}</strong>
                      </div>
                   </div>
                </div>

                <div className={styles.cardFooter}>
                   <button className={styles.btnAcessar} onClick={() => alert("Manual do serviço em desenvolvimento.")}>
                      Guia Passo a Passo <ArrowRight size={16}/>
                   </button>
                </div>
             </div>
           )) : (
             <div className={styles.emptyState}>
                <HelpCircle size={64} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
                <h3>Nenhum serviço localizado</h3>
                <p>Tente utilizar outros termos na sua pesquisa ou limpe os filtros de categoria.</p>
             </div>
           )}
        </div>

        {/* Global Help Footer */}
        <div className={styles.feedbackSection}>
           <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '50%', color: '#0ea5e9' }}>
              <Info size={24}/>
           </div>
           <div className={styles.feedbackText}>
              <p>Não encontrou o que procurava? Sugira a inclusão de um novo serviço através do nosso canal de <strong><a href="/ouvidoria">Ouvidoria Geral</a></strong> ou solicite informações via <strong><a href="/e-sic">e-SIC</a></strong>.</p>
           </div>
        </div>

      </div>
    </div>
  );
}
