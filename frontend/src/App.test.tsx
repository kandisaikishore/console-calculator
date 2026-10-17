import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

const key = (name: string) =>
  screen.getByRole("button", { name, selector: ".key" } as never);

describe("Calculator UI", () => {
  it("renders the keypad and performs addition", () => {
    render(<App />);
    fireEvent.click(key("2"));
    fireEvent.click(key("Add"));
    fireEvent.click(key("3"));
    fireEvent.click(key("Calculate result"));
    expect(screen.getByText("5", { selector: ".screen-value" })).toBeInTheDocument();
    expect(screen.getByText("2 + 3 =", { selector: ".screen-expression" })).toBeInTheDocument();
  });

  it("shows an accessible error on division by zero and can recover", () => {
    render(<App />);
    fireEvent.click(key("8"));
    fireEvent.click(key("Divide"));
    fireEvent.click(key("0"));
    fireEvent.click(key("Calculate result"));
    expect(screen.getByRole("alert")).toHaveTextContent("Cannot divide by zero");
    fireEvent.click(key("Clear all"));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("0", { selector: ".screen-value" })).toBeInTheDocument();
  });

  it("saves completed calculations and displays full history", () => {
    render(<App />);
    fireEvent.click(key("6"));
    fireEvent.click(key("Multiply"));
    fireEvent.click(key("7"));
    fireEvent.click(key("Calculate result"));
    fireEvent.click(screen.getByRole("button", { name: /History/ }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("6 × 7")).toBeInTheDocument();
    expect(within(dialog).getByText("42")).toBeInTheDocument();
  });

  it("supports backspace, sign and percent", () => {
    render(<App />);
    fireEvent.click(key("1"));
    fireEvent.click(key("2"));
    fireEvent.click(key("Backspace"));
    expect(screen.getByText("1", { selector: ".screen-value" })).toBeInTheDocument();
    fireEvent.click(key("Change sign"));
    expect(screen.getByText("-1", { selector: ".screen-value" })).toBeInTheDocument();
    fireEvent.click(key("Percent"));
    expect(screen.getByText("-0.01", { selector: ".screen-value" })).toBeInTheDocument();
  });
});
