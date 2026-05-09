import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (credentials.password !== credentials.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || "Registration failed");
        setStatus("failed");
        return;
      }

      setStatus("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("failed");
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.grid} />

      <div style={styles.container}>
        {/* LEFT PANEL */}
        <div style={styles.leftPanel}>
          <div style={styles.brand}>
            <div style={styles.brandIcon}>R</div>
            <span style={styles.brandName}>REACT</span>
            <span style={styles.brandSuffix}>DASHBOARD</span>
          </div>
          <h1 style={styles.heroTitle}>
            Join the
            <br />
            <span style={styles.heroAccent}>dashboard</span>
            <br />
            today.
          </h1>
          <p style={styles.heroDesc}>
            Create your admin account and start managing your workspace in
            minutes.
          </p>
          <div style={styles.features}>
            {[
              "Full dashboard access",
              "Manage users & posts",
              "Analytics & reports",
            ].map((f) => (
              <div key={f} style={styles.feature}>
                <span style={styles.featureIcon}>✓</span>
                <span style={styles.featureText}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Create account</h2>
              <p style={styles.cardSubtitle}>
                Fill in your details to get started
              </p>
            </div>

            {errorMessage && (
              <div style={styles.alert}>
                <span>⚠ </span>
                {errorMessage}
              </div>
            )}

            {status === "success" && (
              <div style={styles.successAlert}>
                <span>✓ </span>Account created! Redirecting to login...
              </div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Email address</label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>✉</span>
                  <input
                    style={styles.input}
                    type="email"
                    placeholder="admin@example.com"
                    value={credentials.email}
                    required
                    onChange={(e) =>
                      setCredentials((c) => ({ ...c, email: e.target.value }))
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#e53e3e")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Password</label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>🔒</span>
                  <input
                    style={styles.input}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={credentials.password}
                    required
                    onChange={(e) =>
                      setCredentials((c) => ({
                        ...c,
                        password: e.target.value,
                      }))
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#e53e3e")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)")
                    }
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Confirm password</label>
                <div style={styles.inputWrap}>
                  <span style={styles.inputIcon}>🔒</span>
                  <input
                    style={styles.input}
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={credentials.confirmPassword}
                    required
                    onChange={(e) =>
                      setCredentials((c) => ({
                        ...c,
                        confirmPassword: e.target.value,
                      }))
                    }
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#e53e3e")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)")
                    }
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowConfirm((v) => !v)}
                  >
                    {showConfirm ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{
                  ...styles.submitBtn,
                  opacity: status === "loading" ? 0.7 : 1,
                }}
                disabled={status === "loading"}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(229,62,62,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(229,62,62,0.3)";
                }}
              >
                {status === "loading"
                  ? "⟳ Creating account..."
                  : "Create Account →"}
              </button>
            </form>

            <div style={styles.cardFooter}>
              <span style={styles.footerText}>Already have an account?</span>
              <Link to="/login" style={styles.footerLink}>
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer className="text-center" />
    </div>
  );
};

const styles = {
  root: {
    minHeight: "100vh",
    background: "#0a0a0f",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Georgia, serif",
  },
  bgOrb1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(229,62,62,0.15) 0%, transparent 70%)",
    top: "-200px",
    right: "-100px",
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(229,62,62,0.08) 0%, transparent 70%)",
    bottom: "-100px",
    left: "200px",
    pointerEvents: "none",
  },
  grid: {
    position: "absolute",
    inset: "0",
    backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
    backgroundSize: "50px 50px",
    pointerEvents: "none",
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    gap: "80px",
    maxWidth: "1100px",
    margin: "0 auto",
    width: "100%",
    position: "relative",
    zIndex: 1,
  },
  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    maxWidth: "460px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  brandIcon: {
    width: "36px",
    height: "36px",
    background: "#e53e3e",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "monospace",
  },
  brandName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    letterSpacing: "3px",
    fontFamily: "monospace",
  },
  brandSuffix: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "12px",
    letterSpacing: "2px",
    fontFamily: "monospace",
  },
  heroTitle: {
    fontSize: "52px",
    fontWeight: 400,
    color: "#fff",
    lineHeight: 1.15,
    margin: 0,
  },
  heroAccent: {
    color: "#e53e3e",
    fontStyle: "italic",
  },
  heroDesc: {
    color: "rgba(255,255,255,0.45)",
    fontSize: "15px",
    lineHeight: 1.7,
    margin: 0,
    fontFamily: "monospace",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  featureIcon: {
    width: "22px",
    height: "22px",
    background: "rgba(229,62,62,0.15)",
    border: "1px solid rgba(229,62,62,0.3)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e53e3e",
    fontSize: "11px",
    flexShrink: 0,
    textAlign: "center",
    lineHeight: "22px",
  },
  featureText: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "14px",
    fontFamily: "monospace",
  },
  rightPanel: {
    width: "420px",
    flexShrink: 0,
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "40px",
    backdropFilter: "blur(20px)",
  },
  cardHeader: {
    marginBottom: "28px",
  },
  cardTitle: {
    color: "#fff",
    fontSize: "26px",
    fontWeight: 400,
    margin: "0 0 6px",
    fontFamily: "Georgia, serif",
  },
  cardSubtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "13px",
    margin: 0,
    fontFamily: "monospace",
  },
  alert: {
    background: "rgba(229,62,62,0.1)",
    border: "1px solid rgba(229,62,62,0.3)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#fc8181",
    fontSize: "13px",
    marginBottom: "20px",
    fontFamily: "monospace",
  },
  successAlert: {
    background: "rgba(72,187,120,0.1)",
    border: "1px solid rgba(72,187,120,0.3)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#68d391",
    fontSize: "13px",
    marginBottom: "20px",
    fontFamily: "monospace",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "11px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    fontFamily: "monospace",
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "14px",
    pointerEvents: "none",
    zIndex: 1,
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "13px 44px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "monospace",
    boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    padding: "4px",
  },
  submitBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #e53e3e, #c53030)",
    border: "none",
    borderRadius: "10px",
    padding: "14px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    letterSpacing: "1px",
    transition: "all 0.2s",
    boxShadow: "0 4px 15px rgba(229,62,62,0.3)",
    fontFamily: "monospace",
    marginTop: "4px",
  },
  cardFooter: {
    marginTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  footerText: {
    color: "rgba(255,255,255,0.35)",
    fontSize: "13px",
    fontFamily: "monospace",
  },
  footerLink: {
    color: "#e53e3e",
    fontSize: "13px",
    textDecoration: "none",
    fontFamily: "monospace",
    fontWeight: "bold",
  },
};

export default Register;
