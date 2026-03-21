import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import ReservationList from "@/components/ReservationList";
import styles from "./page.module.css";

async function getReservations(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reservations`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return [];
  const data = await res.json();
  return data.data || [];
}

export default async function BookingPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const token = (session.user as any)?.accessToken ?? "";
  const reservations = await getReservations(token);

  // Count only active reservations
  const activeCount = reservations.filter(
    (r: any) => r.status === "active"
  ).length;

  return (
    <div className={styles.page}>
      <TopMenu isLoggedIn={true} userName={session.user?.name ?? ""} />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Reservation</h1>
          <span className={styles.badge}>{activeCount} / 3</span>
        </div>
        <ReservationList reservations={reservations} token={token} />
      </main>
      <Footer />
    </div>
  );
}
