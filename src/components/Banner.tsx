import styles from "./banner.module.css";

export default function Banner() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBg} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.heroImg}
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80"
        alt="Co-working space"
      />
      <div className={styles.heroContent}>
        <h1>Book Your Ideal Workspace.</h1>
      </div>
    </section>
  );
}
