"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, Search, Edit2, Trash2, FileText, 
  Filter, Calendar, Gavel, Download
} from 'lucide-react';
import styles from '../Admin.module.css';

type LegislacaoItem = {
  id: string;
  tipo: string;
  numero: string;
  ano: number;
  ementa: string;
  status: string;
};

const MOCK_LEGISLACAO: LegislacaoItem[] = [
  { id: "1", tipo: "Lei Ordinária", numero: "450/2023", ano: 2023, ementa: "Dispõe sobre o Plano Plurianual para o quadriênio 2024-2027.", status: "Publicado" },
  { id: "2", tipo: "Decreto", numero: "045/2024", ano: 2024, ementa: "Dispõe sobre a programação financeira para o exercício de 2024.", status: "Publicado" },
  { id: "3", tipo: "Portaria", numero: "010/2024", ano: 2024, ementa: "Nomeia Secretário Municipal de Administração.", status: "Publicado" },
];

export default function AdminLegislacao() {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");

  const filtradas = MOCK_LEGISLACAO.filter(l => 
    l.ementa.toLowerCase().includes(busca.toLowerCase()) || 
    l.numero.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#1e293b' }}>Legislação Municipal</h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Publique e atualize Leis, Decretos e Portarias oficiais.</p>
        </div>
        <Link 
          href="/admin/legislacao/new" 
          className={styles.btnLogin} 
          style={{ width: 'auto', padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <Plus size={18} /> NOVO ATO
        </Link>
      </header>

      {/* Filters Bar */}
      <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Buscar por número ou ementa..." 
            className={styles.input} 
            style={{ paddingLeft: '2.5rem', backgroundColor: '#f8fafc' }}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
        <select 
          className={styles.input} 
          style={{ width: '200px' }}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option value="">Todos os Tipos</option>
          <option value="Lei">Leis</option>
          <option value="Decreto">Decretos</option>
          <option value="Portaria">Portarias</option>
        </select>
        <button style={{ backgroundColor: '#f1f5f9', border: 'none', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', color: '#475569', fontWeight: 700, fontSize: '0.8rem', display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}>
          <Filter size={16} /> Filtros
        </button>
      </div>

      {/* Legislation Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Ato / Número</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Ementa</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Ano</th>
              <th style={{ textAlign: 'left', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Status</th>
              <th style={{ textAlign: 'right', padding: '1rem 1.5rem', fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((l) => (
              <tr key={l.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', backgroundColor: '#f1f5f9', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Gavel size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 900, color: '#334155', marginBottom: '0.2rem' }}>{l.tipo}</h4>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>Nº {l.numero}</span>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {l.ementa}
                  </p>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, color: '#64748b' }}>
                    <Calendar size={14} />
                    {l.ano}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ backgroundColor: '#ecfdf5', color: '#059669', fontSize: '0.65rem', fontWeight: 900, padding: '0.3rem 0.75rem', borderRadius: '1rem', border: '1px solid #a7f3d0', textTransform: 'uppercase' }}>
                    {l.status}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button style={{ padding: '0.5rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}><Download size={18} /></button>
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
