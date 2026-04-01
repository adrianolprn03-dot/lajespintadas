import { Search, Download, FileJson, FileText, FileSpreadsheet } from 'lucide-react';
import styles from './Filters.module.css';

interface TransparencyFiltersProps {
  searchValue: string;
  onSearch: (value: string) => void;
  currentYear: string;
  onYearChange: (val: string) => void;
  currentMonth: string;
  onMonthChange: (val: string) => void;
  onClear: () => void;
  onExport: (format: "pdf" | "csv" | "json") => void;
  availableYears: string[];
  placeholder?: string;
  children?: React.ReactNode;
}

const meses = [
  { val: "1", lab: "Janeiro" }, { val: "2", lab: "Fevereiro" },
  { val: "3", lab: "Março" }, { val: "4", lab: "Abril" },
  { val: "5", lab: "Maio" }, { val: "6", lab: "Junho" },
  { val: "7", lab: "Julho" }, { val: "8", lab: "Agosto" },
  { val: "9", lab: "Setembro" }, { val: "10", lab: "Outubro" },
  { val: "11", lab: "Novembro" }, { val: "12", lab: "Dezembro" }
];

export default function TransparencyFilters({
  searchValue, onSearch, currentYear, onYearChange,
  currentMonth, onMonthChange, onClear, onExport,
  availableYears, placeholder, children
}: TransparencyFiltersProps) {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder={placeholder || "Buscar..."} 
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        <div className={styles.exportGroup}>
          <span className={styles.exportLabel}><Download size={16}/> Exportar:</span>
          <button onClick={() => onExport('pdf')} className={styles.exportBtn} title="Baixar PDF"><FileText size={18} /> PDF</button>
          <button onClick={() => onExport('csv')} className={styles.exportBtn} title="Baixar CSV"><FileSpreadsheet size={18} /> CSV</button>
          <button onClick={() => onExport('json')} className={styles.exportBtn} title="Baixar JSON"><FileJson size={18} /> JSON</button>
        </div>
      </div>

      <div className={styles.filterOptions}>
        <div className={styles.selectGroup}>
          <label>Ano de Referência</label>
          <select value={currentYear} onChange={(e) => onYearChange(e.target.value)}>
             {availableYears.map(ano => <option key={ano} value={ano}>{ano}</option>)}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label>Mês</label>
          <select value={currentMonth} onChange={(e) => onMonthChange(e.target.value)}>
            <option value="">Todos os Meses</option>
            {meses.map(m => <option key={m.val} value={m.val}>{m.lab}</option>)}
          </select>
        </div>

        {children && (
          <div className={styles.customFilters}>
            {children}
          </div>
        )}

        <button onClick={onClear} className={styles.clearBtn}>
          Limpar Filtros
        </button>
      </div>
    </div>
  );
}
