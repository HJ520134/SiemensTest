import type { DataType } from '../types/variable';

export const DEFAULT_DATA_TYPE: DataType = 'BOOL';
export const DEFAULT_BOOL_VALUE = 'TRUE';
export const DEFAULT_INT_VALUE = '0';

export const INT_MIN = -2147483648;
export const INT_MAX = 2147483647;

export const ERROR_MSGS = {
  NAME_EMPTY: 'Name cannot be empty',
  NAME_DUPLICATE: 'Name already exists',
  BOOL_INVALID: 'BOOL value must be TRUE or FALSE',
  INT_INVALID: 'INT value must be a valid integer',
  INT_RANGE: `INT value must be between ${INT_MIN} and ${INT_MAX}`,
} as const;

export const COLUMNS = [
  { key: 'index', label: 'Index', editable: false },
  { key: 'name', label: 'Name', editable: true },
  { key: 'dataType', label: 'Data Type', editable: true },
  { key: 'defaultValue', label: 'Default Value', editable: true },
  { key: 'comment', label: 'Comment', editable: true },
] as const;
