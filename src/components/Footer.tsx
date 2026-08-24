// src/components/Footer.tsx
import { useNavigate } from "react-router-dom"
import { Phone, Mail, MapPin, Clock, Heart } from "lucide-react"

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="w-full bg-black text-white border-t border-neutral-800 mt-20 transition-colors">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* KOLOM 1: BRAND & TENTANG */}
          <div className="space-y-4 md:col-span-1">
            <img 
              src="https://rsjdahm.kaltimprov.go.id/wp-content/uploads/2025/08/logo_light-1-1.png" 
              alt="Logo RSJD AHM" 
              onClick={() => navigate("/")} 
              className="h-16 w-auto cursor-pointer object-contain select-none"
            />
            <p className="text-xs text-neutral-400 leading-relaxed">
              Rumah Sakit Jiwa Daerah Atma Husada Mahakam Samarinda, pusat pelayanan kesehatan jiwa paripurna dan rujukan utama di Kalimantan Timur.
            </p>
          </div>

          {/* KOLOM 2: NAVIGASI CEPAT */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button onClick={() => navigate("/")} className="hover:text-cyan-400 transition-colors">
                  Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/skrining")} className="hover:text-cyan-400 transition-colors">
                  Skrining Mandiri
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/booking")} className="hover:text-cyan-400 transition-colors">
                  Booking & Antrean
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/survei")} className="hover:text-cyan-400 transition-colors">
                  Survey Kepuasan
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/pengaduan")} className="hover:text-cyan-400 transition-colors">
                  Layanan Pengaduan
                </button>
              </li>
            </ul>
          </div>

          {/* KOLOM 3: JAM OPERASIONAL */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Jam Operasional</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>IGD & Darurat: <strong className="text-white">24 Jam</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
                <div>
                  <p>Poliklinik Rawat Jalan:</p>
                  <p className="text-[11px] font-medium text-white">Senin - Kamis: 07:30 - 16:00 WITA</p>
                  <p className="text-[11px] font-medium text-white">Jumat: 07:30 - 14:00 WITA</p>
                </div>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: KONTAK & ALAMAT */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Hubungi Kami</h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>Jl. Kakap No. 23, Sungai Dama, Kec. Samarinda Ilir, Kota Samarinda, Kaltim 75115</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href="tel:0541743364" className="hover:underline text-white font-medium">
                  (0541) 743364 / IGD 24/7
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>rsjdahm@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* HAK CIPTA & BOTTOM BAR */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} RSJD Atma Husada Mahakam. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk kesehatan jiwa masyarakat Kaltim</span>
          </div>
        </div>
      </div>
    </footer>
  )
}