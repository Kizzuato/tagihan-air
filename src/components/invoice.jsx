import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const InvoiceTagihan = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id_tagihan } = useParams();

  useEffect(() => {
    const getDataTagihan = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/tagihan/${id_tagihan}`
        );
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Gagal fetch tagihan:", error);
        setLoading(false);
      }
    };
    getDataTagihan();
  }, [id_tagihan]);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>Data tidak ditemukan.</p>;

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

      <div style={{ marginBottom: 16 }}>
        <strong>ID Tagihan:</strong> {data.id_tagihan || id_tagihan}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Nominal:</strong> Rp{" "}
        {Number(data.tagihan).toLocaleString("id-ID")}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Status:</strong> {data.status}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>ID Pakai:</strong> {data.id_pakai}
      </div>
      <div style={{ marginBottom: 16 }}>
        <strong>Tanggal Dibuat:</strong>{" "}
        {moment(data.createdAt).format("DD MMMM YYYY, HH:mm")}
      </div>

      <hr style={{ margin: "20px 0" }} />
      <div style={{ textAlign: "center", color: "#999", fontSize: "0.9rem" }}>
        Terima kasih telah menggunakan layanan kami.
      </div>
      <button
        onClick={() => navigate(-1)} // kembali ke halaman sebelumnya
        style={{
          marginTop: "24px",
          //   background: "#ccc",
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
