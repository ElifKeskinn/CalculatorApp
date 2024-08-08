import React, { useState, useEffect, useRef } from "react";
import Screen from "./Display";
import Keypad from "./Keys";

export default function Calculator() {
  const [calc, setCalc] = useState("");
  const [calculated, setCalculated] = useState(false);
  const operations = ["/", "*", "+", "-", "."];
  const ref = useRef();

  const updateCalc = (value) => {
    const displayValue = ref.current;

    if ((value === "0" && calc === "0") || 
        (operations.includes(value) && (calc === "" || operations.includes(calc.slice(-1))))) {
      return;
    }

    if (calc.length > 7) displayValue.style.fontSize = "2.5rem";
    if (calc.length >= 11 && !operations.includes(value)) {
      displayValue.style.width = "fit-content";
      displayValue.style.overflow = "hidden";
      return;
    }

    if (calculated) {
      setCalculated(false);
      if (operations.includes(value)) {
        setCalc(prev => prev + value);
        return;
      }
      setCalc(value);
    } else {
      setCalc(prev => prev + value);
    }
  };

  const calculate = () => {
    try {
      setCalc(prev => eval(prev).toString());
      setCalculated(true);
    } catch (error) {
      console.error("Calculation Error:", error);
    }
  };

  const clear = () => {
    setCalc("");
    setCalculated(false);
  };

  const del = () => {
    setCalc(prev => prev.slice(0, -1));
  };

  const handleKeyDown = (e) => {
    const key = e.key;
    if (operations.includes(key) || !isNaN(key)) {
      updateCalc(key);
    } else if (key === "Enter" || key === "=") {
      calculate();
    } else if (key === "Backspace") {
      del();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="app-container">
      <article className="calculator">
        <Screen ref={ref} calc={calc} />
        <Keypad
          updateCalc={updateCalc}
          calculate={calculate}
          del={del}
          clear={clear}
        />
      </article>
    </main>
  );
}
