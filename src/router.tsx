// src/router.tsx
import { createBrowserRouter, Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";      // Ini Landing Page publik
import DashboardPage from "@/pages/DashboardPage"; // Ini Portal Pasien / Dashboard baru
import DokterPage from "@/pages/DoctorPage";
import ProfilRsPage from "@/pages/ProfilRsPage"; // Halaman Profil RSJD AHM
import StrukturPage from "@/pages/StrukturPage"; // Halaman Struktur Organisasi baru
import EdukasiPage from "@/pages/EdukasiPage";
import SkriningPage from "@/pages/SkriningPage";
import BookingPage from "@/pages/BookingPage";
import SurveyPage from "@/pages/SurveyPage";
import PengaduanPage from "@/pages/PengaduanPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Import Toaster (jika diletakkan di layout utama)
import { Toaster } from "@/components/ui/sonner";

function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans relative justify-between">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />, // Halaman utama tetap Landing Page
      },
      {
        path: "/dashboard",
        element: <DashboardPage />, // Halaman Dashboard khusus pasien yang baru
      },
      {
        path: "/dokter",
        element: <DokterPage />,
      },
      {
        path: "/profil-rs",
        element: <ProfilRsPage />, // Rute Profil RSJD Atma Husada Mahakam
      },
      {
        path: "/struktur",
        element: <StrukturPage />, // Rute Halaman Struktur Organisasi
      },
      {
        path: "/skrining",
        element: <SkriningPage />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/survey",
        element: <SurveyPage />,
      },
      {
        path: "/pengaduan",
        element: <PengaduanPage />,
      },
      {
        path: "/edukasi",
        element: <EdukasiPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);