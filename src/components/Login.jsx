import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isFormValid = email && password;

  useEffect(() => {
    const canvas = document.getElementById('bgParticles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const number = 100;

    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
      }
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < number; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const dx = (Math.random() - 0.5) * 1;
        const dy = (Math.random() - 0.5) * 1;
        const color = '#00ffff';
        particles.push(new Particle(x, y, dx, dy, size, color));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    init();
    animate();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <canvas id="bgParticles" style={styles.canvas} />
      <div style={styles.box}>
        <h1 style={styles.heading}>Login</h1>
        <p style={styles.subtext}>Welcome back! Please enter your credentials to access your account.</p>
        <p style={styles.subtext}>
          Don't have an account? <Link to="/register" style={styles.link}>Sign up</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              style={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              ...styles.button,
              ...(isFormValid ? styles.primary : styles.disabled)
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    position: 'relative',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  box: {
    zIndex: 1,
    padding: '40px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 700,
    marginBottom: '20px',
    color: '#00ffff',
  },
  subtext: {
    fontSize: '1rem',
    marginBottom: '15px',
  },
  formGroup: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    marginTop: '8px',
    backgroundColor: '#2c2c2c',
    color: '#fff',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '40px',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  primary: {
    backgroundColor: '#00ffff',
    color: '#000',
  },
  disabled: {
    backgroundColor: '#555',
    color: '#ccc',
    cursor: 'not-allowed',
  },
  link: {
    color: '#00ffff',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
};

export default Login;
