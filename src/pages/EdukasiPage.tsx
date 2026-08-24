// src/pages/EdukasiPage.tsx
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Footer from "@/components/Footer"
import { MENTAL_DISORDERS } from "@/data/mentalDisorders"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Brain,
  Search,
  Activity,
  HelpCircle,
  Stethoscope,
  Info,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  SlidersHorizontal,
  Check,
} from "lucide-react"

export default function EdukasiPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // State & Konfigurasi Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const categories = [
    { label: `Semua (${MENTAL_DISORDERS.length})`, value: "all" },
    { label: "Mood", value: "Mood" },
    { label: "Anxiety", value: "Anxiety" },
    { label: "Trauma", value: "Trauma" },
    { label: "Psikotik", value: "Psikotik" },
    { label: "Kepribadian", value: "Personality" },
    { label: "Adiksi", value: "Adiksi" },
    { label: "Makan", value: "Eating" },
    { label: "Disosiatif", value: "Disosiatif" },
    { label: "Neurodevelopmental", value: "Neurodevelopmental" },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  // Reset ke Halaman 1 saat Search/Kategori Berubah
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory])

  // Filter Data
  const filteredDisorders = MENTAL_DISORDERS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullDesc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // Hitung Data Halaman Saat Ini
  const totalPages = Math.ceil(filteredDisorders.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentDisorders = filteredDisorders.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      window.scrollTo({ top: 300, behavior: "smooth" })
    }
  }

  // Fungsi helper untuk menentukan warna badge tingkat keparahan secara konsisten
  const getSeverityBadgeClass = (severity: string) => {
    const s = severity.toLowerCase()
    if (s.includes("ringan")) {
      return "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
    } else if (s.includes("sedang")) {
      return "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
    } else {
      return "bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between w-full bg-background">
        <div className="container mx-auto max-w-6xl pt-28 pb-16 px-4 space-y-8">
          <Skeleton className="h-6 w-64 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4 max-w-lg rounded-xl" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>
          <Skeleton className="h-12 w-full rounded-2xl" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-48 rounded-3xl w-full" />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Cari label kategori aktif saat ini untuk ditampilkan di tombol HP
  const activeCategoryLabel = categories.find((c) => c.value === selectedCategory)?.label || "Filter"

  return (
    <div className="min-h-screen flex flex-col justify-between w-full bg-background text-foreground">
      <div className="container mx-auto max-w-6xl pt-28 pb-20 px-4 space-y-8 flex-grow">
        
        {/* BREADCRUMB */}
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
                Edukasi Kesehatan Mental
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
              <Brain className="w-3.5 h-3.5" /> Ensiklopedia Medis Lengkap ({MENTAL_DISORDERS.length} Kondisi)
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Edukasi Gangguan Psikologis
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Direktori komprehensif mengenai istilah medis, variasi sub-tipe, gejala klinis, hingga panduan penanganan profesional dari berbagai kelompok kondisi jiwa.
            </p>
          </div>

          <Button 
            onClick={() => navigate("/skrining")}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium gap-2 text-xs h-11 px-6 shadow-md shrink-0"
          >
            Mulai Skrining Mandiri <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* SEARCH & FILTER SECTION */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-grow sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Cari (Depresi, Adiksi, Tourette...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full bg-card text-xs h-10 border-border w-full"
              />
            </div>

            {/* Tombol Filter Khusus HP (Muncul Dialog) */}
            <div className="block lg:hidden">
              <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="rounded-full text-xs h-10 px-4 gap-2 border-border bg-card shrink-0"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="truncate max-w-[110px]">{activeCategoryLabel}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-3xl">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Pilih Kategori Edukasi</DialogTitle>
                    <DialogDescription className="text-xs text-muted-foreground">
                      Pilih kelompok kondisi psikologis yang ingin ditampilkan.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid grid-cols-1 gap-1.5 py-2 max-h-[60vh] overflow-y-auto pr-1">
                    {categories.map((cat) => {
                      const isSelected = selectedCategory === cat.value
                      return (
                        <button
                          key={cat.value}
                          onClick={() => {
                            setSelectedCategory(cat.value)
                            setIsFilterOpen(false)
                          }}
                          className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-xs font-medium transition-all ${
                            isSelected 
                              ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30" 
                              : "hover:bg-muted/60 text-foreground border border-transparent"
                          }`}
                        >
                          <span>{cat.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-cyan-600" />}
                        </button>
                      )
                    })}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Tabs Desktop (Hidden di HP, Muncul di Layar Besar) */}
          <div className="hidden lg:block w-full">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="bg-muted/60 p-1.5 rounded-2xl flex flex-wrap h-auto gap-1.5 justify-start w-full">
                {categories.map((tab) => {
                  const isActive = selectedCategory === tab.value
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-xl text-xs px-3.5 py-1.5 shrink-0 relative z-10 data-[state=active]:bg-transparent data-[state=active]:text-foreground text-muted-foreground transition-colors"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTabEdukasiDesktop"
                          className="absolute inset-0 bg-background rounded-xl shadow-sm z-[-1]"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      {tab.label}
                    </TabsTrigger>
                  )
                })}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* DAFTAR GANGGUAN */}
        {filteredDisorders.length === 0 ? (
          <Card className="border-dashed rounded-3xl p-12 text-center space-y-3">
            <Info className="w-10 h-10 text-muted-foreground mx-auto" />
            <p className="font-semibold text-foreground">Tidak menemukan informasi yang sesuai</p>
            <p className="text-xs text-muted-foreground">Coba kata kunci lain atau pilih kategori "Semua".</p>
          </Card>
        ) : (
          <div className="flex flex-col space-y-5 w-full">
            {currentDisorders.map((disorder) => (
              <Card key={disorder.id} className="border-border rounded-3xl bg-card shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-center justify-between gap-2">
                    <Badge className={`rounded-full text-[10px] font-semibold px-3 py-0.5 ${getSeverityBadgeClass(disorder.severity)}`}>
                      Tingkat: {disorder.severity}
                    </Badge>
                    <Badge variant="secondary" className="rounded-full text-[10px] uppercase tracking-wider">
                      {disorder.category}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">{disorder.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {disorder.shortDesc}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0">
                  <Accordion type="single" collapsible className="w-full border-t border-border/60">
                    
                    {/* Variasi */}
                    <AccordionItem value="types" className="border-b-0">
                      <AccordionTrigger className="text-xs font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-cyan-600" /> Variasi & Sub-tipe Kondisi
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-xs space-y-2 text-muted-foreground pt-1 pb-3">
                        {disorder.types.map((t, idx) => (
                          <div key={idx} className="bg-muted/40 p-2.5 rounded-xl border border-border/40">
                            <p className="font-semibold text-foreground">{t.name}</p>
                            <p className="mt-0.5">{t.desc}</p>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                    {/* Gejala Utama */}
                    <AccordionItem value="symptoms" className="border-b-0">
                      <AccordionTrigger className="text-xs font-semibold hover:no-underline py-3">
                        <span className="flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Gejala & Tanda Klinis Utama
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-xs space-y-1.5 text-muted-foreground pt-1 pb-3">
                        {disorder.symptoms.map((symptom, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                            <span>{symptom}</span>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>

                  {/* ACTION DIALOG */}
                  <div className="pt-2 flex items-center justify-between border-t border-border/60">
                    <span className="text-[11px] text-muted-foreground">Butuh bantuan medis?</span>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-full text-xs text-cyan-600 hover:text-cyan-700 hover:bg-cyan-500/10">
                          Detail Penanganan <Info className="w-3.5 h-3.5 ml-1" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-lg rounded-3xl">
                        <DialogHeader className="space-y-2">
                          <Badge className={`w-fit rounded-full text-[10px] ${getSeverityBadgeClass(disorder.severity)}`}>
                            Tingkat: {disorder.severity}
                          </Badge>
                          <DialogTitle className="text-2xl font-extrabold">{disorder.name}</DialogTitle>
                          <DialogDescription className="text-xs leading-relaxed text-foreground/80 pt-2">
                            {disorder.fullDesc}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-3">
                          <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl space-y-1.5">
                            <h5 className="text-xs font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
                              <Stethoscope className="w-4 h-4" /> Panduan Penanganan Medis
                            </h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {disorder.handling}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h5 className="text-xs font-bold text-foreground">Kapan Harus ke Dokter/Psikiater?</h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Jika gejala telah berlangsung lebih dari 2 minggu, mengganggu aktivitas harian, atau memunculkan dorongan untuk menyakiti diri sendiri, segera jadwalkan konsultasi.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-border">
                          <Button 
                            variant="outline" 
                            className="rounded-full text-xs"
                            onClick={() => navigate("/dokter")}
                          >
                            Konsultasi Dokter
                          </Button>
                          <Button 
                            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs"
                            onClick={() => navigate("/booking")}
                          >
                            Buat Janji Temu
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* PAGINATION SHADCN */}
        {totalPages > 1 && (
          <div className="pt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    className={`cursor-pointer ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => handlePageChange(currentPage - 1)} 
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          className="cursor-pointer"
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )
                  }
                  return null
                })}

                <PaginationItem>
                  <PaginationNext 
                    className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
                    onClick={() => handlePageChange(currentPage + 1)} 
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* FAQ SECTION */}
        <div className="bg-secondary/30 border border-border rounded-3xl p-6 sm:p-10 space-y-6 mt-12">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-bold text-foreground flex items-center justify-center gap-2">
              <HelpCircle className="w-5 h-5 text-cyan-600" /> Pertanyaan Sering Diajukan (FAQ)
            </h3>
            <p className="text-xs text-muted-foreground">
              Informasi dasar mengenai proses diagnosis dan alur perawatan kesehatan jiwa.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-3">
            <AccordionItem value="faq-1" className="border border-border bg-card rounded-2xl px-5">
              <AccordionTrigger className="text-xs sm:text-sm font-semibold hover:no-underline py-4">
                Apakah diagnosis dapat dilakukan sendiri secara online?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                Tidak. Skrining mandiri atau membaca artikel edukasi hanya berfungsi sebagai panduan awal. Diagnosis resmi hanya dapat ditegakkan oleh psikiater atau psikolog klinis melalui wawancara medis mendalam.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-2" className="border border-border bg-card rounded-2xl px-5">
              <AccordionTrigger className="text-xs sm:text-sm font-semibold hover:no-underline py-4">
                Apa perbedaan antara Psikolog dan Psikiater?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                Psikiater adalah dokter spesialis kedokteran jiwa yang berwenang meresepkan obat-obatan medis. Psikolog berfokus pada psikoterapi, konseling, dan evaluasi psikotes tanpa pemberian resep obat.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="faq-3" className="border border-border bg-card rounded-2xl px-5">
              <AccordionTrigger className="text-xs sm:text-sm font-semibold hover:no-underline py-4">
                Apakah layanan konsultasi RSJD dicover oleh BPJS Kesehatan?
              </AccordionTrigger>
              <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                Ya, RSJD melayani pasien BPJS Kesehatan dengan membawa surat rujukan dari Faskes Tingkat 1 (Puskesmas/Klinik).
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>

    </div>
  )
}