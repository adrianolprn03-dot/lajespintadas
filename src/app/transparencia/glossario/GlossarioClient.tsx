"use client";

import { useState } from 'react';
import { Book, Search, ChevronRight, Hash, Info, HelpCircle, ShieldAlert } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './Glossario.module.css';

const GLOSSARIO_TERMS = [
  { term: "Dotação Orçamentária", definition: "Limite de crédito consignado na Lei de Orçamento ou crédito adicional para atender determinada despesa pública." },
  { term: "Empenho", definition: "Primeiro estágio da despesa pública. É o ato emanado de autoridade competente que cria para o Estado obrigação de pagamento pendente ou não de implemento de condição." },
  { term: "Liquidação", definition: "Segundo estágio da despesa pública. Consiste na verificação do direito adquirido pelo credor tendo por base os títulos e documentos comprobatórios do respectivo crédito." },
  { term: "Pagamento", definition: "Terceiro e último estágio da despesa. Despacho exarado pela autoridade competente, determinando que a despesa seja paga." },
  { term: "RREO", definition: "Relatório Resumido da Execução Orçamentária. Demonstrativo bimestral que apresenta a transparência da execução do orçamento." },
  { term: "RGF", definition: "Relatório de Gestão Fiscal. Documento quadrimestral que visa o controle, o monitoramento e a publicidade dos limites de gastos estabelecidos pela LRF." },
  { term: "LOA", definition: "Lei Orçamentária Anual. Lei que estima a receita e fixa a despesa do exercício financeiro seguinte." },
  { term: "LDO", definition: "Lei de Diretrizes Orçamentárias. Lei que define as metas e prioridades da administração pública para o ano seguinte." },
  { term: "PPA", definition: "Plano Plurianual. Instrumento de planejamento de médio prazo que estabelece as diretrizes, objetivos e metas da administração pública para um período de 4 anos." },
  { term: "LAI", definition: "Lei de Acesso à Informação (Lei nº 12.527/2011). Regulamenta o direito constitucional de acesso dos cidadãos às informações públicas." },
  { term: "Receita Corrente Líquida", definition: "Somatório das receitas tributárias, de contribuições, patrimoniais, industriais, agropecuárias, de serviços, transferências correntes e outras receitas correntes." },
  { term: "Restos a Pagar", definition: "Despesas empenhadas mas não pagas até o dia 31 de dezembro, distinguindo-se as processadas das não processadas." },
  { term: "DCA", definition: "Declaração de Contas Anuais. Relatório que consolida as informações contábeis, orçamentárias e fiscais do município para órgãos de controle." },
  { term: "Transferência Especial", definition: "Modalidade de emenda parlamentar (Emenda Pix) que possibilita o repasse direto de recursos da União para o município sem convênio prévio." },
  { term: "Cronograma de Desembolso", definition: "Planejamento temporal dos pagamentos a serem efetuados pelo município conforme a disponibilidade financeira." }
].sort((a, b) => a.term.localeCompare(b.term));

export default function GlossarioClient() {
  const [busca, setBusca] = useState("");

  const filtrados = GLOSSARIO_TERMS.filter(t => 
    t.term.toLowerCase().includes(busca.toLowerCase()) || 
    t.definition.toLowerCase().includes(busca.toLowerCase())
  );

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Glossário" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Glossário da Transparência"
        description="Entenda os termos técnicos e conceitos utilizados na administração pública e na execução orçamentária do município."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Superior Search & Stats */}
        <div className={styles.headerPanel}>
            <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                    type="text" 
                    placeholder="O que você deseja entender? Ex: Empenho, RGF, LRF..." 
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>
            
            <div className={styles.summaryInfo}>
                <div className={styles.sumBadge}>
                   <Book size={18} />
                   <span>{GLOSSARIO_TERMS.length} Termos Catalogados</span>
                </div>
            </div>
        </div>

        {/* Technical Definitions List */}
        <div className={styles.glossarioGrid}>
            {filtrados.length > 0 ? filtrados.map((item, idx) => (
                <div key={idx} className={styles.termCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.letterCircle}>
                            {item.term.charAt(0).toUpperCase()}
                        </div>
                        <h3>{item.term}</h3>
                    </div>
                    <div className={styles.cardBody}>
                        <p>{item.definition}</p>
                    </div>
                    <div className={styles.cardFooter}>
                        <Info size={14} /> Fonte: Secretaria de Finanças / LAI
                    </div>
                </div>
            )) : (
                <div className={styles.emptyState}>
                    <HelpCircle size={48} />
                    <p>Nenhum termo técnico localizado para sua busca.</p>
                    <button onClick={() => setBusca("")} className={styles.resetBtn}>Ver todos os termos</button>
                </div>
            )}
        </div>

        {/* Compliance Info */}
        <div className={styles.complianceBox}>
            <div className={styles.complianceIcon}><ShieldAlert size={28} /></div>
            <div className={styles.complianceText}>
                <h4>Transparência Facilitada (PNTP)</h4>
                <p>A publicação de um glossário com linguagem cidadã é um requisito mandatório do Programa Nacional de Transparência Pública para garantir que qualquer cidadão compreenda as contas públicas sem necessidade de conhecimento técnico prévio.</p>
            </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
