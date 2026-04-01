"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Search, Edit2, Trash2, Eye, 
  Filter, MoreVertical, Calendar, User
} from 'lucide-react';
import { NOTICIAS_MOCK } from '@/lib/noticiasMock';
import styles from '../Admin.module.css';

export default function AdminNoticias() {
  const [busca, setBusca] = useState("");

  const noticias = NOTICIAS_MOCK.filter(n => 
    n.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#1e293b' }}>Notícias e Informativos</h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Gerencie o conteúdo do feed de notícias do portal.</p>
        </div>
        <Link 
          href="/admin/noticias/new" 
          className={styles.btnLogin} 
          style={{ width: 'auto', padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <Plus size={18} /> NOVA NOTÍCIA
        </Link>
      </header>

      {/* Filters Bar */}
      <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Buscar por título ou autor..." 
            className={styles.input} 
            style={{ paddingLeft: '2.5rem', backgroundColor: '#f8fafc' }}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <button style={{ backgroundColor: '#f1f5f9', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', color: '#475569', fontWeight: 700, fontSize: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}>
          <Filter size={16} /> Filtros
        </button>
      </div>

      {/* News Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Notícia</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Data</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Autor</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((n) => (
              <tr key={n.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '0.75rem', backgroundColor: '#f1f5f9', overflow: 'hidden', flexShrink: 0 }}>
                      <img src={n.imagemCapa} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#334155', marginBottom: '0.2rem' }}>{n.titulo}</h4>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{n.secretaria}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                    <Calendar size={14} />
                    {new Date(n.dataPublicacao).toLocaleDateString('pt-BR')}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                    <User size={14} />
                    Ascom
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ backgroundColor: '#ecfdf5', color: '#059669', fontSize: '0.65rem', fontWeight: 900, padding: '0.3rem 0.75rem', borderRadius: '1rem', border: '1px solid #a7f3d0', textTransform: 'uppercase' }}>
                    Publicado
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button style={{ padding: '0.5rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}><Eye size={18} /></button>
                    <button style={{ padding: '0.5rem', color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer' }}><Edit2 size={18} /></button>
                    <button style={{ padding: '0.5rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
