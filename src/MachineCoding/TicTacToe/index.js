import React, { useState } from "react";
import "./style.css";

const winnerArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  const [arr, setArr] = useState(Array.from({ length: 9 }).fill());
  const [presentPlayer, setPresentPlayer] = useState("X");
  const [winner, setWinner] = useState();

  const winnerLogic = (array) => {
    for (let i = 0; i < winnerArr.length; i++) {
      if (
        winnerArr[i].every((a) => {
          return array[a] === "X";
        })
      ) {
        return "X";
      } else if (
        winnerArr[i].every((a) => {
          return array[a] === "0";
        })
      ) {
        return "0";
      }
    }
  };

  const reset = () => {
    setArr(Array.from({ length: 9 }).fill());
    setWinner();
  };

  const handleClick = (index) => {
    const newItems = [...arr];
    newItems[index] = presentPlayer;
    setArr([...newItems]);
    setPresentPlayer((prev) => (prev == "X" ? "0" : "X"));
    const result = winnerLogic(newItems);
    if (result === "X") {
      setWinner("X");
    }
    if (result === "0") {
      setWinner("0");
    }
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      {winner ? <div>Winner:{winner}</div> : ""}
      {!winner ? <div>Next Player:{presentPlayer}</div> : ""}
      <div className="board">
        {arr.map((a, index) => {
          return (
            <div
              className="square"
              key={index}
              onClick={() => handleClick(index)}
              data-testid={`cell-${index}`}
            >
              {a}
            </div>
          );
        })}
      </div>
      <button onClick={reset} id="restart">
        Restart Game
      </button>
    </div>
  );
}

export default TicTacToe;
