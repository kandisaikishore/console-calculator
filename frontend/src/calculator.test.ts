import { describe, expect, it } from "vitest";
import { calculate, formatNumber } from "./calculator";

describe("calculate", () => {
  it("adds positive and negative numbers", () => {
    expect(calculate(2, 3, "+")).toBe(5);
    expect(calculate(-2, 3, "+")).toBe(1);
  });

  it("subtracts, multiplies, and divides", () => {
    expect(calculate(7, 2, "−")).toBe(5);
    expect(calculate(4, -3, "×")).toBe(-12);
    expect(calculate(8, 2, "÷")).toBe(4);
  });

  it("rejects division by zero", () => {
    expect(() => calculate(8, 0, "÷")).toThrow("Cannot divide by zero.");
  });

  it("rejects non-finite inputs and overflow", () => {
    expect(() => calculate(Number.NaN, 1, "+")).toThrow("finite numbers");
    expect(() => calculate(Number.MAX_VALUE, 2, "×")).toThrow("numeric range");
  });

  it("normalizes negative zero and formats results", () => {
    expect(calculate(-0, -0, "+")).toBe(0);
    expect(formatNumber(0.1 + 0.2)).toBe("0.3");
    expect(formatNumber(1 / 3)).toBe("0.333333333333");
  });
});
