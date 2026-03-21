import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default async function BookingPage() {
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session) {
    redirect("/login");
  }

  return (
    <div className={styles.page}>
      <TopMenu isLoggedIn={true} userName={session.user?.name ?? ""} />
      <main className={styles.main}>
        <h1 className={styles.title}>My Reservation</h1>
        <p className={styles.subtitle}>Manage your bookings here.</p>
        {/* reservation list goes here */}
      </main>
      <Footer />
    </div>
  );
}
