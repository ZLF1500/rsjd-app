// src/pages/DokterPage.tsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

// Shadcn UI Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { 
  Star, 
  MapPin, 
  Search, 
  UserCheck, 
  Clock, 
  Info,
  ArrowRight,
  Calendar,
  ArrowBigLeft,
  ArrowLeft
} from "lucide-react"

// Tipe Data Dokter
interface Doctor {
  id: number
  name: string
  specialty: string
  category: string
  experience: string
  rating: string
  hospital: string
  schedules: string[]
  image: string
}

// Data Dokter (Disesuaikan dengan psikiater RSJD Atma Husada Mahakam Samarinda)
const doctorList: Doctor[] = [
  {
    id: 1,
    name: "dr. H. Jaya Mualimin, Sp.KJ., M.Kes., MARS",
    specialty: "Psikiatri Dewasa",
    category: "Psikiater",
    experience: "15+ Tahun",
    rating: "4.9",
    hospital: "Poliklinik Utama RSJD",
    schedules: ["Senin (08:00 - 12:00)", "Rabu (13:00 - 16:00)", "Jumat (09:00 - 12:00)"],
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "dr. Indah Puspitasari, MARS",
    specialty: "Psikiatri Anak & Remaja",
    category: "Psikiater",
    experience: "12+ Tahun",
    rating: "5.0",
    hospital: "Poliklinik Anak RSJD",
    schedules: ["Selasa (09:00 - 13:00)", "Kamis (09:00 - 13:00)"],
    image: "https://images.unsplash.com/photo-1594824813572-c2c62c2f42a5?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Rina Wijaya, M.Psi., Psikolog",
    specialty: "Psikolog Klinis & Konseling",
    category: "Psikolog",
    experience: "8+ Tahun",
    rating: "4.8",
    hospital: "Pusat Konseling RSJD",
    schedules: ["Senin - Jumat (10:00 - 15:00)"],
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "dr. Budi Santoso, Sp.KJ",
    specialty: "Spesialis Adiksi & Rehabilitasi",
    category: "Psikiater",
    experience: "15+ Tahun",
    rating: "4.9",
    hospital: "Unit Rehabilitasi RSJD",
    schedules: ["Rabu (08:00 - 12:00)", "Sabtu (09:00 - 12:00)"],
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
  },
]

export default function DokterPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  // Filter Dokter
  const filteredDoctors = doctorList.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Semua" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const DoctorSkeletonCard = () => (
    <Card className="border-border rounded-3xl overflow-hidden flex flex-col justify-between h-full bg-card">
      <div>
        <Skeleton className="h-48 w-full rounded-none" />
        <div className="p-4 space-y-3">
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-3 w-1/2 rounded-md" />
          </div>
          <div className="space-y-2 border-t border-border/60 pt-2.5">
            <Skeleton className="h-3 w-4/5 rounded-md" />
            <Skeleton className="h-3 w-2/3 rounded-md" />
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <Skeleton className="h-10 w-full rounded-full" />
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors">
      
      {/* WRAPPER KONTEN UTAMA */}
      <div className="container mx-auto max-w-6xl pt-28 pb-16 px-4 space-y-8 flex-grow">
        
        {/* HEADER PAGE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    className="cursor-pointer hover:text-cyan-600 transition-colors"
                    onClick={() => navigate("/")}
                  >
                    Beranda
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-foreground">
                    Dokter & Spesialis
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground pt-1">
              Direktori Dokter & Spesialis
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-600 shrink-0" />
              Informasi profil lengkap, spesialisasi, serta jadwal praktik dokter di RSJD Atma Husada Mahakam.
            </p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Cari nama atau spesialis..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-full text-xs bg-card"
            />
          </div>
        </div>

        {/* FILTER CATEGORY TAB */}
        <div className="flex gap-2">
          {["Semua", "Psikiater", "Psikolog"].map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="rounded-full text-xs px-4"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* GRID DAFTAR DOKTER (MENGGUNAKAN CARD GRID DENGAN TOMBOL DI BAWAHNYA) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <DoctorSkeletonCard key={index} />
            ))
          ) : filteredDoctors.length === 0 ? (
            <div className="col-span-full py-12 text-center text-muted-foreground space-y-2">
              <Search className="w-8 h-8 mx-auto text-muted-foreground/50" />
              <p className="text-sm font-medium">Dokter tidak ditemukan.</p>
            </div>
          ) : (
            filteredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-border rounded-3xl overflow-hidden group flex flex-col justify-between h-full bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div>
                    {/* Foto & Rating */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={doc.image} 
                        alt={doc.name} 
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>

                    {/* Informasi Detail Dokter */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-foreground line-clamp-1">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium mt-0.5">
                          {doc.specialty}
                        </p>
                      </div>

                      <div className="space-y-1 text-[11px] text-muted-foreground border-t border-border/60 pt-2.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{doc.hospital}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{doc.experience} Pengalaman</span>
                        </div>
                      </div>

                      {/* Jadwal Praktik */}
                      <div className="bg-secondary/40 p-3 rounded-2xl text-[11px] space-y-1.5">
                        <span className="font-semibold text-foreground flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-cyan-600" /> Jadwal Praktik:
                        </span>
                        <ul className="space-y-1 pl-1">
                          {doc.schedules.map((s, i) => (
                            <li key={i} className="text-muted-foreground flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* CTA KE HALAMAN PROFILE DAN DOKTER */}
        {/* Dipindah keluar dari grid card dokter di atas (sebelumnya jadi ikut
            grid-item sehingga lebarnya kesempit & tombolnya numpuk kiri).
            Sekarang full-width row tersendiri. Urutan ditukar: "Dokter & Spesialis"
            di kiri, "Profil Rumah Sakit" di kanan (sesuai permintaan). */}
        <div className="pt-4 flex items-center justify-between">
          <Button 
            onClick={() => navigate("/dokter")}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-6 py-5 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dokter & Spesialis</span>
          </Button>
          <Button 
            onClick={() => navigate("/profil-rs")}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-6 py-5 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <span>Profil Rumah Sakit</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>

    </div>
  )
}