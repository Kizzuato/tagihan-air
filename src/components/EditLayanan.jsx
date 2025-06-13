import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditLayanan = () => {
  const [namaLayanan, setNamaLayanan] = useState("");
  const [tarif, setTarif] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { id_layanan } = useParams();

  useEffect(() => {
    getLayananById();
    // eslint-disable-next-line
  }, []);

  const getLayananById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/layanan/${id_layanan}`);
      setNamaLayanan(response.data.nama_layanan);
      setTarif(response.data.tarif);
    } catch (error) {
      console.log(error);
    }
  };

  async function updateLayanan(e) {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/layanan/${id_layanan}`, {
        nama_layanan: namaLayanan,
        tarif: tarif
      });
      setShowSuccess(true); // Tampilkan popup sukses
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/layanan");
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", background: "#f5fafd"
    }}>
      <h2 style={{ color: "#5ba4e6", fontWeight: "bold", margin: "32px 0 18px 0", textAlign: "center" }}>
        Edit Layanan
      </h2>
      <form
        onSubmit={updateLayanan}
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 1px 8px rgba(25, 118, 210, 0.08)",
          padding: "32px 28px",
          minWidth: "340px",
          display: "flex",
          flexDirection: "column",
          gap: "18px"
        }}
      >
        <div>
          <label style={{ fontWeight: "600" }}>Nama Layanan:</label>
          <input
            type="text"
            value={namaLayanan}
            onChange={e => setNamaLayanan(e.target.value)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "8px 10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <div>
          <label style={{ fontWeight: "600" }}>Tarif Per Meter:</label>
          <input
            type="number"
            value={tarif}
            onChange={e => setTarif(e.target.value)}
            style={{
              width: "100%",
              marginTop: "6px",
              padding: "8px 10px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            background: "#5ba4e6",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "10px 28px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "8px"
          }}
        >
          Simpan
        </button>
      </form>

      {/* Popup sukses */}
      {showSuccess && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
        }}>
          <div style={{
            background: "#fff", borderRadius: 10, padding: "32px 28px", minWidth: 320, boxShadow: "0 2px 12px rgba(0,0,0,0.12)", textAlign: "center"
          }}>
            <div style={{ fontSize: 48, color: "#ffb300", marginBottom: 8 }}>!</div>
            <div style={{ fontWeight: "bold", fontSize: 22, marginBottom: 8 }}>Data Berhasil Diupdate</div>
            <div style={{ marginBottom: 24 }}>Data layanan berhasil diupdate.</div>
            <button
              onClick={handleCloseSuccess}
              style={{
                background: "#4caf50", color: "#fff", border: "none", borderRadius: 6,
                padding: "10px 28px", fontWeight: "600", fontSize: "1rem", cursor: "pointer"
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditLayanan;