"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    tel: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (!form.email || !form.password || !form.name || !form.tel) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    // Mock registration — replace with real API call:
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(form) });
    await new Promise((r) => setTimeout(r, 800));

    setLoading(false);
    router.push("/login");
  };

  return (
    <div className={styles.pageBg}>
      <div className={styles.bgFallback} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.bgImg}
        src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1400&q=80"
        alt="background"
      />

      <div className={styles.card}>
        <div className={styles.cardLogo}>
          <span className={styles.brandTeal}>Co-Working Space</span>
          <span className={styles.brandDark}>Reservation</span>
        </div>

        <h2 className={styles.heading}>Signup</h2>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={styles.input}
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="tel" className={styles.label}>Telephone</label>
          <input
            id="tel"
            name="tel"
            type="tel"
            className={styles.input}
            value={form.tel}
            onChange={handleChange}
            autoComplete="tel"
          />
        </div>

        <hr className={styles.divider} />

        <button
          className={styles.btnPrimary}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering…" : "Register"}
        </button>

        
      </div>
    </div>
  );
}
