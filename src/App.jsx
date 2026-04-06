import React, { useState } from "react";

const moves = ["rock", "paper", "scissors"];

const getWinner = (player, computer) => {
  if (player === computer) return "Draw";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "Player";
  }
  return "Computer";
};

const App = () => {
  const [userMove, setUserMove] = useState("");
  const [computerMove, setComputerMove] = useState("");
  const [result, setResult] = useState("");
  const [rounds, setRounds] = useState(0);
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [matchWinner, setMatchWinner] = useState("");

  const handleClick = (move) => {
    const compMove = moves[Math.floor(Math.random() * 3)];

    setUserMove(move);
    setComputerMove(compMove);

    const winner = getWinner(move, compMove);
    setResult(winner);

    setRounds((prev) => prev + 1);

    setHistory((prev) => [
      ...prev,
      { player: move, computer: compMove, winner },
    ]);

    if (winner === "Player") {
      setPlayerScore((prev) => prev + 1);
    } else if (winner === "Computer") {
      setComputerScore((prev) => prev + 1);
    }

    if (playerScore + (winner === "Player" ? 1 : 0) === 3) {
      setMatchWinner("Player");
      setStreak((prev) => prev + 1); 
    } else if (computerScore + (winner === "Computer" ? 1 : 0) === 3) {
      setMatchWinner("Computer");
      setStreak(0); 
    }
  };

  const handleReset = () => {
    setUserMove("");
    setComputerMove("");
    setResult("");
    setRounds(0);
    setHistory([]);
    setPlayerScore(0);
    setComputerScore(0);
    setMatchWinner("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Rock Paper Scissor Game</h1>

      <h3>Rounds Played: {rounds}</h3>
      <h3>Winning Streak: {streak}</h3>
      <h3>Score → Player: {playerScore} | Computer: {computerScore}</h3>

      <div>
        <h4>Computer: {computerMove}</h4>
        <h4>Player: {userMove}</h4>
      </div>

      <h2>
        {matchWinner
          ? `${matchWinner} wins the Match 🏆 (Best of 5)`
          : result === "Draw"
          ? "It's a Draw 🤝"
          : result
          ? `${result} Wins 🎉`
          : ""}
      </h2>

      <div>
        <button disabled={matchWinner} onClick={() => handleClick("rock")}>🪨</button>
        <button disabled={matchWinner} onClick={() => handleClick("paper")}>📄</button>
        <button disabled={matchWinner} onClick={() => handleClick("scissors")}>✂️</button>
      </div>

      <br />

      <button onClick={handleReset}>Reset</button>

      <h3>Move History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            Round {index + 1}: Player - {item.player} | Computer - {item.computer} | Winner - {item.winner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
