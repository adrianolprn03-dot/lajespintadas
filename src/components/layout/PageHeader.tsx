import Link from 'next/link';
import styles from './PageHeader.module.css';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs: Breadcrumb[];
}

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader}>
      <div className="container">
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Início</Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className={styles.breadcrumbItem}>
                <span className={styles.separator}>/</span>
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span className={styles.current} aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        
        <div className={styles.headerContent}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    </div>
  );
}
