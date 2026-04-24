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

    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    if (winner === "Player") {
      newPlayerScore = playerScore + 1;
      setPlayerScore(newPlayerScore);
    } else if (winner === "Computer") {
      newComputerScore = computerScore + 1;
      setComputerScore(newComputerScore);
    }

    if (newPlayerScore === 3) {
      setMatchWinner("Player");
      setStreak((prev) => prev + 1);
    } else if (newComputerScore === 3) {
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
    <div className="app-container">
      <div className="glass-panel main-panel">
        <header className="header">
          <h1 className="title">Rock Paper Scissors</h1>
          <div className="stats-badges">
            <span className="badge round-badge">Round {rounds}</span>
            <span className="badge streak-badge">🔥 Streak: {streak}</span>
          </div>
        </header>

        <section className="score-board">
          <div className="score-card player-score">
            <p className="score-label">Player</p>
            <p className="score-value">{playerScore}</p>
          </div>
          <div className="score-divider">VS</div>
          <div className="score-card computer-score">
            <p className="score-label">Computer</p>
            <p className="score-value">{computerScore}</p>
          </div>
        </section>

        <section className="arena">
          <div className="move-display">
            <div className="move-box">
              <span className="move-emoji">{userMove === "rock" ? "🪨" : userMove === "paper" ? "📄" : userMove === "scissors" ? "✂️" : "❔"}</span>
              <p>You</p>
            </div>
            <div className="move-box">
              <span className="move-emoji">{computerMove === "rock" ? "🪨" : computerMove === "paper" ? "📄" : computerMove === "scissors" ? "✂️" : "❔"}</span>
              <p>Bot</p>
            </div>
          </div>
          <div className="result-announcement">
            <h2 className={matchWinner ? "match-winner-text" : "round-winner-text"}>
              {matchWinner
                ? `🏆 ${matchWinner} Wins the Match!`
                : result === "Draw"
                ? "🤝 It's a Draw!"
                : result
                ? `✨ ${result} Wins Round ✨`
                : "Make Your Move"}
            </h2>
          </div>
        </section>

        <section className="controls">
          <div className="action-buttons">
            <button className="action-btn rock" disabled={!!matchWinner} onClick={() => handleClick("rock")}>
              <span className="btn-emoji">🪨</span>
              <span className="btn-label">Rock</span>
            </button>
            <button className="action-btn paper" disabled={!!matchWinner} onClick={() => handleClick("paper")}>
              <span className="btn-emoji">📄</span>
              <span className="btn-label">Paper</span>
            </button>
            <button className="action-btn scissors" disabled={!!matchWinner} onClick={() => handleClick("scissors")}>
              <span className="btn-emoji">✂️</span>
              <span className="btn-label">Scissors</span>
            </button>
          </div>
          <button className="reset-btn" onClick={handleReset}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: "8px"}}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Restart Match
          </button>
        </section>
      </div>

      {history.length > 0 && (
        <div className="glass-panel history-panel">
          <h3>Match History</h3>
          <ul className="history-list">
            {history.slice().reverse().map((item, index) => (
              <li key={index} className={`history-item ${item.winner === "Player" ? "won" : item.winner === "Computer" ? "lost" : "draw"}`}>
                <span className="history-round">R{(history.length - index)}</span>
                <span className="history-detail">{item.player} vs {item.computer}</span>
                <span className="history-result">{item.winner === "Draw" ? "Draw" : `${item.winner}`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
