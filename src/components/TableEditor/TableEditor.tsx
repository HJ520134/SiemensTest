import { useVariableStore } from '../../store/useVariableStore';
import { Toolbar } from '../Toolbar/Toolbar';
import { VariableTable } from '../VariableTable/VariableTable';
import styles from './TableEditor.module.css';

export function TableEditor() {
  const addVariable = useVariableStore((s) => s.addVariable);
  const deleteVariable = useVariableStore((s) => s.deleteVariable);
  const selectedRowId = useVariableStore((s) => s.selectedRowId);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Variable Table Editor</h1>
      <Toolbar
        onAdd={addVariable}
        onDelete={() => {
          if (selectedRowId) {
            deleteVariable(selectedRowId);
          }
        }}
        hasSelection={selectedRowId !== null}
      />
      <VariableTable />
    </div>
  );
}
