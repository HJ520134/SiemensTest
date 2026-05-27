import { useVariableStore } from '../../store/useVariableStore';
import { Toolbar } from '../Toolbar/Toolbar';
import { VariableTable } from '../VariableTable/VariableTable';
import styles from './TableEditor.module.css';

export function TableEditor() {
  const variables = useVariableStore((s) => s.variables);
  const addVariable = useVariableStore((s) => s.addVariable);
  const deleteVariable = useVariableStore((s) => s.deleteVariable);
  const selectedRowId = useVariableStore((s) => s.selectedRowId);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Variable Table Editor</h1>
        <p className={styles.subtitle}>Manage and edit variable definitions for your automation project</p>
      </header>

      <div className={styles.card}>
        <div className={styles.cardBody}>
          <Toolbar
            onAdd={addVariable}
            onDelete={() => {
              if (selectedRowId) {
                deleteVariable(selectedRowId);
              }
            }}
            hasSelection={selectedRowId !== null}
            variableCount={variables.length}
          />
          <VariableTable />
        </div>
        <div className={styles.footer}>
          {variables.length} {variables.length === 1 ? 'variable' : 'variables'} total
        </div>
      </div>
    </div>
  );
}
