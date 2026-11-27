import java.util.Scanner;

public class Calculator {

    public static double add(double a, double b) {
        return a + b;
    }

    public static double subtract(double a, double b) {
        return a - b;
    }

    public static double multiply(double a, double b) {
        return a * b;
    }

    /**
     * Returns NaN for a zero divisor. The caller is responsible for presenting
     * the error so this method remains deterministic and side-effect free.
     */
    public static double divide(double a, double b) {
        if (b == 0.0d) {
            return Double.NaN;
        }
        return a / b;
    }

    private static Integer readChoice(Scanner scanner) {
        while (true) {
            System.out.print("Enter choice (1-5): ");
            if (!scanner.hasNextLine()) {
                return null;
            }

            String input = scanner.nextLine().trim();
            try {
                int choice = Integer.parseInt(input);
                if (choice >= 1 && choice <= 5) {
                    return choice;
                }
            } catch (NumberFormatException ignored) {
                // Report invalid input below and allow the user to retry.
            }
            System.out.println("Invalid choice. Enter a number from 1 to 5.");
        }
    }

    private static Double readNumber(Scanner scanner, String prompt) {
        while (true) {
            System.out.print(prompt);
            if (!scanner.hasNextLine()) {
                return null;
            }

            String input = scanner.nextLine().trim();
            try {
                double value = Double.parseDouble(input);
                if (Double.isFinite(value)) {
                    return value;
                }
            } catch (NumberFormatException ignored) {
                // Report invalid input below and allow the user to retry.
            }
            System.out.println("Invalid number. Enter a finite numeric value.");
        }
    }

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.println("=== Java Console Calculator ===");

            while (true) {
                System.out.println("\nChoose an operation:");
                System.out.println("1. Addition");
                System.out.println("2. Subtraction");
                System.out.println("3. Multiplication");
                System.out.println("4. Division");
                System.out.println("5. Exit");

                Integer choice = readChoice(scanner);
                if (choice == null || choice == 5) {
                    System.out.println("Exiting Calculator. Goodbye!");
                    return;
                }

                Double first = readNumber(scanner, "Enter first number: ");
                if (first == null) {
                    System.out.println("\nInput ended. Goodbye!");
                    return;
                }

                Double second = readNumber(scanner, "Enter second number: ");
                if (second == null) {
                    System.out.println("\nInput ended. Goodbye!");
                    return;
                }

                double result;
                switch (choice) {
                    case 1:
                        result = add(first, second);
                        break;
                    case 2:
                        result = subtract(first, second);
                        break;
                    case 3:
                        result = multiply(first, second);
                        break;
                    case 4:
                        result = divide(first, second);
                        break;
                    default:
                        // readChoice guarantees this cannot happen.
                        throw new IllegalStateException("Unsupported operation");
                }

                if (Double.isNaN(result)) {
                    System.out.println("Error: Cannot divide by zero.");
                } else if (!Double.isFinite(result)) {
                    System.out.println("Error: Result is outside the supported numeric range.");
                } else {
                    System.out.println("Result = " + result);
                }
            }
        }
    }
}
