// src/pages/TarifPage.tsx
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"

// Shadcn UI Components & Dialog
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { 
  Info,
  ArrowRight,
  ArrowLeft,
  Receipt,
  Sparkles,
  PhoneCall,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Image as ImageIcon
} from "lucide-react"

export default function TarifPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // State untuk Preview Modal Gambar
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors">
      
      {/* WRAPPER KONTEN UTAMA */}
      <div className="container mx-auto max-w-5xl pt-28 pb-16 px-4 space-y-8 flex-grow">
        
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
                    Tarif Pelayanan
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground pt-1 flex items-center gap-2">
              Daftar Tarif Pelayanan RSJD AHM <Sparkles className="w-5 h-5 text-cyan-500" />
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-600 shrink-0" />
              Transparansi rincian biaya pemeriksaan, akomodasi, laboratorium, MCU, hingga tindakan medis di rumah sakit.
            </p>
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <Card className="rounded-3xl p-8 space-y-6 border-border bg-card shadow-sm">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-[500px] w-full rounded-2xl" />
          </Card>
        ) : (
          <div className="space-y-8">
            
            {/* CARD BANNER TARIF PELAYANAN */}
            <Card className="rounded-3xl border-border bg-card shadow-sm overflow-hidden">
              <CardHeader className="p-6 sm:p-8 pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-600 flex items-center justify-center font-bold shrink-0">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-bold">
                        Rincian Resmi Tarif Pelayanan Rumah Sakit
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        Meliputi tarif pemeriksaan elektromedik, rawat jalan, akomodasi, lab, MCU, MHCU, dan tindakan psikiatri.{" "}
                        <span className="text-cyan-600 dark:text-cyan-400 font-medium">(Klik gambar untuk memperbesar)</span>
                      </CardDescription>
                    </div>
                  </div>

                  {/* HOTLINE BADGE */}
                  <div className="bg-secondary/60 border border-border/80 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shrink-0">
                    <PhoneCall className="w-4 h-4 text-cyan-600" />
                    <div className="text-xs">
                      <p className="text-[10px] text-muted-foreground font-medium">Hotline Service:</p>
                      <p className="font-bold text-foreground">08115878787</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 sm:p-8 pt-0 space-y-4">
                <div 
                  onClick={() => setPreviewImage("https://rsjdahm.kaltimprov.go.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-11.27.01-1024x576.jpeg")}
                  className="rounded-2xl overflow-hidden border border-border/60 bg-muted/20 shadow-inner p-2 cursor-pointer group relative"
                >
                  <img 
                    src="https://rsjdahm.kaltimprov.go.id/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-05-at-11.27.01-1024x576.jpeg" 
                    alt="Daftar Tarif Pelayanan RSJD Atma Husada Mahakam" 
                    className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-black/70 text-white text-xs px-4 py-2 rounded-full font-medium shadow-lg backdrop-blur-sm flex items-center gap-1.5">
                      <ZoomIn className="w-4 h-4" /> Klik untuk Perbesar
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground text-center leading-relaxed pt-2">
                  * Tarif sewaktu-waktu dapat menyesuaikan dengan ketentuan dan regulasi rumah sakit yang berlaku.
                </p>
              </CardContent>
            </Card>

          </div>
        )}

        {/* CTA NAVIGASI BAWAH */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Button 
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto rounded-full border-border bg-card text-foreground hover:bg-muted text-xs px-6 py-3 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Kembali ke Beranda</span>
          </Button>
            
          <Button 
            onClick={() => navigate("/profil-rs")}
            className="w-full sm:w-auto rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-6 py-3 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95 whitespace-normal h-auto text-center sm:text-right"
          >
            <span>Profil Rumah Sakit</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </Button>
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
            <DialogTitle>Pratinjau Gambar Tarif</DialogTitle>
            <DialogDescription>Lihat lampiran daftar tarif dalam ukuran penuh</DialogDescription>
          </DialogHeader>

          {/* Top Toolbar di dalam Dialog */}
          <div className="absolute top-4 left-6 right-6 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <div className="flex items-center gap-2 text-xs font-medium">
              <ImageIcon className="w-4 h-4 text-cyan-400" />
              <span>Pratinjau Tarif Pelayanan</span>
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
              alt="Fullscreen Preview Tarif"
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