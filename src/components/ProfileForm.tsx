"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ProfileForm.module.css";

interface Props {
  name: string;
  tel: string;
  token: string;
}

export default function ProfileForm({ name, tel, token }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({ name, tel });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/updateme`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: form.name, tel: form.tel }),
    });

    setLoading(false);

    if (res.ok) {
      setMessage("Profile updated successfully!");
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.message || "Failed to update profile.");
    }
  };

  return (
    <div className={styles.form}>
      <h3 className={styles.heading}>Edit Profile</h3>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className={styles.input}
          value={form.name}
          onChange={handleChange}
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
        />
      </div>

      <button
        className={styles.btnSave}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}
