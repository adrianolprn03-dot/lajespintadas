import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Tag, User, Share2 } from 'lucide-react';
import { NOTICIAS_MOCK } from '@/lib/noticiasMock';
import styles from './Materia.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

// Server-side meta tag generator
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const noticia = NOTICIAS_MOCK.find(n => n.slug === slug);
  
  if (!noticia) return { title: 'Notícia Não Encontrada' };
  
  return {
    title: `${noticia.titulo} | Lajes Pintadas`,
    description: noticia.resumo,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumo,
      images: [noticia.imagemCapa || '/brasao.png'],
    }
  };
}

function formatDataPT(dataStr: string) {
  return new Date(dataStr + "T00:00:00").toLocaleDateString('pt-BR', { 
    day: '2-digit', month: 'long', year: 'numeric' 
  });
}

export default async function MateriaPage({ params }: Props) {
  const { slug } = await params;
  const noticia = NOTICIAS_MOCK.find(n => n.slug === slug);

  if (!noticia) {
    notFound();
  }

  return (
    <article className={styles.articleWrapper}>
      
      {/* Article Header */}
      <header className={styles.articleHeader}>
        <div className={`container ${styles.headerContainer}`}>
          <Link href="/noticias" className={styles.backLink}>
            <ChevronLeft size={16} /> Voltar para Notícias
          </Link>
          
          <div className={styles.tagWrap}>
            <span className={styles.deptTag}><Tag size={12} /> {noticia.secretaria}</span>
          </div>

          <h1 className={styles.articleTitle}>{noticia.titulo}</h1>
          <p className={styles.articleResumo}>{noticia.resumo}</p>

          <div className={styles.articleMeta}>
            <div className={styles.metaItem}>
              <Calendar size={16} className={styles.metaIcon} />
              <span>Publicado em {formatDataPT(noticia.dataPublicacao)}</span>
            </div>
            <div className={styles.metaSeparator}></div>
            <div className={styles.metaItem}>
              <User size={16} className={styles.metaIcon} />
              <span>Por {noticia.autor}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Display */}
      <div className={`container ${styles.imageContainer}`}>
        <div 
          className={styles.imagePlaceholder}
          style={{ 
            backgroundImage: `url(${noticia.imagemCapa})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            height: '450px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}
        >
          <div className={styles.shareBtnWrap}>
            <button className={styles.shareBtn} title="Compartilhar">
              <Share2 size={18} /> Compartilhar
            </button>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="container">
        <div className={styles.articleBody}>
          <div 
            className={styles.htmlContent} 
            dangerouslySetInnerHTML={{ __html: noticia.conteudoHtml }} 
          />
        </div>
      </div>

    </article>
  );
}
