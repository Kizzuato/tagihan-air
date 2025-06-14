import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const InvoiceTagihan = () => {
  const [data, setData] = useState(null);
  const [pembayaran, setPembayaran] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id_tagihan } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Tagihan
        const tagihanRes = await axios.get(
          `http://localhost:5000/tagihan/${id_tagihan}`
        );
        setData(tagihanRes.data);

        // Get Pembayaran
        const bayarRes = await axios.get(
          `http://localhost:5000/pembayaran/by-tagihan/${id_tagihan}`
        );
        setPembayaran(bayarRes.data || null);
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id_tagihan]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data tagihan tidak ditemukan.</p>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: "32px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#5ba4e6" }}>Invoice Tagihan</h2>
      <hr style={{ margin: "20px 0" }} />

      {/* Informasi Tagihan */}
      <div style={{ marginBottom: 16 }}>
        <strong>ID Tagihan: </strong> {data.id_tagihan}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Nama Pelanggan:</strong>{" "}
        {data.pakai?.pelanggan?.nama_pelanggan || "-"}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Bulan | Tahun: </strong> {data.pakai?.bulan?.nama_bulan || "-"}{" "}
        {data.pakai?.tahun}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Pemakaian:</strong> {data.pakai?.pakai || 0} M³
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Tarif Layanan:</strong> Rp{" "}
        {data.pakai?.pelanggan?.layanan?.tarif?.toLocaleString("id-ID") || 0}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Nominal Tagihan:</strong> Rp{" "}
        {Number(data.tagihan).toLocaleString("id-ID")}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color: data.status === "sudah bayar" ? "green" : "#d32f2f",
            fontWeight: "bold",
          }}
        >
          {data.status}
        </span>
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Tanggal Dibuat:</strong>{" "}
        {moment(data.createdAt).format("DD MMMM YYYY, HH:mm")}
      </div>

      {/* Informasi Pembayaran (jika ada) */}
      {pembayaran ? (
        <>
          <hr style={{ margin: "24px 0" }} />
          <h3 style={{ color: "#5ba4e6", marginBottom: 12 }}>
            Rincian Pembayaran
          </h3>
          <div style={{ marginBottom: 16 }}>
            <strong>Uang Pembayaran:</strong> Rp{" "}
            {Number(pembayaran.uang_bayar).toLocaleString("id-ID")}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Uang Kembalian:</strong> Rp{" "}
            {Number(pembayaran.uang_kembalian).toLocaleString("id-ID")}
          </div>
          <div style={{ marginBottom: 16 }}>
            <strong>Tanggal Pembayaran:</strong>{" "}
            {moment(pembayaran.tanggal_bayar).format("DD MMMM YYYY, HH:mm")}
          </div>
        </>
      ) : (
        <div style={{ marginTop: 24, color: "#888" }}>
          Belum ada data pembayaran untuk tagihan ini.
        </div>
      )}

      <hr style={{ margin: "24px 0" }} />
      <div style={{ textAlign: "center", color: "#999", fontSize: "0.9rem" }}>
        Terima kasih telah menggunakan layanan kami.
      </div>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "24px",
          color: "#333",
          border: "none",
          padding: "10px 20px",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        ← Kembali
      </button>
    </div>
  );
};

export default InvoiceTagihan;
