import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css";
import { Coop } from "@/libs/getCoops";

interface CardProps {
  coop: Coop;
}

export default function Card({ coop }: CardProps) {
  return (
    <Link href={`/coop/${coop.id}`} className={styles.card}>
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <Image
          src={coop.imageUrl}
          alt={coop.name}
          fill={true}
          className={styles.cardImg}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{coop.name}</h3>
        <div className={styles.metaList}>
          <div className={styles.metaRow}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.27 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.27 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {coop.tel}
          </div>
          <div className={styles.metaRow}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {coop.openTime} - {coop.closeTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
