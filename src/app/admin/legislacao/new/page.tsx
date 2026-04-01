"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Save, X, FileText, 
  Calendar, Gavel, Upload, ShieldCheck
} from 'lucide-react';
import styles from '../../Admin.module.css';

export default function NewLegislacao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/legislacao');
    }, 1000);
  };

  return (
    <div style={{ animation: 'slideUp 0.4s ease' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button 
            type="button"
            onClick={() => router.back()} 
            style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', cursor: 'pointer' }}
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#1e293b' }}>Novo Ato Legislativo</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Publique leis, decretos ou portarias oficiais no portal.</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            type="button"
            onClick={() => router.back()} 
            style={{ padding: '0.75rem 1.5rem', borderRadius: '0.75rem', backgroundColor: 'white', border: '1px solid #e2e8f0', color: '#64748b', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}
          >
            DESCARTAR
          </button>
          <button 
            type="submit"
            form="legislacaoForm"
            className={styles.btnLogin} 
            style={{ width: 'auto', padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            disabled={loading}
          >
            <Save size={18} /> {loading ? 'SALVANDO...' : 'PUBLICAR ATO'}
          </button>
        </div>
      </header>

      <form id="legislacaoForm" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Tipo de Legislação</label>
                <select className={styles.input} required>
                  <option value="">Selecione o tipo...</option>
                  <option value="Lei Ordinária">Lei Ordinária</option>
                  <option value="Lei Complementar">Lei Complementar</option>
                  <option value="Lei Orgânica">Lei Orgânica</option>
                  <option value="Decreto">Decreto Executivo</option>
                  <option value="Portaria">Portaria Administrativa</option>
                  <option value="Resolução">Resolução</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Número do Ato</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="Ex: 450/2023"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Ementa (Resumo do Ato)</label>
              <textarea 
                className={styles.input} 
                style={{ minHeight: '120px', resize: 'vertical' }}
                placeholder="Descreva o conteúdo resumido do ato legislativo..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Observações Adicionais (Opcional)</label>
              <textarea 
                className={styles.input} 
                style={{ minHeight: '80px', resize: 'vertical' }}
                placeholder="Informações complementares sobre a vigência ou revogação..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar Space */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* File Upload */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={18} className="text-blue-600" /> Documento (PDF)
            </h3>
            
            <div style={{ width: '100%', height: '140px', border: '2px dashed #e2e8f0', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <FileText size={32} style={{ color: '#cbd5e1' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>Anexar PDF Oficial</span>
              <span style={{ fontSize: '0.65rem', color: '#cbd5e1' }}>Máximo: 20MB</span>
            </div>
          </div>

          {/* Publication Metadata */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} className="text-blue-600" /> Publicação
            </h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Exercício (Ano)</label>
              <input type="number" className={styles.input} defaultValue={new Date().getFullYear()} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Data de Publicação</label>
              <input type="date" className={styles.input} defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Autenticidade</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', fontSize: '0.7rem', fontWeight: 800 }}>
                <ShieldCheck size={14} /> CERTIFICADO DIGITALMENTE
              </div>
            </div>
          </div>

        </div>

      </form>
    </div>
  );
}
