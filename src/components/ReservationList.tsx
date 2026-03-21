"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./ReservationList.module.css";

function toDriveUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?id=${match[1]}`;
  return url;
}

interface Reservation {
  _id: string;
  reserveDate: string;
  status: string;
  cowork: {
    _id: string;
    name: string;
    address: string;
    district: string;
    province: string;
    postalcode: string;
    tel?: string;
    opentime: string;
    closetime: string;
    picture?: string;
  };
}

interface Props {
  reservations: Reservation[];
  token: string;
}

export default function ReservationList({ reservations, token }: Props) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this reservation?")) return;

    setCancelling(id);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/reservations/${id}/cancel`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCancelling(null);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to cancel reservation.");
    }
  };

  const activeReservations = reservations.filter((r) => r.status === "active");

  if (activeReservations.length === 0) {
    return <p className={styles.empty}>No active reservations.</p>;
  }

  return (
    <div className={styles.grid}>
      {activeReservations.map((r) => (
        <div key={r._id} className={styles.card}>
          <div style={{ position: "relative", width: "100%", height: "200px" }}>
            <Image
              src={r.cowork.picture ? toDriveUrl(r.cowork.picture) : "/img/placeholder.jpg"}
              alt={r.cowork.name}
              fill={true}
              className={styles.cardImg}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardName}>{r.cowork.name}</h3>
            <p className={styles.cardDate}>
              {new Date(r.reserveDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <button
              className={styles.btnCancel}
              onClick={() => handleCancel(r._id)}
              disabled={cancelling === r._id}
            >
              {cancelling === r._id ? "Cancelling…" : "Cancel"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
