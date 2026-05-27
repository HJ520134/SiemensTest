import { create } from 'zustand';
import type { DataType, Variable } from '../types/variable';
import { DEFAULT_BOOL_VALUE, DEFAULT_DATA_TYPE, DEFAULT_INT_VALUE } from '../constants';
import {
  validateBoolDefault,
  validateIntDefault,
  validateName,
} from '../utils/validation';

let nextId = 1;

function generateId(): string {
  return `var_${nextId++}`;
}

function getNextIndex(variables: Variable[]): number {
  if (variables.length === 0) return 1;
  return Math.max(...variables.map((v) => v.index)) + 1;
}

function getDefaultForType(dataType: DataType): string {
  return dataType === 'BOOL' ? DEFAULT_BOOL_VALUE : DEFAULT_INT_VALUE;
}

interface VariableStore {
  variables: Variable[];
  selectedRowId: string | null;

  addVariable: () => void;
  deleteVariable: (id: string) => void;
  updateVariable: (
    id: string,
    field: 'name' | 'dataType' | 'defaultValue' | 'comment',
    value: string,
  ) => { success: boolean; error?: string; normalized?: string };
  selectRow: (id: string | null) => void;
}

export const useVariableStore = create<VariableStore>((set, get) => ({
  variables: [],
  selectedRowId: null,

  addVariable: () => {
    const { variables } = get();
    const newIndex = getNextIndex(variables);
    const newVar: Variable = {
      id: generateId(),
      index: newIndex,
      name: '',
      dataType: DEFAULT_DATA_TYPE,
      defaultValue: DEFAULT_BOOL_VALUE,
      comment: '',
    };
    set({ variables: [...variables, newVar], selectedRowId: newVar.id });
  },

  deleteVariable: (id: string) => {
    const { variables } = get();
    const filtered = variables.filter((v) => v.id !== id);
    const reindexed = filtered.map((v, i) => ({ ...v, index: i + 1 }));
    set({
      variables: reindexed,
      selectedRowId: get().selectedRowId === id ? null : get().selectedRowId,
    });
  },

  updateVariable: (id, field, value) => {
    const { variables } = get();
    const variable = variables.find((v) => v.id === id);
    if (!variable) return { success: false, error: 'Variable not found' };

    if (field === 'name') {
      const otherNames = variables
        .filter((v) => v.id !== id)
        .map((v) => v.name);
      const result = validateName(value, otherNames);
      if (!result.valid) {
        return { success: false, error: result.error };
      }
      set({
        variables: variables.map((v) =>
          v.id === id ? { ...v, name: result.normalized! } : v,
        ),
      });
      return { success: true, normalized: result.normalized };
    }

    if (field === 'dataType') {
      const newType = value as DataType;
      if (newType !== 'BOOL' && newType !== 'INT') {
        return { success: false, error: 'Invalid data type' };
      }
      const oldType = variable.dataType;
      set({
        variables: variables.map((v) =>
          v.id === id
            ? {
                ...v,
                dataType: newType,
                defaultValue:
                  oldType !== newType
                    ? getDefaultForType(newType)
                    : v.defaultValue,
              }
            : v,
        ),
      });
      return { success: true, normalized: newType };
    }

    if (field === 'defaultValue') {
      const type = variable.dataType;
      if (type === 'BOOL') {
        const result = validateBoolDefault(value);
        if (!result.valid) {
          return { success: false, error: result.error };
        }
        set({
          variables: variables.map((v) =>
            v.id === id ? { ...v, defaultValue: result.normalized! } : v,
          ),
        });
        return { success: true, normalized: result.normalized };
      }
      // INT
      const result = validateIntDefault(value);
      if (!result.valid) {
        return { success: false, error: result.error };
      }
      set({
        variables: variables.map((v) =>
          v.id === id ? { ...v, defaultValue: result.normalized! } : v,
        ),
      });
      return { success: true, normalized: result.normalized };
    }

    // comment — no validation
    set({
      variables: variables.map((v) =>
        v.id === id ? { ...v, comment: value } : v,
      ),
    });
    return { success: true };
  },

  selectRow: (id) => {
    set({ selectedRowId: id });
  },
}));
