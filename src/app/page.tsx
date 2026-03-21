import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TopMenu from "@/components/TopMenu";
import Banner from "@/components/Banner";
import CardPanel from "@/components/CardPanel";
import Footer from "@/components/Footer";
import { getCoops } from "@/libs/getCoops";
import styles from "./page.module.css";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const coops = await getCoops();

  return (
    <div className={styles.main}>
      <TopMenu isLoggedIn={!!session} userName={session?.user?.name ?? ""} />
      <Banner />
      <main className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Spaces</h2>
          <span className={styles.seeAll}>See all</span>
        </div>
        <CardPanel coops={coops} />
      </main>
      <Footer />
    </div>
  );
}
