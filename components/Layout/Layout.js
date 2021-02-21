import React from "react";
import styles from "./Layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ children }) => {
  const { query: { slug = "0" } = {} } = useRouter();
  const slugInt = +slug;
  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link href="/">
            <a>
              <span className={styles.mainTitle}>Hacker Next</span>
            </a>
          </Link>
        </nav>
        {children}
        <footer>
          <Link href={`/page/${slugInt + 1}`}>
            <a>Next page...</a>
          </Link>
        </footer>
      </div>
    </div>
  );
};
