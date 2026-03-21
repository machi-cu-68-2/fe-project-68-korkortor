import Link from "next/link";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";

interface TopMenuProps {
  isLoggedIn: boolean;
  userName?: string;
}

export default function TopMenu({ isLoggedIn, userName }: TopMenuProps) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Co-Working Space Reservation
      </Link>
      <ul className={styles.links}>
        <TopMenuItem title="Ours Space" pageRef="/" />
        <TopMenuItem title="About Us" pageRef="/about" />
        {isLoggedIn ? (
          <>
            <TopMenuItem title="My Reservation" pageRef="/booking" />
            <li>
              <div className={styles.userIcon} title={userName}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login" className={styles.btnLogin}>
              Login / Sign up
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
