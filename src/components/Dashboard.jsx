import { useState, useEffect } from 'react';
import profilePlaceholder from '../assets/profile-placeholder.jpeg';

const Dashboard = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    photo: profilePlaceholder
  });

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
      particlesArray.forEach(p => p.update());
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

      <div style={styles.dashboardBox}>
        {/* Profile Section */}
        <div style={styles.profileSection}>
          <div style={{ position: 'relative' }}>
            <img 
              src={user.photo} 
              alt="Profile" 
              style={styles.profileImage}
            />
            <div style={styles.editIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </div>
          </div>
          <div>
            <h2 style={styles.name}>{user.name}</h2>
            <p style={styles.email}>{user.email}</p>
          </div>
        </div>

        {/* Content Section */}
        <div style={styles.contentBox}>
          <h3 style={styles.sectionTitle}>Your Dashboard</h3>
          <p style={styles.paragraph}>
            Welcome to your personalized dashboard. Here you can manage your account settings, view your stats, and access all the features of our platform.
          </p>
          <p style={styles.paragraph}>
            We're constantly adding new features to help you get the most out of our service. Check back regularly for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100vw',
    minHeight: '100vh',
    padding: '60px 20px',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  dashboardBox: {
    zIndex: 1,
    maxWidth: '800px',
    width: '100%',
    padding: '30px 40px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
  },
  profileSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '40px'
  },
  profileImage: {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '4px solid #00ffff'
  },
  editIcon: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: '#00ffff',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  name: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#00ffff',
    marginBottom: '8px'
  },
  email: {
    fontSize: '1rem',
    color: '#ccc'
  },
  contentBox: {
    marginTop: '10px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(4px)'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#00ffff',
    marginBottom: '20px'
  },
  paragraph: {
    fontSize: '1rem',
    color: '#fff',
    lineHeight: '1.6',
    marginBottom: '15px'
  }
};

export default Dashboard;
