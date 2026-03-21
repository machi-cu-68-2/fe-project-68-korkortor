"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
    }
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

        <h2 className={styles.heading}>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <a href="#" className={styles.forgot}>Forget Password?</a>
        <hr className={styles.divider} />

        <button
          className={styles.btnPrimary}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in…" : "Log In"}
        </button>

        <p className={styles.signupLink}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
