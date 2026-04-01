"use client";

import { useState } from 'react';
import { ShieldAlert, BookOpen, Send, User, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import formStyles from '@/components/ui/FormElements.module.css';
import styles from './Manifestacao.module.css';

export default function NovaManifestacao() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Manifestação recebida com sucesso! Este é um alerta de demonstração. A integração de banco de dados será o próximo passo.");
  };

  const breadcrumbs = [
    { label: "Ouvidoria e Participação", href: "/ouvidoria" },
    { label: "Nova Manifestação" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Nova Manifestação"
        description="Preencha os dados abaixo com o máximo de informações possível. Caso deseje, você pode optar pelo sigilo dos seus dados."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        <div className={styles.formLayout}>
          
          <div className={styles.formColumn}>
            <Link href="/ouvidoria" className={styles.backLink}>
              <ChevronLeft size={16} /> Voltar para Opções
            </Link>

            <form onSubmit={handleSubmit} className={styles.manifestacaoForm}>
              {/* Passo 1 - Identificação */}
              <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.stepCircle}>1</div>
                  <h3>Identificação</h3>
                </div>

                <div className={formStyles.radioGroup}>
                  <label className={formStyles.radioLabel}>
                    <input 
                      type="radio" 
                      name="sigilo" 
                      checked={!isAnonymous} 
                      onChange={() => setIsAnonymous(false)}
                    />
                    Desejo me identificar
                  </label>
                  <label className={formStyles.radioLabel}>
                    <input 
                      type="radio" 
                      name="sigilo" 
                      checked={isAnonymous} 
                      onChange={() => setIsAnonymous(true)}
                    />
                    Manifestação Anônima
                  </label>
                </div>

                {!isAnonymous && (
                  <div className={styles.identityGrid}>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>Nome Completo <span className={formStyles.requiredAsterisk}>*</span></label>
                      <input type="text" className={formStyles.formInput} placeholder="Digite seu nome" required={!isAnonymous} />
                    </div>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>CPF <span className={formStyles.requiredAsterisk}>*</span></label>
                      <input type="text" className={formStyles.formInput} placeholder="000.000.000-00" required={!isAnonymous} />
                    </div>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>E-mail <span className={formStyles.requiredAsterisk}>*</span></label>
                      <input type="email" className={formStyles.formInput} placeholder="seu@email.com" required={!isAnonymous} />
                    </div>
                    <div className={formStyles.formGroup}>
                      <label className={formStyles.formLabel}>Telefone / WhatsApp</label>
                      <input type="tel" className={formStyles.formInput} placeholder="(00) 00000-0000" />
                    </div>
                  </div>
                )}
              </div>

              {/* Passo 2 - Relato */}
              <div className={styles.formSection}>
                <div className={styles.sectionHeader}>
                  <div className={styles.stepCircle}>2</div>
                  <h3>Descrição da Manifestação</h3>
                </div>

                <div className={styles.identityGrid}>
                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formLabel}>Tipo da Manifestação <span className={formStyles.requiredAsterisk}>*</span></label>
                    <select className={formStyles.formSelect} required>
                      <option value="">Selecione uma opção...</option>
                      <option value="reclamacao">Reclamação ou Denúncia</option>
                      <option value="solicitacao">Solicitação de Serviço Urbanístico</option>
                      <option value="elogio">Elogio ou Sugestão</option>
                    </select>
                  </div>
                  <div className={formStyles.formGroup}>
                    <label className={formStyles.formLabel}>Assunto / Tema <span className={formStyles.requiredAsterisk}>*</span></label>
                    <select className={formStyles.formSelect} required>
                      <option value="">Selecione um tema...</option>
                      <option value="saude">Saúde Pública</option>
                      <option value="educacao">Educação e Escolas</option>
                      <option value="infraestrutura">Infraestrutura e Obras</option>
                      <option value="limpeza">Lixo e Limpeza Urbana</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div className={formStyles.formGroup}>
                  <label className={formStyles.formLabel}>Relato Detalhado <span className={formStyles.requiredAsterisk}>*</span></label>
                  <textarea 
                    className={formStyles.formTextarea} 
                    placeholder="Descreva aqui sua manifestação com o máximo de detalhes possível, incluindo data, hora e locais. Se for um buraco, identifique a rua próxima."
                    required
                  ></textarea>
                </div>

                <div className={formStyles.formGroup}>
                  <label className={formStyles.formLabel}>Endereço do Fato (Opcional)</label>
                  <input type="text" className={formStyles.formInput} placeholder="Rua, Número, Bairro, Ponto de Referência" />
                </div>
              </div>

              {/* Botão Enviar */}
              <div className={formStyles.submitBlock}>
                <button type="button" className={formStyles.btnSecondary}>Cancelar</button>
                <button type="submit" className={formStyles.btnPrimary}>
                  Enviar Manifestação <Send size={18} />
                </button>
              </div>

            </form>
          </div>

          <div className={styles.infoColumn}>
            {/* Context Widget */}
            <div className={styles.contextWidget}>
              <div className={styles.contextHeader}>
                <ShieldAlert size={20} className={styles.contextIcon}/>
                <h4>Garantia de Sigilo</h4>
              </div>
              <p>Optando por <strong>Manifestação Anônima</strong>, seus dados não serão armazenados no banco central. A lei n. 13.460/2017 assegura o sigilo do demandante em casos de denúncia.</p>
            </div>

            <div className={styles.contextWidget}>
              <div className={styles.contextHeader}>
                <BookOpen size={20} className={styles.contextIconAlt}/>
                <h4>Dados Pessoais & LGPD</h4>
              </div>
              <p>As informações pessoais coletadas neste formulário (caso se identifique) são protegidas pela Lei Geral de Proteção de Dados (LGPD) e utilizadas exclusivamente para fins de retorno institucional sobre sua demanda.</p>
            </div>

            <div className={styles.urgentAlert}>
              <h5>Atenção para Casos Urgentes</h5>
              <p>A Ouvidoria não é um canal de serviço emergencial. Para emergências envolvendo saúde, risco de morte, segurança ou defesa civil, ligue imediatamente para os números 192, 190 ou 199.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
