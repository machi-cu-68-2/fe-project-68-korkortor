"use client";

import { useState } from "react";
import DateReserve from "./DateReserve";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  coopId: string;
  coopName: string;
}

export default function BookingForm({ coopId, coopName }: BookingFormProps) {
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReserve = () => {
    if (!date) return alert("Please select a date.");
    setLoading(true);
    // Mock submission — replace with real API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>Reservation</h2>
        <div className={styles.success}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1a6b55" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p>Booked <strong>{coopName}</strong></p>
          <p className={styles.dateConfirm}>on {new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
          <button className={styles.btnOutline} onClick={() => setSubmitted(false)}>
            Book Another Date
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Reservation</h2>
      <DateReserve value={date} onDateChange={setDate} />
      <button
        className={styles.btnReserve}
        onClick={handleReserve}
        disabled={loading}
      >
        {loading ? "Reserving…" : "Reserve"}
      </button>
    </div>
  );
}
