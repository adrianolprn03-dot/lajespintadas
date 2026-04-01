"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ChevronRight, BookOpen, Landmark, ActivitySquare, HeartPulse, Building2 } from 'lucide-react';
import styles from './Header.module.css';

// Taxonomia de Navegação (Menu Data)
const MENU_ITEMS = [
  {
    label: "A Prefeitura",
    href: "/prefeitura",
    icon: <Landmark size={20} />,
    children: [
      { label: "O Município", href: "/municipio", desc: "História, Hino, Brasão e Geografia." },
      { label: "O Prefeito", href: "/prefeitura", desc: "Gabinete e mensagens oficiais." },
      { label: "Secretarias", href: "/secretarias", desc: "Conheça toda a estrutura de secretarias." },
      { label: "Gestão e LGPD", href: "/lgpd", desc: "Privacidade e Proteção de Dados." }
    ]
  },
  {
    label: "Serviços",
    href: "/servicos",
    icon: <ActivitySquare size={20} />,
    children: [
      { label: "Carta de Serviços", href: "/servicos", desc: "Catálogo completo de serviços ao cidadão." },
      { label: "Central de Regulação", href: "/transparencia/central-regulacao", desc: "Fila de espera do SUS e exames." },
      { label: "Saúde Pública", href: "/saude", desc: "Rede de Atendimento e Campanhas." },
      { label: "Educação", href: "/educacao", desc: "Escolas e Planejamento Letivo." }
    ]
  },
  {
    label: "Transparência",
    href: "/transparencia",
    icon: <Building2 size={20} />,
    children: [
      { label: "Portal da Transparência", href: "/transparencia", desc: "Hub central de finanças." },
      { label: "Relatórios LRF", href: "/transparencia/lrf", desc: "RGF e RREO (Gestão Fiscal)." },
      { label: "Receitas e Despesas", href: "/transparencia/receitas", desc: "Execução orçamentária detalhada." },
      { label: "Licitações e Contratos", href: "/transparencia/licitacoes", desc: "Compras e pactos firmados." },
      { label: "Atas de Registro", href: "/transparencia/atas-registro", desc: "Tabela de Preços Registrados." },
      { label: "Obras Públicas", href: "/transparencia/obras", desc: "Andamento e medições de obras." },
      { label: "Servidores Públicos", href: "/transparencia/servidores", desc: "Folha de pagamento e cargos." },
      { label: "Ordem Cronológica", href: "/transparencia/ordem-cronologica", desc: "Fila de pagamentos a fornecedores." },
      { label: "Desonerações Fiscais", href: "/transparencia/desoneracoes-fiscais", desc: "Renúncias de receitas e benefícios." },
      { label: "Convênios e Emendas", href: "/transparencia/convenios", desc: "Recursos externos recebidos." },
      { label: "Dados Abertos", href: "/transparencia/dados-abertos", desc: "Arquivos para livre download." }
    ]
  },
  {
    label: "Institucional",
    href: "/noticias",
    icon: <BookOpen size={20} />,
    children: [
      { label: "Notícias Locais", href: "/noticias", desc: "Acompanhe as últimas publicações oficiais." },
      { label: "Diário Oficial", href: "/publicacoes", desc: "Leis, Decretos e Portarias em vigor." },
      { label: "Ouvidoria", href: "/ouvidoria", desc: "Reclamações, denúncias e sugestões." },
      { label: "e-SIC (Acesso à Info)", href: "/e-sic", desc: "Solicite documentos regidos pela LAI." },
      { label: "Fale Conosco", href: "/contato", desc: "Telefones úteis e localizações." }
    ]
  }
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Monitor Scroll for Sticky Header style variations
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Dropdown Toggles for Mobile Accordion
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      
      {/* Accessibility Top Bar */}
      <div className={styles.accessibilityBar}>
        <div className={`container ${styles.accContainer}`}>
          <div className={styles.accLeft}>
            <Link href="#main-content" className={styles.skipLink}>Ir para o conteúdo [1]</Link>
            <Link href="#nav-menu" className={styles.skipLink}>Ir para o menu [2]</Link>
          </div>
          <div className={styles.accLinks}>
            <button className={styles.accBtn} title="Aumentar Texto">A+</button>
            <button className={styles.accBtn} title="Diminuir Texto">A-</button>
            <button className={styles.accBtn} title="Alto Contraste">Contraste [3]</button>
          </div>
        </div>
      </div>
      
      {/* Main Navigation Glass Panel */}
      <div className={`glass-panel ${styles.mainHeader}`}>
        <div className={`container ${styles.headerContent}`}>
          
          {/* Logo Region */}
          <Link href="/" className={styles.logo}>
            <Image src="/brasao.png" alt="Brasão Lajes Pintadas" width={55} height={55} className={styles.brasao} priority />
            <div className={styles.logoText}>
              <h1>Prefeitura Municipal de</h1>
              <h2>Lajes Pintadas</h2>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} id="nav-menu">
            <Link href="/" className={styles.rootLink}>Início</Link>
            
            {/* Mega Menu Items */}
            {MENU_ITEMS.map((item) => (
              <div 
                key={item.label} 
                className={styles.navItem}
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className={styles.navTrigger}>
                  {item.label} <ChevronDown size={14} className={openDropdown === item.label ? styles.chevronRotated : ''} />
                </div>
                
                {/* Mega Dropdown Panel */}
                <div className={`${styles.megaMenu} ${openDropdown === item.label ? styles.megaMenuOpen : ''}`}>
                  <div className={styles.megaMenuHeader}>
                    {item.icon}
                    <h3>Explore: {item.label}</h3>
                  </div>
                  <div className={styles.megaMenuGrid}>
                    {item.children.map((child, idx) => (
                      <Link href={child.href} key={idx} className={styles.megaMenuLink}>
                        <div className={styles.megaLinkTitle}>
                          <ChevronRight size={12} className={styles.linkArrow} />
                          {child.label}
                        </div>
                        <p>{child.desc}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* CTA Button */}
            <Link href="/ouvidoria" className={styles.btnOuvidoria}>Ouvidoria</Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Alternar Menu Principal"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
          <div className={styles.mobileNavContainer}>
            <Link href="/" className={styles.mobileRootLink} onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
            
            {MENU_ITEMS.map((item) => (
              <div key={item.label} className={styles.mobileAccordion}>
                <button 
                  className={`${styles.mobileAccordionBtn} ${openDropdown === item.label ? styles.activeAccBtn : ''}`}
                  onClick={() => toggleDropdown(item.label)}
                >
                  <span className={styles.accIconWrap}>{item.icon}</span>
                  {item.label}
                  <ChevronDown size={18} className={`${styles.accChevron} ${openDropdown === item.label ? styles.chevronRotated : ''}`} />
                </button>
                
                <div className={`${styles.mobileAccordionContent} ${openDropdown === item.label ? styles.mobileAccOpen : ''}`}>
                  {item.children.map((child, idx) => (
                    <Link 
                      href={child.href} 
                      key={idx} 
                      className={styles.mobileSubLink}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>{child.label}</span>
                      <ChevronRight size={14} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            <div className={styles.mobileDrawerFooter}>
              <Link href="/ouvidoria" className={styles.btnOuvidoriaMobile} onClick={() => setIsMobileMenuOpen(false)}>
                Acessar a Ouvidoria
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
