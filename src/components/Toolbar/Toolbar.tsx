import styles from './Toolbar.module.css';

interface ToolbarProps {
  onAdd: () => void;
  onDelete: () => void;
  hasSelection: boolean;
  variableCount: number;
}

export function Toolbar({ onAdd, onDelete, hasSelection }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.actions}>
        <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onAdd}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add Row
        </button>
        <button
          className={`${styles.btn} ${styles.btnDanger}`}
          disabled={!hasSelection}
          onClick={onDelete}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 5h10M6 5V3.5c0-.28.22-.5.5-.5h3c.28 0 .5.22.5.5V5m-4 4v3m2-3v3M4.5 5l.82 7.43c.04.32.3.57.63.57h4.1c.33 0 .6-.25.63-.57L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}
