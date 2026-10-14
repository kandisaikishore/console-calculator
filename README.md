# Console Calculator

[![Java](https://img.shields.io/badge/Java-CLI-orange?logo=openjdk)](https://www.java.com/) [![Source](https://img.shields.io/badge/Source-GitHub-181717?logo=github)](https://github.com/kandisaikishore/console-calculator)

A lightweight Java command-line calculator for practising arithmetic operations, console input handling, and defensive programming. The implementation lives in the `console calculator/` directory.

## Highlights

- Calculate using the operations supported by the current implementation
- Interact through a terminal-based interface
- Practise Java methods, branching, input parsing, and error handling
- Includes a smoke-test source at `CalculatorTest.java`

## Technology

- Java / JDK
- Command-line interface

## Run locally

Install a JDK, then compile and run the calculator from the repository root:

```bash
git clone https://github.com/kandisaikishore/console-calculator.git
cd console-calculator
javac "console calculator/Calculator.java"
```

Run the entry-point class declared in `Calculator.java`. If the file declares a package, compile from the appropriate directory and use its fully qualified class name.

## Validation checklist

Test normal arithmetic inputs, negative values, decimals if supported, invalid input, and division by zero. Re-run the available test source after changing calculation logic.

## Potential improvements

- Consistent input validation and helpful error messages
- Automated tests for arithmetic edge cases
- A calculation history or additional operations
- A documented build command that works across operating systems

## Contributing

Open issues with reproduction steps and expected behaviour. Include the checks performed with each pull request.

## License

No license file is currently declared. Add a `LICENSE` file to define reuse and redistribution terms.
