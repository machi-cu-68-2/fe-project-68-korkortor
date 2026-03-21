"use client";

import { useState } from "react";
import styles from "./DateReserve.module.css";

interface DateReserveProps {
  onDateChange: (date: string) => void;
  value: string;
}

export default function DateReserve({ onDateChange, value }: DateReserveProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>Date</label>
      <input
        type="date"
        className={styles.input}
        value={value}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
}
