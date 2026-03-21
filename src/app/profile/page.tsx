import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import ProfileForm from "@/components/ProfileForm";
import styles from "./page.module.css";

async function getUserProfile(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const token = (session.user as any)?.accessToken ?? "";
  const profile = await getUserProfile(token);

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className={styles.page}>
      <TopMenu isLoggedIn={true} userName={session.user?.name ?? ""} />
      <main className={styles.main}>
        <div className={styles.card}>
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h1 className={styles.profileName}>{profile.name}</h1>
            <span className={styles.roleBadge}>{profile.role}</span>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <p className={styles.value}>{profile.email}</p>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <p className={styles.value}>••••••••</p>
            </div>
          </div>

          <hr className={styles.divider} />

          <ProfileForm
            name={profile.name}
            tel={profile.tel || ""}
            token={token}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
