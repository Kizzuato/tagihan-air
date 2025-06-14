import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import Registrasi from "./components/Registrasi";
import DashboardAdmin from "./components/DashboardAdmin";
import DaftarLayanan from "./components/DaftarLayanan";
import DaftarPemakaian from "./components/DaftarPemakaian";
import DaftarTagihan from "./components/DaftarTagihan";
import DaftarTagihanLunas from "./components/DaftarTagihanLunas";
import DaftarPelanggan from "./components/DaftarPelanggan";
import AddLayanan from "./components/AddLayanan";
import EditLayanan from "./components/EditLayanan";
import AddPelanggan from "./components/AddPelanggan";
import EditPelanggan from "./components/EditPelanggan";
import AddPemakaian from "./components/AddPemakaian";



import DashboardPelanggan from "./components/DashboardPelanggan";
import LihatTagihan from "./components/LihatTagihan";
import LihatPemakaian from "./components/LihatPemakaian";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./components/adminLayout.tsx";
import CustLayout from "./components/custLayout.tsx";
import EditTagihan from "./components/EditTagihan.jsx";
import InvoiceTagihan from "./components/invoice.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        
        {/* Registrasi */}
        <Route path="/user/register" element={<Registrasi />} />

        {/* Dashboard Admin */}
        <Route element={<AdminLayout />}>
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/layanan" element={<DaftarLayanan />} />
        <Route path="/layanan/tambah" element={<AddLayanan />} />
        <Route path="/layanan/edit/:id_layanan" element={<EditLayanan />} />
        <Route path="/pemakaian" element={<DaftarPemakaian />} />
        <Route path="/pemakaian/tambah" element={<AddPemakaian />} />
        <Route path="/tagihan" element={<DaftarTagihan />} />
        <Route path="/tagihan/edit/:id_tagihan" element={<EditTagihan />} />
        <Route path="/tagihan-lunas" element={<DaftarTagihanLunas />} />
        <Route path="/pelanggan" element={<DaftarPelanggan />} />
        <Route path="/pelanggan/tambah" element={<AddPelanggan />} />
        <Route path="/pelanggan/edit/:id_pelanggan" element={<EditPelanggan />} />
        </Route>

        {/* Dashboard Pelanggan */}
        <Route element={<CustLayout />} >
        <Route path="/dashboard-pelanggan" element={<DashboardPelanggan />} />
        <Route path="/lihat-tagihan" element={<LihatTagihan />} />
        <Route path="/lihat-pemakaian" element={<LihatPemakaian />} />
        </Route>

        <Route path="/invoice/:id_tagihan" element={<InvoiceTagihan />} />

        {/* Redirect ke Login jika tidak ada route yang cocok */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;