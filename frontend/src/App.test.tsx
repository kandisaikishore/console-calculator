import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Calculator UI", () => {
  it("renders the keypad and performs addition", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "Add" }));
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    fireEvent.click(screen.getByRole("button", { name: "Calculate result" }));
    expect(screen.getByText("5", { selector: ".screen-value" })).toBeInTheDocument();
    expect(screen.getByText("2 + 3 =", { selector: ".screen-expression" })).toBeInTheDocument();
  });

  it("shows an accessible error on division by zero and can recover", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "8" }));
    fireEvent.click(screen.getByRole("button", { name: "Divide" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "Calculate result" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Cannot divide by zero");
    fireEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByText("0", { selector: ".screen-value" })).toBeInTheDocument();
  });

  it("saves completed calculations and displays full history", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "6" }));
    fireEvent.click(screen.getByRole("button", { name: "Multiply" }));
    fireEvent.click(screen.getByRole("button", { name: "7" }));
    fireEvent.click(screen.getByRole("button", { name: "Calculate result" }));
    fireEvent.click(screen.getByRole("button", { name: /History/ }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("6 × 7")).toBeInTheDocument();
    expect(within(dialog).getByText("42")).toBeInTheDocument();
  });

  it("supports backspace, sign and percent", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "1" }));
    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "Backspace" }));
    expect(screen.getByText("1", { selector: ".screen-value" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Change sign" }));
    expect(screen.getByText("-1", { selector: ".screen-value" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Percent" }));
    expect(screen.getByText("-0.01", { selector: ".screen-value" })).toBeInTheDocument();
  });
});
