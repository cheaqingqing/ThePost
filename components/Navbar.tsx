"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>✦</span>
          <span className={styles.logoText}>The Posts</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}>
            All Posts
          </Link>
          <Link href="/posts/new" className={styles.cta}>+ New Post</Link>
        </nav>
      </div>
    </header>
  );
}