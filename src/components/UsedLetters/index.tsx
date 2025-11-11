
import styles from "./styles.module.css";

type Props = {
  letters: string[];
  word: string;
};

export default function UsedLetters({ letters, word }: Props) {
  return (
    <div className={styles.container}>
      <h4>Letras usadas:</h4>
      <div className={styles.list}>
        {letters.length === 0 ? (
          <p className={styles.empty}>Nenhuma letra ainda</p>
        ) : (
          letters.map((l) => (
            <span
              key={l}
              className={`${styles.letter} ${
                word.includes(l) ? styles.correct : styles.wrong
              }`}
            >
              {l}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
