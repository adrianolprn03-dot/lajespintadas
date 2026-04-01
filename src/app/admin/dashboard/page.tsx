"use client";

import { 
  Users, Newspaper, FileText, Eye, 
  TrendingUp, Clock, AlertCircle, CheckCircle2,
  ArrowUpRight, ArrowDownRight, MessageSquare, BarChart3
} from 'lucide-react';
import styles from '../Admin.module.css';

export default function AdminDashboard() {
  const stats = [
    { title: 'Visitas Hoje', val: '1.240', change: '+12%', trend: 'up', icon: Eye, color: '#3b82f6' },
    { title: 'Novas Notícias', val: '08', change: '+2', trend: 'up', icon: Newspaper, color: '#10b981' },
    { title: 'Soli. Ouvidoria', val: '15', change: '-5%', trend: 'down', icon: MessageSquare, color: '#f59e0b' },
    { title: 'Atos Publicados', val: '42', change: '+4%', trend: 'up', icon: FileText, color: '#8b5cf6' },
  ];

  const recentActivites = [
    { id: 1, action: 'Nova Notícia publicada', desc: 'Prefeitura inicia obras de pavimentação...', time: '10 min atrás', user: 'Carlos Silva' },
    { id: 2, action: 'Edital de Licitação atualizado', desc: 'Pregão Eletrônico 005/2026', time: '45 min atrás', user: 'Maria Oliveira' },
    { id: 3, action: 'Resposta de Ouvidoria enviada', desc: 'Protocolo #20260401-12', time: '2 horas atrás', user: 'Suporte' },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#1e293b' }}>Bem-vindo de volta, Admin</h1>
        <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Aqui está o resumo do que aconteceu hoje em Lajes Pintadas.</p>
      </header>

      {/* Stats Grid */}
      <div className={styles.dashGrid}>
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className={styles.dashCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: s.color + '10', color: s.color, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', fontWeight: 800, color: s.trend === 'up' ? '#10b981' : '#ef4444' }}>
                  {s.change} {s.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </div>
              </div>
              <span className={styles.dashCardTitle}>{s.title}</span>
              <span className={styles.dashCardVal}>{s.val}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        {/* Atividades Recentes */}
        <div style={{ background: 'white', borderRadius: '1.5rem', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#1e293b' }}>Atividades Recentes</h3>
            <button style={{ fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}>Ver tudo</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {recentActivites.map((a) => (
              <div key={a.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '1rem', transition: 'transform 0.2s' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: 'white', borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', border: '1px solid #e2e8f0' }}>
                  <Clock size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#334155' }}>{a.action}</h4>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{a.time}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500, marginTop: '0.2rem' }}>{a.desc}</p>
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '4px', height: '4px', backgroundColor: '#cbd5e1', borderRadius: '50%' }}></div>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700 }}>Por: {a.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status do Portal */}
        <div style={{ background: 'white', borderRadius: '1.5rem', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.5rem' }}>Integridade do Portal</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <CheckCircle2 size={18} className="text-emerald-500" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>PNTP 2025</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10b981' }}>98%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                  <div style={{ width: '98%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <CheckCircle2 size={18} className="text-emerald-500" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>Acessibilidade</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#10b981' }}>100%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <AlertCircle size={18} className="text-amber-500" />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569' }}>SEO</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#f59e0b' }}>85%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px' }}>
                  <div style={{ width: '85%', height: '100%', backgroundColor: '#f59e0b', borderRadius: '3px' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '1rem', border: '1px solid #dbeafe' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <TrendingUp size={16} className="text-blue-600" />
              <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#1e40af' }}>Meta Mensal</span>
            </div>
            <p style={{ fontSize: '0.7rem', color: '#3b82f6', fontWeight: 600 }}>Você atingiu 92% da meta de publicações mensais. Continue assim!</p>
          </div>
        </div>

      </div>
    </div>
  );
}
