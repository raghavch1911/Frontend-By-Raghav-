import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    company: '',
    hasExperience: 'no'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.email &&
    formData.password &&
    formData.company;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) navigate('/dashboard');
  };

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
        if (this.x + this.size > canvas.width || this.x - this.size < 0) this.directionX = -this.directionX;
        if (this.y + this.size > canvas.height || this.y - this.size < 0) this.directionY = -this.directionY;
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
        <h1 style={styles.heading}>Create Account</h1>
        <p style={styles.subtext}>Join our platform today and start your journey with us.</p>
        <p style={styles.subtext}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9876543210"
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your Company"
              style={styles.input}
            />
          </div>

          <div className="form-group" style={styles.formGroup}>
            <label style={{ color: '#ccc', marginBottom: '5px', display: 'block' }}>Are you an Agency?</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="hasExperience"
                  value="yes"
                  checked={formData.hasExperience === 'yes'}
                  onChange={handleChange}
                /> Yes
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="hasExperience"
                  value="no"
                  checked={formData.hasExperience === 'no'}
                  onChange={handleChange}
                /> No
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              ...styles.button,
              ...(isFormValid ? {} : styles.disabledButton)
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    padding: '60px 20px',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    fontFamily: 'sans-serif',
    position: 'relative',
    boxSizing: 'border-box',
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
    width: '100%',
    maxWidth: '700px',
    padding: '30px 40px 20px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#00ffff',
    textAlign: 'center',
  },
  subtext: {
    fontSize: '1rem',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#ccc',
  },
  link: {
    color: '#00ffff',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#2c2c2c',
    color: '#fff',
    fontSize: '1rem',
    marginTop: '8px',
    boxSizing: 'border-box',
    '::placeholder': {
      color: '#aaa',
    }
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '30px',
    marginTop: '10px',
    fontSize: '0.9rem',
    color: '#ddd',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  button: {
    marginTop: '20px',
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    backgroundColor: '#00ffff',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  },
  disabledButton: {
    backgroundColor: '#555',
    color: '#ccc',
    cursor: 'not-allowed',
  },
};

export default Register;
