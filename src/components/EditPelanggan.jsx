import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPelanggan = () => {
  const [nama_pelanggan, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noHp, setNoHp] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("AKTIF");
  const [layananId, setLayananId] = useState("");
  const [users, setUsers] = useState([]);
  const [layanans, setLayanans] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const { id_pelanggan } = useParams();

  useEffect(() => {
    getPelangganById();
    fetch("http://localhost:5000/user")
      .then(res => res.json())
      .then(data => {
        const onlyPelanggan = data.filter(user => user.level === "pelanggan");
        setUsers(onlyPelanggan);
      })
      .catch(() => setUsers([]));
    fetch("http://localhost:5000/layanan")
      .then(res => res.json())
      .then(data => setLayanans(data))
      .catch(() => setLayanans([]));
    // eslint-disable-next-line
  }, []);

  const getPelangganById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/pelanggan/${id_pelanggan}`);
      setNama(response.data.nama_pelanggan);
      setAlamat(response.data.alamat);
      setNoHp(response.data.no_hp);
      setUserId(response.data.id_user);
      setStatus(response.data.status);
      setLayananId(response.data.id_layanan);
    } catch (error) {
      console.log(error);
    }
  };

  async function updatePelanggan(e) {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pelanggan/${id_pelanggan}`, {
        nama_pelanggan,
        alamat,
        no_hp: noHp,
        id_user: userId,
        status,
        id_layanan: layananId,
      });
      setShowSuccess(true); // Tampilkan popup sukses
    } catch (error) {
      console.log(error);
    }
  }

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/pelanggan");
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", background: "#f5fafd"
    }}>
      <h2 style={{ color: "#5ba4e6", fontWeight: "bold", margin: "32px 0 18px 0", textAlign: "center" }}>
        Edit Pelanggan
      </h2>
      <form
        onSubmit={updatePelanggan}
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
          <label style={{ fontWeight: "600" }}>Nama Pelanggan:</label>
          <input
            type="text"
            value={nama_pelanggan}
            onChange={e => setNama(e.target.value)}
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
          <label style={{ fontWeight: "600" }}>Alamat:</label>
          <input
            type="text"
            value={alamat}
            onChange={e => setAlamat(e.target.value)}
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
          <label style={{ fontWeight: "600" }}>No. HP:</label>
          <input
            type="text"
            value={noHp}
            onChange={e => setNoHp(e.target.value)}
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
          <label style={{ fontWeight: "600" }}>User:</label>
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
        <div>
          <label style={{ fontWeight: "600" }}>Status:</label>
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
        <div>
          <label style={{ fontWeight: "600" }}>Layanan:</label>
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
            <div style={{ marginBottom: 24 }}>Data pelanggan berhasil diperbarui.</div>
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

export default EditPelanggan;