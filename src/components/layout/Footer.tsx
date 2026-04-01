import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerInfo}>
          <div className={styles.logo}>
            <Image src="/brasao.png" alt="Brasão Lajes Pintadas" width={60} height={60} />
            <div className={styles.logoText}>
              <h2>Prefeitura Municipal de</h2>
              <h3>Lajes Pintadas - RN</h3>
            </div>
          </div>
          <p className={styles.address}>
            Rua José Ferreira Sobrinho, 100<br />
            Centro, Lajes Pintadas - RN, CEP: 59.159-000<br />
            CNPJ: 08.159.394/0001-37
          </p>
          <div className={styles.contact}>
            <p><strong>Atendimento:</strong> Seg. a Sex. das 07h às 13h</p>
            <p><strong>Email:</strong> administracao@lajespintadas.rn.gov.br</p>
          </div>
        </div>

        <div className={styles.footerNavGroup}>
          <h4>Acesso Rápido</h4>
          <nav className={styles.footerNav}>
            <Link href="/transparencia">Portal da Transparência</Link>
            <Link href="/transparencia/dados-abertos">Dados Abertos</Link>
            <Link href="/servicos">Carta de Serviços</Link>
            <Link href="/lgpd">Privacidade (LGPD)</Link>
            <Link href="/ouvidoria">Ouvidoria Municipal</Link>
            <Link href="/e-sic">e-SIC</Link>
            <Link href="/transparencia/publicacoes">Diário Oficial</Link>
            <Link href="/transparencia/licitacoes">Licitações e Contratos</Link>
            <Link href="/transparencia/servidores">Portal do Servidor</Link>
          </nav>
        </div>

        <div className={styles.footerNavGroup}>
          <h4>Mídias Sociais</h4>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/Pmlajespintadasrn" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">FB</a>
            <a href="https://www.instagram.com/prefeituradelajespintadasrn/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">IG</a>
            <a href="#" className={styles.socialIcon} aria-label="YouTube">YT</a>
          </div>
          
          <div className={styles.seals}>
            <div className={styles.seal}>LAI</div>
            <div className={styles.seal}>LRF</div>
            <div className={styles.seal}>Governo Eletrônico</div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} PREFEITURA MUNICIPAL DE LAJES PINTADAS. Desenvolvido com foco em acessibilidade e transparência pública. Em conformidade com a LGPD (Lei nº 13.709/2018).</p>
        </div>
      </div>
    </footer>
  );
}
