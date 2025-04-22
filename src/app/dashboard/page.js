"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/Dashboard.module.css';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', description: 'Description of project 1', link: '/projects/project1' },
    { id: 2, name: 'Project 2', description: 'Description of project 2', link: '/projects/project2' },
    { id: 3, name: 'Project 3', description: 'Description of project 3', link: '/projects/project3' },
    { id: 4, name: 'External Project', description: 'Link to external project', link: 'https://example.com', external: true }
  ]);

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      
      if (!token || !userData) {
        router.push('/login');
        return;
      }
      
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>My Projects Dashboard</h1>
          <div className={styles.userInfo}>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
          </div>
        </div>
        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/dashboard" className={styles.active}>Projects</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h2>My Projects</h2>
        
        <div className={styles.projectGrid}>
          {projects.map(project => (
            <div key={project.id} className={styles.projectCard}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              {project.external ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.viewBtn}>
                  Visit Project
                </a>
              ) : (
                <Link href={project.link} className={styles.viewBtn}>
                  View Project
                </Link>
              )}
            </div>
          ))}
          
          <div className={`${styles.projectCard} ${styles.addNew}`}>
            <h3>Add New Project</h3>
            <p>Create or link a new project</p>
            <Link href="/projects/new" className={styles.addBtn}>
              + New Project
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>
    </div>
  );
}