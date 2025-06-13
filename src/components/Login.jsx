import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("user", JSON.stringify(data));
        if (data.level === "admin") {
          navigate("/dashboard-admin");
        } else if (data.level === "pelanggan") {
          navigate("/dashboard-pelanggan");
        } else {
          setError("Level user tidak dikenali.");
        }
      } else {
        setError(data.message || "Login gagal.");
      }
    } catch (err) {
      setError("Terjadi kesalahan server.");
    }
  };
  // ...existing code...
  return (
    <div className="login-bg">
      <div className="login-container">
        <h2 className="login-title">
          Login to <span className="brand">Tagihan Air</span>
        </h2>
        <form onSubmit={handleLogin}>
          <label className="login-label" htmlFor="username">
            Username
          </label>
          <input
            className="login-input"
            type="text"
            id="username"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <div className="password-wrapper">
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Your Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={0}
              role="button"
              aria-label="Show password"
            >
              {/* SVG dari Register.jsx */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z"
                  stroke="#bdbdbd"
                  strokeWidth="2"
                  fill="#eaf2ff"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3"
                  stroke="#bdbdbd"
                  strokeWidth="2"
                  fill="white"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="1.5"
                  fill="#bdbdbd"
                />
              </svg>
            </span>
          </div>
          <div className="login-options">
            <Link to="/forgot-password" className="forgot-password">
              Reset Password
            </Link>
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <div className="register-link">
          Belum punya akun?{" "}
          <Link to="/user/register" className="register">
            Registrasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;