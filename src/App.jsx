import React, { useState } from 'react'
import './App.css'

export default function App() {

  const [box, setBox] = useState(["", "", "", "", "", "", "", "", ""])
  const [turn, setTurn] = useState("X")

  const checkWinner = () => {

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < winningCombinations.length; i++) {

      let combination = winningCombinations[i]

      let a = combination[0]
      let b = combination[1]
      let c = combination[2]

      if (
        box[a] &&
        box[a] === box[b] &&
        box[a] === box[c]
      ) {
        return box[a]
      }
    }

    return null
  }

  const winner = checkWinner()

  let Draw = true

  if (winner) {
    Draw = false
  }
  else {
    for (let i = 0; i < box.length; i++) {
      if (box[i] === "") {
        Draw = false
        break
      }
    }
  }

  let message = ""

  if (winner) {
    message = `Player ${winner} Wins!`
  }
  else if (Draw) {
    message = "Game Draw!"
  }
  else {
    message = `Player ${turn}'s Turn`
  }

  const handleClick = (index) => {

    if (box[index] !== "" || winner || Draw) {
      return
    }

    const updatedBox = [...box]

    updatedBox[index] = turn

    setBox(updatedBox)

    setTurn(turn === "X" ? "O" : "X")
  }

  const handleReset = () => {
    setBox(["", "", "", "", "", "", "", "", ""])
    setTurn("X")
  }

  return (
    <div className="game-container">

      <div className="title">
        <h1>Tic-Tac-Toe Game</h1>
      </div>

      <h2>{message}</h2>

      <div className="games-content">

        {box.map((value, index) => (

          <div
            key={index} className="box" onClick={() => handleClick(index)}>
            {value}
          </div>

        ))}

      </div>

      <button className="btn" onClick={handleReset}>
        Reset Game
      </button>

    </div>
  )
}
