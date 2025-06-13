import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/DaftarLayanan.css";
import "../css/global.css"

const DaftarLayanan = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [layanan, setLayanan] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/layanan")
      .then((res) => res.json())
      .then((data) => setLayanan(data))
      .catch(() => setLayanan([]));
  }, []);

  const handleLogoutClick = () => setShowLogoutModal(true);
  const handleCloseModal = () => setShowLogoutModal(false);
  const handleConfirmLogout = () => {
    window.location.href = "";
  };

  // Untuk modal hapus
  const handleDeleteClick = (item) => {
    setSelectedLayanan(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedLayanan(null);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5000/layanan/${selectedLayanan.id_layanan}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setLayanan(layanan.filter(l => l.id_layanan !== selectedLayanan.id_layanan));
        }
        setShowDeleteModal(false);
        setSelectedLayanan(null);
      });
  };

  return (
    <div className="global-layout">
      <main className="global-main">
        <div className="daftarlayanan-card">
          <div className="daftarlayanan-card-header">
            <h2 className="daftarlayanan-title">Daftar Layanan</h2>
            <button className="btn-tambah-layanan" onClick={() => navigate("/layanan/tambah")}>
              + Tambah Layanan
            </button>
          </div>
          <div className="daftarlayanan-table-wrapper">
            <table className="daftarlayanan-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No</th>
                  <th style={{ textAlign: "center" }}>Layanan</th>
                  <th style={{ textAlign: "center" }}>Tarif Per Meter</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {layanan.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>Tidak ada data</td>
                  </tr>
                ) : (
                  layanan.map((item, idx) => (
                    <tr key={item.id_layanan || idx}>
                      <td style={{ textAlign: "center" }}>{idx + 1}</td>
                      <td style={{ textAlign: "center" }}>{item.nama_layanan}</td>
                      <td style={{ textAlign: "center" }}>{item.tarif ? `Rp ${item.tarif}` : '-'}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/layanan/edit/${item.id_layanan}`)}
                          title="Edit"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteClick(item)}
                          title="Hapus"
                          style={{ marginLeft: 8 }}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      {/* Modal Hapus */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#ffb74d" strokeWidth="4"/>
                <text x="50%" y="54%" textAnchor="middle" fill="#ffb74d" fontSize="48px" fontWeight="bold" dy=".3em">!</text>
              </svg>
            </div>
            <div className="modal-title">Hapus Layanan</div>
            <div className="modal-text">Anda yakin ingin menghapus layanan ini?</div>
            <div className="modal-actions">
              <button className="btn-logout" onClick={handleConfirmDelete}>Ya, Hapus</button>
              <button className="btn-cancel" onClick={handleCloseDeleteModal}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarLayanan;