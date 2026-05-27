import { useState, useCallback } from 'react';

export function useEditing() {
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    columnKey: string;
  } | null>(null);

  const isEditing = useCallback(
    (rowId: string, columnKey: string) =>
      editingCell?.rowId === rowId && editingCell?.columnKey === columnKey,
    [editingCell],
  );

  const startEdit = useCallback(
    (rowId: string, columnKey: string) => setEditingCell({ rowId, columnKey }),
    [],
  );

  const stopEdit = useCallback(() => setEditingCell(null), []);

  return { editingCell, isEditing, startEdit, stopEdit };
}
