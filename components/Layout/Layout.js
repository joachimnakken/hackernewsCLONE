import React from "react";
import styles from "./Layout.module.css";
import Link from "next/link";

export default ({ children }) => {
  return (
    <>
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
        </div>
      </div>
    </>
  );
};
