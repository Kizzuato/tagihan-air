import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/DaftarPemakaian.css";
import "../css/global.css";

const DaftarPemakaian = () => {
  const [pemakaian, setPemakaian] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPemakaian, setSelectedPemakaian] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/pakai")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA PAKAI:", data); // Tambahkan ini untuk debug
        setPemakaian(Array.isArray(data) ? data : []);
      })
      .catch(() => setPemakaian([]));
  }, []);
  
  // Untuk modal hapus
  const handleDeleteClick = (item) => {
    setSelectedPemakaian(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPemakaian(null);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5000/pakai/${selectedPemakaian.id_pakai}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setPemakaian(pemakaian.filter(p => p.id_pakai !== selectedPemakaian.id_pakai));
        }
        setShowDeleteModal(false);
        setSelectedPemakaian(null);
      });
  };

  return (
    <div className="global-layout">
      <main className="global-main">
        <div className="daftarpemakaian-card">
          <div className="daftarpemakaian-card-header">
            <h2 className="daftarpemakaian-title">Daftar Pemakaian</h2>
            <button className="btn-tambah-pemakaian" onClick={() => navigate("/pemakaian/tambah")}>
              + Tambah Pemakaian
            </button>
          </div>
          <div className="daftarpemakaian-table-wrapper">
            <table className="daftarpemakaian-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No</th>
                  <th style={{ textAlign: "center" }}>Pelanggan</th>
                  <th style={{ textAlign: "center" }}>Bulan</th>
                  <th style={{ textAlign: "center" }}>Tahun</th>
                  <th style={{ textAlign: "center" }}>Meter³ Awal</th>
                  <th style={{ textAlign: "center" }}>Meter³ Akhir</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pemakaian.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>Tidak ada data</td>
                  </tr>
                ) : (
                  pemakaian.map((item, idx) => (
                    <tr key={item.id_pakai || idx}>
                      <td style={{ textAlign: "center" }}>{idx + 1}</td>
                      <td style={{ textAlign: "center" }}>{item.pelanggan?.nama_pelanggan || "-"}</td>
                      <td style={{ textAlign: "center" }}>{item.bulan?.nama_bulan || "-"}</td>
                      <td style={{ textAlign: "center" }}>{item.tahun}</td>
                      <td style={{ textAlign: "center" }}>{item.awal}</td>
                      <td style={{ textAlign: "center" }}>{item.akhir}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/pemakaian/edit/${item.id_pakai}`)}
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
            <div className="modal-title">Hapus Pemakaian</div>
            <div className="modal-text">Anda yakin ingin menghapus data ini?</div>
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

export default DaftarPemakaian;