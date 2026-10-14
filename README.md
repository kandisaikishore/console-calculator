# Console Calculator

[![Java](https://img.shields.io/badge/Java-CLI-orange?logo=openjdk)](https://www.java.com/) [![Repository](https://img.shields.io/badge/GitHub-Source-181717?logo=github)](https://github.com/kandisaikishore/console-calculator) [![Last Commit](https://img.shields.io/github/last-commit/kandisaikishore/console-calculator)](https://github.com/kandisaikishore/console-calculator/commits/main)

A Java command-line calculator for practising arithmetic, console input, control flow, and error handling. The main implementation is located in `console calculator/Calculator.java`.

## Features

- Perform the arithmetic operations supported by the current calculator
- Interact through a terminal-based interface
- Practise Java methods, input parsing, and conditional logic
- Find a simple smoke-test source in `CalculatorTest.java`

## Tech stack

- Java / JDK
- Command-line interface

## Prerequisites

Install a JDK and verify that `java` and `javac` are available in your terminal.

## Run locally

```bash
git clone https://github.com/kandisaikishore/console-calculator.git
cd console-calculator
javac "console calculator/Calculator.java"
```

Run the class using its declared package/class name. If you are using an IDE, open the project folder and run the main method in `Calculator.java`. Check the source for the exact entry-point class and any input prompts.

## Validation checklist

Try valid integers and decimals, negative numbers, invalid text, zero, and division by zero. Re-run the available tests after changing calculation behaviour.

## Improvements to consider

- Improve invalid-input messages
- Handle division by zero consistently
- Add tests for boundary conditions
- Support a calculation history or additional operations

## Contributing

Open an issue with reproduction steps or send a focused pull request with verification details.

## License

No license file is currently declared. Add a `LICENSE` file to define reuse terms.
