import styles from "./page.module.css";
import Link from 'next/link';
import { 
  Search, FileText, ArrowRight,
  ClipboardList, Info, MessageSquare, Building2
} from 'lucide-react';
import { NOTICIAS_MOCK } from '@/lib/noticiasMock';

function formatDataPT(dataStr: string) {
  return new Date(dataStr + "T00:00:00").toLocaleDateString('pt-BR', { 
    day: '2-digit', month: 'long'
  });
}

export default function Home() {
  const mainNews = NOTICIAS_MOCK[0];
  const otherNews = NOTICIAS_MOCK.slice(1, 4); // Show 3 side news

  return (
    <div className={styles.page}>
      
      {/* 1. Hero Banner Premium exato como a Referência */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            
            <div className={styles.heroBadgeTop}>
              <span className={styles.dotYellow}></span> PORTAL OFICIAL DA CIDADE
            </div>
            
            <h1 className={styles.heroTitle}>Lajes Pintadas</h1>
            <p className={styles.heroSubtitle}>Cuidando da nossa gente e Construindo o nosso futuro.</p>
            
            <div className={styles.searchContainer}>
              <div className={styles.searchBar}>
                <input type="text" placeholder="O que você procura hoje?" />
                <button><Search size={20} strokeWidth={2.5} /></button>
              </div>
              
              <div className={styles.subBadges}>
                <span className={styles.subBadge}><span className={styles.dotYellow}></span> LAJES PINTADAS - RN</span>
                <span className={styles.subBadge}><span className={styles.dotGreen}></span> PORTAL ATIVO</span>
              </div>
            </div>
            
            <div className={styles.servicesLabel}>
              SERVIÇOS OFICIAIS
            </div>

          </div>
        </div>
      </section>

      {/* 2. Cartões Flutuantes (Overlapping Hero) */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.servicesGrid}>
            
            {/* Card 1: Transparência */}
            <Link href="/transparencia" className={styles.serviceCard}>
              <div className={`${styles.iconWrapper} ${styles.iconCyan}`}>
                <ClipboardList size={26} strokeWidth={2} />
              </div>
              <h3>PORTAL DA<br/>TRANSPARÊNCIA</h3>
              <p>Acompanhe as contas públicas e atos oficiais.</p>
              <div className={`${styles.acessarLink} ${styles.textCyan}`}>
                ACESSAR <ArrowRight size={16} />
              </div>
            </Link>

            {/* Card 2: E-SIC */}
            <Link href="/e-sic" className={styles.serviceCard}>
              <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
                <Info size={26} strokeWidth={2} />
              </div>
              <h3>E-SIC</h3>
              <p>Solicite informações públicas eletronicamente.</p>
              <div className={`${styles.acessarLink} ${styles.textGreen}`}>
                ACESSAR <ArrowRight size={16} />
              </div>
            </Link>

            {/* Card 3: Ouvidoria */}
            <Link href="/ouvidoria" className={styles.serviceCard}>
              <div className={`${styles.iconWrapper} ${styles.iconOrange}`}>
                <MessageSquare size={26} strokeWidth={2} />
              </div>
              <h3>OUVIDORIA</h3>
              <p>Envie sugestões, reclamações ou elogios.</p>
              <div className={`${styles.acessarLink} ${styles.textOrange}`}>
                ACESSAR <ArrowRight size={16} />
              </div>
            </Link>

            {/* Card 4: Secretarias */}
            <Link href="/institucional/secretarias" className={styles.serviceCard}>
              <div className={`${styles.iconWrapper} ${styles.iconPurple}`}>
                <Building2 size={26} strokeWidth={2} />
              </div>
              <h3>SECRETARIAS</h3>
              <p>Conheça os órgãos e gestores municipais.</p>
              <div className={`${styles.acessarLink} ${styles.textPurple}`}>
                ACESSAR <ArrowRight size={16} />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. Notícias em Destaque Dinâmicas */}
      <section className={`section ${styles.newsSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.headerTitle}>
              <h2 className={styles.sectionTitle}>Acontece na Cidade</h2>
              <p className={styles.sectionDesc}>Principais notícias e informativos oficiais</p>
            </div>
            <Link href="/noticias" className={styles.viewAll}>
              Ver todas <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className={styles.newsGrid}>
            <Link href={`/noticias/${mainNews.slug}`} className={styles.mainNews}>
              <div 
                className={styles.newsImgPlaceholder} 
                style={{ 
                  backgroundImage: `url(${mainNews.imagemCapa})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <span className={styles.categoryBadge}>{mainNews.secretaria}</span>
              </div>
              <div className={styles.newsBody}>
                <span className={styles.newsDate}>{formatDataPT(mainNews.dataPublicacao)}</span>
                <h3>{mainNews.titulo}</h3>
                <p>{mainNews.resumo}</p>
              </div>
            </Link>

            <div className={styles.smallNewsList}>
              {otherNews.map((noticia) => (
                <Link key={noticia.id} href={`/noticias/${noticia.slug}`} className={styles.smallNewsCard}>
                  <div 
                    className={styles.smallNewsImg}
                    style={{ 
                      backgroundImage: `url(${noticia.imagemCapa})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className={styles.smallNewsContent}>
                    <span className={styles.newsDate}>{formatDataPT(noticia.dataPublicacao)}</span>
                    <h4>{noticia.titulo}</h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
