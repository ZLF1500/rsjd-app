// src/pages/DashboardPage.tsx
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Slider } from "@/components/ui/slider" // <-- IMPORT KOMPONEN SLIDER DI SINI
import { 
  Calendar, 
  ClipboardList, 
  FileText, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  HeartPulse,
  UserCheck,
  Stethoscope,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  MessageCircle,
  MapPin,
  Send,
  Plus,
  Image as ImageIcon,
  X,
  FileUp,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

// Import komponen shadcn UI chat
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/components/ui/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton } from "@/components/ui/message-scroller"

type MessageFile = {
  name: string
  size: string
  type: string
  url?: string
}

type ChatMessage = {
  sender: string
  text: string
  time: string
  file: MessageFile | null
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("aktivitas")
  const [chatInput, setChatInput] = useState("")
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: string; url?: string } | null>(null)
  
  // State untuk modal preview gambar, level zoom, dan posisi drag
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement>(null)

  // Hitung batas pan berdasarkan ukuran render ASLI gambar (offsetWidth/Height
  // tidak berubah oleh CSS transform: scale), bukan asumsi persentase window.
  // Ini yang bikin gambar "mentok" pas di tepi asli, gak nyisain area hitam.
  const getPanBounds = (zoom: number) => {
    const el = imgRef.current
    if (!el) return { maxPanX: 0, maxPanY: 0 }
    return {
      maxPanX: (el.offsetWidth * (zoom - 1)) / 2,
      maxPanY: (el.offsetHeight * (zoom - 1)) / 2,
    }
  }
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Agar modal tertutup saat menekan tombol Back di HP / browser
  useEffect(() => {
    const handlePopState = () => {
      if (previewImage) {
        setPreviewImage(null)
      }
    }

    if (previewImage) {
      window.history.pushState({ modalOpen: true }, "")
      window.addEventListener("popstate", handlePopState)
    }

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [previewImage])

 const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "doctor", text: "Halo Saudara Andi, bagaimana kondisi Anda setelah sesi terakhir kemarin?", time: "Kemarin, 14:30", file: null },
    { sender: "user", text: "Sudah agak lebih tenang dok, obat rutin juga sudah diminum teratur.", time: "Kemarin, 15:00", file: null },
    { sender: "doctor", text: "Bagus sekali. Pertahankan pola istirahatnya ya. Kita ketemu besok sesuai jadwal.", time: "Kemarin, 15:10", file: null }
  ])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const fileSizeKB = Math.round(file.size / 1024)
      const sizeStr = fileSizeKB > 1024 ? `${(fileSizeKB / 1024).toFixed(1)} MB` : `${fileSizeKB} KB`
      
      const isImage = file.type.startsWith("image/")
      const fileUrl = isImage ? URL.createObjectURL(file) : undefined

      setAttachedFile({
        name: file.name,
        size: sizeStr,
        type: file.type,
        url: fileUrl
      })
      setShowAttachMenu(false)
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() && !attachedFile) return

    setMessages((prev) => [
      ...prev,
      { 
        sender: "user", 
        text: chatInput.trim(), 
        time: "Baru saja",
        file: attachedFile ? { ...attachedFile } : null 
      }
    ])
    setChatInput("")
    setAttachedFile(null)
    setShowAttachMenu(false)
  }

  // Handler untuk mulai drag/geser gambar (dipakai di modal preview)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return
    setIsDragging(true)
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl pt-28 pb-16 px-4 space-y-6">
        <Skeleton className="h-32 w-full rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-36 rounded-3xl" />
          <Skeleton className="h-36 rounded-3xl" />
          <Skeleton className="h-36 rounded-3xl" />
        </div>
        <Skeleton className="h-72 rounded-3xl w-full" />
      </div>
    )
  }

  const tabs = [
    { id: "aktivitas", label: "Jadwal & Aktivitas Medis" },
    { id: "resep", label: "Catatan Resep & Obat" },
    { id: "messages", label: "Pesan Konsultasi" },
    { id: "darurat", label: "Bantuan Krisis Darurat" },
  ]

  const activeTabIndex = tabs.findIndex((t) => t.id === activeTab)

  const handlePrevTab = () => {
    const newIndex = (activeTabIndex - 1 + tabs.length) % tabs.length
    setActiveTab(tabs[newIndex].id)
  }

  const handleNextTab = () => {
    const newIndex = (activeTabIndex + 1) % tabs.length
    setActiveTab(tabs[newIndex].id)
  }

  return (
    <div className="container mx-auto max-w-6xl pt-28 pb-20 px-4 space-y-8">
      
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*,.pdf,.doc,.docx"
      />

      {/* BANNER SELAMAT DATANG */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <Badge className="bg-white/20 text-white border-none text-[10px] font-semibold px-3 py-0.5 rounded-full">
            Portal Pasien Terverifikasi
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Halo, Andi Pratama 👋
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl leading-relaxed">
            Sistem mencatat kondisi Anda stabil minggu ini. Pastikan jadwal konsultasi esok hari dipersiapkan dengan baik.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <Button 
            onClick={() => navigate("/booking")}
            className="bg-white text-cyan-700 hover:bg-white/90 font-semibold text-xs rounded-full h-11 px-6 shadow-sm transition-all"
          >
            Buat Janji Temu <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </motion.div>

      {/* STATISTIK RINGKAS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-3xl border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">Konsultasi Berikutnya</CardTitle>
            <div className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-600">
              <Calendar className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-lg font-bold text-foreground">Besok, 09:00 WIB</div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-emerald-500" /> Dr. Anita, Sp.KJ (Tatap Muka)
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">Skrining Mandiri Terakhir</CardTitle>
            <div className="p-2 rounded-2xl bg-teal-500/10 text-teal-600">
              <ClipboardList className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-lg font-bold text-foreground">Kecemasan Ringan</div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-cyan-500" /> Skor PHQ-9 / GAD-7 Stabil
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border bg-card shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">Progres Pemulihan Sesi</CardTitle>
            <div className="p-2 rounded-2xl bg-rose-500/10 text-rose-600">
              <HeartPulse className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span>Sesi 3 dari 4 Selesai</span>
              <span className="text-cyan-600">75%</span>
            </div>
            <Progress value={75} className="h-2 rounded-full" />
          </CardContent>
        </Card>
      </div>

      {/* KONTROL TAB */}
      <div className="space-y-6">
        
        {/* TAMPILAN MOBILE: Tombol Navigasi < & > */}
        <div className="flex sm:hidden items-center justify-between bg-muted/60 p-2 rounded-2xl border border-border/60">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePrevTab}
            className="rounded-xl w-9 h-9 shrink-0 bg-background shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="text-center px-2">
            <p className="text-[10px] text-muted-foreground font-medium">Kategori Menu</p>
            <p className="text-xs font-bold text-foreground truncate max-w-[200px]">
              {tabs[activeTabIndex].label}
            </p>
          </div>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNextTab}
            className="rounded-xl w-9 h-9 shrink-0 bg-background shadow-xs"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* TAMPILAN DESKTOP/TABLET: Tab Biasa Berjejer */}
        <div className="hidden sm:flex bg-muted/60 p-1.5 rounded-2xl flex-wrap gap-1 w-fit">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-colors z-10 ${
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPillDesktop"
                    className="absolute inset-0 bg-background shadow-sm rounded-xl -z-10 border border-border/50"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* KONTEN TAB */}
        <div className="relative">
          <AnimatePresence mode="wait">
            
            {activeTab === "aktivitas" && (
              <motion.div
                key="aktivitas"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="rounded-3xl border-border bg-card shadow-sm lg:col-span-2 flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle className="text-base font-bold flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600" /> Status Reservasi Klinik Aktif
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Detail antrean dan jadwal konsultasi psikoterapi atau psikiatri Anda.
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="bg-secondary/40 border border-border/60 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500/15 text-emerald-600 border border-emerald-500/30 text-[10px] font-semibold">
                              Terkonfirmasi & Disetujui
                            </Badge>
                            <span className="text-xs font-bold text-foreground">Poli Psikiatri Dewasa</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Konsultasi Tatap Muka bersama <strong className="text-foreground">Dr. Anita, Sp.KJ</strong>
                          </p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-1">
                            <Calendar className="w-3.5 h-3.5 text-cyan-600" /> Jumat, 14 Agustus 2026 • 09:00 - 10:00 WIB
                          </p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-500" /> Gedung A Lantai 2, RSJD Utama
                          </p>
                        </div>

                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full text-xs shrink-0"
                          onClick={() => navigate("/booking")}
                        >
                          Kelola Jadwal
                        </Button>
                      </div>

                      <div className="p-4 rounded-2xl border border-dashed border-border flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Butuh surat rujukan atau cetak ulang tiket?</span>
                        <button 
                          onClick={() => navigate("/booking")}
                          className="text-cyan-600 font-semibold hover:underline flex items-center gap-1"
                        >
                          Unduh Bukti Daftar <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="rounded-3xl border-border bg-card shadow-sm flex flex-col justify-between">
                    <CardHeader>
                      <CardTitle className="text-base font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-600" /> Jalan Pintas Layanan
                      </CardTitle>
                      <CardDescription className="text-xs">Fitur sering digunakan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start rounded-2xl text-xs h-11 hover:bg-secondary gap-3"
                        onClick={() => navigate("/skrining")}
                      >
                        <ClipboardList className="w-4 h-4 text-cyan-600" />
                        <span>Mulai Skrining Mandiri</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start rounded-2xl text-xs h-11 hover:bg-secondary gap-3"
                        onClick={() => navigate("/edukasi")}
                      >
                        <FileText className="w-4 h-4 text-cyan-600" />
                        <span>Ensiklopedia Kesehatan Jiwa</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start rounded-2xl text-xs h-11 hover:bg-secondary gap-3"
                        onClick={() => navigate("/dokter")}
                      >
                        <Stethoscope className="w-4 h-4 text-cyan-600" />
                        <span>Direktori Dokter & Spesialis</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeTab === "resep" && (
              <motion.div
                key="resep"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Card className="rounded-3xl border-border bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-cyan-600" /> Catatan Resep Medis Aktif
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Daftar obat yang diresepkan oleh dokter penanggung jawab Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-muted/40 p-4 rounded-2xl border border-border/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-foreground">Sertraline 50mg</span>
                          <Badge variant="secondary" className="text-[10px]">1x Sehari (Pagi)</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Diminum sesudah makan • Resep dari Dr. Anita, Sp.KJ</p>
                      </div>
                      <Badge className="bg-cyan-500/15 text-cyan-600 border border-cyan-500/30 text-[10px]">
                        Sisa 12 Tablet
                      </Badge>
                    </div>

                    <div className="bg-muted/40 p-4 rounded-2xl border border-border/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-foreground">Alprazolam 0.5mg</span>
                          <Badge variant="secondary" className="text-[10px]">Jika Perlu (Kecemasan)</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Sesuai petunjuk resep terbatas dokter.</p>
                      </div>
                      <Badge className="bg-amber-500/15 text-amber-600 border border-amber-500/30 text-[10px]">
                        Perlu Konsultasi Ulang
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-border pt-4 text-[11px] text-muted-foreground">
                    *Jangan mengubah dosis obat tanpa berkonsultasi langsung dengan dokter psikiater Anda.
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {/* TAB MESSAGES */}
            {activeTab === "messages" && (
              <motion.div
                key="messages"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Card className="rounded-3xl border-border bg-card shadow-sm overflow-hidden relative">
                  <CardHeader className="border-b border-border/60 pb-4">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-cyan-600/10 text-cyan-600 flex items-center justify-center font-bold text-sm shrink-0">
                            DA
                        </div>
                        <div className="min-w-0">
                            <CardTitle className="text-sm font-bold flex items-center gap-2 truncate">
                            <span className="truncate">Dr. Anita, Sp.KJ</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" />
                            </CardTitle>
                            <CardDescription className="text-[11px] truncate">
                            Poli Psikiatri Dewasa • Aktif Kemarin
                            </CardDescription>
                        </div>
                        </div>
                        <Badge variant="outline" className="text-[10px] text-cyan-600 border-cyan-500/30 shrink-0 hidden sm:inline-flex">
                        Konsultasi Aktif
                        </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0 relative">
                    <MessageScrollerProvider>
                      <MessageScroller className="h-[360px] bg-muted/20 overscroll-y-auto">
                        <MessageScrollerViewport className="overscroll-y-auto">
                          <MessageScrollerContent className="p-4 sm:p-6 gap-3">
                            {messages.map((msg, index) => {
                              const isUser = msg.sender === "user"
                              return (
                                <MessageScrollerItem key={index} scrollAnchor={index === messages.length - 1}>
                                  <Message align={isUser ? "end" : "start"}>
                                    {!isUser && (
                                      <MessageAvatar className="w-8 h-8 text-[11px] font-semibold text-cyan-700 bg-cyan-500/10">
                                        DA
                                      </MessageAvatar>
                                    )}
                                    
                                    <MessageContent className={`flex flex-col ${isUser ? "items-end" : "items-start"} space-y-1.5`}>
                                      
                                      {/* Lampiran Gambar / File */}
                                      {msg.file && (
                                        <div>
                                          {msg.file?.type?.startsWith("image/") && msg.file.url ? (
                                            <div 
                                              onClick={() => {
                                                setPreviewImage(msg.file?.url || null)
                                                setZoomLevel(1)
                                                setPanPosition({ x: 0, y: 0 })
                                              }}
                                              className="block overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm max-w-[240px] hover:opacity-95 transition-opacity cursor-pointer group"
                                            >
                                              <img src={msg.file.url} alt={msg.file.name} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-300" />
                                              <div className="p-2 text-[10px] flex items-center justify-between bg-cyan-700 text-white">
                                                <span className="truncate font-medium">{msg.file.name}</span>
                                                <span className="opacity-75 shrink-0 ml-1">{msg.file.size}</span>
                                              </div>
                                            </div>
                                          ) : (
                                            <a 
                                              href={msg.file.url || "#"} 
                                              download={msg.file.name}
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className={`flex items-center gap-3 p-3 rounded-2xl border text-xs max-w-[260px] transition-all hover:opacity-90 cursor-pointer ${
                                                isUser 
                                                  ? "bg-cyan-600 border-cyan-500 text-white shadow-sm" 
                                                  : "bg-card border-border text-foreground shadow-sm"
                                              }`}
                                            >
                                              <div className={`p-2 rounded-xl shrink-0 ${isUser ? "bg-white/20 text-white" : "bg-cyan-500/10 text-cyan-600"}`}>
                                                <FileUp className="w-4 h-4" />
                                              </div>
                                              <div className="min-w-0 flex-1">
                                                <p className="font-semibold truncate text-[11px]">{msg.file?.name}</p>
                                                <p className={`text-[10px] ${isUser ? "opacity-80" : "text-muted-foreground"}`}>{msg.file?.size} • Klik untuk unduh</p>
                                              </div>
                                            </a>
                                          )}
                                        </div>
                                      )}

                                      {/* Bubble untuk Teks Pesan */}
                                      {msg.text && (
                                        <Bubble variant={isUser ? "default" : "secondary"} align={isUser ? "end" : "start"}>
                                          <BubbleContent className={isUser ? "bg-cyan-600 text-white" : "bg-background border-border/60"}>
                                            {msg.text}
                                          </BubbleContent>
                                        </Bubble>
                                      )}

                                      <MessageFooter className="px-1 text-[10px] text-muted-foreground">
                                        {msg.time}
                                      </MessageFooter>
                                    </MessageContent>
                                  </Message>
                                </MessageScrollerItem>
                              )
                            })}
                          </MessageScrollerContent>
                        </MessageScrollerViewport>
                        <MessageScrollerButton direction="end" />
                      </MessageScroller>
                    </MessageScrollerProvider>

                    {/* Chat Input Bar */}
                    <div className="relative border-t border-border/60 bg-card p-4 space-y-3">
                      
                      {attachedFile && (
                        <div className="flex items-center justify-between bg-muted/60 border border-border/60 p-2.5 rounded-2xl text-xs">
                          <div className="flex items-center gap-3 truncate">
                            {attachedFile.type.startsWith("image/") && attachedFile.url ? (
                              <img src={attachedFile.url} alt="Preview" className="w-10 h-10 rounded-xl object-cover border" />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-cyan-600/10 text-cyan-600 flex items-center justify-center shrink-0">
                                <FileUp className="w-5 h-5" />
                              </div>
                            )}
                            <div className="truncate">
                              <p className="font-semibold text-foreground truncate text-[11px]">{attachedFile.name}</p>
                              <p className="text-[10px] text-muted-foreground">{attachedFile.size} • Siap dikirim</p>
                            </div>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => setAttachedFile(null)}
                            className="text-muted-foreground hover:text-rose-500 transition-colors p-1.5 rounded-full hover:bg-background"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* POP-UP MENU ATTACHMENT */}
                      <AnimatePresence>
                        {showAttachMenu && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute bottom-20 left-4 bg-popover text-popover-foreground border border-border shadow-xl rounded-2xl p-2 w-60 space-y-1 z-30"
                          >
                            <button 
                              type="button"
                              onClick={() => {
                                setShowAttachMenu(false)
                                if (fileInputRef.current) fileInputRef.current.click()
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted text-xs font-medium text-left transition-colors"
                            >
                              <ImageIcon className="w-4 h-4 text-cyan-600" />
                              <span>Add Photos & Files</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setShowAttachMenu(!showAttachMenu)}
                          className={`rounded-full w-10 h-10 shrink-0 transition-transform ${showAttachMenu ? "rotate-45 bg-muted" : ""}`}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>

                        <input
                          type="text"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Ketik pesan atau konsultasikan keluhan..."
                          className="flex-1 bg-secondary/50 border border-border/60 rounded-full px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500/30 text-foreground placeholder:text-muted-foreground"
                        />

                        <Button 
                          type="submit" 
                          size="icon" 
                          className="rounded-full w-10 h-10 bg-cyan-600 hover:bg-cyan-700 text-white shrink-0 shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeTab === "darurat" && (
              <motion.div
                key="darurat"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Card className="rounded-3xl border-border bg-card shadow-sm border-rose-500/30">
                  <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-base">
                      <ShieldAlert className="w-5 h-5" />
                      <span>Bantuan Krisis & Darurat Medis Jiwa</span>
                    </div>
                    <CardDescription className="text-xs">
                      Jika Anda mengalami pikiran membahayakan diri atau krisis panik parah, segera kunjungi IGD RSJD terdekat atau hubungi kontak di bawah ini.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    
                    {/* 1. IGD RSJD Atma Husada Mahakam (Telepon) */}
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-rose-600 dark:text-rose-400">IGD RSJD Atma Husada Mahakam</span>
                        <p className="text-xs text-foreground font-semibold">(0541) 743364 • Layanan Gawat Darurat 24 Jam</p>
                      </div>
                      <Button 
                        onClick={() => window.location.href = "tel:0541743364"}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs rounded-full h-10 px-5 gap-2 shrink-0"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Hubungi IGD
                      </Button>
                    </div>

                    {/* 2. Hotline WhatsApp RSJD (Chat) */}
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-rose-600 dark:text-rose-400">Hotline WhatsApp RSJD</span>
                        <p className="text-xs text-foreground font-semibold">0811 587 8787 • Layanan Konsultasi & Pesan Teks</p>
                      </div>
                      <Button 
                        onClick={() => window.open("https://wa.me/628115878787", "_blank")}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs rounded-full h-10 px-5 gap-2 shrink-0"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> Chat WhatsApp
                      </Button>
                    </div>

                    {/* 3. Hotline Kemenkes / Sesama Jiwa (Telepon) */}
                    <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-rose-600 dark:text-rose-400">Hotline Kemenkes / Sesama Jiwa</span>
                        <p className="text-xs text-foreground font-semibold">119 (Ext. 8) • Layanan Bebas Pulsa 24 Jam</p>
                      </div>
                      <Button 
                        onClick={() => window.location.href = "tel:119"}
                        className="bg-rose-600 hover:bg-rose-700 text-white text-xs rounded-full h-10 px-5 gap-2 shrink-0"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Panggil Darurat Sekarang
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* MODAL PREVIEW GAMBAR MENGGUNAKAN SHADCN DIALOG */}
      <Dialog open={!!previewImage} onOpenChange={(open) => {
        if (!open) {
          setPreviewImage(null)
          setZoomLevel(1)
          setPanPosition({ x: 0, y: 0 })
        }
      }}>
        <DialogContent className="!max-w-7xl !w-[95vw] h-[90vh] max-h-[90vh] p-0 overflow-hidden bg-black/95 border-none flex flex-col items-center justify-center shadow-2xl">
          <DialogHeader className="sr-only">
            <DialogTitle>Pratinjau Gambar</DialogTitle>
            <DialogDescription>Lihat lampiran gambar dalam ukuran penuh</DialogDescription>
          </DialogHeader>

          {/* Top Toolbar di dalam Dialog */}
          <div className="absolute top-4 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <div className="flex items-center gap-2 text-xs font-medium">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>Pratinjau Lampiran</span>
            </div>

            {/* Kontrol Zoom (Tombol Minus, Slider, Tombol Plus) */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-xl text-white hover:bg-white/20 shrink-0"
                onClick={() => {
                  const newZoom = Math.max(zoomLevel - 0.25, 0.5)
                  setZoomLevel(newZoom)
                  if (newZoom <= 1) setPanPosition({ x: 0, y: 0 })
                }}
                title="Perkecil (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>

              <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-xl border border-white/10 w-44 sm:w-52">
                <Slider
                  value={[zoomLevel]}
                  min={0.5}
                  max={3}
                  step={0.05}
                  onValueChange={(val) => {
                    const newZoom = val[0]
                    setZoomLevel(newZoom)
                    if (newZoom <= 1) {
                      setPanPosition({ x: 0, y: 0 })
                    } else {
                      const { maxPanX, maxPanY } = getPanBounds(newZoom)
                      setPanPosition((prev) => ({
                        x: Math.max(Math.min(prev.x, maxPanX), -maxPanX),
                        y: Math.max(Math.min(prev.y, maxPanY), -maxPanY)
                      }))
                    }
                  }}
                  className="cursor-pointer"
                />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-xl text-white hover:bg-white/20 shrink-0"
                onClick={() => {
                  const newZoom = Math.min(zoomLevel + 0.25, 3)
                  setZoomLevel(newZoom)
                }}
                title="Perbesar (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>

              <span className="text-xs font-semibold text-cyan-300 w-12 text-right">
                {Math.round(zoomLevel * 100)}%
              </span>

              <div className="w-[1px] h-4 bg-white/20 mx-1" />

              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-xl text-white hover:bg-white/20 shrink-0"
                onClick={() => {
                  setZoomLevel(1)
                  setPanPosition({ x: 0, y: 0 })
                }}
                title="Reset Posisi"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Image Container dengan Dukungan Mouse & Touch (Mobile Friendly) */}
          <div 
            ref={(node) => {
              if (!node) return
              const handleWheel = (e: WheelEvent) => {
                e.preventDefault()
                const zoomFactor = -e.deltaY * 0.0015
                setZoomLevel((prev) => {
                  const nextZoom = Math.max(0.5, Math.min(3, prev + zoomFactor))
                  if (nextZoom <= 1) setPanPosition({ x: 0, y: 0 })
                  return nextZoom
                })
              }
              node.addEventListener("wheel", handleWheel, { passive: false })
            }}
            className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing p-8 touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={(e) => {
              if (!isDragging || zoomLevel <= 1) return
              const { maxPanX, maxPanY } = getPanBounds(zoomLevel)
              
              const newX = e.clientX - dragStart.x
              const newY = e.clientY - dragStart.y

              setPanPosition({
                x: Math.max(Math.min(newX, maxPanX), -maxPanX),
                y: Math.max(Math.min(newY, maxPanY), -maxPanY)
              })
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            // Touch Events untuk Smartphone / Touchscreen
            onTouchStart={(e) => {
              if (e.touches.length === 1 && zoomLevel > 1) {
                setIsDragging(true)
                setDragStart({ 
                  x: e.touches[0].clientX - panPosition.x, 
                  y: e.touches[0].clientY - panPosition.y 
                })
              }
            }}
            onTouchMove={(e) => {
              if (!isDragging || zoomLevel <= 1 || e.touches.length !== 1) return
              const { maxPanX, maxPanY } = getPanBounds(zoomLevel)
              
              const newX = e.touches[0].clientX - dragStart.x
              const newY = e.touches[0].clientY - dragStart.y

              setPanPosition({
                x: Math.max(Math.min(newX, maxPanX), -maxPanX),
                y: Math.max(Math.min(newY, maxPanY), -maxPanY)
              })
            }}
            onTouchEnd={() => setIsDragging(false)}
          >
            <img 
              ref={imgRef}
              src={previewImage || ""} 
              alt="Fullscreen Preview"
              className="max-h-[80vh] max-w-[85vw] object-contain rounded-xl shadow-2xl transition-transform duration-75 ease-out"
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`
              }}
              draggable={false}
            />
          </div>

        </DialogContent>
      </Dialog>

    </div>
  )
}