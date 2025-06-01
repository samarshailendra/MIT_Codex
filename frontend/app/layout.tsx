import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import styles from './layout.module.css';
import React, { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Autograder',
  description: 'Research Autograder Demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className={styles.container}>
          <button
            className={styles.mobileToggle}
            onClick={() => setOpen((o) => !o)}
          >
            Menu
          </button>
          <aside className={open ? styles.sidebarOpen : styles.sidebar}>
            <div className={styles.sidebarInner}>
              <h1 className={styles.logo}>Autograder</h1>
              <nav>
                <ul className={styles.navList}>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/demo">Try Demo</Link></li>
                  <li><Link href="/blog">Blogs/Research</Link></li>
                  <li><Link href="/about">About / Contact</Link></li>
                </ul>
              </nav>
            </div>
          </aside>
          <main className={styles.main}>{children}</main>
        </div>
        <footer className={styles.footer}>
          <div>Contact: info@example.com</div>
          <div className={styles.socials}>
            <a href="#" aria-label="GitHub">GH</a>
            <a href="#" aria-label="LinkedIn">LI</a>
            <a href="#" aria-label="Twitter">TW</a>
          </div>
          <div>&copy; {new Date().getFullYear()} Autograder</div>
        </footer>
      </body>
    </html>
  );
}
