import { Metadata } from 'next';
import { 
  ShieldCheck, UserCheck, Lock, 
  FileText, Mail, Info, ArrowRight 
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import styles from './LGPD.module.css';

export const metadata: Metadata = {
  title: "Proteção de Dados (LGPD) | Lajes Pintadas",
  description: "Entenda como a Prefeitura de Lajes Pintadas protege seus dados pessoais e como exercer seus direitos conforme a Lei 13.709/2018."
};

const SECOES_LGPD = [
  {
    id: "1",
    titulo: "1. Quem somos",
    desc: "A Prefeitura Municipal de Lajes Pintadas (CNPJ 08.000.000/0001-00) é a controladora dos dados coletados por este portal.",
    detalhes: "Sede: Palácio Municipal, Centro, Lajes Pintadas - RN. Encarregado de Dados (DPO): contato@lajespintadas.rn.gov.br"
  },
  {
    id: "2",
    titulo: "2. Dados Coletados",
    desc: "Coletamos apenas o estritamente necessário para prestar serviços públicos digitais e responder solicitações.",
    detalhes: "Dados de identificação (Nome, CPF) em formulários de Ouvidoria/e-SIC, e dados técnicos (IP) para segurança."
  },
  {
    id: "3",
    titulo: "3. Seus Direitos (Art. 18)",
    desc: "A LGPD garante ao titular total controle sobre seus dados pessoais.",
    detalhes: "Você tem direito ao acesso, correção, anonimização, bloqueio, eliminação e revogação de consentimento a qualquer momento."
  },
  {
    id: "4",
    titulo: "4. Cookies e Segurança",
    desc: "Utilizamos cookies técnicos apenas para o funcionamento do portal. Não usamos rastreadores comerciais.",
    detalhes: "Toda a navegação é protegida por protocolos de criptografia SSL/TLS (HTTPS)."
  }
];

export default function LGPDPage() {
  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Privacidade" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Privacidade e Proteção de Dados (LGPD)"
        description="Como coletamos, usamos e protegemos seus dados pessoais em conformidade com a Lei Federal nº 13.709/2018."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Top Highlight */}
        <div className={styles.topInfo}>
           <div className={styles.badgeLabel}><ShieldCheck size={18}/> PROGRAMA DE GOVERNANÇA EM PRIVACIDADE</div>
           <p className={styles.topText}>
              A transparência no tratamento de dados pessoais é um compromisso da administração pública. 
              Este portal segue as diretrizes da <strong>Autoridade Nacional de Proteção de Dados (ANPD)</strong>.
           </p>
        </div>

        {/* Sections Grid */}
        <div className={styles.sectionsGrid}>
           {SECOES_LGPD.map(secao => (
             <div key={secao.id} className={styles.policyCard}>
                <div className={styles.cardHeader}>
                   <div className={styles.iconWrap}>
                      {secao.id === "1" && <Lock size={24}/>}
                      {secao.id === "2" && <UserCheck size={24}/>}
                      {secao.id === "3" && <FileText size={24}/>}
                      {secao.id === "4" && <ShieldCheck size={24}/>}
                   </div>
                   <h3>{secao.titulo}</h3>
                </div>
                <div className={styles.cardContent}>
                   <p className={styles.mainDesc}>{secao.desc}</p>
                   <p className={styles.subDetail}>{secao.detalhes}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Contact DPO Card */}
        <div className={styles.contactCard}>
           <div className={styles.contactIcon}><Mail size={32}/></div>
           <div className={styles.contactInfo}>
              <h4>Fale com o Encarregado (DPO)</h4>
              <p>Dúvidas sobre o tratamento de seus dados pessoais ou pedidos de exclusão?</p>
              <a href="mailto:contato@lajespintadas.rn.gov.br" className={styles.emailBtn}>
                 contato@lajespintadas.rn.gov.br <ArrowRight size={16}/>
              </a>
           </div>
        </div>

        {/* Extra Help */}
        <div className={styles.helpBox}>
           <Info size={16}/>
           <span>A identificação do cidadão no e-SIC é regida pela Lei de Acesso à Informação, prevalecendo a publicidade dos atos administrativos sobre a reserva de dados, exceto em informações sensíveis.</span>
        </div>

      </div>
    </div>
  );
}
