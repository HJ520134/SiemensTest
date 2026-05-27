import { useVariableStore } from '../../store/useVariableStore';
import { useEditing } from '../../hooks/useEditing';
import { EditableCell } from '../EditableCell/EditableCell';
import { COLUMNS } from '../../constants';
import styles from './VariableTable.module.css';

const COL_WIDTHS: Record<string, string> = {
  index: styles.colIndex,
  name: styles.colName,
  dataType: styles.colDataType,
  defaultValue: styles.colDefault,
  comment: styles.colComment,
};

function EmptyState() {
  return (
    <tr>
      <td colSpan={COLUMNS.length} className={styles.empty}>
        <svg
          className={styles.emptyIcon}
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 3v18" />
        </svg>
        No variables defined yet
        <br />
        <span style={{ fontSize: 12 }}>Click "Add Row" to create your first variable</span>
      </td>
    </tr>
  );
}

export function VariableTable() {
  const variables = useVariableStore((s) => s.variables);
  const selectedRowId = useVariableStore((s) => s.selectedRowId);
  const selectRow = useVariableStore((s) => s.selectRow);
  const updateVariable = useVariableStore((s) => s.updateVariable);

  const { isEditing, startEdit, stopEdit } = useEditing();

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={`${styles.headerCell} ${COL_WIDTHS[col.key] ?? ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {variables.length === 0 && <EmptyState />}
          {variables.map((v) => {
            const selected = v.id === selectedRowId;
            return (
              <tr
                key={v.id}
                className={`${styles.row} ${selected ? styles.rowSelected : ''}`}
                onClick={() => selectRow(v.id)}
              >
                {COLUMNS.map((col) => (
                  <EditableCell
                    key={col.key}
                    columnKey={col.key}
                    value={String(v[col.key as keyof typeof v] ?? '')}
                    variable={v}
                    isEditing={isEditing(v.id, col.key)}
                    onCommit={(value) =>
                      updateVariable(
                        v.id,
                        col.key as 'name' | 'dataType' | 'defaultValue' | 'comment',
                        value,
                      )
                    }
                    onStartEdit={() => startEdit(v.id, col.key)}
                    onStopEdit={stopEdit}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
