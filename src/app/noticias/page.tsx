import { ArrowRight, Calendar, Tag, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import PageHeader from '@/components/layout/PageHeader';
import { NOTICIAS_MOCK } from '@/lib/noticiasMock';
import styles from './Noticias.module.css';

function formatDataPT(dataStr: string) {
  return new Date(dataStr + "T00:00:00").toLocaleDateString('pt-BR', { 
    day: '2-digit', month: 'long', year: 'numeric' 
  });
}

export default function NoticiasList() {
  const breadcrumbs = [
    { label: "Ouvidoria e Participação", href: "/ouvidoria" },
    { label: "Notícias e Informativos" }
  ];

  return (
    <div className={styles.moduleWrapper}>
      <PageHeader
        title="Notícias e Informativos Oficiais"
        description="Acompanhe as últimas atualizações, obras em andamento, comunicados e eventos oficiais da Prefeitura."
        breadcrumbs={breadcrumbs}
      />

      <div className={`container ${styles.contentContainer}`}>
        
        {/* Main News / Featured (Not implemented yet as distinct, using grid for now) */}
        
        <div className={styles.newsGrid}>
          {NOTICIAS_MOCK.map((noticia) => (
            <Link href={`/noticias/${noticia.slug}`} key={noticia.id} className={styles.newsCard}>
              <div className={styles.cardCover}>
                <div className={styles.imagePlaceholder}>
                  {/* Visual ID for the secretarias/category */}
                  <span>Lajes Pintadas • {noticia.secretaria}</span>
                </div>
                <span className={styles.deptTag}><Tag size={12} /> {noticia.secretaria}</span>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <Calendar size={14} />
                  <time>{formatDataPT(noticia.dataPublicacao)}</time>
                </div>
                
                <h2 className={styles.cardTitle}>{noticia.titulo}</h2>
                <p className={styles.cardSummary}>{noticia.resumo}</p>
                
                <div className={styles.cardAction}>
                  Ler matéria completa <ArrowRight size={16} className={styles.actionArrow} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Improved Pagination */}
        <div className={styles.pagination}>
          <button className={styles.pageBtn} disabled>Anterior</button>
          <button className={`${styles.pageBtn} ${styles.pageActive}`}>1</button>
          <button className={styles.pageBtn}>2</button>
          <button className={styles.pageBtn}>Próxima</button>
        </div>

      </div>
    </div>
  );
}
