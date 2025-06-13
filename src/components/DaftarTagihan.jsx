import  { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import "../css/DaftarTagihan.css";
import "../css/global.css"

const DaftarTagihan = () => {
  const [tagihan, setTagihan] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTagihan, setSelectedTagihan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/tagihan")
      .then((res) => res.json())
      .then((data) => setTagihan(Array.isArray(data) ? data : []))
      .catch(() => setTagihan([]));
  }, []);
  const handleDeleteClick = (item) => {
    setSelectedTagihan(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedTagihan(null);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5000/tagihan/${selectedTagihan.id_tagihan}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTagihan(tagihan.filter(t => t.id_tagihan !== selectedTagihan.id_tagihan));
        }
        setShowDeleteModal(false);
        setSelectedTagihan(null);
      });
  };

  return (
    <div className="global-layout">
      <main className="global-main">
        <div className="daftartagihan-card">
          <div className="daftartagihan-card-header">
            <h2 className="daftartagihan-title">Daftar Tagihan</h2>
          </div>
          <div className="daftartagihan-table-wrapper">
            <table className="daftartagihan-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Tagihan</th>
                  <th style={{ textAlign: "center" }}>ID Pakai</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>Tidak ada data</td>
                  </tr>
                ) : (
                  tagihan.map((item, idx) => (
                    <tr key={item.id_tagihan || idx}>
                      <td style={{ textAlign: "center" }}>{idx + 1}</td>
                      <td style={{ textAlign: "center" }}>{item.status}</td>
                      <td style={{ textAlign: "center" }}>{item.tagihan}</td>
                      <td style={{ textAlign: "center" }}>{item.id_pakai}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/tagihan/edit/${item.id_tagihan}`)}
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
      {/* Modal Logout */}
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
            <div className="modal-title">Hapus Tagihan</div>
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

export default DaftarTagihan;