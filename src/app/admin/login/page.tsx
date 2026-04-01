"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, LayoutDashboard, ShieldCheck } from 'lucide-react';
import styles from '../Admin.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login for demonstration
    if (email === 'admin@lajespintadas.rn.gov.br' && password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      alert('Credenciais inválidas. Use admin@lajespintadas.rn.gov.br / admin123');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.loginIcon}>
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#1e293b' }}>Acesso Restrito</h2>
          <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Portal Administrativo Lajes Pintadas</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail Institucional</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="email" 
                className={styles.input} 
                style={{ paddingLeft: '2.5rem' }}
                placeholder="nome@lajespintadas.rn.gov.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Senha de Acesso</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="password" 
                className={styles.input} 
                style={{ paddingLeft: '2.5rem' }}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '14px', height: '14px' }} /> Lembrar acesso
            </label>
            <a href="#" style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 700, textDecoration: 'none' }}>Esqueci a senha</a>
          </div>

          <button type="submit" className={styles.btnLogin}>
            ACESSAR PAINEL
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
          Sinfonnia Sistemas & Lajes Pintadas © 2026
        </div>
      </div>
    </div>
  );
}
