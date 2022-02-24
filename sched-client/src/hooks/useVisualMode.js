import { useState } from "react";

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      let newHistory = history;
      newHistory.pop();
      setHistory([...newHistory, newMode]);
    } else {
      setMode(newMode);
      let newHistory = history;
      setHistory([...newHistory, newMode]);
    }
  }

  function back() {
    if (mode !== initial) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { back, mode, transition };
}
