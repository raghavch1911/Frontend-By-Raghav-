import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  useEffect(() => {
    const canvas = document.getElementById('techBackground');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particlesArray = [];
    const numberOfParticles = 100;

    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    function init() {
      particlesArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * (canvas.width - size * 2) + size;
        let y = Math.random() * (canvas.height - size * 2) + size;
        let directionX = Math.random() * 2 - 1;
        let directionY = Math.random() * 2 - 1;
        let color = '#00ffff';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle) => particle.update());
    }

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });

    init();
    animate();
  }, []);

  return (
    <div style={styles.container}>
      <canvas id="techBackground" style={styles.canvas}></canvas>
      <div style={styles.box}>
        <h1 style={styles.heading}>Welcome to Our Platform</h1>
        <p style={styles.subtext}>Discover features that help you grow and manage your projects efficiently.</p>
        <p style={styles.subtext}>Join thousands already benefiting from our services.</p>
        <div style={styles.buttonGroup}>
          <Link to="/register" style={{ ...styles.button, ...styles.primary }}>Create Account</Link>
          <Link to="/login" style={{ ...styles.button, ...styles.secondary }}>Login</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: 0,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    fontFamily: 'sans-serif',
    position: 'relative',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  box: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '600px',
    padding: '40px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(8px)',
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#00ffff',
  },
  subtext: {
    fontSize: '1.1rem',
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '30px',
  },
  button: {
    padding: '12px 24px',
    borderRadius: '40px',
    fontSize: '16px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    fontWeight: 'bold',
  },
  primary: {
    backgroundColor: '#00ffff',
    color: '#000',
  },
  secondary: {
    border: '2px solid #00ffff',
    color: '#00ffff',
  },
};

export default Welcome;
