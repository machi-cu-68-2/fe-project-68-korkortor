import TopMenu from "@/components/TopMenu";
import Footer from "@/components/Footer";
import { getCoop } from "@/libs/getCoop";
import BookingForm from "@/components/BookingForm";
import styles from "./page.module.css";

export default async function CoopPage({
  params,
}: {
  params: { cid: string };
}) {
  const coop = await getCoop(params.cid);

  return (
    <div className={styles.page}>
      <TopMenu isLoggedIn={false} />

      {/* Hero Image */}
      <div className={styles.hero}>
        <img src={coop.imageUrl} alt={coop.name} className={styles.heroImg} />
      </div>

      <div className={styles.content}>
        {/* Venue Info */}
        <div className={styles.info}>
          <h1 className={styles.venueName}>{coop.name}</h1>
          <div className={styles.metaList}>
            <div className={styles.metaRow}>
              {/* phone */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.27 12a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.27 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {coop.tel}
            </div>
            <div className={styles.metaRow}>
              {/* clock */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {coop.openTime} - {coop.closeTime}
            </div>
            <div className={styles.metaRow}>
              {/* pin */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{coop.address}</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <BookingForm coopId={params.cid} coopName={coop.name} />
      </div>

      <Footer />
    </div>
  );
}
