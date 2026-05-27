import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import type { Variable } from '../../types/variable';
import styles from './EditableCell.module.css';

interface EditableCellProps {
  columnKey: string;
  value: string | number;
  variable: Variable;
  isEditing: boolean;
  onCommit: (value: string) => { success: boolean; error?: string; normalized?: string };
  onStartEdit: () => void;
  onStopEdit: () => void;
}

export function EditableCell({
  columnKey,
  value,
  variable,
  isEditing,
  onCommit,
  onStartEdit,
  onStopEdit,
}: EditableCellProps) {
  const [editValue, setEditValue] = useState(String(value));
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditValue(String(value));
      setError(null);
      inputRef.current?.focus();
    }
  }, [isEditing, value]);

  const commit = useCallback(() => {
    const trimmed = editValue.trim();
    if (columnKey === 'name' && !trimmed) {
      setEditValue(String(value));
      setError('Name cannot be empty');
      inputRef.current?.focus();
      return;
    }
    const result = onCommit(trimmed);
    if (!result.success) {
      setError(result.error ?? null);
    } else {
      setEditValue(result.normalized ?? trimmed);
      setError(null);
      onStopEdit();
    }
  }, [editValue, onCommit, onStopEdit, value, columnKey]);

  const cancel = useCallback(() => {
    setEditValue(String(value));
    setError(null);
    onStopEdit();
  }, [value, onStopEdit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        commit();
      } else if (e.key === 'Escape') {
        cancel();
      }
    },
    [commit, cancel],
  );

  if (!isEditing) {
    const displayValue = columnKey === 'index' ? variable.index : String(value);
    return (
      <td
        className={styles.cell}
        onDoubleClick={() => {
          if (columnKey !== 'index') {
            onStartEdit();
          }
        }}
      >
        {displayValue}
      </td>
    );
  }

  return (
    <td className={`${styles.cell} ${styles.editing} ${error ? styles.cellError : ''}`}>
      {columnKey === 'dataType' ? (
        <select
          ref={inputRef as React.Ref<HTMLSelectElement>}
          className={styles.select}
          value={editValue}
          onChange={(e) => {
            const newVal = e.target.value;
            setEditValue(newVal);
            const result = onCommit(newVal);
            if (result.success) {
              setError(null);
              onStopEdit();
            } else {
              setError(result.error ?? null);
            }
          }}
          onBlur={commit}
        >
          <option value="BOOL">BOOL</option>
          <option value="INT">INT</option>
        </select>
      ) : (
        <input
          ref={inputRef as React.Ref<HTMLInputElement>}
          className={styles.input}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
        />
      )}
      {error && <div className={styles.tooltip}>{error}</div>}
    </td>
  );
}
