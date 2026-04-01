import PageHeader from '@/components/layout/PageHeader';
import styles from './page.module.css';
import { SECRETARIAS_MOCK } from '@/lib/secretariasMock';
import { User, MapPin, Clock, Mail, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SecretariasPage() {
  const breadcrumbs = [
    { label: "A Prefeitura", href: "/prefeitura" },
    { label: "Secretarias", href: "/secretarias" }
  ];

  return (
    <div className={styles.pageContainer}>
      <PageHeader 
        title="Secretarias Municipais" 
        description="Conheça a estrutura organizacional da Prefeitura Municipal de Lajes Pintadas. Encontre os responsáveis, atribuições e contatos de cada órgão da administração direta."
        breadcrumbs={breadcrumbs}
      />

      <div className="container" style={{ paddingBottom: '5rem' }}>
        <div className={styles.grid}>
          {SECRETARIAS_MOCK.map((secretaria) => (
            <div key={secretaria.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h2>{secretaria.nome}</h2>
                <div className={styles.gestorBadge}>
                  <User size={14} className={styles.iconCyan} />
                  <span>Gestor(a): <strong>{secretaria.gestor}</strong></span>
                </div>
              </div>
              
              <div className={styles.cardBody}>
                <p className={styles.description}>{secretaria.descricao}</p>
                
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <Clock size={16} className={styles.iconMuted} />
                    <span>{secretaria.horarioAtendimento}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <MapPin size={16} className={styles.iconMuted} />
                    <span>{secretaria.endereco}</span>
                  </div>
                  {secretaria.emailContact && (
                    <div className={styles.infoItem}>
                      <Mail size={16} className={styles.iconMuted} />
                      <a href={`mailto:${secretaria.emailContact}`}>{secretaria.emailContact}</a>
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.cardFooter}>
                <Link href={`/secretarias/${secretaria.id}`} className={styles.detailsBtn}>
                  Ver Detalhes Oficiais <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
