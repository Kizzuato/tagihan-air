import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const EditTagihan = () => {
  const [tagihanData, setTagihanData] = useState(null);
  const [uangBayar, setUangBayar] = useState("");
  const [uangKembali, setUangKembali] = useState("");
  const [tanggalBayar, setTanggalBayar] = useState(moment().format("YYYY-MM-DD"));
  const navigate = useNavigate();
  const { id_tagihan } = useParams();

  useEffect(() => {
    const getTagihanById = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/tagihan/${id_tagihan}`);
        const data = res.data;

        // Hitung tagihan jika belum dihitung
        if (data.tagihan === 0 && data.pakai) {
          const tarif = data.pakai.pelanggan.layanan.tarif;
          const total = data.pakai.pakai * tarif;
          data.tagihan = total;
        }

        setTagihanData(data);
      } catch (err) {
        console.error(err);
      }
    };

    getTagihanById();
  }, [id_tagihan]);

  useEffect(() => {
    if (uangBayar && tagihanData?.tagihan) {
      const kembali = parseInt(uangBayar) - parseInt(tagihanData.tagihan);
      setUangKembali(kembali >= 0 ? kembali : 0);
    }
  }, [uangBayar, tagihanData]);

  const handleBayar = async () => {
    try {
      await axios.post("http://localhost:5000/pembayaran", {
        id_tagihan: tagihanData.id_tagihan,
        tgl_bayar: tanggalBayar,
        uang_bayar: uangBayar,
        uang_kembalian: uangKembali,
      });

      await axios.patch(`http://localhost:5000/tagihan/${id_tagihan}`, {
        status: "sudah bayar",
        tagihan: tagihanData.tagihan,
      });

      alert("Pembayaran berhasil!");
      navigate("/tagihan");
    } catch (err) {
      console.error(err);
      alert("Gagal melakukan pembayaran.");
    }
  };

  if (!tagihanData) return <div style={{ padding: 32 }}>Memuat data tagihan...</div>;

  const {
    id_tagihan: id,
    status,
    tagihan,
    pakai: {
      pakai: jumlah_pakai,
      tahun,
      pelanggan: {
        nama_pelanggan,
        layanan: { nama_layanan, tarif },
      },
      bulan: { nama_bulan },
    },
  } = tagihanData;

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: "auto" }}>
      <h2 style={{ color: "#5ba4e6", marginBottom: 24 }}>Detail Tagihan</h2>

      {/* Table-style list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Row label="ID Tagihan | Nama Pelanggan" value={`${id} | ${nama_pelanggan}`} />
        <Row label="Bulan | Tahun" value={`${nama_bulan} | ${tahun}`} />
        <Row label="Layanan" value={nama_layanan} />
        <Row label="Tarif" value={`Rp${tarif.toLocaleString()}`} />
        <Row label="Pemakaian" value={`${jumlah_pakai} M³`} />
        <Row label="Total Tagihan" value={`Rp${tagihan.toLocaleString()}`} highlight />
        <Row label="Status" value={status} />
      </div>

      {/* Input pembayaran */}
      <div style={{ marginTop: 36 }}>
        <label>Uang Pembayaran (Rp):</label>
        <input
          type="number"
          value={uangBayar}
          onChange={(e) => setUangBayar(e.target.value)}
          style={inputStyle}
          required
        />

        <label style={{ marginTop: 18 }}>Uang Kembalian (Rp):</label>
        <input
          type="text"
          value={uangKembali}
          readOnly
          style={{ ...inputStyle, backgroundColor: "#f0f0f0" }}
        />

        <label style={{ marginTop: 18 }}>Tanggal Pembayaran:</label>
        <input
          type="date"
          value={tanggalBayar}
          onChange={(e) => setTanggalBayar(e.target.value)}
          style={inputStyle}
          required
        />

        <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
          <button onClick={handleBayar} style={buttonPrimary}>Bayar</button>
          <button onClick={() => navigate("/tagihan")} style={buttonSecondary}>Batal</button>
        </div>
      </div>
    </div>
  );
};

// Komponen baris
const Row = ({ label, value, highlight }) => (
  <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: 6 }}>
    <div style={{ fontWeight: 600 }}>{label}</div>
    <div style={{ color: highlight ? "#e53935" : "#333", fontWeight: highlight ? 600 : 400 }}>
      {value}
    </div>
  </div>
);

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonPrimary = {
  background: "#5ba4e6",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  padding: "10px 24px",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer",
};

const buttonSecondary = {
  border: "none",
  borderRadius: 6,
  padding: "10px 24px",
  fontWeight: "600",
  fontSize: "1rem",
  cursor: "pointer",
};

export default EditTagihan;
