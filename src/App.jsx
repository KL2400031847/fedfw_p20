import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userRole, setUserRole] = useState(null);

  // ------------------ HOME COMPONENT ------------------
  const Home = () => (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>🩺 MediCare Virtual</h2>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <button
              onClick={() => setCurrentPage('login')}
              className="login-btn"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Virtual Healthcare at Your Fingertips</h1>
            <p>
              Connect with healthcare professionals from the comfort of your home.
              Book appointments, receive consultations, and manage your health records seamlessly.
            </p>
            <div className="hero-buttons">
              <button onClick={() => setCurrentPage('login')} className="btn btn-primary">
                Enter as Patient
              </button>
              <button onClick={() => setCurrentPage('login')} className="btn btn-secondary">
                Enter as Doctor
              </button>
              <button onClick={() => setCurrentPage('login')} className="btn btn-secondary">
                Enter as Pharmacist
              </button>
            </div>
          </div>

          <div className="hero-image">
            <div className="medical-illustration">
              <div className="illustration-item doctor">👨‍⚕️</div>
              <div className="illustration-item patient">👤</div>
              <div className="illustration-item pharmacy">💊</div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2>Our Healthcare Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍⚕️</div>
              <h3>Patient Portal</h3>
              <p>
                Book appointments, access medical records, and receive virtual consultations with healthcare professionals.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🩺</div>
              <h3>Doctor Dashboard</h3>
              <p>
                Conduct consultations, manage patient records, and provide e-prescriptions securely.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💊</div>
              <h3>Pharmacist Panel</h3>
              <p>
                Manage prescriptions, track orders, and provide medication information to patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2025 MediCare Virtual. All rights reserved.</p>
          <p>End-to-end encrypted healthcare portal</p>
        </div>
      </footer>
    </>
  );

  // ------------------ LOGIN COMPONENT ------------------
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('patient');

    const handleSubmit = (e) => {
      e.preventDefault();
      setUserRole(selectedRole);
      setCurrentPage('dashboard');
    };

    return (
      <div className="login-container">
        <div className="login-header">
          <h1>🩺 MediCare Virtual</h1>
          <p>Sign in to access your healthcare portal</p>
        </div>

        <div className="login-card">
          <div className="social-login">
            <button type="button" className="social-btn email-btn">
              <span>📧</span> Email
            </button>
            <button type="button" className="social-btn phone-btn">
              <span>📱</span> Phone
            </button>
            <button type="button" className="social-btn google-btn">
              <span>🔍</span> Google
            </button>
          </div>

          <div className="divider">
            <span>or continue with email</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="role-switcher">
              <p>
                Sign in as:{' '}
                <span
                  className={`role-option ${selectedRole === 'patient' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('patient')}
                >
                  Patient
                </span>{' '}
                |{' '}
                <span
                  className={`role-option ${selectedRole === 'doctor' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('doctor')}
                >
                  Doctor
                </span>{' '}
                |{' '}
                <span
                  className={`role-option ${selectedRole === 'pharmacist' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('pharmacist')}
                >
                  Pharmacist
                </span>
              </p>
            </div>

            <button type="submit" className="submit-btn">
              Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </button>
          </form>

          <div className="login-footer">
            <p>Manage cookies or opt out of our healthcare portal</p>
            <p className="encryption-note">End-to-end encrypted</p>
          </div>
        </div>

        <button onClick={() => setCurrentPage('home')} className="back-btn">
          ← Back to Home
        </button>
      </div>
    );
  };

  // ------------------ DASHBOARD COMPONENT ------------------
  const Dashboard = () => {
    const getDashboardContent = () => {
      switch (userRole) {
        case 'doctor':
          return {
            title: 'Doctor Dashboard',
            features: [
              'Conduct virtual consultations',
              'Manage patient records',
              'Provide e-prescriptions',
              'View appointment schedule',
            ],
          };
        case 'pharmacist':
          return {
            title: 'Pharmacist Panel',
            features: [
              'Manage prescriptions',
              'Track medication orders',
              'Provide medication information',
              'Coordinate with doctors',
            ],
          };
        default:
          return {
            title: 'Patient Portal',
            features: [
              'Book appointments',
              'Access medical records',
              'Receive virtual consultations',
              'View prescription history',
            ],
          };
      }
    };

    const content = getDashboardContent();

    return (
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <div className="nav-brand">
            <h2>🩺 MediCare Virtual</h2>
          </div>
          <div className="nav-actions">
            <span className="user-role">Logged in as: {userRole}</span>
            <button onClick={() => setCurrentPage('home')} className="logout-btn">
              Logout
            </button>
          </div>
        </nav>

        <div className="dashboard-content">
          <header className="dashboard-header">
            <h1>{content.title}</h1>
            <p>Welcome to your healthcare portal</p>
          </header>

          <div className="dashboard-grid">
            {content.features.map((feature, index) => (
              <div key={index} className="dashboard-card">
                <div className="card-icon">{index + 1}</div>
                <h3>{feature}</h3>
                <button className="card-action-btn">Access</button>
              </div>
            ))}
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <button className="action-btn primary">Schedule Appointment</button>
              <button className="action-btn secondary">View Messages</button>
              <button className="action-btn secondary">Medical Records</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ------------------ RENDER PAGE ------------------
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Home />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
