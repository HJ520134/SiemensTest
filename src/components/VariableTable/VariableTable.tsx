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
          {variables.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length} className={styles.empty}>
                No variables defined. Click "Add Row" to add one.
              </td>
            </tr>
          )}
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
                    onCommit={(value) => updateVariable(v.id, col.key as 'name' | 'dataType' | 'defaultValue' | 'comment', value)}
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
