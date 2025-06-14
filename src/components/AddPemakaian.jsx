import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/DaftarPemakaian.css";

const AddPemakaian = () => {
  const [id_pelanggan, setIdPelanggan] = useState("");
  const [id_bulan, setIdBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [awal, setAwal] = useState(0);
  const [akhir, setAkhir] = useState("");
  const [pakai, setPakai] = useState(0);
  const [pelangganList, setPelangganList] = useState([]);
  const [bulanList, setBulanList] = useState([]);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  // Ambil data pelanggan & bulan
  // Ambil data pelanggan dan bulan (hanya sekali saat awal)
  useEffect(() => {
    fetch("http://localhost:5000/pelanggan")
      .then((res) => res.json())
      .then((data) => setPelangganList(data))
      .catch(() => setPelangganList([]));

    fetch("http://localhost:5000/bulan")
      .then((res) => res.json())
      .then((data) => setBulanList(data))
      .catch(() => setBulanList([]));
  }, []);

  // Ambil meter awal berdasarkan pilihan
  useEffect(() => {
    const getMeterAwal = async () => {
      if (id_pelanggan && id_bulan && tahun && bulanList.length > 0) {
        const idxBulan = bulanList.findIndex(
          (b) => String(b.id_bulan) === String(id_bulan)
        );
        let prevBulan = null;
        let prevTahun = tahun;

        if (idxBulan > 0) {
          prevBulan = bulanList[idxBulan - 1].id_bulan;
        } else if (idxBulan === 0) {
          prevBulan = bulanList[bulanList.length - 1].id_bulan;
        }

        console.log("PARAMS:", { id_pelanggan, prevBulan, prevTahun });
        if (prevBulan) {
          try {
            const res = await fetch(
              `http://localhost:5000/pakai/last?pelanggan=${id_pelanggan}&bulan=${prevBulan}&tahun=${parseInt(tahun)}`
            );
            const data = await res.json();
            console.log("HASIL: ", data);
            if (data && data.akhir !== undefined && data.akhir !== null) {
              setAwal(data.akhir);
              return;
            }
          } catch (err) {
            console.log("API ERROR:", err);
          }
        }
        setAwal(0);
      } else {
        setAwal(0);
      }
    };

    getMeterAwal();
  }, [id_pelanggan, id_bulan, tahun, bulanList]);

  // Hitung pakai otomatis
  useEffect(() => {
    const awalNum = parseInt(awal) || 0;
    const akhirNum = parseInt(akhir) || 0;
    const hasil = akhirNum - awalNum;
    setPakai(hasil >= 0 ? hasil : 0);
  }, [awal, akhir]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!id_pelanggan || !id_bulan || !tahun || akhir === "") {
      setError("Semua kolom harus diisi!");
      return;
    }
    if (parseInt(akhir) < parseInt(awal)) {
      setError("Meter Akhir tidak boleh kurang dari Meter Awal!");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/pakai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_pelanggan,
          id_bulan,
          tahun,
          awal,
          akhir,
          pakai,
        }),
      });
      if (res.ok) {
        setShowSuccessModal(true);
      } else {
        setError("Gagal menambah data pemakaian.");
      }
    } catch {
      setError("Gagal menambah data pemakaian.");
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/pemakaian");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f6fa" }}>
      <h2
        style={{
          textAlign: "center",
          color: "#5ba4e6",
          fontWeight: "bold",
          paddingTop: "32px",
          marginBottom: "24px",
        }}
      >
        Tambah Pemakaian
      </h2>
      <div
        style={{
          maxWidth: 400,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
          padding: "32px 28px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Pelanggan:</label>
            <select
              value={id_pelanggan}
              onChange={(e) => setIdPelanggan(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7",
              }}
              required
            >
              <option value="">Pilih Pelanggan</option>
              {pelangganList.map((p) => (
                <option key={p.id_pelanggan} value={p.id_pelanggan}>
                  {p.nama_pelanggan}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Bulan:</label>
            <select
              value={id_bulan}
              onChange={(e) => setIdBulan(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7",
              }}
              required
            >
              <option value="">Pilih Bulan</option>
              {bulanList.map((b) => (
                <option key={b.id_bulan} value={b.id_bulan}>
                  {b.nama_bulan}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Tahun:</label>
            <input
              type="number"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Meter Awal (m³):</label>
            <input
              type="number"
              value={awal}
              readOnly
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7",
              }}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontWeight: "bold" }}>Meter Akhir (m³):</label>
            <input
              type="number"
              value={akhir}
              onChange={(e) =>
                setAkhir(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontWeight: "bold" }}>Pakai (m³):</label>
            <input
              type="number"
              value={pakai}
              readOnly
              style={{
                width: "100%",
                padding: "8px 12px",
                borderRadius: 5,
                border: "1px solid #ddd",
                marginTop: 6,
                fontSize: "1rem",
                background: "#f7f7f7",
              }}
            />
          </div>
          {error && (
            <div style={{ color: "#e53935", marginBottom: 12 }}>{error}</div>
          )}
          <button
            type="submit"
            className="btn-tambah-pemakaian"
            style={{
              width: 100,
              fontWeight: "bold",
              fontSize: "1rem",
              marginTop: 8,
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
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="4"
                />
                <polyline
                  points="28,42 38,52 54,34"
                  fill="none"
                  stroke="#4caf50"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="modal-title" style={{ color: "#4caf50" }}>
              Berhasil!
            </div>
            <div className="modal-text">Data pemakaian berhasil disimpan.</div>
            <div className="modal-actions">
              <button
                className="btn-logout"
                style={{ background: "#4caf50" }}
                onClick={handleCloseSuccessModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPemakaian;
