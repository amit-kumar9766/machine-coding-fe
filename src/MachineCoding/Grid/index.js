import React, { useState, useRef, useEffect } from 'react';
import './style.css';

export default function App() {
  const [arr, _] = useState(Array.from({ length: 9 }).fill(0));
  const [colored, setColored] = useState([]);
  let timerRef = useRef(null);

  const handleClick = (i) => {
    if (colored.includes(i)) return;
    const newArr = [...colored, i];
    setColored([...colored, i]);
    if (arr.length === newArr.length) {
      timerRef.current = setInterval(() => {
        setColored((prev) => {
          const a = [...prev];
          a.pop();
          if (a.length === 0) {
            clearInterval(timerRef.current);
          }
          return a;
        });
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="container">
      {arr.map((_, index) => {
        return (
          <div
            key={index}
            className="box"
            onClick={() => handleClick(index)}
            style={{ backgroundColor: colored.includes(index) ? 'green' : '' }}
          ></div>
        );
      })}
    </div>
  );
}
