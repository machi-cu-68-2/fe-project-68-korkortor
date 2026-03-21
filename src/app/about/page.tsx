import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import styles from "./page.module.css";

const MEMBERS = [
  "Napaphon Charuthum",
  "Thanabadee Techakasiwattana",
  "Patsakorn Sitpathom",
];

export default async function AboutPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.page}>
      <TopMenu isLoggedIn={!!session} userName={session?.user?.name ?? ""} />
      <main className={styles.main}>
        <h1 className={styles.groupName}>KORKORTOR</h1>
        <p className={styles.subtitle}>Our Team</p>
        <div className={styles.members}>
          {MEMBERS.map((name) => (
            <div key={name} className={styles.memberCard}>
              <div className={styles.memberAvatar}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className={styles.memberName}>{name}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
