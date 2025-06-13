import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/DaftarTagihanLunas.css";

const DaftarTagihanLunas = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    // Lakukan proses logout di sini, misal redirect ke login
    // localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="daftartagihanlunas-layout">
      <aside className="daftartagihanlunas-sidebar">
        <div className="daftartagihanlunas-logo">
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
      <main className="daftartagihanlunas-main">
        {/* Konten utama Daftar Layanan di sini */}
        <h2 className="daftartagihanlunas-title">Daftar Tagihan Lunas</h2>
        {/* dst... */}
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

export default DaftarTagihanLunas;