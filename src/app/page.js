"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './styles/Home.module.css';

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>My Portfolio Website</h1>
        <nav className={styles.nav}>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h2>Welcome to My Project Portfolio</h2>
          <p>This is a showcase of my personal projects and work.</p>
          {!isLoggedIn && (
            <Link href="/login" className={styles.ctaButton}>
              Login to see projects
            </Link>
          )}
        </section>

        <section className={styles.publicProjects}>
          <h2>Featured Public Projects</h2>
          <div className={styles.projectGrid}>
            <div className={styles.projectCard}>
              <h3>Project 1</h3>
              <p>Description of publicly visible project</p>
            </div>
            <div className={styles.projectCard}>
              <h3>Project 2</h3>
              <p>Description of publicly visible project</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}