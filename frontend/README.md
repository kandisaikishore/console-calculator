# Console Calculator — React frontend

A responsive calculator UI built with React, TypeScript, and Vite. The original Java console app remains in `console calculator/` and continues to work independently.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

From the repository root:

```bash
cd frontend
npm install
npm run dev
```

Vite prints the local URL (normally `http://localhost:5173`).

## Build and test

```bash
npm test
npm run build
npm run preview
```

## Features

- Addition, subtraction, multiplication, and division
- Decimal, sign toggle, percent, backspace, and clear
- Keyboard shortcuts: digits and decimal point, `+`, `-`, `*`, `/`, `Enter`/ `=`, `Backspace`, `Esc`, and `%`
- Calculation history with the ability to reuse previous results
- Responsive layout, accessible button labels, visible divide-by-zero errors, and reduced-motion support

The UI calculation logic is implemented locally in `src/calculator.ts`; it does not currently call a backend API.
