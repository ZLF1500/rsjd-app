// src/pages/BookingPage.tsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Video,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Star,
  Building,
  UserCheck,
  Stethoscope
} from "lucide-react"

interface Doctor {
  id: string
  name: string
  role: string
  specialty: string
  rating: number
  experience: string
  hospital: string
  fee: number
  avatar: string
  availableDays: string[]
  availableTimes: string[]
}

const mockDoctors: Doctor[] = [
  {
    id: "doc-1",
    name: "dr. Andi Wijaya, Sp.KJ",
    role: "Psikiater Klinis",
    specialty: "Gangguan Kecemasan & Depresi",
    rating: 4.9,
    experience: "8 Tahun",
    hospital: "RS Jiwa Paramitha",
    fee: 250000,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    availableDays: ["Senin", "Rabu", "Jumat"],
    availableTimes: ["09:00", "11:00", "14:00", "16:00", "19:00"],
  },
  {
    id: "doc-2",
    name: "Siti Rahma, M.Psi., Psikolog",
    role: "Psikolog Anak & Remaja",
    specialty: "Tumbuh Tumbuh & Perilaku",
    rating: 4.8,
    experience: "6 Tahun",
    hospital: "Klinik Sehat Jiwa",
    fee: 200000,
    avatar: "https://images.unsplash.com/photo-1594824813566-88855ce78c00?auto=format&fit=crop&q=80&w=300",
    availableDays: ["Selasa", "Kamis", "Sabtu"],
    availableTimes: ["10:00", "13:00", "15:00", "18:30"],
  },
  {
    id: "doc-3",
    name: "dr. Maya Indah, Sp.KJ",
    role: "Psikiater Konsultan",
    specialty: "Burnout, Stres Kerja & Insomnia",
    rating: 5.0,
    experience: "12 Tahun",
    hospital: "RS Medika Utama",
    fee: 300000,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    availableDays: ["Senin", "Selasa", "Rabu", "Kamis"],
    availableTimes: ["08:30", "10:30", "13:30", "15:30", "17:00"],
  },
]

export default function BookingPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const docIdFromUrl = searchParams.get("doctorId")

  const [loading, setLoading] = useState(true)
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(docIdFromUrl || mockDoctors[0].id)
  
  // State Form Booking
  const [selectedConsultType, setSelectedConsultType] = useState<"online" | "offline">("online")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [patientName, setPatientName] = useState("")
  const [patientNotes, setPatientNotes] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const activeDoctor = mockDoctors.find((d) => d.id === selectedDoctorId) || mockDoctors[0]

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Reset tanggal & jam saat dokter diganti via Select
  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctorId(doctorId)
    setSelectedDate("")
    setSelectedTime("")
  }

  const handleSubmitBooking = () => {
    if (!selectedDate || !selectedTime || !patientName.trim()) {
      toast.error("Lengkapi data dokter, jadwal, dan nama pasien terlebih dahulu.")
      return
    }

    setIsSuccess(true)
    toast.success("Booking Berhasil Dibuat!", {
      description: `Jadwal konsultasi bersama ${activeDoctor.name} telah terkonfirmasi.`,
    })

    const newNotif = {
      id: Date.now(),
      title: "Booking Konsultasi Dikonfirmasi",
      desc: `Jadwal konsultasi ${selectedConsultType.toUpperCase()} dengan ${activeDoctor.name} pada ${selectedDate} jam ${selectedTime}.`,
      time: "Baru saja",
      unread: true,
    }
    window.dispatchEvent(new CustomEvent("add-notification", { detail: newNotif }))
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors">
      <div className="container mx-auto max-w-5xl pt-28 pb-16 px-4 space-y-8 flex-grow">
        
        {/* BREADCRUMB */}
        <div className="space-y-2 border-b border-border pb-6">
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
                  Booking Konsultasi
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* HEADER TITLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
                Booking Konsultasi <Sparkles className="w-5 h-5 text-cyan-500" />
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Atur jadwal janji temu tatap muka atau video call bersama ahli jiwa terpercaya
              </p>
            </div>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="rounded-3xl p-6 space-y-4 lg:col-span-1">
              <Skeleton className="h-20 w-20 rounded-2xl mx-auto" />
              <Skeleton className="h-5 w-3/4 mx-auto" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </Card>
            <Card className="rounded-3xl p-6 space-y-4 lg:col-span-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </Card>
          </div>
        ) : isSuccess ? (

          /* KONFIRMASI BERHASIL */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <Card className="rounded-3xl p-8 border-border bg-card shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Booking Terkonfirmasi!</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Terima kasih, janji temu Anda telah terdaftar dalam sistem kami.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/50 border border-border text-left space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dokter:</span>
                  <span className="font-bold">{activeDoctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Metode:</span>
                  <span className="font-bold uppercase text-cyan-600">{selectedConsultType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tanggal & Jam:</span>
                  <span className="font-bold">{selectedDate}, {selectedTime} WITA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nama Pasien:</span>
                  <span className="font-bold">{patientName}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  className="rounded-full text-xs h-10 bg-cyan-600 hover:bg-cyan-700 text-white font-bold cursor-pointer"
                >
                  Kembali ke Beranda
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsSuccess(false)}
                  className="rounded-full text-xs h-10 text-muted-foreground cursor-pointer"
                >
                  Buat Booking Lain
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (

          /* FORM BOOKING DENGAN SHADCN SELECT */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* CARD PROFIL DOKTER DINAMIS */}
            <Card className="rounded-3xl p-6 border-border bg-card h-fit space-y-6">
              <div className="text-center space-y-3">
                <img
                  src={activeDoctor.avatar}
                  alt={activeDoctor.name}
                  className="w-24 h-24 rounded-3xl object-cover border-2 border-cyan-500/30 mx-auto shadow-md"
                />
                <div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    {activeDoctor.role}
                  </span>
                  <h3 className="font-bold text-base mt-2">{activeDoctor.name}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{activeDoctor.specialty}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-500" /> Lokasi Praktik
                  </span>
                  <span className="font-semibold">{activeDoctor.hospital}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Rating & Pengalaman
                  </span>
                  <span className="font-semibold">{activeDoctor.rating} ({activeDoctor.experience})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Biaya Konsultasi</span>
                  <span className="font-extrabold text-cyan-600 dark:text-cyan-400 text-sm">
                    Rp {activeDoctor.fee.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-[11px] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-600 shrink-0" />
                <span>Privasi terjamin & kerahasiaan rekam medis dilindungi.</span>
              </div>
            </Card>

            {/* FORM PENGISIAN JADWAL */}
            <Card className="rounded-3xl p-6 sm:p-8 border-border bg-card lg:col-span-2 space-y-6">
              
              {/* 1. Pilih Dokter / Spesialis via Shadcn Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-500" /> 1. Pilih Dokter / Psikolog
                </label>
                
                <Select
                  value={selectedDoctorId}
                  onValueChange={handleDoctorChange}
                >
                  <SelectTrigger className="w-full h-11 px-4 text-xs font-semibold rounded-2xl border border-border/80 bg-background text-foreground">
                    <SelectValue placeholder="Pilih Dokter" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl">
                    {mockDoctors.map((doc) => (
                      <SelectItem key={doc.id} value={doc.id} className="text-xs cursor-pointer">
                        {doc.name} — {doc.role} ({doc.hospital})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 2. Pilih Tipe Konsultasi */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-500" /> 2. Metode Sesi Konsultasi
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setSelectedConsultType("online")}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      selectedConsultType === "online"
                        ? "border-cyan-600 bg-cyan-500/10 text-cyan-600"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <Video className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-bold">Online (Video Call)</p>
                      <p className="text-[10px] text-muted-foreground">Tatap muka jarak jauh via app</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedConsultType("offline")}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      selectedConsultType === "offline"
                        ? "border-cyan-600 bg-cyan-500/10 text-cyan-600"
                        : "border-border hover:bg-muted/40"
                    }`}
                  >
                    <MapPin className="w-5 h-5" />
                    <div>
                      <p className="text-xs font-bold">Tatap Muka (Klinik)</p>
                      <p className="text-[10px] text-muted-foreground">Datang langsung ke lokasi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Pilih Hari/Tanggal */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 text-cyan-500" /> 3. Pilih Hari Praktik
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeDoctor.availableDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        selectedDate === day
                          ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                          : "border-border hover:border-slate-400 bg-card"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Pilih Slot Jam */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-500" /> 4. Pilih Jam Konsultasi
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {activeDoctor.availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                        selectedTime === time
                          ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                          : "border-border hover:border-slate-400 bg-card"
                      }`}
                    >
                      {time} WITA
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Data Pasien */}
              <div className="space-y-3 pt-2 border-t border-border">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-500" /> 5. Identitas Pasien
                </label>
                
                <div className="space-y-3">
                  <Input
                    placeholder="Nama Lengkap Pasien..."
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="rounded-2xl text-xs h-11 bg-card border-border/80 focus-visible:ring-cyan-600"
                  />
                  <Input
                    placeholder="Catatan Keluhan / Topik Utama (Opsional)..."
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    className="rounded-2xl text-xs h-11 bg-card border-border/80 focus-visible:ring-cyan-600"
                  />
                </div>
              </div>

              {/* TOMBOL KONFIRMASI BOOKING */}
              <div className="pt-4">
                <Button
                  type="button"
                  onClick={handleSubmitBooking}
                  className="w-full rounded-full h-11 text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md transition-all cursor-pointer"
                >
                  Konfirmasi Booking
                </Button>
              </div>

            </Card>
          </motion.div>
        )}

      </div>

    </div>
  )
}