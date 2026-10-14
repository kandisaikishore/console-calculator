# Console Calculator

[![Java](https://img.shields.io/badge/Java-CLI-orange?logo=openjdk)](https://www.java.com/) [![Repository](https://img.shields.io/badge/GitHub-Source-181717?logo=github)](https://github.com/kandisaikishore/console-calculator) [![Last Commit](https://img.shields.io/github/last-commit/kandisaikishore/console-calculator)](https://github.com/kandisaikishore/console-calculator/commits/main)

A small console-based calculator project for practising Java fundamentals, user input, arithmetic logic, and error handling.

## Project goals

- Perform supported arithmetic operations from a terminal interface
- Practise control flow, methods, and numeric input
- Keep calculations simple to understand and extend
- Exercise calculation behaviour with the test source included in the repository

## Tech stack

- Java / JDK
- Command-line interface

## Prerequisites

Install a JDK and verify that `java` and `javac` work in your terminal.

## Get the code

```bash
git clone https://github.com/kandisaikishore/console-calculator.git
cd console-calculator
```

Inspect the Java files to identify the main class and compile command. For a project with Java files in the default package, the general pattern is:

```bash
javac *.java
java Main
```

Replace `Main` with the actual entry-point class. If tests require a framework or separate command, follow the configuration checked into the repository.

## Testing and edge cases

Consider verifying zero values, negative numbers, decimal input, invalid input, and division by zero. Run the available test files after changing calculation logic.

## Ideas to extend

- Add a clear menu and repeat-calculation loop
- Improve input validation and error messages
- Add calculation history or scientific operations
- Add automated tests for normal and boundary cases

## Contributing

Small, well-scoped contributions are welcome. Include reproduction steps and the checks you ran.

## License

No license file is currently declared. Add a `LICENSE` file to define reuse terms.
