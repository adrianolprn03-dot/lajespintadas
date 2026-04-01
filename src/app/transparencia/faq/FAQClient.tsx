"use client";

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle, FileText, Lock, Clock } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import BannerPNTP from '@/components/transparencia/BannerPNTP';
import styles from './FAQ.module.css';

const FAQ_DATA = [
  {
    category: "Acesso à Informação",
    items: [
      { q: "Como faço para solicitar uma informação que não encontrei?", a: "Você deve utilizar o sistema e-SIC (Serviço de Informação ao Cidadão). O pedido pode ser feito online através do link 'e-SIC' no menu principal ou pessoalmente no setor de protocolo da Prefeitura." },
      { q: "Qual o prazo para receber uma resposta do e-SIC?", a: "De acordo com a Lei de Acesso à Informação (LAI), o prazo inicial é de 20 (vinte) dias, podendo ser prorrogado por mais 10 (dez) dias mediante justificativa expressa." },
      { q: "Tenho que pagar para obter informações pelo portal?", a: "O acesso à informação é gratuito. A única exceção é o custeio de reprodução de documentos (cópias físicas ou mídias), quando solicitado pelo cidadão." }
    ]
  },
  {
    category: "Servidores e Folha",
    items: [
      { q: "Como consulto o salário de um servidor municipal?", a: "Acesse Transparência > Servidores > Folha de Pagamento. Você pode filtrar por nome, CPF (parcial), secretaria ou cargo." },
      { q: "Por que alguns dados de servidores estão com asteriscos?", a: "Em conformidade com a LGPD (Lei Geral de Proteção de Dados), informações sensíveis como CPF completo ou RG são mascaradas para preservar a privacidade do servidor." }
    ]
  },
  {
    category: "Compras e Contratos",
    items: [
      { q: "Onde vejo os editais de licitação que estão abertos?", a: "No menu Transparência > Licitações e Contratos. Use o filtro 'Situação' e selecione 'Em Aberto' ou 'Publicado' para ver os editais vigentes." },
      { q: "Como saber quem venceu determinado processo licitatório?", a: "Ao clicar em uma licitação específica no portal, você terá acesso à aba 'Resultados' ou 'Homologação', onde constam as empresas vencedoras e valores." }
    ]
  }
];

export default function FAQClient() {
  const [busca, setBusca] = useState("");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (q: string) => {
    setOpenItems(prev => 
      prev.includes(q) ? prev.filter(i => i !== q) : [...prev, q]
    );
  };

  const breadcrumbs = [
    { label: "Transparência", href: "/transparencia" },
    { label: "Dúvidas Frequentes" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Dúvidas Frequentes (FAQ)"
        description="Encontre respostas rápidas para as principais dúvidas sobre o acesso à informação e serviços de transparência do município."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Search Panel */}
        <div className={styles.searchPanel}>
            <div className={styles.searchBox}>
                <Search className={styles.searchIcon} size={22} />
                <input 
                    type="text" 
                    placeholder="Busque por palavras-chave: SIC, Folha, Licitação, Prazo..." 
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>
            
            <div className={styles.directContact}>
                <MessageCircle size={20} />
                <span>Não encontrou o que procurava? <strong>Use a Ouvidoria</strong></span>
            </div>
        </div>

        {/* Categories and Questions */}
        <div className={styles.faqWrapper}>
            {FAQ_DATA.map((cat, cIdx) => (
                <section key={cIdx} className={styles.faqSection}>
                    <h2 className={styles.categoryTitle}>{cat.category}</h2>
                    <div className={styles.questionsList}>
                        {cat.items.filter(i => 
                            i.q.toLowerCase().includes(busca.toLowerCase()) || 
                            i.a.toLowerCase().includes(busca.toLowerCase())
                        ).map((item, qIdx) => {
                            const isOpen = openItems.includes(item.q);
                            return (
                                <div key={qIdx} className={`${styles.faqItem} ${isOpen ? styles.itemOpen : ''}`}>
                                    <button className={styles.questionBtn} onClick={() => toggleItem(item.q)}>
                                        <span className={styles.qText}>{item.q}</span>
                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </button>
                                    {isOpen && (
                                        <div className={styles.answerBox}>
                                            <p>{item.a}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            ))}
        </div>

        {/* Proactive Info Block */}
        <div className={styles.proactivePanel}>
            <div className={styles.proactiveCard}>
                <Clock size={32} color="#3b82f6" />
                <h4>Prazo Legal</h4>
                <p>O prazo máximo para resposta de pedidos de informação via LAI é de <strong>20 dias corridos</strong>.</p>
            </div>
            <div className={styles.proactiveCard}>
                <Lock size={32} color="#10b981" />
                <h4>Privacidade</h4>
                <p>Seus dados de identificação são protegidos e tratados sob absoluto <strong>sigilo pela Ouvidoria</strong>.</p>
            </div>
            <div className={styles.proactiveCard}>
                <FileText size={32} color="#f59e0b" />
                <h4>Gratuidade</h4>
                <p>Toda informação pública solicitada através do portal é fornecida de forma <strong>totalmente gratuita</strong>.</p>
            </div>
        </div>

        <BannerPNTP />

      </div>
    </div>
  );
}
