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
  console.log({ route, slugInt });
  return (
    <div>
      <div className={styles.container}>
        <nav className={styles.nav}>
          {slugInt > 0 && (
            <Link href={`/page/${slugInt - 1}`}>
              <a href="">
                <span>&#x2b05;</span>
              </a>
            </Link>
          )}
          <Link href="/">
            <a href="">
              <span className={styles.mainTitle}>Hacker Next</span>
            </a>
          </Link>
        </nav>
        {children}
        <footer>
          <Link href={`/page/${slugInt + 1}`}>
            <a href="">{linkText}</a>
          </Link>
        </footer>
      </div>
    </div>
  );
};
