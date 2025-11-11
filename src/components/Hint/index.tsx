import styles from "./styles.module.css";

type HintProps = {
  text: string;
};

export default function Hint({ text }: HintProps) {
  return (
    <div className={styles.hintBox}>
      <h3>Dica:</h3>
      <p>{text}</p>
    </div>
  );
}
