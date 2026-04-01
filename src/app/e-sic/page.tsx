"use client";

import { useState } from 'react';
import { Info, HelpCircle, Send, CheckCircle2, ChevronLeft, Search, BarChart2, Clock, FileCheck2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import formStyles from '@/components/ui/FormElements.module.css';
import styles from './ESic.module.css';

// ===========================================================
// Estatísticas Mock para transparência no e-SIC
// ===========================================================
const STATS = [
  { icon: <FileCheck2 size={22} />, valor: "142", label: "Pedidos em 2025", color: "#3b82f6" },
  { icon: <CheckCircle2 size={22} />, valor: "98.5%", label: "Taxa de Resposta", color: "#10b981" },
  { icon: <Clock size={22} />, valor: "8,3 dias", label: "Prazo Médio de Retorno", color: "#f59e0b" },
  { icon: <AlertCircle size={22} />, valor: "2", label: "Recursos Pendentes", color: "#ef4444" },
];

export default function ESicPage() {
  const [protocolo, setProtocolo] = useState("");
  const [activeTab, setActiveTab] = useState<"form" | "track">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pedido de Informação registrado com sucesso! O protocolo será enviado ao seu e-mail em breve.");
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (protocolo.trim()) {
      alert(`Consultando protocolo nº ${protocolo}... (módulo em integração com o banco de dados)`);
    }
  };

  const breadcrumbs = [
    { label: "Ouvidoria e Participação", href: "/ouvidoria" },
    { label: "e-SIC (Acesso à Informação)" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="e-SIC - Serviço de Informação ao Cidadão"
        description="Sistema Eletrônico para solicitar informações públicas baseadas na Lei de Acesso à Informação (Lei nº 12.527/2011)."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>

        {/* Dashboard de Estatísticas */}
        <div className={styles.statsRow}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.statCard} style={{ '--accent': s.color } as React.CSSProperties}>
              <div className={styles.statIcon} style={{ color: s.color }}>{s.icon}</div>
              <div className={styles.statInfo}>
                <strong className={styles.statVal}>{s.valor}</strong>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Abas: Registrar Pedido / Acompanhar */}
        <div className={styles.tabsContainer}>
          <button
            className={`${styles.tab} ${activeTab === "form" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("form")}
          >
            <Send size={16} /> Registrar Novo Pedido
          </button>
          <button
            className={`${styles.tab} ${activeTab === "track" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("track")}
          >
            <Search size={16} /> Consultar Protocolo
          </button>
        </div>

        <div className={styles.formLayout}>

          <div className={styles.formColumn}>
            <Link href="/ouvidoria" className={styles.backLink}>
              <ChevronLeft size={16} /> Voltar para Participação Cidadã
            </Link>

            {activeTab === "form" ? (
              <form onSubmit={handleSubmit} className={styles.sicForm}>
                {/* Passo 1 - Identificação */}
                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.stepCircle}>1</div>
                    <h3>Dados do Requerente</h3>
                  </div>
                  <div className={styles.identityGrid}>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>Nome / Razão Social <span className={formStyles.requiredAsterisk}>*</span></label>
                      <input type="text" className={formStyles.formInput} placeholder="Nome completo" required />
                    </div>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>CPF / CNPJ <span className={formStyles.requiredAsterisk}>*</span></label>
                      <input type="text" className={formStyles.formInput} placeholder="Documento válido" required />
                    </div>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>E-mail de Resposta <span className={formStyles.requiredAsterisk}>*</span></label>
                      <input type="email" className={formStyles.formInput} placeholder="Será usado para enviar a resposta" required />
                    </div>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>CEP <span className={formStyles.requiredAsterisk}>*</span></label>
                      <input type="text" className={formStyles.formInput} placeholder="00000-000" required />
                    </div>
                  </div>
                </div>

                {/* Passo 2 - Pedido */}
                <div className={styles.formSection}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.stepCircle}>2</div>
                    <h3>Especificação do Pedido</h3>
                  </div>

                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formLabel}>Órgão / Secretaria Destino <span className={formStyles.requiredAsterisk}>*</span></label>
                    <select className={formStyles.formSelect} required>
                      <option value="">Selecione para onde enviar o seu pedido...</option>
                      <option value="saude">Secretaria Municipal de Saúde</option>
                      <option value="educacao">Secretaria Municipal de Educação</option>
                      <option value="financas">Secretaria de Finanças e Tributação</option>
                      <option value="obras">Secretaria de Obras e Infraestrutura</option>
                      <option value="gabinete">Gabinete do Prefeito</option>
                      <option value="nao_sei">Não sei informar</option>
                    </select>
                  </div>

                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formLabel}>
                      Descrição da Informação Solicitada <span className={formStyles.requiredAsterisk}>*</span>
                    </label>
                    <textarea
                      className={formStyles.formTextarea}
                      placeholder="Seja o mais claro e específico possível para facilitar a busca do documento público ou dado solicitado."
                      required
                    ></textarea>
                  </div>

                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formLabel}>Formato Preferível de Resposta</label>
                    <select className={formStyles.formSelect}>
                      <option value="email">Por e-mail (PDF ou DOCX)</option>
                      <option value="portal">Publicação no Portal</option>
                      <option value="fisico">Cópia física (com custos)</option>
                    </select>
                  </div>
                </div>

                {/* Botão Enviar */}
                <div className={formStyles.submitBlock}>
                  <button type="submit" className={formStyles.btnPrimary}>
                    Registrar Pedido no e-SIC <Send size={18} />
                  </button>
                </div>
              </form>
            ) : (
              /* Aba: Consultar Protocolo */
              <div className={styles.trackSection}>
                <div className={styles.trackHero}>
                  <Search size={40} className={styles.trackHeroIcon} />
                  <h3>Consultar Andamento do Pedido</h3>
                  <p>
                    Insira o número de protocolo recebido em seu e-mail após o registro do pedido.
                    O prazo legal de resposta é de <strong>20 dias corridos</strong>, prorrogáveis por mais 10.
                  </p>
                </div>
                <form onSubmit={handleTrack} className={styles.trackForm}>
                  <input
                    type="text"
                    value={protocolo}
                    onChange={(e) => setProtocolo(e.target.value)}
                    placeholder="Ex: ESIC-2025-00142"
                    className={styles.trackInput}
                    required
                  />
                  <button type="submit" className={styles.trackBtn}>
                    <Search size={18} /> Consultar Pedido
                  </button>
                </form>
                <div className={styles.trackInstructions}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>O protocolo é enviado automaticamente para o e-mail cadastrado no momento do pedido.</span>
                </div>
              </div>
            )}
          </div>

          {/* Lateral Info */}
          <div className={styles.infoColumn}>
            <div className={styles.laiWidget}>
              <div className={styles.laiHeader}>
                <Info size={24} className={styles.laiIcon} />
                <h4>O que é a LAI?</h4>
              </div>
              <p>A Lei de Acesso à Informação nº 12.527 assegura o direito fundamental de acesso a informações geradas ou em poder de órgãos públicos federais, estaduais e municipais.</p>

              <ul className={styles.laiList}>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /> <strong>Prazos:</strong> O órgão tem até 20 dias para responder, prorrogáveis por mais 10 sob justificativa.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /> <strong>Gratuidade:</strong> A busca é gratuita, salvo custos de reprodução física (cópias).</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /> <strong>Motivação:</strong> Não é exigido que você justifique o motivo do pedido.</li>
                <li><CheckCircle2 size={16} className={styles.checkIcon} /> <strong>Recurso:</strong> Em caso de negativa, você pode recorrer em até 10 dias.</li>
              </ul>
            </div>

            <div className={styles.deadlineWidget}>
              <div className={styles.deadlineItem}>
                <BarChart2 size={20} style={{ color: '#3b82f6' }} />
                <div>
                  <strong>Legislatura mais recente:</strong>
                  <span>Resolução Conjunta CGU/AGU nº 01/2014</span>
                </div>
              </div>
            </div>

            <div className={styles.helpWidget}>
              <HelpCircle size={20} className={styles.helpIcon} />
              <span>Dúvidas? Entre em contato: <strong>esic@lajespintadas.rn.gov.br</strong></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
