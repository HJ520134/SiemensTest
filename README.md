# Variable Table Editor

A simplified variable table editor built with React + TypeScript — interview project.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── main.tsx                          # Entry point
├── App.tsx                           # Root component
├── App.module.css
├── index.css                         # Global reset styles
├── types/
│   └── variable.ts                   # DataType, Variable, ValidationResult interfaces
├── constants/
│   └── index.ts                      # Defaults, limits, error messages, column definitions
├── utils/
│   └── validation.ts                 # Pure validation functions (name, BOOL, INT)
├── store/
│   └── useVariableStore.ts           # Zustand store — all state and actions
├── hooks/
│   └── useEditing.ts                 # Track which cell is currently being edited
└── components/
    ├── TableEditor/
    │   ├── TableEditor.tsx           # Page layout: title + toolbar + table
    │   └── TableEditor.module.css
    ├── Toolbar/
    │   ├── Toolbar.tsx               # Add Row / Delete Row buttons
    │   └── Toolbar.module.css
    ├── VariableTable/
    │   ├── VariableTable.tsx         # Table with headers and data rows
    │   └── VariableTable.module.css
    └── EditableCell/
        ├── EditableCell.tsx          # Cell renderer: view mode vs edit mode
        └── EditableCell.module.css
```

## Architecture

- **State management**: Zustand — all variables live in a single store with actions for add/delete/update/select
- **Validation**: Pure functions in `utils/validation.ts` — no React dependency, easily testable
- **Editing**: Double-click to edit, Enter/blur to commit, Escape to cancel
- **Styling**: CSS Modules — scoped styles, no framework dependency

## Features

- Display variable table: Index, Name, Data Type, Default Value, Comment
- Add rows (auto-indexed)
- Delete selected rows (auto re-index)
- Inline cell editing with validation:
  - **Name**: required, case-insensitive unique
  - **Data Type**: BOOL / INT dropdown (double-click to edit)
  - **BOOL default**: TRUE / FALSE (case-insensitive, normalized to uppercase)
  - **INT default**: integer in [-2147483648, 2147483647]
  - **Comment**: free text, can be empty
- Data type switch auto-resets default value (BOOL→TRUE, INT→0)
