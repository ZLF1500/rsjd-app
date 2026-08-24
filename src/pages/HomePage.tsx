// src/pages/HomePage.tsx
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  ArrowRight, 
  Stethoscope, 
  Clock, 
  CalendarCheck, 
  ClipboardCheck, 
  UserCheck, 
  HeartHandshake,
  Users,
  Building2,
  Award,
  Brain,
  BookOpen,
  Activity,
  ShieldAlert,
  Heart,
  Zap,
  UserRound,
  Receipt
} from "lucide-react"

export const ALL_MENTAL_DISORDERS = [
  {
    id: "bipolar",
    name: "Gangguan Bipolar",
    desc: "Perubahan suasana hati (mood) yang ekstrem antara fase mania (sangat gembira/enerjik) dan fase depresi.",
    types: "Bipolar I, Bipolar II, Siklotimia",
    severity: "Sedang - Tinggi",
    severityBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: Activity,
  },
  {
    id: "skizofrenia",
    name: "Skizofrenia Paranoid",
    desc: "Gangguan psikotik berat yang ditandai dengan kecurigaan berlebih, waham/delusi, serta halusinasi pendengaran.",
    types: "Skizofrenia Katatonik, Disorganisasi, Spektrum Psikotik",
    severity: "Sangat Tinggi (Kritis)",
    severityBg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    icon: ShieldAlert,
  },
  {
    id: "ocd",
    name: "OCD (Obsessive-Compulsive)",
    desc: "Pikiran obsesif yang berulang dan memicu tindakan kompulsif/repetitif untuk meredakan kecemasan.",
    types: "Checking, Contamination, Symmetry/Ordering",
    severity: "Ringan - Sedang",
    severityBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: Brain,
  },
  {
    id: "depresi",
    name: "Depresi Mayor (MDD)",
    desc: "Perasaan sedih mendalam, kehilangan minat, serta rasa putus asa yang berlangsung secara terus-menerus.",
    types: "Depresi Atipikal, Melankolis, Postpartum",
    severity: "Sedang - Tinggi",
    severityBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: Heart,
  },
  {
    id: "gad",
    name: "Kecemasan Umum (GAD)",
    desc: "Rasa cemas berlebihan dan kekhawatiran terus-menerus yang sulit dikontrol terhadap berbagai hal harian.",
    types: "Kecemasan Sosial, Phobia Spesifik, Panik",
    severity: "Ringan - Sedang",
    severityBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    icon: Zap,
  },
  {
    id: "ptsd",
    name: "PTSD (Trauma Pasca Kejadian)",
    desc: "Gangguan kecemasan yang dipicu oleh pengalaman traumatis masa lalu yang membekas secara emosional.",
    types: "Complex PTSD, Acute Stress Disorder",
    severity: "Sedang - Tinggi",
    severityBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    icon: Stethoscope,
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [randomDisorders, setRandomDisorders] = useState<typeof ALL_MENTAL_DISORDERS>([])

  useEffect(() => {
    const shuffled = [...ALL_MENTAL_DISORDERS].sort(() => 0.5 - Math.random())
    setRandomDisorders(shuffled.slice(0, 3))

    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )

  const slides = [
    {
      title: "RSJD Atma Husada Mahakam Samarinda",
      desc: "Pusat pelayanan kesehatan jiwa terpadu dan rujukan utama di Kalimantan Timur.",
      badge: "Resmi & Terakreditasi Paripurna",
      cta: "Mulai Skrining",
      path: "/skrining",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Fasilitas Modern & Tenaga Ahli Profesional",
      desc: "Didukung dokter spesialis kejiwaan, psikolog klinis, dan ruang perawatan yang nyaman.",
      badge: "Layanan Unggulan",
      cta: "Profil Rumah Sakit",
      path: "/profil-rs",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "IGD & Layanan Krisis Siaga 24 Jam",
      desc: "Penanganan kegawatdaruratan psikiatri dan medis siaga sepanjang waktu.",
      badge: "Siaga Darurat",
      cta: "Hubungi IGD",
      path: "/dokter",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
    },
  ]

  const steps = [
    {
      number: "01",
      icon: ClipboardCheck,
      title: "Skrining Mandiri",
      desc: "Isi kuesioner asesmen awal secara mandiri untuk mengevaluasi kondisi emosional.",
    },
    {
      number: "02",
      icon: UserCheck,
      title: "Pilih Jadwal & Dokter",
      desc: "Tentukan dokter spesialis psikiatri atau psikolog klinis sesuai kebutuhan.",
    },
    {
      number: "03",
      icon: HeartHandshake,
      title: "Konsultasi ke Rumah Sakit",
      desc: "Datang berobat ke Jl. Kakap No. 23 Samarinda sesuai jadwal antrean.",
    },
  ]

  const stats = [
    { icon: Building2, value: "1983", label: "Tahun Berdiri & Beroperasi" },
    { icon: Users, value: "Pemprov Kaltim", label: "Rumah Sakit Milik Pemerintah" },
    { icon: Award, value: "Kelas A", label: "RS Khusus Daerah Rujukan" },
  ]

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex flex-col justify-between w-full overflow-x-hidden">
        <div className="space-y-20 mb-20 flex-grow">
          <div className="w-full h-[500px] sm:h-[560px] bg-muted/40 relative flex items-center justify-center px-6">
            <div className="max-w-3xl w-full flex flex-col items-center space-y-4 pt-12">
              <Skeleton className="h-7 w-32 rounded-full" />
              <Skeleton className="h-12 w-3/4 rounded-xl" />
              <Skeleton className="h-5 w-1/2 rounded-lg" />
              <Skeleton className="h-11 w-40 rounded-full mt-4" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen flex flex-col justify-between w-full overflow-x-hidden">
      <div className="space-y-20 mb-20 flex-grow">
        
        {/* HERO CAROUSEL */}
        <section className="w-full relative">
          <Carousel 
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {slides.map((slide, index) => (
                <CarouselItem key={index} className="pl-0">
                  <div 
                    className="relative w-full h-[500px] sm:h-[560px] bg-cover bg-center flex items-center justify-center px-6"
                    style={{ backgroundImage: `url('${slide.image}')` }}
                  >
                    <div className="absolute inset-0 bg-slate-950/50 dark:bg-slate-950/70" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />

                    <div className="relative z-10 max-w-3xl text-center space-y-4 text-white pt-12">
                      <span className="inline-block bg-white/20 backdrop-blur-md border border-white/35 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
                        {slide.badge}
                      </span>
                      <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
                        {slide.title}
                      </h1>
                      <p className="text-slate-100 max-w-xl mx-auto text-sm sm:text-base font-normal leading-relaxed drop-shadow">
                        {slide.desc}
                      </p>
                      <div className="pt-2">
                        <Button 
                          size="lg" 
                          onClick={() => navigate(slide.path)}
                          className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-white border-none gap-2 px-8 font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                          {slide.cta} <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden sm:block">
              <CarouselPrevious className="left-6 bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md" />
              <CarouselNext className="right-6 bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md" />
            </div>
          </Carousel>
        </section>

        <div className="container mx-auto max-w-6xl px-4 space-y-20">

          {/* INFORMASI & PROFIL RSJD */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Informasi & Profil RSJD</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Kenali lebih dekat identitas rumah sakit serta jajaran tenaga medis profesional kami
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card className="hover:shadow-md transition-all duration-300 border-border rounded-2xl p-2 hover:-translate-y-1 bg-card">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-400 shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg font-bold">Biodata & Sejarah Singkat RSJD AHM</CardTitle>
                      <CardDescription className="text-xs sm:text-sm mt-0.5">
                        Pelajari sejarah berdirinya sejak 1983, visi-misi, serta informasi lengkap rumah sakit khusus kelas A.
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    className="rounded-full shrink-0 w-full sm:w-auto text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => navigate("/profil-rs")}
                  >
                    Profil Rumah Sakit <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 border-border rounded-2xl p-2 hover:-translate-y-1 bg-card">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-400 shrink-0">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg font-bold">Struktur Organisasi & Tata Kerja</CardTitle>
                      <CardDescription className="text-xs sm:text-sm mt-0.5">
                        Lihat bagan hierarki kepemimpinan, jajaran manajemen fungsional, dan satuan kerja rumah sakit.
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    className="rounded-full shrink-0 w-full sm:w-auto text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => navigate("/struktur")}
                  >
                    Struktur Organisasi <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 border-border rounded-2xl p-2 hover:-translate-y-1 bg-card">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-400 shrink-0">
                      <UserRound className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg font-bold">Tim Dokter Spesialis & Psikolog Klinis</CardTitle>
                      <CardDescription className="text-xs sm:text-sm mt-0.5">
                        Lihat jadwal praktik, pengalaman, serta profil lengkap tenaga medis terpercaya RSJD Atma Husada Mahakam.
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    className="rounded-full shrink-0 w-full sm:w-auto text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => navigate("/dokter")}
                  >
                    Profil Dokter <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 border-border rounded-2xl p-2 hover:-translate-y-1 bg-card">
                <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-400 shrink-0">
                      <ClipboardCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-lg font-bold">Tarif Layanan RSJD AHM</CardTitle>
                      <CardDescription className="text-xs sm:text-sm mt-0.5">
                        Informasi transparan mengenai biaya pelayanan medis, administrasi, dan tindakan di rumah sakit.
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    className="rounded-full shrink-0 w-full sm:w-auto text-xs px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
                    onClick={() => navigate("/tarif")}
                  >
                    Lihat Tarif <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </CardHeader>
              </Card>
            </div>
          </motion.section>

          {/* LAYANAN UTAMA RSJD (GRID 3 KOLOM BERJEJER) */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Header Section dengan Gaya Baru */}
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Layanan & Informasi Utama
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Fasilitas kesehatan jiwa, pendaftaran, transparansi tarif, dan rujukan komprehensif di Samarinda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
              {/* 1. CARD PENDAFTARAN ONLINE */}
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="border-border rounded-3xl p-6 bg-card shadow-sm h-full flex flex-col justify-between hover:shadow-lg transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-600">
                        <CalendarCheck className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-500/10 text-cyan-600 rounded-full">Online</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Pendaftaran Online</CardTitle>
                      <CardDescription className="text-xs mt-2 leading-relaxed">
                        Hubungi kami untuk menjadwalkan janji temu & memeriksa kesehatan Anda dengan mendaftar secara online.
                      </CardDescription>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border mt-6 flex items-center justify-between">
                    <div className="text-xs">
                      <p className="text-[10px] text-muted-foreground font-medium">Layanan Telepon:</p>
                      <p className="font-bold text-foreground">0541-743364</p>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full text-xs text-cyan-600 hover:text-cyan-700 hover:bg-cyan-500/10 gap-1 p-0 px-3" onClick={() => navigate("/booking")}>
                      Info Layanan <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* 2. CARD TARIF PELAYANAN */}
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="border-border rounded-3xl p-6 bg-card shadow-sm h-full flex flex-col justify-between hover:shadow-lg transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-600">
                        <Receipt className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-500/10 text-cyan-600 rounded-full">Transparan</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold">Tarif Pelayanan</CardTitle>
                      <CardDescription className="text-xs mt-2 leading-relaxed">
                        Informasi lengkap dan resmi rincian biaya pemeriksaan, rawat jalan, akomodasi, lab, hingga tindakan medis.
                      </CardDescription>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-border mt-6 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-medium">Resmi & Terupdate</span>
                    <Button variant="ghost" size="sm" className="rounded-full text-xs text-cyan-600 hover:text-cyan-700 hover:bg-cyan-500/10 gap-1 p-0 px-3" onClick={() => navigate("/tarif")}>
                      Lihat Tarif <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* 3. CARD JAM PELAYANAN (DENGAN WARNA BARU & ANIMASI) */}
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="border-none rounded-3xl p-6 bg-cyan-500 text-white shadow-md h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-white">Jam Pelayanan</CardTitle>
                      <div className="p-2.5 bg-white/15 rounded-2xl text-white">
                        <Clock className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-3 space-y-3 text-xs text-white/95">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <div>
                          <p className="font-medium">Senin s/d Kamis</p>
                          <p className="text-[10px] text-white/80">Sesi 1</p>
                        </div>
                        <span className="font-bold text-white">07:30 – 12:00 WITA</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <div>
                          <p className="font-medium">Senin s/d Kamis</p>
                          <p className="text-[10px] text-white/80">Sesi 2</p>
                        </div>
                        <span className="font-bold text-white">13:00 – 14:30 WITA</span>
                      </div>

                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="font-medium">Jum'at</span>
                        <span className="font-bold text-white">07:30 – 12:00 WITA</span>
                      </div>

                      <div className="pt-1">
                        <p className="text-[11px] font-bold tracking-wide uppercase text-white/90 mb-1.5">Jam Pelayanan Rawat Jalan</p>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                            <span className="font-medium">Senin s/d Kamis</span>
                            <span className="font-bold text-white">07:30 – 16:00 WITA</span>
                          </div>
                          <div className="flex justify-between items-center pb-1">
                            <span className="font-medium">Jumat</span>
                            <span className="font-bold text-white">07:30 – 14:00 WITA</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/25 mt-4">
                    <a 
                      href="tel:0541743364" 
                      className="text-xs font-bold text-white flex items-center justify-between hover:opacity-90 transition-opacity"
                    >
                      <span>Hubungi langsung IGD 24/7</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </Card>
              </motion.div>

            </div>
          </motion.section>

          {/* DIREKTORI KESEHATAN MENTAL */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-secondary/40 border border-border rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-cyan-500/10 rounded-2xl text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Brain className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-foreground">Direktori & Edukasi Kesehatan Mental</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                    Kenali definisi, variasi jenis, serta tingkatan risiko berbagai kondisi psikologis.
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => navigate("/edukasi")}
                className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white shrink-0 font-medium px-6 text-xs h-10 gap-2 w-full md:w-auto cursor-pointer transition-transform hover:scale-105"
              >
                Edukasi Lengkap <BookOpen className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {randomDisorders.map((item) => {
                const ItemIcon = item.icon
                return (
                  <Card 
                    key={item.id} 
                    onClick={() => navigate("/edukasi")}
                    className="border-border rounded-2xl p-5 space-y-3 bg-card hover:shadow-md hover:border-cyan-500/40 transition-all h-full flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${item.severityBg}`}>
                          Tingkat: {item.severity}
                        </span>
                        <ItemIcon className="w-4 h-4 text-muted-foreground group-hover:text-cyan-500 transition-colors shrink-0" />
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                          {item.name}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border/60 pt-3 text-[11px] text-muted-foreground space-y-1">
                      <p><span className="font-semibold text-foreground">Jenis/Variasi:</span> {item.types}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </motion.section>

          {/* ALUR PELAYANAN */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-100/60 dark:bg-slate-900/40 border border-border rounded-3xl p-6 sm:p-10 space-y-8"
          >
            <div className="text-center max-w-md mx-auto">
              <h2 className="text-2xl font-extrabold text-foreground">Alur Layanan Pasien RSJD AHM</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Prosedur mudah berkonsultasi di RSJD Atma Husada Mahakam Samarinda
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div 
                    key={idx} 
                    className="bg-background rounded-2xl p-6 border border-border flex flex-col justify-between relative shadow-sm transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="text-3xl font-black text-cyan-600/20 dark:text-cyan-400/20 absolute top-4 right-5">
                      {step.number}
                    </span>
                    <div>
                      <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-600 dark:text-cyan-400 w-fit mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base mb-1">{step.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.section>

          {/* BANNER SKRINING */}
          <motion.section
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold">Cek Kesehatan Mentalmu Sekarang</h3>
                <p className="text-xs sm:text-sm text-cyan-100 max-w-lg">
                  Hanya butuh 3 menit. Dapatkan hasil evaluasi awal secara rahasia dan saran penanganan yang tepat.
                </p>
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate("/skrining")}
                className="rounded-full bg-white text-cyan-800 hover:bg-cyan-50 shrink-0 font-bold px-7 transition-transform hover:scale-105 active:scale-95"
              >
                Mulai Tes Gratis
              </Button>
            </div>
          </motion.section>

          {/* STATISTIK */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div 
                  key={i} 
                  className="border border-border bg-card rounded-2xl p-5 text-center flex flex-col items-center justify-center space-y-1 transition-transform duration-300 hover:-translate-y-1"
                >
                  <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400 mb-1" />
                  <span className="text-2xl font-black text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.label}</span>
                </div>
              )
            })}
          </motion.section>

        </div>
      </div>
    </div>
  )
}