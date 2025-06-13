import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/adminLayout.css";
import "../css/global.css"
import { Outlet } from "react-router-dom";

const CustLayout = ({ children }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutClick = () => setShowLogoutModal(true);
    const handleCloseModal = () => setShowLogoutModal(false);
    const handleConfirmLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/";
    };
    return (
        <>
            <aside className="admin-sidebar">
                <div className="admin-logo">
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
            {/* <main className="">{children}</main> */}
            <Outlet />

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <div className="modal-icon">
                            <svg width="80" height="80" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="36" fill="none" stroke="#ffb74d" strokeWidth="4" />
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
        </>
    )
}

export default CustLayout;