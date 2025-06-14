import { useState, useEffect } from "react";
import "../css/DashboardPelanggan.css";
import "../css/global.css";

const DashboardPelanggan = () => {
  const [pelanggan, setPelanggan] = useState([]);
  const [tagihanBelumDibayar, setTagihanBelumDibayar] = useState([]);
  const [tagihanSudahDibayar, setTagihanSudahDibayar] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    fetch("http://localhost:5000/pelanggan")
      .then((res) => res.json())
      .then((data) => {
        const akun = data.filter((item) => item.id_user === user.id);
        setPelanggan(akun);
      })
      .catch(() => setPelanggan([]));

    fetch("http://localhost:5000/tagihan")
      .then((res) => res.json())
      .then((data) => {
        const lunas = data.filter(
          (item) => item.status?.toLowerCase() !== "belum bayar"
        );

        const belumLunas = data.filter(
          (item) => item.status?.toLowerCase() === "belum bayar"
        );

        setTagihanBelumDibayar(lunas);
        setTagihanSudahDibayar(belumLunas);
      })
      .catch(() => {
        setTagihanBelumDibayar([]);
        setTagihanSudahDibayar([]);
      });
  }, [user]);
  return (
    <div className="global-layout">
      <main className="global-main">
        <h2 className="pelanggan-title">Selamat Datang</h2>
        <div className="pelanggan-desc">
          Di Aplikasi Pembayaran Tagihan Air.
        </div>
        <div className="pelanggan-cards">
          <div className="pelanggan-card">
            <div className="pelanggan-card-header">
              <span
                role="img"
                aria-label="user"
                className="pelanggan-card-icon"
              >
                👤
              </span>
              <span className="pelanggan-card-title">Info Akun</span>
            </div>
            <div className="pelanggan-card-content">
              <div>
                <b>Nama:</b> {pelanggan[0]?.nama_pelanggan}
              </div>
              <div>
                <b>Status:</b> {pelanggan[0]?.status}
              </div>
            </div>
          </div>
          <div className="pelanggan-card">
            <div className="pelanggan-card-header">
              <span
                role="img"
                aria-label="bill"
                className="pelanggan-card-icon"
              >
                💧
              </span>
              <span className="pelanggan-card-title">Tagihan Air</span>
            </div>
            <div className="pelanggan-card-content">
              <div>
                <b>Tagihan Belum Bayar:</b> {tagihanBelumDibayar.length}
              </div>
              <div>
                <b>Tagihan Lunas:</b> {tagihanSudahDibayar.length}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPelanggan;
