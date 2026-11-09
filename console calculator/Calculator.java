import java.util.Scanner;

public class Calculator {

    public static double add(double a, double b) { return a + b; }
    public static double subtract(double a, double b) { return a - b; }
    public static double multiply(double a, double b) { return a * b; }

    public static double divide(double a, double b) {
        if (b == 0) {
            System.out.println("Error: Cannot divide by zero!");
            return Double.NaN;
        }
        return a / b;
    }

    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.println("=== Java Console Calculator ===");
            while (true) {
                System.out.println("\nChoose an operation:");
                System.out.println("1. Addition");
                System.out.println("2. Subtraction");
                System.out.println("3. Multiplication");
                System.out.println("4. Division");
                System.out.println("5. Exit");
                System.out.print("Enter choice (1-5): ");

                if (!sc.hasNextLine()) {
                    System.out.println("\nInput closed. Exiting Calculator.");
                    return;
                }
                String choiceText = sc.nextLine().trim();
                final int choice;
                try {
                    choice = Integer.parseInt(choiceText);
                } catch (NumberFormatException ex) {
                    System.out.println("Invalid choice. Enter a number from 1 to 5.");
                    continue;
                }

                if (choice == 5) {
                    System.out.println("Exiting Calculator. Goodbye!");
                    return;
                }
                if (choice < 1 || choice > 4) {
                    System.out.println("Invalid choice. Enter a number from 1 to 5.");
                    continue;
                }

                Double num1 = readFiniteNumber(sc, "Enter first number: ");
                if (num1 == null) return;
                Double num2 = readFiniteNumber(sc, "Enter second number: ");
                if (num2 == null) return;

                double result;
                switch (choice) {
                    case 1: result = add(num1, num2); break;
                    case 2: result = subtract(num1, num2); break;
                    case 3: result = multiply(num1, num2); break;
                    case 4: result = divide(num1, num2); break;
                    default: throw new IllegalStateException("Validated operation was out of range");
                }

                if (Double.isNaN(result)) continue;
                if (Double.isInfinite(result)) {
                    System.out.println("Error: Result is outside the supported numeric range.");
                } else {
                    System.out.println("Result = " + result);
                }
            }
        }
    }

    private static Double readFiniteNumber(Scanner sc, String prompt) {
        while (true) {
            System.out.print(prompt);
            if (!sc.hasNextLine()) {
                System.out.println("\nInput closed. Exiting Calculator.");
                return null;
            }
            String text = sc.nextLine().trim();
            try {
                double value = Double.parseDouble(text);
                if (!Double.isFinite(value)) {
                    System.out.println("Invalid number. Enter a finite numeric value.");
                    continue;
                }
                return value;
            } catch (NumberFormatException ex) {
                System.out.println("Invalid number. Try again (for example, 12 or -3.5).");
            }
        }
    }
}
