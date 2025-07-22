import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export default function TrafficLights() {
  const lightsArr = [
    {
      id: 0,
      color: 'red',
      time: '4000',
    },
    {
      id: 1,
      color: 'yellow',
      time: '500',
    },
    {
      id: 2,
      color: 'green',
      time: '3000',
    },
  ];

  const [active, setActive] = useState(lightsArr[0]);
  let timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setActive((prev) => {
        let prevId = prev?.id;
        let nextId = (prevId + 1) % 3;
        return lightsArr.find((a) => a.id === nextId);
      });
    }, active?.time);
    return () => clearTimeout(timer.current);
  }, [active]);

  return (
    <div>
      {lightsArr.map((a) => {
        return (
          <div
            key={a.id}
            style={{
              display: 'flex',
              height: '100px',
              width: '100px',
              borderRadius: '50%',
              border: '1px solid black',
              backgroundColor: a.id === active?.id ? a.color : 'grey',
            }}
          ></div>
        );
      })}
    </div>
  );
}
