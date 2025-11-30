import React, { useEffect, useState } from "react";
import "./App.css";

/**
 * MediCare Virtual - FULL APP
 * Includes:
 * - Patient/Doctor/Pharmacist Signup
 * - Login (Role Based)
 * - Appointment Booking (with past-date restriction)
 * - Payments
 * - Records
 * - Prescription Views
 */

const STORAGE_KEYS = {
  USERS: "mc_users_v1",
  APPTS: "mc_appts_v1",
  PAYMENTS: "mc_payments_v1",
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [scrollToFeatures, setScrollToFeatures] = useState(false);

  const [medicalRecords] = useState([
    { patient: "bharath@example.com", title: "Blood Test", date: "2025-01-20", report: "Normal" },
    { patient: "ravi@example.com", title: "X-Ray", date: "2025-01-12", report: "No Issues" }
  ]);

  const [consultations] = useState([
    { doctor: "dr.anita@example.com", patient: "bharath@example.com", date: "2025-02-01", status: "Completed" }
  ]);

  const [prescriptions] = useState([
    { doctor: "dr.anita@example.com", patient: "bharath@example.com", medicine: "Paracetamol", dosage: "500mg", date: "2025-02-05" }
  ]);

  // Initial load
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    setUsers(storedUsers);

    const storedAppts = JSON.parse(localStorage.getItem(STORAGE_KEYS.APPTS) || "[]");
    setAppointments(storedAppts);

    const storedPayments = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYMENTS) || "[]");
    setPayments(storedPayments);
  }, []);

  // Persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);

  /* -------------------- HOME -------------------- */
  const Home = () => {
    useEffect(() => {
      if (scrollToFeatures) {
        setTimeout(() => {
          document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
          setScrollToFeatures(false);
        }, 150);
      }
    }, [scrollToFeatures]);

    return (
      <>
        <nav className="navbar">
          <div className="nav-container">
            <div className="logo"><h2>🩺 MediCare Virtual</h2></div>
            <div className="nav-links">
              <a style={{ cursor: "pointer" }}
                onClick={() => { setCurrentPage("home"); setScrollToFeatures(true); }}>
                Features
              </a>
              <button className="login-btn" onClick={() => setCurrentPage("login")}>Sign In</button>
            </div>
          </div>
        </nav>

        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1>Virtual Healthcare at Your Fingertips</h1>
              <p>Book appointments, consult doctors, and manage your health records securely.</p>
              <div className="hero-buttons">
                <button className="btn btn-primary"
                  onClick={() => setCurrentPage("signup")}>
                  Create Patient Account
                </button>
                <button className="btn btn-secondary"
                  onClick={() => setCurrentPage("login")}>
                  Sign In
                </button>
              </div>
            </div>

            <div className="medical-illustration">
              <div className="illustration-item doctor">👨‍⚕</div>
              <div className="illustration-item patient">👤</div>
              <div className="illustration-item pharmacy">💊</div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <h2>Our Healthcare Services</h2>

            <div className="features-grid" style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
              <div className="feature-card">
                <div className="feature-icon">📅</div>
                <h3>Appointments</h3>
                <p>Book appointments easily and receive reminders.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📁</div>
                <h3>Records</h3>
                <p>Securely store and access medical history.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">💳</div>
                <h3>Payments</h3>
                <p>Pay consultation fees & prescriptions securely.</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };

  /* -------------------- PATIENT SIGNUP -------------------- */
  const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createAccount = (e) => {
      e.preventDefault();
      if (!name || !email || !password) return alert("Fill all fields");
      if (users.find(u => u.email === email)) return alert("This email already exists");

      const newUser = { name, email, password, role: "patient" };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setCurrentPage("dashboard");
    };

    return (
      <div className="login-container">
        <div className="login-header">
          <h1>Create Patient Account</h1>
        </div>

        <div className="login-card">
          <form className="login-form" onSubmit={createAccount}>
            <div className="form-group">
              <label>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <button className="submit-btn">Create Account</button>
          </form>
        </div>

        <button className="back-btn" onClick={() => setCurrentPage("home")}>← Back</button>
      </div>
    );
  };

  /* -------------------- DOCTOR SIGNUP -------------------- */
  const SignUpDoctor = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const create = (e) => {
      e.preventDefault();
      if (!name || !email || !password) return alert("Fill all fields");
      if (users.find(u => u.email === email)) return alert("Email already exists");

      const newUser = { name, email, password, role: "doctor" };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setCurrentPage("dashboard");
    };

    return (
      <div className="login-container">
        <div className="login-header"><h1>Create Doctor Account</h1></div>

        <div className="login-card">
          <form className="login-form" onSubmit={create}>
            <div className="form-group"><label>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className="form-group"><label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div className="form-group"><label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>

            <button className="submit-btn">Create Account</button>
          </form>
        </div>

        <button className="back-btn" onClick={() => setCurrentPage("login")}>← Back</button>
      </div>
    );
  };

  /* -------------------- PHARMACIST SIGNUP -------------------- */
  const SignUpPharmacist = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const create = (e) => {
      e.preventDefault();
      if (!name || !email || !password) return alert("Fill all fields");
      if (users.find(u => u.email === email)) return alert("Email already exists");

      const newUser = { name, email, password, role: "pharmacist" };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setCurrentPage("dashboard");
    };

    return (
      <div className="login-container">
        <div className="login-header"><h1>Create Pharmacist Account</h1></div>

        <div className="login-card">
          <form className="login-form" onSubmit={create}>
            <div className="form-group"><label>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} required /></div>
            <div className="form-group"><label>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
            <div className="form-group"><label>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></div>

            <button className="submit-btn">Create Account</button>
          </form>
        </div>

        <button className="back-btn" onClick={() => setCurrentPage("login")}>← Back</button>
      </div>
    );
  };

  /* -------------------- LOGIN -------------------- */
  const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");

    const submit = (e) => {
      e.preventDefault();
      const found = users.find(
        u => u.email === email && u.password === password && u.role === role
      );

      if (!found) return alert("Invalid credentials!");

      setCurrentUser(found);
      setCurrentPage("dashboard");
    };

    return (
      <div className="login-container">
        <div className="login-header">
          <h1>Sign In</h1>
        </div>

        <div className="login-card">
          <form className="login-form" onSubmit={submit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email}
                onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" value={password}
                onChange={e => setPassword(e.target.value)} required />
            </div>

            <p>
              Sign in as:
              <span onClick={() => setRole("patient")}
                className={role === "patient" ? "active-role" : ""}>
                Patient
              </span> |
              <span onClick={() => setRole("doctor")}
                className={role === "doctor" ? "active-role" : ""}>
                Doctor
              </span> |
              <span onClick={() => setRole("pharmacist")}
                className={role === "pharmacist" ? "active-role" : ""}>
                Pharmacist
              </span>
            </p>

            <button className="submit-btn">Sign In</button>
          </form>

          <p style={{ marginTop: 10 }}>
            New user?{" "}
            <button className="link-btn" onClick={() => setCurrentPage("signup")}>Create Patient</button>{" "}
            |{" "}
            <button className="link-btn" onClick={() => setCurrentPage("signupDoctor")}>Create Doctor</button>{" "}
            |{" "}
            <button className="link-btn" onClick={() => setCurrentPage("signupPharmacist")}>Create Pharmacist</button>
          </p>
        </div>

        <button className="back-btn" onClick={() => setCurrentPage("home")}>← Back</button>
      </div>
    );
  };

  /* -------------------- BOOK APPOINTMENT (UPDATED WITH DATE CHECK) -------------------- */
  const BookAppointmentPage = () => {
    const doctors = users.filter(u => u.role === "doctor");

    const docList = doctors.length
      ? doctors
      : [
          { name: "Dr. Anita Sharma", email: "dr.anita@example.com" },
          { name: "Dr. Rahul Mehta", email: "dr.rahul@example.com" }
        ];

    const [doctor, setDoctor] = useState(docList[0]?.email || "");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const book = (e) => {
      e.preventDefault();
      if (!doctor || !date || !time) return alert("Fill all fields");

      // prevent past dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(date);

      if (selectedDate < today) {
        alert("You cannot book an appointment for past dates.");
        return;
      }

      const newA = {
        id: Date.now(),
        doctor,
        patient: currentUser.email,
        date,
        time,
        status: "scheduled"
      };

      setAppointments(prev => [...prev, newA]);
      setCurrentPage("myAppointments");
    };

    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1 style={{ color: "white" }}>Book Appointment</h1>

          <div className="login-card">
            <form className="login-form" onSubmit={book}>
              <div className="form-group">
                <label>Doctor</label>
                <select value={doctor} onChange={e => setDoctor(e.target.value)}>
                  {docList.map((d, i) => (
                    <option key={i} value={d.email}>
                      {d.name} ({d.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date</label>
                <input type="date" value={date}
                  onChange={e => setDate(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Time</label>
                <input type="time" value={time}
                  onChange={e => setTime(e.target.value)} />
              </div>

              <button className="submit-btn">Book Appointment</button>
            </form>
          </div>

          <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
        </div>
      </div>
    );
  };

  /* -------------------- REST OF THE SCREENS (UNCHANGED) -------------------- */

  const MyAppointments = () => {
    const my = appointments.filter(a => a.patient === currentUser.email);
    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1 style={{ color: "white" }}>My Appointments</h1>

          {my.length === 0 ? (
            <p style={{ color: "white" }}>No appointments yet.</p>
          ) : (
            my.map(a => (
              <div key={a.id} className="dashboard-card">
                <h3>Dr: {a.doctor}</h3>
                <p>Date: {a.date} | Time: {a.time}</p>
                <p>Status: {a.status}</p>
              </div>
            ))
          )}

          <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
        </div>
      </div>
    );
  };

  const PaymentPage = () => {
    const [amount, setAmount] = useState("");
    const [method, setMethod] = useState("card");
    const [card, setCard] = useState("");

    const pay = (e) => {
      e.preventDefault();
      if (!amount) return alert("Enter amount");

      const rec = {
        id: Date.now(),
        user: currentUser.email,
        amount: parseFloat(amount),
        method,
        card: method === "card" ? card : null,
        date: new Date().toISOString()
      };

      setPayments(prev => [...prev, rec]);
      alert("Payment successful (mock)");
      setCurrentPage("dashboard");
    };

    const myPayments = payments.filter(p => p.user === currentUser.email);

    return (
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h1 style={{ color: "white" }}>Payments</h1>

          <div className="login-card">
            <form onSubmit={pay}>
              <div className="form-group">
                <label>Amount (INR)</label>
                <input type="number" min="1"
                  value={amount} onChange={e => setAmount(e.target.value)} />
              </div>

              <div className="form-group">
                <label>Method</label>
                <select value={method}
                  onChange={e => setMethod(e.target.value)}>
                  <option value="card">Card</option>
                  <option value="upi">UPI</option>
                </select>
              </div>

              {method === "card" && (
                <div className="form-group">
                  <label>Card number</label>
                  <input value={card}
                    onChange={e => setCard(e.target.value)} />
                </div>
              )}

              <button className="submit-btn">Pay</button>
            </form>
          </div>

          <h3 style={{ color: "white", marginTop: 20 }}>Your Payments</h3>
          {myPayments.map(p => (
            <div key={p.id} className="dashboard-card">
              <h4>₹{p.amount}</h4>
              <p>{p.method} | {new Date(p.date).toLocaleString()}</p>
            </div>
          ))}

          <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
        </div>
      </div>
    );
  };

  const DoctorAllAppointments = () => (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 style={{ color: "white" }}>Doctor — All Appointments</h1>

        {appointments.map(a => (
          <div key={a.id} className="dashboard-card">
            <h3>Patient: {a.patient}</h3>
            <p>Date: {a.date} | Time: {a.time}</p>
          </div>
        ))}

        <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
      </div>
    </div>
  );

  const DoctorPatientRecords = () => (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 style={{ color: "white" }}>Patient Records</h1>

        {medicalRecords.map((r, i) => (
          <div key={i} className="dashboard-card">
            <h3>{r.patient}</h3>
            <p>{r.title} | {r.date}</p>
            <p>{r.report}</p>
          </div>
        ))}

        <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
      </div>
    </div>
  );

  const DoctorConsultations = () => (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 style={{ color: "white" }}>Consultations</h1>

        {consultations.map((c, i) => (
          <div key={i} className="dashboard-card">
            <h3>Patient: {c.patient}</h3>
            <p>{c.date} — {c.status}</p>
          </div>
        ))}

        <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
      </div>
    </div>
  );

  const DoctorManagePrescriptions = () => (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 style={{ color: "white" }}>Prescriptions</h1>

        {prescriptions.map((p, i) => (
          <div key={i} className="dashboard-card">
            <h3>Patient: {p.patient}</h3>
            <p>{p.medicine} — {p.dosage}</p>
          </div>
        ))}

        <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
      </div>
    </div>
  );

  const PharmacistPrescriptions = () => (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 style={{ color: "white" }}>Pharmacist — Prescriptions</h1>
        {prescriptions.map((p, i) => (
          <div key={i} className="dashboard-card">
            <h3>Patient: {p.patient}</h3>
            <p>{p.medicine} | {p.dosage}</p>
          </div>
        ))}

        <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
      </div>
    </div>
  );

  const PharmacistOrders = () => (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 style={{ color: "white" }}>Pharmacist — Orders</h1>
        <div className="dashboard-card">
          <h3>Coming Soon…</h3>
        </div>
        <button className="back-btn" onClick={() => setCurrentPage("dashboard")}>← Back</button>
      </div>
    </div>
  );

  /* -------------------- DASHBOARD -------------------- */
  const Dashboard = () => {
    if (!currentUser) {
      return (
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h1 style={{ color: "white" }}>Please sign in</h1>
            <button className="submit-btn" onClick={() => setCurrentPage("login")}>Go to Login</button>
          </div>
        </div>
      );
    }

    const role = currentUser.role;

    const patientCards = [
      { title: "Book Appointment", page: "bookAppointment" },
      { title: "My Appointments", page: "myAppointments" },
      { title: "Medical Records", page: "medicalRecords" },
      { title: "Prescription History", page: "prescriptions" },
      { title: "Payments", page: "payments" }
    ];

    const doctorCards = [
      { title: "All Appointments", page: "doctorAppointments" },
      { title: "Patient Records", page: "doctorRecords" },
      { title: "Consultations", page: "doctorConsultations" },
      { title: "Prescriptions", page: "doctorPrescriptions" }
    ];

    const pharmacistCards = [
      { title: "Prescriptions", page: "pharmacistPrescriptions" },
      { title: "Orders", page: "pharmacistOrders" }
    ];

    const cards =
      role === "doctor" ? doctorCards :
      role === "pharmacist" ? pharmacistCards :
      patientCards;

    return (
      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <div className="nav-brand"><h2>🩺 MediCare</h2></div>
          <div className="nav-actions">
            <span className="user-role">Logged in as {currentUser.name}</span>
            <button className="logout-btn"
              onClick={() => { setCurrentUser(null); setCurrentPage("home"); }}>
              Logout
            </button>
          </div>
        </nav>

        <div className="dashboard-content">
          <h1 style={{ color: "white" }}>
            {role === "doctor" ? "Doctor Portal" :
             role === "pharmacist" ? "Pharmacist Portal" :
             "Patient Portal"}
          </h1>

          <div className="dashboard-grid">
            {cards.map((c, i) => (
              <div key={i} className="dashboard-card">
                <h3>{c.title}</h3>
                <button className="submit-btn"
                  onClick={() => setCurrentPage(c.page)}>Access</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /* -------------------- ROUTER -------------------- */
  const renderPage = () => {
    switch (currentPage) {
      case "home": return <Home />;
      case "signup": return <SignUp />;
      case "signupDoctor": return <SignUpDoctor />;
      case "signupPharmacist": return <SignUpPharmacist />;
      case "login": return <Login />;
      case "dashboard": return <Dashboard />;

      case "bookAppointment":
        return currentUser?.role === "patient" ? <BookAppointmentPage /> : <Login />;
      case "myAppointments":
        return currentUser?.role === "patient" ? <MyAppointments /> : <Login />;

      case "payments":
        return currentUser ? <PaymentPage /> : <Login />;

      case "medicalRecords":
        return currentUser ? <PatientMedicalRecords /> : <Login />;
      case "prescriptions":
        return currentUser ? <PatientPrescriptions /> : <Login />;

      case "doctorAppointments":
        return currentUser?.role === "doctor" ? <DoctorAllAppointments /> : <Login />;
      case "doctorRecords":
        return currentUser?.role === "doctor" ? <DoctorPatientRecords /> : <Login />;
      case "doctorConsultations":
        return currentUser?.role === "doctor" ? <DoctorConsultations /> : <Login />;
      case "doctorPrescriptions":
        return currentUser?.role === "doctor" ? <DoctorManagePrescriptions /> : <Login />;

      case "pharmacistPrescriptions":
        return currentUser?.role === "pharmacist" ? <PharmacistPrescriptions /> : <Login />;
      case "pharmacistOrders":
        return currentUser?.role === "pharmacist" ? <PharmacistOrders /> : <Login />;

      default:
        return <Home />;
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;