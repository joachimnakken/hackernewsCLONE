import React from "react";
import styles from "./Layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default ({ children }) => {
  const { query: { slug = "0" } = {}, route = "" } = useRouter();
  const slugInt = +slug;
  const linkText =
    route === "/page/[slug]" || route === "/"
      ? "Next page..."
      : "Go to page 1...";

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
            <a>{linkText}</a>
          </Link>
        </footer>
      </div>
    </div>
  );
};
