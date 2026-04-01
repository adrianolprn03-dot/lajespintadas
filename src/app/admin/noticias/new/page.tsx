"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, Save, X, Image as ImageIcon, 
  FileText, Calendar, Layout, User
} from 'lucide-react';
import styles from '../../Admin.module.css';

export default function NewNoticia() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/noticias');
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
            <h1 style={{ fontSize: '1.5rem', fontWeight: 950, color: '#1e293b' }}>Nova Notícia</h1>
            <p style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Crie um novo informativo para o portal oficial.</p>
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
            form="noticiaForm"
            className={styles.btnLogin} 
            style={{ width: 'auto', padding: '0.75rem 1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
            disabled={loading}
          >
            <Save size={18} /> {loading ? 'SALVANDO...' : 'PUBLICAR AGORA'}
          </button>
        </div>
      </header>

      <form id="noticiaForm" onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Título da Manchete</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Ex: Prefeitura inicia obras de pavimentação no Bairro Esperança"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Resumo (Lead)</label>
              <textarea 
                className={styles.input} 
                style={{ minHeight: '80px', resize: 'vertical' }}
                placeholder="Breve descrição que aparece nos cards de notícias..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Corpo da Notícia (Editor)</label>
              <div style={{ border: '1px solid #e2e8f0', borderRadius: '0.75rem', minHeight: '300px', backgroundColor: '#f8fafc', padding: '1rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed' }}>
                O editor de texto rico (WYSIWYG) será integrado aqui.
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Space */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Metadata */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Layout size={18} className="text-blue-600" /> Configurações
            </h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Secretaria Responsável</label>
              <select className={styles.input}>
                <option value="Gabinete do Prefeito">Gabinete do Prefeito</option>
                <option value="Educação">Secretaria de Educação</option>
                <option value="Saúde">Secretaria de Saúde</option>
                <option value="Obras">Secretaria de Obras</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Data de Publicação</label>
              <input type="date" className={styles.input} defaultValue={new Date().toISOString().split('T')[0]} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Autor</label>
              <input type="text" className={styles.input} placeholder="Assessoria de Comunicação" />
            </div>
          </div>

          {/* Featured Image */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ImageIcon size={18} className="text-blue-600" /> Imagem de Capa
            </h3>
            
            <div style={{ width: '100%', height: '160px', border: '2px dashed #e2e8f0', borderRadius: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              <ImageIcon size={32} style={{ color: '#cbd5e1' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>Fazer upload da imagem</span>
              <span style={{ fontSize: '0.65rem', color: '#cbd5e1' }}>Recomendado: 1200x630px</span>
            </div>
          </div>

          {/* Attachments */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: '#1e293b', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} className="text-blue-600" /> Anexos / PDF
            </h3>
            <button type="button" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontSize: '0.75rem', fontWeight: 800, color: '#64748b', cursor: 'pointer' }}>
              + Adicionar Arquivo
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}
