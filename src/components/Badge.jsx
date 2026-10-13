import styles from "../App.module.css";

export default function Badge({ children }) {
  return <span className={styles.badge}>{children}</span>;
}