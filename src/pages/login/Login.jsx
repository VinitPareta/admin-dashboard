import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../../features/auth/authSlice";
import Footer from "../../components/Footer";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const session = useAppSelector((state) => state.auth.session);
  const status = useAppSelector((state) => state.auth.status);
  const errorMessage = useAppSelector((state) => state.auth.error);
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/app/main";

  if (session) {
    return <Navigate replace to={from} />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(result)) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div style={styles.root}>
      {/* background effects */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />
      <div style={styles.bgOrb3} />
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
            Manage your
            <br />
            <span style={styles.heroAccent}>workspace</span>
            <br />
            with ease.
          </h1>
          <p style={styles.heroDesc}>
            A powerful admin dashboard to manage users, posts, and analytics all
            in one place.
          </p>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <span style={styles.statNum}>99%</span>
              <span style={styles.statLabel}>Uptime</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>10k+</span>
              <span style={styles.statLabel}>Users</span>
            </div>
            <div style={styles.statDivider} />
            <div style={styles.stat}>
              <span style={styles.statNum}>Fast</span>
              <span style={styles.statLabel}>Performance</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - FORM */}
        <div style={styles.rightPanel}>
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Welcome back</h2>
              <p style={styles.cardSubtitle}>Sign in to your account</p>
            </div>

            {errorMessage && (
              <div style={styles.alert}>
                <span>⚠ </span>
                {errorMessage}
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
                    value={credentials.login}
                    required
                    onChange={(e) =>
                      setCredentials((c) => ({ ...c, login: e.target.value }))
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
                    placeholder="Enter your password"
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
                {status === "loading" ? "⟳ Signing in..." : "Sign In →"}
              </button>
            </form>

            <div style={styles.cardFooter}>
              <span style={styles.footerText}>Don't have an account?</span>
              <Link to="/register" style={styles.footerLink}>
                Create account
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
    left: "-100px",
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
    right: "200px",
    pointerEvents: "none",
  },
  bgOrb3: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)",
    top: "50%",
    right: "-50px",
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
  stats: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    padding: "20px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  statNum: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  statLabel: {
    color: "rgba(255,255,255,0.35)",
    fontSize: "11px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontFamily: "monospace",
  },
  statDivider: {
    width: "1px",
    height: "30px",
    background: "rgba(255,255,255,0.1)",
  },
  rightPanel: {
    width: "400px",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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

export default Login;
