import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DaftarLayanan.css";

const AddLayanan = () => {
  const [namaLayanan, setNamaLayanan] = useState("");
  const [tarifPerMeter, setTarifPerMeter] = useState(0);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!namaLayanan || tarifPerMeter < 0) {
      setError("Nama layanan dan tarif harus diisi!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/layanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_layanan: namaLayanan,
          tarif: tarifPerMeter, // <-- sesuaikan dengan nama kolom di database
        }),
      });
      if (res.ok) {
        setShowSuccessModal(true);
      } else {
        setError("Gagal menambah layanan.");
      }
    } catch {
      setError("Gagal menambah layanan.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/layanan");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <h2 style={{
        textAlign: "center",
        color: "#5ba4e6",
        fontWeight: "bold",
        marginTop: "32px",
        marginBottom: "24px"
      }}>
        Tambah Layanan
      </h2>
      <div style={{
        maxWidth: 400,
        margin: "0 auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
        padding: "32px 28px"
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Nama Layanan:</label>
            <input
              type="text"
              value={namaLayanan}
              onChange={e => setNamaLayanan(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7"
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontWeight: "bold" }}>Tarif Per Meter:</label>
            <input
              type="number"
              min={0}
              value={tarifPerMeter}
              onChange={e => setTarifPerMeter(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7"
              }}
              required
            />
          </div>
          {error && (
            <div style={{ color: "#e53935", marginBottom: 12 }}>{error}</div>
          )}
          <button
            type="submit"
            className="btn-tambah-layanan"
            style={{
              width: 100,
              fontWeight: "bold",
              fontSize: "1rem",
              marginTop: 8
            }}
          >
            Simpan
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="36" fill="none" stroke="#4caf50" strokeWidth="4"/>
                <polyline points="28,42 38,52 54,34" fill="none" stroke="#4caf50" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="modal-title" style={{ color: "#4caf50" }}>Berhasil!</div>
            <div className="modal-text">Data layanan berhasil disimpan.</div>
            <div className="modal-actions">
              <button className="btn-logout" style={{ background: "#4caf50" }} onClick={handleCloseSuccessModal}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLayanan;