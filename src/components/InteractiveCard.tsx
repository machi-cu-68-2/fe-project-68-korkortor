"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./card.module.css";
import { Coop } from "@/libs/getCoops";

interface InteractiveCardProps {
  venue: Coop;
}

export default function InteractiveCard({ venue }: InteractiveCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/venue/${venue.id}`}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 30px rgba(0,0,0,0.14)"
          : "0 4px 20px rgba(0,0,0,0.1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.cardImg} src={venue.imageUrl} alt={venue.name} />
      <div className={styles.cardBody}>
        <h3 className={styles.cardName}>{venue.name}</h3>
        <div className={styles.metaList}>
          <div className={styles.metaRow}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.27 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.27 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {venue.tel}
          </div>
          <div className={styles.metaRow}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {venue.openTime} - {venue.closeTime}
          </div>
        </div>
      </div>
    </Link>
  );
}
