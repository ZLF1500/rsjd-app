// src/pages/PengaduanPage.tsx
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

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
  MessageSquareWarning,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  User,
  FileText
} from "lucide-react"

export default function PengaduanPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<number>(1)

  // Form State Pengaduan
  const [complainant, setComplainant] = useState({
    name: "",
    nik: "",
    identity: "",
    phone: "",
    email: "",
    address: "",
    category: "Pelayanan Medis",
    unit: "Poliklinik Jiwa",
  })

  const [details, setDetails] = useState({
    subject: "",
    description: "",
    expectation: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleNextStep = () => {
    if (!complainant.name.trim()) {
      toast.error("Mohon masukkan Nama Lengkap Anda.")
      return
    }
    if (complainant.nik.length !== 16) {
      toast.error("NIK harus tepat 16 digit angka.")
      return
    }
    if (complainant.phone.length < 10 || !/^\d+$/.test(complainant.phone)) {
      toast.error("Nomor Telepon/WhatsApp minimal 10 digit dan hanya berupa angka.")
      return
    }
    if (!complainant.email.trim() || !complainant.email.includes("@")) {
      toast.error("Mohon masukkan Email aktif yang valid.")
      return
    }
    if (!complainant.address.trim()) {
      toast.error("Mohon masukkan Alamat Lengkap Anda.")
      return
    }

    setStep(2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePrevStep = () => {
    setStep(1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBackToHome = () => {
    setIsSubmitted(false)
    setStep(1)
    setComplainant({ 
      name: "", 
      nik: "", 
      identity: "", 
      phone: "", 
      email: "", 
      address: "", 
      category: "Pelayanan Medis", 
      unit: "Poliklinik Jiwa" 
    })
    setDetails({ subject: "", description: "", expectation: "" })
    navigate("/")
  }

  const handleSubmitPengaduan = () => {
    if (!details.subject.trim() || !details.description.trim()) {
      toast.error("Mohon lengkapi Subjek dan Isi Pengaduan / Kronologi.")
      return
    }

    setIsSubmitted(true)
    toast.success("Pengaduan Berhasil Dikirim!", {
      description: "Tim Layanan Pengaduan RSJD akan segera menindaklanjuti laporan Anda.",
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors">
      <div className="container mx-auto max-w-3xl pt-28 pb-16 px-4 space-y-6 flex-grow">
        
        {/* BREADCRUMB */}
        <div className="space-y-2 border-b border-border pb-4">
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
                  Pengaduan & Feedback
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* HEADER TITLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
                Pusat Pengaduan & Saran <Sparkles className="w-5 h-5 text-cyan-500" />
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Sampaikan kritik, saran, atau kendala pelayanan demi perbaikan mutu RSJD
              </p>
            </div>
            {!isSubmitted && !loading && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-center">
                Langkah {step} dari 2
              </span>
            )}
          </div>

          {!isSubmitted && !loading && (
            <div className="pt-2">
              <Progress value={(step / 2) * 100} className="h-1.5 bg-muted" />
            </div>
          )}
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <Card className="rounded-3xl p-8 space-y-6 border-border bg-card shadow-sm">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-24 w-full rounded-2xl" />
            <Skeleton className="h-24 w-full rounded-2xl" />
          </Card>
        ) : isSubmitted ? (

          /* LAYAR SUCCESS */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto"
          >
            <Card className="rounded-3xl p-8 border-border bg-card shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Pengaduan Terkirim!</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Laporan Anda telah masuk ke sistem manajemen mutu RSJD. Kode tiket penanganan akan dikirimkan melalui WhatsApp/Email Anda.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 text-cyan-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Kerahasiaan Dilindungi
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Identitas pelapor dijaga ketat sesuai dengan ketentuan hukum dan etika pelayanan rumah sakit.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Button
                  type="button"
                  onClick={handleBackToHome}
                  className="rounded-full text-xs h-11 bg-cyan-600 hover:bg-cyan-700 text-white font-bold cursor-pointer"
                >
                  Kembali ke Beranda
                </Button>
              </div>
            </Card>
          </motion.div>
        ) : (

          /* FORM MULTI-STEP PENGADUAN (Tanpa bungkus <form> global) */
          <Card className="rounded-3xl p-6 sm:p-8 border-border bg-card shadow-sm flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              {/* STEP 1: IDENTITAS PELAPOR */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-border pb-3">
                    <h2 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider">
                      <User className="w-4 h-4 text-cyan-500" /> Langkah 1: Identitas Pelapor
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Masukkan data diri Anda secara lengkap sesuai format pengaduan resmi.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    
                    {/* Nama Lengkap */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Nama Lengkap <span className="text-rose-500">*</span></Label>
                      <Input
                        placeholder="Masukkan nama lengkap"
                        value={complainant.name}
                        onChange={(e) => setComplainant({ ...complainant, name: e.target.value })}
                        className="rounded-xl h-10 text-xs bg-background border-border"
                      />
                    </div>

                    {/* NIK */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">NIK <span className="text-rose-500">*</span> <span className="text-muted-foreground font-normal">(16 digit)</span></Label>
                      <Input
                        placeholder="Nomor Induk Kependudukan"
                        maxLength={16}
                        value={complainant.nik}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "")
                          setComplainant({ ...complainant, nik: val })
                        }}
                        className="rounded-xl h-10 text-xs bg-background border-border"
                      />
                    </div>

                    {/* Nomor Telepon / WhatsApp */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Nomor Telepon / WhatsApp <span className="text-rose-500">*</span> <span className="text-muted-foreground font-normal">(Min. 10 digit)</span></Label>
                      <Input
                        placeholder="Contoh: 08123456789"
                        value={complainant.phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "")
                          setComplainant({ ...complainant, phone: val })
                        }}
                        className="rounded-xl h-10 text-xs bg-background border-border"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Email Aktif <span className="text-rose-500">*</span></Label>
                      <Input
                        type="email"
                        placeholder="Contoh: email@domain.com"
                        value={complainant.email}
                        onChange={(e) => setComplainant({ ...complainant, email: e.target.value })}
                        className="rounded-xl h-10 text-xs bg-background border-border"
                      />
                    </div>

                    {/* Alamat Lengkap */}
                    <div className="space-y-2 sm:col-span-2">
                      <Label className="text-xs font-semibold">Alamat Lengkap <span className="text-rose-500">*</span></Label>
                      <Textarea
                        placeholder="Masukkan alamat domisili lengkap Anda"
                        value={complainant.address}
                        onChange={(e) => setComplainant({ ...complainant, address: e.target.value })}
                        rows={2}
                        className="rounded-2xl text-xs bg-background border-border focus-visible:ring-cyan-600 resize-none p-3"
                      />
                    </div>

                    {/* Kategori Pengaduan */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Kategori Pengaduan</Label>
                      <Select
                        value={complainant.category}
                        onValueChange={(val) => setComplainant({ ...complainant, category: val })}
                      >
                        <SelectTrigger className="w-full h-10 rounded-xl text-xs bg-background border-border">
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="Pelayanan Medis" className="text-xs">Pelayanan Medis / Dokter</SelectItem>
                          <SelectItem value="Administrasi / Pendaftaran" className="text-xs">Administrasi / Pendaftaran</SelectItem>
                          <SelectItem value="Fasilitas / Lingkungan" className="text-xs">Fasilitas / Kebersihan RS</SelectItem>
                          <SelectItem value="Lainnya" className="text-xs">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Unit / Poliklinik Terkait */}
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Unit / Poliklinik Terkait</Label>
                      <Select
                        value={complainant.unit}
                        onValueChange={(val) => setComplainant({ ...complainant, unit: val })}
                      >
                        <SelectTrigger className="w-full h-10 rounded-xl text-xs bg-background border-border">
                          <SelectValue placeholder="Pilih Unit Terkait" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="Poliklinik Jiwa" className="text-xs">Poliklinik Jiwa (Psikiatri)</SelectItem>
                          <SelectItem value="Instalasi Gawat Darurat (IGD)" className="text-xs">Instalasi Gawat Darurat (IGD)</SelectItem>
                          <SelectItem value="Farmasi / Apotek" className="text-xs">Farmasi / Apotek</SelectItem>
                          <SelectItem value="Pendaftaran & Loket" className="text-xs">Pendaftaran & Loket</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* STEP 2: DETAIL LAPORAN & HARAPAN */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-border pb-3">
                    <h2 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider">
                      <FileText className="w-4 h-4 text-cyan-500" /> Langkah 2: Detail Laporan & Harapan
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Jelaskan kronologi kejadian atau isi pengaduan Anda secara jelas dan objektif.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Subjek / Judul Pengaduan <span className="text-rose-500">*</span></Label>
                      <Input
                        placeholder="Contoh: Waktu tunggu obat terlalu lama di apotek"
                        value={details.subject}
                        onChange={(e) => setDetails({ ...details, subject: e.target.value })}
                        className="rounded-xl h-10 text-xs bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Isi Pengaduan / Kronologi <span className="text-rose-500">*</span></Label>
                      <Textarea
                        placeholder="Ceritakan detail kejadian secara kronologis (kapan, di mana, dan siapa yang terlibat jika ada)..."
                        value={details.description}
                        onChange={(e) => setDetails({ ...details, description: e.target.value })}
                        rows={4}
                        className="rounded-2xl text-xs bg-background border-border focus-visible:ring-cyan-600 resize-none p-3"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-semibold">Harapan / Solusi yang Diinginkan</Label>
                      <Textarea
                        placeholder="Apa perbaikan atau solusi yang Anda harapkan dari pihak rumah sakit?"
                        value={details.expectation}
                        onChange={(e) => setDetails({ ...details, expectation: e.target.value })}
                        rows={3}
                        className="rounded-2xl text-xs bg-background border-border focus-visible:ring-cyan-600 resize-none p-3"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* NAVIGASI TOMBOL FOOTER */}
            <div className="flex items-center justify-between border-t border-border pt-6 mt-6">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevStep}
                  className="rounded-full h-10 text-xs px-5 border-border gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </Button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="rounded-full h-10 text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold gap-1 ml-auto cursor-pointer"
                >
                  Lanjut <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmitPengaduan}
                  className="rounded-full h-10 text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-md gap-1 cursor-pointer"
                >
                  Kirim Pengaduan <MessageSquareWarning className="w-4 h-4 ml-1" />
                </Button>
              )}
            </div>

          </Card>
        )}

      </div>
    </div>
  )
}