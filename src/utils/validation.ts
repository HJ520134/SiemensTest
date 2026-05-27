import type { DataType, ValidationResult } from '../types/variable';
import { ERROR_MSGS, INT_MAX, INT_MIN } from '../constants';

export function validateName(
  name: string,
  existingNames: string[],
  currentName?: string,
): ValidationResult {
  if (!name.trim()) {
    return { valid: false, error: ERROR_MSGS.NAME_EMPTY };
  }

  const lowerName = name.trim().toLowerCase();
  const isDuplicate = existingNames.some(
    (existing) =>
      existing.toLowerCase() === lowerName &&
      existing !== currentName,
  );

  if (isDuplicate) {
    return { valid: false, error: ERROR_MSGS.NAME_DUPLICATE };
  }

  return { valid: true, normalized: name.trim() };
}

export function validateDataType(value: string): value is DataType {
  return value === 'BOOL' || value === 'INT';
}

export function validateBoolDefault(value: string): ValidationResult {
  const upper = value.trim().toUpperCase();
  if (upper === 'TRUE' || upper === 'FALSE') {
    return { valid: true, normalized: upper };
  }
  return { valid: false, error: ERROR_MSGS.BOOL_INVALID };
}

export function validateIntDefault(value: string): ValidationResult {
  const trimmed = value.trim();
  if (!/^-?\d+$/.test(trimmed)) {
    return { valid: false, error: ERROR_MSGS.INT_INVALID };
  }

  const num = Number(trimmed);
  if (!Number.isSafeInteger(num) || num < INT_MIN || num > INT_MAX) {
    return { valid: false, error: ERROR_MSGS.INT_RANGE };
  }

  return { valid: true, normalized: String(num) };
}
