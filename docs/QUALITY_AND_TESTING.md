# Calculator QA and Development Guide

This repository has two independent interfaces: a Java console calculator under `console calculator/` and a React frontend under `frontend/`. Test them separately and do not assume they share calculation state.

## React frontend

```bash
cd frontend
npm install
npm test
npm run build
```

The frontend provides a responsive calculator with keyboard support and a history panel. Test button and keyboard input, expression validation, result display, history behavior, and responsive layout.

## Java console application

From the repository root:

```bash
javac "console calculator/Calculator.java" CalculatorTest.java
```

Follow the README's remaining run instructions or the actual class/package declaration to execute the test and application. Keep the Java CLI and React frontend checks distinct.

## Arithmetic test matrix

For both implementations, cover addition, subtraction, multiplication, division, negative values, decimals, large values, invalid input, and division by zero. Verify operator precedence or sequential-operation behavior according to the implemented interface. Ensure invalid operations do not corrupt the displayed result or history.

## Pull-request checklist

- [ ] Run `npm test` and `npm run build` for frontend changes.
- [ ] Compile and run the Java checks for console changes.
- [ ] Add regression tests for the reported edge case.
- [ ] Check keyboard support and accessible labels in the UI.
- [ ] Report exact commands and any unavailable checks.
