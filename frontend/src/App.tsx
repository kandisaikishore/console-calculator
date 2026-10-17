import { useCallback, useEffect, useRef, useState } from "react";
import { calculate, formatNumber, type Operator } from "./calculator";

type HistoryItem = { expression: string; result: string; id: number };

const keypad: Array<{ label: string; value: string; kind?: string; aria?: string }> = [
  { label: "AC", value: "clear", kind: "utility", aria: "Clear all" },
  { label: "⌫", value: "backspace", kind: "utility", aria: "Backspace" },
  { label: "%", value: "percent", kind: "utility", aria: "Percent" },
  { label: "÷", value: "÷", kind: "operator", aria: "Divide" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "×", value: "×", kind: "operator", aria: "Multiply" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "−", value: "−", kind: "operator", aria: "Subtract" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "+", value: "+", kind: "operator", aria: "Add" },
  { label: "±", value: "sign", kind: "utility", aria: "Change sign" },
  { label: "0", value: "0" },
  { label: ".", value: ".", kind: "utility", aria: "Decimal point" },
  { label: "=", value: "equals", kind: "equals", aria: "Calculate result" },
];

const isOperator = (value: string): value is Operator =>
  value === "+" || value === "−" || value === "×" || value === "÷";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [error, setError] = useState("");
  const [historyOpen, setHistoryOpen] = useState(false);
  const nextId = useRef(0);

  const clear = useCallback(() => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    setExpression("");
    setError("");
  }, []);

  const inputDigit = useCallback((digit: string) => {
    setError("");
    setDisplay((current) => {
      if (waitingForOperand) return digit;
      if (digit === "." && current.includes(".")) return current;
      if (current === "0" && digit !== ".") return digit;
      if (current === "-0" && digit !== ".") return `-${digit}`;
      if (current === "0" && digit === ".") return "0.";
      return current.length >= 16 ? current : current + digit;
    });
    setWaitingForOperand(false);
  }, [waitingForOperand]);

  const chooseOperator = useCallback((nextOperator: Operator) => {
    setError("");
    const inputValue = Number(display);
    if (storedValue !== null && operator && !waitingForOperand) {
      try {
        const result = calculate(storedValue, inputValue, operator);
        const formatted = formatNumber(result);
        setDisplay(formatted);
        setStoredValue(result);
        setExpression(`${formatted} ${nextOperator}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Calculation failed.");
        return;
      }
    } else {
      setStoredValue(inputValue);
      setExpression(`${display} ${nextOperator}`);
    }
    setOperator(nextOperator);
    setWaitingForOperand(true);
  }, [display, operator, storedValue, waitingForOperand]);

  const equals = useCallback(() => {
    if (storedValue === null || operator === null || waitingForOperand) return;
    try {
      const right = Number(display);
      const result = calculate(storedValue, right, operator);
      const formatted = formatNumber(result);
      const fullExpression = `${formatNumber(storedValue)} ${operator} ${formatNumber(right)}`;
      setExpression(`${fullExpression} =`);
      setHistory((items) => [{ expression: fullExpression, result: formatted, id: nextId.current++ }, ...items].slice(0, 12));
      setDisplay(formatted);
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Calculation failed.");
    }
  }, [display, operator, storedValue, waitingForOperand]);

  const handle = useCallback((value: string) => {
    if (/^\d$/.test(value) || value === ".") {
      inputDigit(value);
      return;
    }
    if (isOperator(value)) {
      chooseOperator(value);
      return;
    }
    if (value === "clear") {
      clear();
      return;
    }
    if (value === "backspace") {
      setError("");
      if (waitingForOperand) return;
      setDisplay((current) => current.length <= 1 || (current.length === 2 && current.startsWith("-")) ? "0" : current.slice(0, -1));
      return;
    }
    if (value === "sign") {
      setError("");
      if (display !== "0") setDisplay((current) => current.startsWith("-") ? current.slice(1) : `-${current}`);
      return;
    }
    if (value === "percent") {
      setError("");
      setDisplay(formatNumber(Number(display) / 100));
      setWaitingForOperand(false);
      return;
    }
    if (value === "equals") equals();
  }, [clear, chooseOperator, display, equals, inputDigit, waitingForOperand]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (/^\d$/.test(event.key) || event.key === ".") {
        event.preventDefault();
        handle(event.key);
      } else if (event.key === "+") handle("+");
      else if (event.key === "-") handle("−");
      else if (event.key === "*") handle("×");
      else if (event.key === "/") {
        event.preventDefault();
        handle("÷");
      } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        handle("equals");
      } else if (event.key === "Backspace") handle("backspace");
      else if (event.key === "Escape") handle("clear");
      else if (event.key === "%") handle("percent");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handle]);

  const useHistoryItem = (item: HistoryItem) => {
    setDisplay(item.result);
    setExpression(item.expression + " =");
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(true);
    setError("");
    setHistoryOpen(false);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Console Calculator home">
          <span className="brand-mark" aria-hidden="true">⌘</span>
          <span>console<span className="brand-highlight">calc</span></span>
        </a>
        <div className="topbar-right">
          <span className="status-dot" aria-hidden="true" />
          <span className="topbar-label">READY TO COMPUTE</span>
          <button className="history-toggle" onClick={() => setHistoryOpen((open) => !open)} aria-expanded={historyOpen}>
            <span aria-hidden="true">◷</span> History <span className="history-count">{history.length}</span>
          </button>
        </div>
      </header>

      <section className="workspace" aria-label="Calculator workspace">
        <div className="intro">
          <p className="eyebrow"><span /> PRECISION TOOLKIT <span className="eyebrow-line" /></p>
          <h1>Think in <span>numbers.</span></h1>
          <p className="intro-copy">A simple space for complex thinking.</p>
        </div>

        <div className="calculator-layout">
          <section className="calculator-card" aria-label="Calculator">
            <div className="card-head">
              <div>
                <span className="mini-label">STANDARD / 01</span>
                <h2>Calculator</h2>
              </div>
              <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
            </div>

            <div className="screen" aria-live="polite" aria-atomic="true">
              <div className="screen-expression">{expression || "READY WHEN YOU ARE"}</div>
              <div className="screen-value" title={display}>{display}</div>
              <div className="screen-bottom"><span>DECIMAL</span><span>FLOAT 64</span></div>
            </div>

            <div className="keypad">
              {keypad.map((key) => (
                <button
                  key={key.value}
                  type="button"
                  className={`key ${key.kind ?? ""} ${operator === key.value && waitingForOperand ? "selected" : ""}`}
                  aria-label={key.aria ?? key.label}
                  onClick={() => handle(key.value)}
                >{key.label}</button>
              ))}
            </div>
            <div className="card-footer"><span>⌨ KEYBOARD ENABLED</span><span>REACT UI <b>●</b></span></div>
            {error && <div className="error-message" role="alert">{error}</div>}
          </section>

          <aside className="side-panel">
            <section className="tip-card">
              <span className="tip-icon" aria-hidden="true">✳</span>
              <p className="mini-label">QUICK GUIDE</p>
              <h3>Less friction.<br />More focus.</h3>
              <p className="tip-copy">Use your keyboard or tap the keys. Your calculations stay clear and easy to follow.</p>
              <div className="keyboard-hints">
                <div><span>ADD</span><kbd>+</kbd></div>
                <div><span>SUBTRACT</span><kbd>−</kbd></div>
                <div><span>MULTIPLY</span><kbd>*</kbd></div>
                <div><span>DIVIDE</span><kbd>/</kbd></div>
                <div><span>CALCULATE</span><kbd>↵</kbd></div>
                <div><span>RESET</span><kbd>Esc</kbd></div>
              </div>
            </section>
            <section className="history-card">
              <div className="side-card-heading"><p className="mini-label">YOUR WORKSPACE</p><span>↗</span></div>
              <h3>Calculation log</h3>
              {history.length === 0 ? (
                <div className="empty-history"><span>∑</span><p>Your recent calculations<br />will appear here.</p></div>
              ) : (
                <div className="history-list">
                  {history.slice(0, 3).map((item) => (
                    <button className="history-item" key={item.id} onClick={() => useHistoryItem(item)}>
                      <span>{item.expression}</span><strong>{item.result}</strong>
                    </button>
                  ))}
                </div>
              )}
              <button className="text-button" onClick={() => setHistoryOpen(true)}>View full history <span>→</span></button>
            </section>
          </aside>
        </div>
        <footer className="page-footer"><span>BUILT FOR CLARITY.</span><span>SMALL STEPS. BIG IDEAS. <b>© 2026</b></span></footer>
      </section>

      {historyOpen && (
        <div className="modal-backdrop" role="presentation" onClick={() => setHistoryOpen(false)}>
          <section className="history-modal" role="dialog" aria-modal="true" aria-labelledby="history-title" onClick={(event) => event.stopPropagation()}>
            <div className="modal-heading"><div><p className="mini-label">YOUR WORKSPACE</p><h2 id="history-title">Calculation history</h2></div><button aria-label="Close history" onClick={() => setHistoryOpen(false)}>×</button></div>
            {history.length === 0 ? <p className="modal-empty">No calculations yet. Complete a calculation to see it here.</p> : (
              <div className="modal-history-list">{history.map((item) => (
                <button className="modal-history-item" key={item.id} onClick={() => useHistoryItem(item)}>
                  <span>{item.expression}</span><strong>{item.result}</strong>
                </button>
              ))}</div>
            )}
            {history.length > 0 && <button className="clear-history" onClick={() => setHistory([])}>Clear history</button>}
          </section>
        </div>
      )}
    </main>
  );
}
