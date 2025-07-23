import React, { useState } from "react";
import "./style.css";

export default function Counter() {
  const [value, setValue] = useState(0);
  const [allValues, setAllValues] = useState([]);
  const [lastElArr, setLastElArr] = useState([]);

  const perfromOp = (num, op) => {
    switch (op) {
      case "+1":
        return num + 1;
      case "-1":
        return num - 1;
      case "*2":
        return num * 2;
      case "/2":
        return num / 2;
      default:
        return num;
    }
  };

  const handleOperation = (op) => {
    const x = perfromOp(value, op);
    setValue(x);
    setAllValues([...allValues, [x, value, op]]);
  };

  const reset = () => {
    setAllValues([]);
  };

  const redo = () => {
    if (!lastElArr.length) return;
    const a = [...lastElArr];
    a.pop();
    const newArr = a;
    setLastElArr([...newArr]);
    setAllValues([...allValues, lastElArr[lastElArr.length - 1]]);
  };

  const undo = () => {
    if (!allValues.length) return;
    const a = [...allValues];
    a.pop();
    const newArr = a;
    setAllValues([...newArr]);
    setLastElArr([...lastElArr, allValues[allValues.length - 1]]);
  };

  return (
    <div>
      <div
        style={{
          width: "100vw",
          display: "flex",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        <button onClick={undo}>Undo</button>
        <button onClick={redo} disabled={!lastElArr.length}>
          Redo
        </button>
        <button onClick={reset}>Reset</button>
      </div>

      <div
        style={{
          width: "100vw",
          display: "flex",
          gap: "5px",
          justifyContent: "center",
        }}
      >
        <button onClick={() => handleOperation("/2")}>/2</button>
        <button onClick={() => handleOperation("-1")}>-1</button>
        {value}
        <button onClick={() => handleOperation("+1")}>+1</button>
        <button onClick={() => handleOperation("*2")}>*2</button>
      </div>

      {allValues.map((row, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            width: "100vw",
            gap: "20px",
            padding: "10px 20px",
            borderBottom:
              index !== allValues.length - 1 ? "1px solid #ccc" : "none",
          }}
        >
          {row?.map((col, colIndex) => (
            <span key={colIndex}>{col}</span>
          ))}
        </div>
      ))}
    </div>
  );
}
