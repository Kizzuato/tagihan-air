import React, { useState } from "react";
import "../css/ResetPassword.css";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/user/ubah-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Password berhasil diubah!");
        setUsername("");
        setOldPassword("");
        setNewPassword("");
      } else {
        setError(data.message || "Gagal mengubah password.");
      }
    } catch {
      setError("Terjadi kesalahan server.");
    }
  };

  return (
    <div className="reset-password-container">
      <form className="reset-password-form" onSubmit={handleSubmit}>
        <h2>Ubah Password</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password Lama</label>
          <div className="input-password-wrapper">
            <input
              type={showOld ? "text" : "password"}
              name="old_password"
              id="old_password"
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowOld(v => !v)}
              tabIndex={0}
              role="button"
              aria-label="Show old password"
            >
              {showOld ? (
                // Mata terbuka
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path stroke="#888" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
                </svg>
              ) : (
                // Mata tertutup (dengan garis)
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path stroke="#888" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
                  <line x1="4" y1="20" x2="20" y2="4" stroke="#888" strokeWidth="2"/>
                </svg>
              )}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>Password Baru</label>
          <div className="input-password-wrapper">
            <input
              type={showNew ? "text" : "password"}
              name="new_password"
              id="new_password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <span
              className="toggle-password"
              onClick={() => setShowNew(v => !v)}
              tabIndex={0}
              role="button"
              aria-label="Show new password"
            >
              {showNew ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path stroke="#888" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24">
                  <path stroke="#888" strokeWidth="2" d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"/>
                  <circle cx="12" cy="12" r="3" stroke="#888" strokeWidth="2"/>
                  <line x1="4" y1="20" x2="20" y2="4" stroke="#888" strokeWidth="2"/>
                </svg>
              )}
            </span>
          </div>
        </div>
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}
        <button type="submit" className="btn-reset-password">Simpan</button>
      </form>
    </div>
  );
};

export default ResetPassword;