import styles from "./styles.module.css";

type HeaderProps = {
  onRestart: () => void;
};

export default function Header({ onRestart }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}> Jogo de Adivinhação</h1>
      <button onClick={onRestart} className={styles.restart}>
        🔄 Reiniciar
      </button>
    </header>
  );
}
