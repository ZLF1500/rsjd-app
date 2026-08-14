// src/pages/SurveyPage.tsx
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
  ClipboardCheck,
  Sparkles,
  Star,
  CheckCircle2,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  User,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Award
} from "lucide-react"

interface SurveyQuestion {
  id: string
  title: string
  category: string
  description: string
}

const questions: SurveyQuestion[] = [
  {
    id: "q1",
    category: "Prosedur & Kemudahan Pendaftaran",
    title: "Kemudahan & Transparansi Informasi Pendaftaran",
    description: "Alur pendaftaran antrean (online/onsite) jelas dan mudah dipahami."
  },
  {
    id: "q2",
    category: "Prosedur & Kemudahan Pendaftaran",
    title: "Kecepatan Waktu Tunggu Pelayanan",
    description: "Waktu tunggu panggilan ke poliklinik atau ruang konsultasi sesuai estimasi."
  },
  {
    id: "q3",
    category: "Sikap & Profesionalitas Staf / Dokter",
    title: "Keramahan & Empati Tenaga Medis (Dokter/Psikolog/Perawat)",
    description: "Tenaga medis mendengarkan dengan sabar, tidak menepis, dan memberikan rasa aman."
  },
  {
    id: "q4",
    category: "Sikap & Profesionalitas Staf / Dokter",
    title: "Kejelasan Edukasi & Informasi Penanganan",
    description: "Dokter/Psikolog memberikan instruksi obat atau saran konseling yang mudah dipahami."
  },
  {
    id: "q5",
    category: "Fasilitas & Lingkungan Rumah Sakit",
    title: "Kebersihan, Kenyamanan, & Privasi Ruang Konsultasi",
    description: "Ruangan bersih, ber-AC, tenang, serta menjamin privasi percakapan pasien."
  },
  {
    id: "q6",
    category: "Fasilitas & Lingkungan Rumah Sakit",
    title: "Ketersediaan Sarana Pendukung & Aksesibilitas",
    description: "Ketersediaan toilet bersih, ruang tunggu, kursi roda, dan kelengkapan fasilitas umum."
  },
]

export default function SurveyPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<number>(1)

  // Form State
  const [respondent, setRespondent] = useState({
    name: "",
    ageGroup: "25-34",
    patientType: "BPJS Kesehatan",
    visitType: "Rutin/Lanjutan",
  })

  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [hoveredRating, setHoveredRating] = useState<Record<string, number>>({})
  const [npsScore, setNpsScore] = useState<number | null>(null)
  const [overallSatisfaction, setOverallSatisfaction] = useState<string>("")
  const [suggestions, setSuggestions] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleRatingChange = (qId: string, ratingValue: number) => {
    setRatings((prev) => ({ ...prev, [qId]: ratingValue }))
  }

  const isStep2Valid = questions.every((q) => (ratings[q.id] || 0) > 0)
  const isStep3Valid = overallSatisfaction !== "" && npsScore !== null

  const handleNextStep = () => {
    if (step === 2 && !isStep2Valid) {
      toast.error("Mohon berikan rating Bintang pada seluruh indikator sebelum melanjutkan.")
      return
    }
    setStep((prev) => Math.min(prev + 1, 3))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBackToHome = () => {
    setIsSubmitted(false)
    setStep(1)
    setRatings({})
    setNpsScore(null)
    setOverallSatisfaction("")
    setSuggestions("")
    navigate("/")
  }

  const handleSubmitSurvey = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isStep2Valid || !isStep3Valid) {
      toast.error("Mohon lengkapi seluruh penilaian dan skor indikator.")
      return
    }

    setIsSubmitted(true)
    toast.success("Terima Kasih Atas Partisipasi Anda!", {
      description: "Tanggapan Anda sangat berharga untuk meningkatkan standar mutu RSJD.",
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
                  Survei Kepuasan (SKM)
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* HEADER TITLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
                Survei Kepuasan Masyarakat <Sparkles className="w-5 h-5 text-cyan-500" />
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Evaluasi Berkala Mutu Pelayanan Kesehatan Jiwa & Fasilitas RSJD
              </p>
            </div>
            {!isSubmitted && !loading && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 self-start sm:self-center">
                Langkah {step} dari 3
              </span>
            )}
          </div>

          {!isSubmitted && !loading && (
            <div className="pt-2">
              <Progress value={(step / 3) * 100} className="h-1.5 bg-muted" />
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
                <h2 className="text-2xl font-bold">Terima Kasih Banyak!</h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Survei Anda berhasil dikirim secara anonim dan terenkripsi. Kontribusi Anda sangat berarti dalam mewujudkan pelayanan medis jiwa yang responsif dan inklusif.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 text-left space-y-2 text-xs">
                <div className="flex items-center gap-2 text-cyan-600 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> Kerahasiaan Terjamin
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Semua tanggapan diproses secara kolektif untuk bahan evaluasi internal Tim Manajemen Mutu RSJD.
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

          /* FORM MULTI-STEP */
          <form onSubmit={handleSubmitSurvey}>
            <Card className="rounded-3xl p-6 sm:p-8 border-border bg-card shadow-sm flex flex-col justify-between">
              
              <AnimatePresence mode="wait">
                {/* STEP 1: PROFIL RESPONDEN */}
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
                        <User className="w-4 h-4 text-cyan-500" /> Langkah 1: Profil Pengisi Survei
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Informasi ini membantu kami menganalisis kualitas layanan berdasarkan kelompok pasien.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">Nama / Inisial (Opsional)</Label>
                        <Input
                          placeholder="Contoh: H.S / Anonim"
                          value={respondent.name}
                          onChange={(e) => setRespondent({ ...respondent, name: e.target.value })}
                          className="rounded-xl h-10 text-xs bg-background border-border"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">Kelompok Usia</Label>
                        <Select
                          value={respondent.ageGroup}
                          onValueChange={(val) => setRespondent({ ...respondent, ageGroup: val })}
                        >
                          <SelectTrigger className="w-full h-10 rounded-xl text-xs bg-background border-border">
                            <SelectValue placeholder="Pilih Kelompok Usia" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="17-24" className="text-xs">17 - 24 Tahun</SelectItem>
                            <SelectItem value="25-34" className="text-xs">25 - 34 Tahun</SelectItem>
                            <SelectItem value="35-49" className="text-xs">35 - 49 Tahun</SelectItem>
                            <SelectItem value="50+" className="text-xs">50 Tahun ke Atas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">Kategori Pembiayaan/Pasien</Label>
                        <Select
                          value={respondent.patientType}
                          onValueChange={(val) => setRespondent({ ...respondent, patientType: val })}
                        >
                          <SelectTrigger className="w-full h-10 rounded-xl text-xs bg-background border-border">
                            <SelectValue placeholder="Pilih Kategori Pasien" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="BPJS Kesehatan" className="text-xs">BPJS Kesehatan / JKN</SelectItem>
                            <SelectItem value="Umum / Mandiri" className="text-xs">Pasien Umum / Mandiri</SelectItem>
                            <SelectItem value="Asuransi Swasta" className="text-xs">Asuransi Swasta</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs font-semibold">Status Kunjungan</Label>
                        <Select
                          value={respondent.visitType}
                          onValueChange={(val) => setRespondent({ ...respondent, visitType: val })}
                        >
                          <SelectTrigger className="w-full h-10 rounded-xl text-xs bg-background border-border">
                            <SelectValue placeholder="Pilih Status Kunjungan" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="Pertama Kali" className="text-xs">Pertama Kali Berobat/Konsultasi</SelectItem>
                            <SelectItem value="Rutin/Lanjutan" className="text-xs">Kunjungan Rutin / Lanjutan</SelectItem>
                            <SelectItem value="Keluarga Pasien" className="text-xs">Pendamping / Keluarga Pasien</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: PENILAIAN INDIKATOR LAYANAN (Tanpa scroll internal yang sempit) */}
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
                        <ClipboardCheck className="w-4 h-4 text-cyan-500" /> Langkah 2: Evaluasi Dimensi Pelayanan
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Berikan rating bintang (1 sampai 5) untuk setiap indikator pelayanan di bawah ini.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {questions.map((q, idx) => {
                        const currentVal = ratings[q.id] || 0
                        const hoverVal = hoveredRating[q.id] || 0
                        const activeVal = hoverVal || currentVal

                        return (
                          <div
                            key={q.id}
                            className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-background/50 space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-fit">
                                {q.category}
                              </span>
                              <span className="text-[11px] text-muted-foreground font-medium">
                                Indikator {idx + 1} dari {questions.length}
                              </span>
                            </div>

                            <div>
                              <p className="text-xs sm:text-sm font-bold text-foreground">
                                {q.title}
                              </p>
                              <p className="text-[11px] text-muted-foreground mt-0.5">
                                {q.description}
                              </p>
                            </div>

                            <div className="flex items-center gap-1.5 pt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => handleRatingChange(q.id, star)}
                                  onMouseEnter={() => setHoveredRating((p) => ({ ...p, [q.id]: star }))}
                                  onMouseLeave={() => setHoveredRating((p) => ({ ...p, [q.id]: 0 }))}
                                  className="p-1 hover:scale-110 transition-transform focus:outline-none cursor-pointer"
                                >
                                  <Star
                                    className={`w-6 h-6 transition-colors ${
                                      star <= activeVal
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-muted-foreground/30"
                                    }`}
                                  />
                                </button>
                              ))}

                              <span className="text-xs font-semibold ml-3 text-cyan-600 dark:text-cyan-400 min-w-[80px]">
                                {currentVal === 1 && "Sangat Buruk"}
                                {currentVal === 2 && "Kurang Baik"}
                                {currentVal === 3 && "Cukup Baik"}
                                {currentVal === 4 && "Baik"}
                                {currentVal === 5 && "Sangat Baik"}
                                {currentVal === 0 && "Pilih Rating"}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: NPS, TINGKAT KEPUASAN & SARAN */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="space-y-6"
                  >
                    <div className="border-b border-border pb-3">
                      <h2 className="text-sm font-bold text-foreground flex items-center gap-2 uppercase tracking-wider">
                        <Award className="w-4 h-4 text-cyan-500" /> Langkah 3: Rekomendasi & Masukan Akhir
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Seberapa besar kepuasan Anda secara menyeluruh selama berinteraksi dengan layanan kami?
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-foreground flex items-center justify-between">
                        <span>Skor Rekomendasi (Net Promoter Score)</span>
                        <span className="text-cyan-600 dark:text-cyan-400 text-[11px] font-normal">
                          {npsScore !== null ? `Skor Pilih: ${npsScore}` : "Skala 1 - 10"}
                        </span>
                      </Label>
                      <p className="text-[11px] text-muted-foreground">
                        Seberapa mungkin Anda merekomendasikan layanan RSJD kepada teman, kerabat, atau masyarakat?
                      </p>

                      <div className="grid grid-cols-10 gap-1 pt-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                          <button
                            key={score}
                            type="button"
                            onClick={() => setNpsScore(score)}
                            className={`h-9 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                              npsScore === score
                                ? "bg-cyan-600 text-white border-cyan-600 shadow-md scale-105"
                                : "bg-background border-border hover:bg-muted text-muted-foreground"
                            }`}
                          >
                            {score}
                          </button>
                        ))}
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground pt-1 px-0.5">
                        <span>1 = Sangat Tidak Mungkin</span>
                        <span>10 = Sangat Mungkin</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label className="text-xs font-bold text-foreground">Kesimpulan Kepuasan Anda</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <div
                          onClick={() => setOverallSatisfaction("tidak_puas")}
                          className={`p-3 rounded-2xl border cursor-pointer text-center space-y-1 transition-all ${
                            overallSatisfaction === "tidak_puas"
                              ? "border-rose-500 bg-rose-500/10 text-rose-500 font-bold"
                              : "border-border hover:bg-muted/40 text-muted-foreground"
                          }`}
                        >
                          <Frown className="w-6 h-6 mx-auto" />
                          <p className="text-[11px]">Kurang Puas</p>
                        </div>

                        <div
                          onClick={() => setOverallSatisfaction("cukup")}
                          className={`p-3 rounded-2xl border cursor-pointer text-center space-y-1 transition-all ${
                            overallSatisfaction === "cukup"
                              ? "border-amber-500 bg-amber-500/10 text-amber-500 font-bold"
                              : "border-border hover:bg-muted/40 text-muted-foreground"
                          }`}
                        >
                          <Meh className="w-6 h-6 mx-auto" />
                          <p className="text-[11px]">Cukup Puas</p>
                        </div>

                        <div
                          onClick={() => setOverallSatisfaction("sangat_puas")}
                          className={`p-3 rounded-2xl border cursor-pointer text-center space-y-1 transition-all ${
                            overallSatisfaction === "sangat_puas"
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-500 font-bold"
                              : "border-border hover:bg-muted/40 text-muted-foreground"
                          }`}
                        >
                          <Smile className="w-6 h-6 mx-auto" />
                          <p className="text-[11px]">Sangat Puas</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-cyan-500" /> Saran & Masukan Konstruktif
                      </Label>
                      <Textarea
                        placeholder="Bagikan pengalaman atau hal-hal yang perlu perbaikan..."
                        value={suggestions}
                        onChange={(e) => setSuggestions(e.target.value)}
                        rows={3}
                        className="rounded-2xl text-xs bg-background border-border focus-visible:ring-cyan-600 resize-none p-3"
                      />
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

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    className="rounded-full h-10 text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold gap-1 ml-auto cursor-pointer"
                  >
                    Lanjut <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="rounded-full h-10 text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-md gap-1 cursor-pointer"
                  >
                    Kirim Survei Kepuasan
                  </Button>
                )}
              </div>

            </Card>
          </form>
        )}

      </div>

    </div>
  )
}