import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Registrasi.css";
import Swal from "sweetalert2";

export default function Registrasi() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword((v) => !v);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nama = e.target.nama.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const no_hp = e.target.no_hp.value;

    try {
      const res = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, username, password, no_hp, level: "pelanggan" }),
      });
      if (res.ok) {
        setError(false);
        console.log("Registrasi berhasil, akan tampil popup");
        Swal.fire({
          title: "Berhasil!",
          text: "Registrasi berhasil, silakan login.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
            navigate("");
        });    
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>
          Register to <b>Tagihan Air</b>
        </h2>
        <div className="form-group">
          <label>Nama</label>
          <input type="text" name="nama" placeholder="Nama Lengkap" required />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" placeholder="username" required />
        </div>
        <div className="form-group password-group">
          <label>Password</label>
          <div className="input-password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              required
            />
            <span className="toggle-password" onClick={togglePassword}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="#888"
                  strokeWidth="2"
                  d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
                />
                <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2" />
              </svg>
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>Nomor Telepon</label>
          <input type="text" name="no_hp" placeholder="08xxxxxxxxxx" required />
        </div>
        {error && <p className="error-msg">Registrasi gagal!</p>}
        <button type="submit" className="btn-register">
          Daftar
        </button>
        <p className="login-link">
          Sudah punya akun? <Link to="">Login di sini</Link>
        </p>
      </form>
    </div>
  );
}