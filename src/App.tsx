import React, { useState, useEffect } from "react";
import logo from "./assets/logo.png";
import restartIcon from "./assets/restart.svg";
import tipIcon from "./assets/tip.svg";
import { WORDS, type Challenge } from "./utils/words";
import styles from "./app.module.css";


function getRandomWord(): Challenge {
  const index = Math.floor(Math.random() * WORDS.length);
  return WORDS[index];
}

export default function App() {
  const [challenge, setChallenge] = useState<Challenge>(() => getRandomWord());
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [input, setInput] = useState("");
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const MAX_ATTEMPTS = 10;
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);

  useEffect(() => {
    setRevealed(Array(challenge.word.length).fill(false));
    setUsedLetters([]);
    setInput("");
    setMessage("");
  }, [challenge]);

  
function handleGuess(e: React.FormEvent) {
  e.preventDefault();
  const letter = input.trim().toUpperCase();

  // Validação: apenas 1 letra A-Z
  if (!letter.match(/^[A-Z]$/)) return;

  // Verifica se já foi usada
  if (usedLetters.includes(letter)) {
    setInput("");
    return;
  }

  // Adiciona a letra à lista de usadas
  setUsedLetters((prev) => [...prev, letter]);

  const newRevealed = [...revealed];
  let found = false;

  // Revela as letras corretas
  for (let i = 0; i < challenge.word.length; i++) {
    if (challenge.word[i].toUpperCase() === letter) {
      newRevealed[i] = true;
      found = true;
    }
  }

  if (found) {
    setRevealed(newRevealed);

    //Verifica se todas as letras foram reveladas (vitória)
    const allRevealed = newRevealed.every(Boolean);
   if (allRevealed) {
  setUsedLetters([]); // 🔹 limpa imediatamente
  setTimeout(() => {
    setChallenge(getRandomWord());
    setAttempts(MAX_ATTEMPTS);
    setRevealed([]);
  }, 1500);
}


  } else {
    // Letra incorreta → reduz tentativa
    setAttempts((prev) => {
      const newAttempts = prev - 1;
if (newAttempts <= 0) {
  setUsedLetters([]); // 🔹 limpa imediatamente
  setTimeout(() => {
    setChallenge(getRandomWord());
    setAttempts(MAX_ATTEMPTS);
    setRevealed([]);
  }, 1500);
}


      return newAttempts;
    });
  }

  setInput("");
}


function restartGame() {
    setChallenge(getRandomWord());
  }

  const allRevealed = revealed.every(Boolean);

  return (
    <div className={styles.container}>
      <div className={styles.gameBox}>
        <img 
            src={logo} 
           alt="Logo do jogo Adivinhe" 
        className={styles.logo}
/>

        <p className={styles.attempts}>
  {attempts} de {MAX_ATTEMPTS} tentativas
          <button onClick={restartGame} className={styles.restartButton}>
  <img 
    src={restartIcon} 
    alt="Reiniciar jogo" 
    className={styles.restartIcon} 
  />
</button>
</p>

<div className={styles.hintBox}>
  <div className={styles.hintHeader}>
    <img 
      src={tipIcon} 
      alt="Ícone de dica" 
      className={styles.hintIcon} 
    />
    <h3 className={styles.hintTitle}>Dica</h3>
  </div>
  <p className={styles.hintText}>{challenge.tip}</p>
</div>

        <div className={styles.wordBox}>
          {challenge.word.split("").map((char, i) => (
            <div
              key={i}
              className={`${styles.letter} ${
                revealed[i] ? styles.revealed : ""
              }`}
            >
              {revealed[i] ? char : ""}
            </div>
          ))}
        </div>

        {allRevealed && (
          <div className={styles.winMessage}>
            🎉 Parabéns! A palavra era <strong>{challenge.word}</strong>
          </div>
        )}

        <form onSubmit={handleGuess} className={styles.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={1}
            className={styles.input}
            placeholder="?"
          />
          <button type="submit" className={styles.button}>
            Confirmar
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
<div className={styles.usedLetters}>
  {usedLetters.map((l) => (
    <div
      key={l}
      className={`${styles.letterUsed} ${
        challenge.word.toUpperCase().includes(l)
          ? styles.correct
          : styles.wrong
      }`}
    >
      {l}
    </div>
  ))}
</div>

      </div>
    </div>
  );
}
