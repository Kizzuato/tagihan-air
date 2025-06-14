import "../css/DashboardAdmin.css";
import "../css/global.css";
import React, { useState, useEffect } from "react";

const DashboardAdmin = () => {
  const [pelangganAktif, setPelangganAktif] = useState([]);
  const [pelangganNonaktif, setPelangganNonaktif] = useState([]);
  const [tagihanBelumDibayar, setTagihanBelumDibayar] = useState([]);
  const [tagihanSudahDibayar, setTagihanSudahDibayar] = useState([]);

  useEffect(() => {
  fetch("http://localhost:5000/pelanggan")
    .then((res) => res.json())
    .then((data) => {
      const aktif = data.filter((item) =>
        item.status?.toLowerCase() === "aktif"
      );

      const nonaktif = data.filter((item) =>
        item.status?.toLowerCase() === "tidak aktif"
      );

      setPelangganAktif(aktif);
      setPelangganNonaktif(nonaktif);
    })
    .catch(() => {
      setPelangganAktif([]);
      setPelangganNonaktif([]);
    });

    fetch("http://localhost:5000/tagihan")
      .then((res) => res.json())
    .then((data) => {
      const lunas = data.filter((item) =>
        item.status?.toLowerCase() === "sudah bayar"
      );

      const belumLunas = data.filter((item) =>
        item.status?.toLowerCase() !== "sudah bayar"
      );

      setTagihanBelumDibayar(belumLunas);
      setTagihanSudahDibayar(lunas);
    })
    .catch(() => {
      setTagihanBelumDibayar([]);
      setTagihanSudahDibayar([]);
    });
  }, []);


  return (
    <div className="admin-layout">
      <main className="global-main">
        <h2 className="global-title">Selamat Datang</h2>
        <div className="admin-desc">
          Administrator, Di Aplikasi Pembayaran Tagihan Air.
        </div>
        <div className="admin-cards">
          <div className="admin-card">
            <div className="admin-card-header">
              <span
                className="admin-card-icon"
                role="img"
                aria-label="user-group"
              >
                <img
                  src="https://img.icons8.com/ios-filled/40/1976d2/group-foreground-selected.png"
                  alt="Data Pelanggan"
                />
              </span>
              <span className="admin-card-title">Data Pelanggan</span>
            </div>
            <div className="admin-card-content">
              <div>
                <b>{pelangganAktif.length}</b> Pelanggan Aktif
              </div>
              <div>
                <b>{pelangganNonaktif.length}</b> Pelanggan Non Aktif
              </div>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-header">
              <span className="admin-card-icon" role="img" aria-label="bill">
                <img
                  src="https://img.icons8.com/ios-filled/40/1976d2/bank-cards.png"
                  alt="Data Tagihan"
                />
              </span>
              <span className="admin-card-title">Data Tagihan</span>
            </div>
            <div className="admin-card-content">
              <div>
                <b>{tagihanBelumDibayar.length}</b> Tagihan Belum Bayar
              </div>
              <div>
                <b>{tagihanSudahDibayar.length}</b> Tagihan Lunas
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
