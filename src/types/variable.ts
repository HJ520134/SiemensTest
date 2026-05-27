export type DataType = 'BOOL' | 'INT';

export interface Variable {
  id: string;
  index: number;
  name: string;
  dataType: DataType;
  defaultValue: string;
  comment: string;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  normalized?: string;
}
