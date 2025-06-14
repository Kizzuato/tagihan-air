import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/DaftarPelanggan.css";
import "../css/global.css";

const DaftarPelanggan = () => {
  const [pelanggan, setPelanggan] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPelanggan, setSelectedPelanggan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/pelanggan")
      .then((res) => res.json())
      .then((data) => setPelanggan(data))
      .catch(() => setPelanggan([]));
  }, []);
  // Untuk modal hapus
  const handleDeleteClick = (item) => {
    setSelectedPelanggan(item);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPelanggan(null);
  };

  const handleConfirmDelete = () => {
    fetch(`http://localhost:5000/pelanggan/${selectedPelanggan.id_pelanggan}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setPelanggan(pelanggan.filter(p => p.id_pelanggan !== selectedPelanggan.id_pelanggan));
        }
        setShowDeleteModal(false);
        setSelectedPelanggan(null);
      });
  };

  return (
    <div className="global-layout">
      <main className="global-main">
        <div className="daftarpelanggan-card">
          <div className="daftarpelanggan-card-header">
            <h2 className="daftarpelanggan-title">Daftar Pelanggan</h2>
            <button className="btn-tambah-pelanggan" onClick={() => navigate("/pelanggan/tambah")}>
              + Tambah Pelanggan
            </button>
          </div>
          <div className="daftarpelanggan-table-wrapper">
            <table className="daftarpelanggan-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No</th>
                  <th style={{ textAlign: "center" }}>Nama</th>
                  <th style={{ textAlign: "center" }}>Alamat</th>
                  <th style={{ textAlign: "center" }}>No. HP</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pelanggan.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>Tidak ada data</td>
                  </tr>
                ) : (
                  pelanggan.map((item, idx) => (
                    <tr key={item.id_pelanggan || idx}>
                      <td style={{ textAlign: "center" }}>{idx + 1}</td>
                      <td style={{ textAlign: "center" }}>{item.nama_pelanggan}</td>
                      <td style={{ textAlign: "center" }}>{item.alamat}</td>
                      <td style={{ textAlign: "center" }}>{item.no_hp}</td>
                      <td style={{ textAlign: "center" }}>{item.status}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/pelanggan/edit/${item.id_pelanggan}`)}
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
            <div className="modal-title">Hapus Pelanggan</div>
            <div className="modal-text">Anda yakin ingin menghapus pelanggan ini?</div>
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

export default DaftarPelanggan;