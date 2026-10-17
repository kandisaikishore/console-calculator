export type Operator = "+" | "−" | "×" | "÷";

export function calculate(left: number, right: number, operator: Operator): number {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error("Enter valid finite numbers.");
  }

  let result: number;
  switch (operator) {
    case "+":
      result = left + right;
      break;
    case "−":
      result = left - right;
      break;
    case "×":
      result = left * right;
      break;
    case "÷":
      if (right === 0) throw new Error("Cannot divide by zero.");
      result = left / right;
      break;
    default: {
      const exhaustiveCheck: never = operator;
      throw new Error(`Unsupported operation: ${exhaustiveCheck}`);
    }
  }

  if (!Number.isFinite(result)) throw new Error("The result is outside the supported numeric range.");
  return Object.is(result, -0) ? 0 : result;
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "Error";
  return Number(value.toPrecision(12)).toString();
}
