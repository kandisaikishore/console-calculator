# Console Calculator

[![Java](https://img.shields.io/badge/Java-CLI-orange?logo=openjdk)](https://www.java.com/) [![React](https://img.shields.io/badge/React-Frontend-149eca?logo=react)](https://react.dev/) [![Source](https://img.shields.io/badge/Source-GitHub-181717?logo=github)](https://github.com/kandisaikishore/console-calculator)

A small calculator project with two independent interfaces: a Java command-line calculator and a modern React web frontend.

## Projects

### Java console application

The original implementation is in `console calculator/Calculator.java`. It provides addition, subtraction, multiplication, and division with divide-by-zero handling.

Compile from the repository root:

```bash
javac "console calculator/Calculator.java" CalculatorTest.java
java -cp ".:console calculator" CalculatorTest
```

On Windows Command Prompt, use a semicolon in the classpath:

```bat
java -cp ".;console calculator" CalculatorTest
```

### React frontend

The React app is in `frontend/` and uses React, TypeScript, and Vite.

```bash
cd frontend
npm install
npm run dev
```

Run frontend tests and create a production build:

```bash
npm test
npm run build
```

See [frontend/README.md](frontend/README.md) for requirements and features.

## Validation

- Java smoke tests: compile the Java implementation and execute `CalculatorTest`.
- React unit and UI tests: `cd frontend && npm test`.
- React production build/type check: `cd frontend && npm run build`.

GitHub Actions runs the existing Java workflow. The frontend workflow also builds and tests the React app on push and pull requests.
