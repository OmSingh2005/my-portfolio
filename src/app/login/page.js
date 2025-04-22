"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }
    
    // For demo purposes, we'll use a simple authentication
    // In a real app, you'd verify against a backend
    if (formData.email === 'user@example.com' && formData.password === 'password') {
      // Store auth token in localStorage (in a real app, this would be a JWT from your backend)
      localStorage.setItem('authToken', 'demo-token-12345');
      localStorage.setItem('user', JSON.stringify({ email: formData.email, name: 'Demo User' }));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } else {
      setError('Invalid credentials. Try user@example.com / password');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>Login</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>
        
        <div className={styles.formFooter}>
          <p>Do not have an account? <Link href="/register">Register</Link></p>
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}