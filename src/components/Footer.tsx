import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>Co-Working Space Reservation</div>
      <div className={styles.copy}>
        © 2026 Co-Working Space Reservation. All Rights Reserved
      </div>
    </footer>
  );
}
