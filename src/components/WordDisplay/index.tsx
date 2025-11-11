import styles from "./styles.module.css";

type Props = {
  word: string;
  revealed: boolean[];
};

export default function WordDisplay({ word, revealed }: Props) {
  return (
    <div className={styles.wordBox}>
      {word.split("").map((char, i) => (
        <span key={i} className={styles.letter}>
          {revealed[i] ? char : "_"}
        </span>
      ))}
    </div>
  );
}
