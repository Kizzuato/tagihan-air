import  { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import "../css/LihatTagihan.css";
import "../css/global.css"

const LihatTagihan = () => {
  const [tagihan, setTagihan] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/tagihan")
      .then((res) => res.json())
      .then((data) => setTagihan(Array.isArray(data) ? data : []))
      .catch(() => setTagihan([]));
  }, []);

  return (
    <div className="global-layout">
      <main className="global-main">
        <div className="daftartagihan-card">
          <div className="daftartagihan-card-header">
            <h2 className="daftartagihan-title">Daftar Tagihan</h2>
          </div>
          <div className="daftartagihan-table-wrapper">
            <table className="daftartagihan-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>No</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Tagihan</th>
                  <th style={{ textAlign: "center" }}>ID Pakai</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tagihan.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>Tidak ada data</td>
                  </tr>
                ) : (
                  tagihan.map((item, idx) => (
                    <tr key={item.id_tagihan || idx}>
                      <td style={{ textAlign: "center" }}>{idx + 1}</td>
                      <td style={{ textAlign: "center" }}>{item.status}</td>
                      <td style={{ textAlign: "center" }}>{item.tagihan}</td>
                      <td style={{ textAlign: "center" }}>{item.id_pakai}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn-edit"
                          onClick={() => navigate(`/invoice/${item.id_tagihan}`)}
                          title="Invoice"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        {/* <button
                          className="btn-delete"
                          onClick={() => handleDeleteClick(item)}
                          title="Hapus"
                          style={{ marginLeft: 8 }}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button> */}
                      </td>
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

export default LihatTagihan;