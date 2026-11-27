import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.PrintStream;
import java.nio.charset.StandardCharsets;

public class CalculatorTest {
    private static void check(boolean condition, String message) {
        if (!condition) {
            throw new AssertionError(message);
        }
    }

    private static void checkClose(double actual, double expected, String message) {
        check(Math.abs(actual - expected) < 1.0e-9, message + ": expected " + expected + ", got " + actual);
    }

    private static void testInteractiveInputRecovery() throws Exception {
        InputStream originalIn = System.in;
        PrintStream originalOut = System.out;
        ByteArrayOutputStream captured = new ByteArrayOutputStream();
        String input = String.join("\n",
            "not-a-choice",
            "9",
            "1",
            "oops",
            "-2.5",
            "3.5",
            "4",
            "8",
            "0",
            "5",
            ""
        );

        try {
            System.setIn(new ByteArrayInputStream(input.getBytes(StandardCharsets.UTF_8)));
            System.setOut(new PrintStream(captured, true, StandardCharsets.UTF_8));
            Calculator.main(new String[0]);
        } finally {
            System.setIn(originalIn);
            System.setOut(originalOut);
        }

        String output = captured.toString(StandardCharsets.UTF_8);
        check(output.contains("Invalid choice."), "invalid menu input should be recoverable");
        check(output.contains("Invalid number."), "invalid numeric input should be recoverable");
        check(output.contains("Result = 1.0"), "decimal and negative input should calculate correctly");
        check(output.contains("Error: Cannot divide by zero."), "division by zero should be reported");
        check(output.contains("Goodbye!"), "exit should terminate cleanly");
    }

    public static void main(String[] args) throws Exception {
        checkClose(Calculator.add(2, 3), 5, "positive addition");
        checkClose(Calculator.add(-2.5, 1.5), -1, "negative decimal addition");
        checkClose(Calculator.subtract(7, 2), 5, "subtraction");
        checkClose(Calculator.subtract(-4, -2), -2, "negative subtraction");
        checkClose(Calculator.multiply(4, 3), 12, "multiplication");
        checkClose(Calculator.multiply(-2.5, 4), -10, "negative decimal multiplication");
        checkClose(Calculator.divide(8, 2), 4, "division");
        checkClose(Calculator.divide(-9, 2), -4.5, "negative decimal division");
        check(Double.isNaN(Calculator.divide(8, 0)), "positive zero division");
        check(Double.isNaN(Calculator.divide(8, -0.0d)), "negative zero division");
        testInteractiveInputRecovery();

        System.out.println("Calculator tests passed");
    }
}
