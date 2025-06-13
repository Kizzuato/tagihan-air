import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/DashboardAdmin.css";

const DashboardAdmin = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    // Lakukan proses logout di sini, misal redirect ke login
    // localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <img src="https://img.icons8.com/ios-filled/100/ffffff/water.png" alt="Logo Air" />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard-admin" style={{ color: "inherit", textDecoration: "none" }}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/pemakaian" style={{ color: "inherit", textDecoration: "none" }}>
                Pemakaian
              </Link>
            </li>
            <li>
              <Link to="/tagihan" style={{ color: "inherit", textDecoration: "none" }}>
                Tagihan
              </Link>
            </li>
            <li>
              <Link to="/tagihan-lunas" style={{ color: "inherit", textDecoration: "none" }}>
                Tagihan Lunas
              </Link>
            </li>
            <li>
              <Link to="/pelanggan" style={{ color: "inherit", textDecoration: "none" }}>
                Pelanggan
              </Link>
            </li>
            <li>
              <Link to="/layanan" style={{ color: "inherit", textDecoration: "none" }}>
                Layanan
              </Link>
            </li>
            <li style={{ cursor: "pointer" }} onClick={handleLogoutClick}>Keluar</li>
          </ul>
        </nav>
      </aside>
      <main className="admin-main">
        <h2 className="admin-title">Selamat Datang</h2>
        <div className="admin-desc">
          Administrator, Di Aplikasi Pembayaran Tagihan Air.
        </div>
        <div className="admin-cards">
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-icon" role="img" aria-label="user-group">
                <img src="https://img.icons8.com/ios-filled/40/1976d2/group-foreground-selected.png" alt="Data Pelanggan" />
              </span>
              <span className="admin-card-title">Data Pelanggan</span>
            </div>
            <div className="admin-card-content">
              <div><b>0</b> Pelanggan Aktif</div>
              <div><b>0</b> Pelanggan Non Aktif</div>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-icon" role="img" aria-label="bill">
                <img src="https://img.icons8.com/ios-filled/40/1976d2/bank-cards.png" alt="Data Tagihan" />
              </span>
              <span className="admin-card-title">Data Tagihan</span>
            </div>
            <div className="admin-card-content">
              <div><b>0</b> Tagihan Belum Bayar</div>
              <div><b>0</b> Tagihan Lunas</div>
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

export default DashboardAdmin;