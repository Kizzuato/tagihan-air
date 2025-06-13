import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/DashboardPelanggan.css";


const DashboardPelanggan = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    // Proses logout, misal hapus token dan redirect
    // localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="pelanggan-layout">
      <aside className="pelanggan-sidebar">
        <div className="pelanggan-logo">
          <img src="https://img.icons8.com/ios-filled/100/ffffff/water.png" alt="Logo Air" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard-pelanggan" style={{ color: "inherit", textDecoration: "none" }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/lihat-pemakaian" style={{ color: "inherit", textDecoration: "none" }}>
                Lihat Pemakaian
              </Link>
            </li>
            <li>
              <Link to="/lihat-tagihan" style={{ color: "inherit", textDecoration: "none" }}>
                Lihat Tagihan
              </Link>
            </li>
            <li style={{ cursor: "pointer" }} onClick={handleLogoutClick}>
              Keluar
            </li>
          </ul>
        </nav>
      </aside>
      <main className="pelanggan-main">
        <h2 className="pelanggan-title">Selamat Datang</h2>
        <div className="pelanggan-desc">
          Di Aplikasi Pembayaran Tagihan Air.
        </div>
        <div className="pelanggan-cards">
          <div className="pelanggan-card">
            <div className="pelanggan-card-header">
              <span role="img" aria-label="user" className="pelanggan-card-icon">👤</span>
              <span className="pelanggan-card-title">Info Akun</span>
            </div>
            <div className="pelanggan-card-content">
              <div><b>Nama:</b> Nama Pelanggan</div>
              <div><b>Status:</b> Aktif</div>
            </div>
          </div>
          <div className="pelanggan-card">
            <div className="pelanggan-card-header">
              <span role="img" aria-label="bill" className="pelanggan-card-icon">💧</span>
              <span className="pelanggan-card-title">Tagihan Air</span>
            </div>
            <div className="pelanggan-card-content">
              <div><b>Tagihan Belum Bayar:</b> 0</div>
              <div><b>Tagihan Lunas:</b> 0</div>
            </div>
          </div>
        </div>
      </main>
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#ffb74d" strokeWidth="4"/>
                <text x="50%" y="54%" textAnchor="middle" fill="#ffb74d" fontSize="48px" fontWeight="bold" dy=".3em">!</text>
              </svg>
            </div>
            <div className="modal-title">Keluar</div>
            <div className="modal-text">Anda yakin ingin keluar?</div>
            <div className="modal-actions">
              <button className="btn-logout" onClick={handleConfirmLogout}>Ya, Keluar</button>
              <button className="btn-cancel" onClick={handleCloseModal}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPelanggan;