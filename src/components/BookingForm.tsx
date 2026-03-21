"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DateReserve from "./DateReserve";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  coopId: string;
  coopName: string;
  token: string;
}

export default function BookingForm({ coopId, coopName, token }: BookingFormProps) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReserve = async () => {
    if (!date) return setError("Please select a date.");
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/coworks/${coopId}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reserveDate: new Date(date).toISOString() }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.message || "Failed to reserve. You can have at most 3 active reservations.");
      return;
    }

    setSubmitted(true);
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
      {error && <p style={{ color: "red", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{error}</p>}
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
