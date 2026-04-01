"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FileText, Users, Settings, 
  LogOut, Bell, Search, Menu, X, 
  Newspaper, Building2, Gavel, FileDigit
} from 'lucide-react';
import styles from './Admin.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // If we are on the login page, don't show the sidebar/layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    { name: 'Notícias', icon: Newspaper, href: '/admin/noticias' },
    { name: 'Secretarias', icon: Building2, href: '/admin/secretarias' },
    { name: 'Legislação', icon: Gavel, href: '/admin/legislacao' },
    { name: 'Transparência', icon: FileDigit, href: '/admin/transparencia' },
    { name: 'Equipe', icon: Users, href: '/admin/equipe' },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarClosed : ''}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoText}>Lajes Pintadas</div>
          <span className={styles.subLogo}>Painel Administrativo</span>
        </div>

        <nav className={styles.navSection}>
          <div className={styles.navLabel}>GERENCIAMENTO</div>
          <div className={styles.navLinks}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className={styles.navLabel}>CONFIGURAÇÕES</div>
          <div className={styles.navLinks}>
            <Link href="/admin/settings" className={styles.navItem}>
              <Settings size={20} />
              <span>Configurações</span>
            </Link>
          </div>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div className={styles.userAvatar}>AP</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Admin Portal</span>
              <span className={styles.userRole}>Administrador Master</span>
            </div>
          </div>
          <button className={styles.navItem} style={{ width: '100%', marginTop: '0.5rem', border: 'none', background: 'none' }}>
            <LogOut size={20} />
            <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContainer}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button 
              className={styles.menuToggle} 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
            >
              {sidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <div className={styles.topbarRight} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div className={styles.searchBox} style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text" 
                placeholder="Pesquisar no painel..." 
                style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', fontSize: '0.8rem', outline: 'none' }}
              />
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', position: 'relative' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '-5px', right: '-5px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></span>
            </button>
          </div>
        </header>

        <section className={styles.page}>
          {children}
        </section>
      </main>
    </div>
  );
}
