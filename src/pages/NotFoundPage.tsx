// src/pages/NotFoundPage.tsx
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Stethoscope, 
  ClipboardCheck, 
  Calendar, 
  HelpCircle 
} from "lucide-react"

export default function NotFoundPage() {
  const navigate = useNavigate()

  const quickLinks = [
    { title: "Tim Dokter", desc: "Cari & konsultasi spesialis", path: "/dokter", icon: Stethoscope },
    { title: "Skrining Mandiri", desc: "Tes kesehatan mental gratis", path: "/skrining", icon: ClipboardCheck },
    { title: "Booking Antrean", desc: "Daftar antrean poliklinik", path: "/booking", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 pt-24 pb-12">
      <div className="max-w-2xl w-full space-y-8 text-center">
        
        {/* ANIMATED ILLUSTRATION / 404 BADGE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative inline-block"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
          
          <div className="relative space-y-2">
            <h1 className="text-8xl sm:text-9xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-400 dark:from-cyan-400 dark:to-teal-300 select-none">
              404
            </h1>
            <div className="inline-flex items-center gap-2 bg-secondary/80 border border-border px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-muted-foreground shadow-sm">
              <HelpCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Halaman Tidak Ditemukan</span>
            </div>
          </div>
        </motion.div>

        {/* PESAN PENJELASAN */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 max-w-md mx-auto"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Waduh! Kamu Nyasar di Rumah Sakit?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Halaman yang kamu cari mungkin sudah dipindahkan, dihapus, atau tautannya tidak valid. Jangan khawatir, mari kembali ke jalan yang benar!
          </p>
        </motion.div>

        {/* TOMBOL AKSI UTAMA */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
        >
          <Button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto rounded-full text-xs sm:text-sm h-11 px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-medium shadow-md shadow-cyan-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Kembali ke Beranda
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto rounded-full text-xs sm:text-sm h-11 px-6 border-border hover:bg-secondary font-medium transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Halaman Sebelumnya
          </Button>
        </motion.div>

        {/* REKOMENDASI TAUTAN CEPAT */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 border-t border-border/60"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Mungkin kamu mencari salah satu dari ini?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon
              return (
                <Card
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className="p-3.5 border-border rounded-2xl hover:border-cyan-500/50 hover:shadow-md cursor-pointer transition-all duration-300 text-left group flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </motion.div>

      </div>
    </div>
  )
}