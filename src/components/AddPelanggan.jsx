import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DaftarPelanggan.css";

const AddPelanggan = () => {
  const [nama_pelanggan, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("AKTIF");
  const [layananId, setLayananId] = useState("");
  const [users, setUsers] = useState([]);
  const [layanans, setLayanans] = useState([]);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user, hanya yang levelnya pelanggan
    fetch("http://localhost:5000/user")
      .then(res => res.json())
      .then(data => {
        const onlyPelanggan = data.filter(user => user.level === "pelanggan");
        setUsers(onlyPelanggan);
      })
      .catch(() => setUsers([]));
    // Ambil data layanan
    fetch("http://localhost:5000/layanan")
      .then(res => res.json())
      .then(data => setLayanans(data))
      .catch(() => setLayanans([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nama_pelanggan || !alamat || !noHp || !userId || !status || !layananId) {
      setError("Semua kolom harus diisi!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/pelanggan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_pelanggan,
          alamat,
          no_hp: noHp,
          id_user: userId,
          status,
          id_layanan: layananId,
        }),
      });
      if (res.ok) {
        setShowSuccessModal(true);
      } else {
        setError("Gagal menambah pelanggan.");
      }
    } catch {
      setError("Gagal menambah pelanggan.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/pelanggan");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <h2 style={{
        textAlign: "center",
        color: "#5ba4e6",
        fontWeight: "bold",
        paddingTop: "32px",
        marginBottom: "24px"
      }}>
        Tambah Pelanggan
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
            <label style={{ fontWeight: "bold" }}>Nama Pelanggan:</label>
            <input
              type="text"
              value={nama_pelanggan}
              onChange={e => setNama(e.target.value)}
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
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Alamat:</label>
            <input
              type="text"
              value={alamat}
              onChange={e => setAlamat(e.target.value)}
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
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>No HP:</label>
            <input
              type="text"
              value={noHp}
              onChange={e => setNoHp(e.target.value)}
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
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>User:</label>
            <select
              value={userId}
              onChange={e => setUserId(e.target.value)}
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
            >
              <option value="">Pilih User</option>
              {users.map(user => (
                <option key={user.id_user} value={user.id_user}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Status:</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
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
            >
              <option value="AKTIF">AKTIF</option>
              <option value="TIDAK AKTIF">TIDAK AKTIF</option>
            </select>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontWeight: "bold" }}>Layanan:</label>
            <select
              value={layananId}
              onChange={e => setLayananId(e.target.value)}
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
            >
              <option value="">Pilih Layanan</option>
              {layanans.map(layanan => (
                <option key={layanan.id_layanan} value={layanan.id_layanan}>
                  {layanan.nama_layanan}
                </option>
              ))}
            </select>
          </div>
          {error && (
            <div style={{ color: "#e53935", marginBottom: 12 }}>{error}</div>
          )}
          <button
            type="submit"
            className="btn-tambah-pelanggan"
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
            <div className="modal-text">Data pelanggan berhasil disimpan.</div>
            <div className="modal-actions">
              <button className="btn-logout" style={{ background: "#4caf50" }} onClick={handleCloseSuccessModal}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPelanggan;