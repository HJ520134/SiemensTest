import styles from './Toolbar.module.css';

interface ToolbarProps {
  onAdd: () => void;
  onDelete: () => void;
  hasSelection: boolean;
}

export function Toolbar({ onAdd, onDelete, hasSelection }: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <button
        className={`${styles.button} ${styles.buttonPrimary}`}
        onClick={onAdd}
      >
        Add Row
      </button>
      <button
        className={`${styles.button} ${styles.buttonDanger}`}
        disabled={!hasSelection}
        onClick={onDelete}
      >
        Delete Row
      </button>
    </div>
  );
}
