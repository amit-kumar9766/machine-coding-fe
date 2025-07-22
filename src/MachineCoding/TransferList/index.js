import React, { useState } from 'react';
import './style.css';

const arra = [
  { id: 1, name: 'HTML' },
  { id: 2, name: 'JavaScript' },
  { id: 3, name: 'CSS' },
  {
    id: 4,
    name: 'TypeScript',
  },
];

const arrb = [
  { id: 5, name: 'React' },
  { id: 6, name: 'Angular' },
  { id: 7, name: 'Vue' },
  {
    id: 8,
    name: 'Stelve',
  },
];

export default function App() {
  const [arr1, setArr1] = useState(arra);
  const [arr2, setArr2] = useState(arrb);
  const [selected, setSelected] = useState([]);

  const handleSelected = (item, side) => {
    const isSelected = selected.some((s) => s.id === item.id);

    if (isSelected) {
      setSelected(selected.filter((s) => s.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };

  const rightTransfer = () => {
    const ids = selected.map((a) => a.id);
    const newArr1 = arr1.filter((a) => !ids.includes(a.id));
    setArr1([...newArr1]);
    const combined = [...arr2, ...selected];
    const uniqueById = Array.from(
      new Map(combined.map((item) => [item.id, item])).values()
    );
    setArr2(uniqueById);
  };

  const totalRightTransfer = () => {
    setArr1([]);
    setArr2([...arr2, ...arr1]);
  };

  const leftTransfer = () => {
    const ids = selected.map((a) => a.id);
    const newArr2 = arr2.filter((a) => !ids.includes(a.id));
    setArr2([...newArr2]);
    const combined = [...arr1, ...selected];
    const uniqueById = Array.from(
      new Map(combined.map((item) => [item.id, item])).values()
    );
    setArr1(uniqueById);
  };

  const totalLeftTransfer = () => {
    setArr2([]);
    setArr1([...arr2, ...arr1]);
  };

  const checked = (id) => {
    const ids = [...selected].map((a) => a.id);
    return ids.includes(id);
  };

  return (
    <div style={{ width: '100%', display: 'flex', gap: '100px' }}>
      <div>
        {arr1.map((item) => {
          return (
            <div key={item?.id}>
              <input
                type="checkbox"
                id={item?.id}
                name={item?.id}
                onChange={() => handleSelected(item, 'left')}
                checked={checked(item?.id)}
              />
              <label htmlFor={item?.id}> {item?.name}</label>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={totalLeftTransfer}>{'<<'}</button>
        <button onClick={leftTransfer}>{'<'}</button>
        <button onClick={rightTransfer}>{'>'}</button>
        <button onClick={totalRightTransfer}>{'>>'}</button>
      </div>

      <div>
        {arr2.map((item) => {
          return (
            <div key={item?.id}>
              <input
                type="checkbox"
                id={item?.id}
                name={item?.id}
                onChange={() => handleSelected(item, 'right')}
                checked={checked(item?.id)}
              />
              <label htmlFor={item?.id}> {item?.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
