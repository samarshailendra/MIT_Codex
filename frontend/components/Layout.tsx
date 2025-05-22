import Link from 'next/link';
import React, { ReactNode } from 'react';
import styles from '../styles/layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <header className={styles.header}>
      <div className={styles.logo}>EdGenAI - Education with Generative AI</div>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()} EdGenAI
    </footer>
  </>
);

export default Layout;
