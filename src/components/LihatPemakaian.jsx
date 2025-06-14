import { useState, useEffect } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../css/LihatPemakaian.css";
import "../css/global.css";

const LihatPemakaian = () => {
  const [pemakaian, setPemakaian] = useState([]);
  const pelanggan = JSON.parse(sessionStorage.getItem("pelanggan"));

  useEffect(() => {
    fetch("http://localhost:5000/pakai")
      .then((res) => res.json())
      .then((data) => {
        const pemake = data.filter((item) => item.id_pelanggan === pelanggan.id_pelanggan);
        setPemakaian(pemake);
      })
      .catch(() => setPemakaian([]));
  }, [pelanggan.id_pelanggan]);
  
  return (
    <div className="global-layout">
      <main className="global-main">
        <div className="lihatpemakaian-card">
          <div className="lihatpemakaian-card-header">
            <h2 className="lihatpemakaian-title">Daftar Pemakaian Anda</h2>
          </div>
          <div className="lihatpemakaian-table-wrapper">
            <table className="lihatpemakaian-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No</th>
                  <th style={{ textAlign: "center" }}>Pelanggan</th>
                  <th style={{ textAlign: "center" }}>Bulan</th>
                  <th style={{ textAlign: "center" }}>Tahun</th>
                  <th style={{ textAlign: "center" }}>Meter³ Awal</th>
                  <th style={{ textAlign: "center" }}>Meter³ Akhir</th>
                  {/* <th style={{ textAlign: "center" }}>Aksi</th> */}
                </tr>
              </thead>
              <tbody>
                {pemakaian.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center" }}>Tidak ada data</td>
                  </tr>
                ) : (
                  pemakaian.map((item, idx) => (
                    <tr key={item.id_pakai || idx}>
                      <td style={{ textAlign: "center" }}>{idx + 1}</td>
                      <td style={{ textAlign: "center" }}>{item.pelanggan?.nama_pelanggan || "-"}</td>
                      <td style={{ textAlign: "center" }}>{item.bulan?.nama_bulan || "-"}</td>
                      <td style={{ textAlign: "center" }}>{item.tahun}</td>
                      <td style={{ textAlign: "center" }}>{item.awal}</td>
                      <td style={{ textAlign: "center" }}>{item.akhir}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LihatPemakaian;