public class CalculatorTest {
    static void check(boolean condition, String message) {
        if (!condition) throw new AssertionError(message);
    }

    public static void main(String[] args) {
        check(Calculator.add(2, 3) == 5, "add");
        check(Calculator.subtract(7, 2) == 5, "subtract");
        check(Calculator.multiply(4, 3) == 12, "multiply");
        check(Calculator.divide(8, 2) == 4, "divide");
        check(Double.isNaN(Calculator.divide(8, 0)), "zero division");
        check(Double.isInfinite(Calculator.divide(Double.MAX_VALUE, 0.5)), "division overflow is surfaced");
        System.out.println("Calculator tests passed");
    }
}
