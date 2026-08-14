// src/pages/StrukturPage.tsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Shadcn UI Accordion Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { 
  Users, 
  ArrowRight,
  Info,
  UserCheck,
  Building,
  FileSpreadsheet,
  WalletCards,
  Stethoscope,
  HeartPulse,
  GraduationCap,
  Activity,
  Layers,
  ArrowLeft
} from "lucide-react"

// Varian animasi untuk efek stagger daftar item (muncul berurutan)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3 } 
  }
}

// Pembatas antar grup jabatan: garis gradient simetris kiri-kanan
// dengan titik penanda di tengah, spacing atas-bawah dibuat sama (py-6)
// supaya jaraknya konsisten dan lebih "terasa" dibanding garis polos.
function GroupDivider() {
  return (
    <div className="-mx-2 py-6" aria-hidden="true">
      <div className="h-px w-full bg-border" />
    </div>
  )
}

export default function StrukturPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  // State global accordion: memastikan cuma 1 item yang bisa terbuka
  // di seluruh halaman, meskipun item-nya tersebar di beberapa "grup" visual.
  const [openItem, setOpenItem] = useState<string>("")

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors">
        <div className="container mx-auto max-w-5xl pt-28 pb-16 px-4 space-y-8 flex-grow">
          <Skeleton className="h-6 w-48 rounded-md" />
          <Skeleton className="h-10 w-3/4 rounded-xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
          <Skeleton className="h-48 w-full rounded-3xl" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors">
      
      {/* WRAPPER KONTEN UTAMA */}
      <div className="container mx-auto max-w-5xl pt-28 pb-16 px-4 space-y-8 flex-grow">
        
        {/* HEADER & BREADCRUMB */}
        <div className="space-y-3 border-b border-border pb-6">
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
                  Struktur Organisasi & Satuan Kerja
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Struktur Organisasi RSJD Atma Husada Mahakam
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
            <Info className="w-4 h-4 text-cyan-600 shrink-0" />
            Bagan kelembagaan, jajaran manajemen fungsional, serta uraian tugas pokok satuan kerja rumah sakit.
          </p>
        </div>

        {/* KONTEN UTAMA: BAGAN GAMBAR STRUKTUR */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">Bagan Struktur Organisasi</h2>
                <p className="text-xs sm:text-muted-foreground font-normal">Visualisasi hierarki pimpinan dan satuan kerja rumah sakit</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-secondary/20 p-3 shadow-sm">
              <img 
                src="https://rsjdahm.kaltimprov.go.id/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-28-at-06.26.13-1024x575.jpeg" 
                alt="Struktur Organisasi RSJD Atma Husada Mahakam" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p className="indent-8 text-justify">
                Struktur organisasi RSJD Atma Husada Mahakam dirancang untuk memastikan koordinasi dan pelayanan kesehatan jiwa berjalan dengan optimal. Dipimpin oleh seorang Direktur, manajemen didukung oleh bidang pelayanan medik, keperawatan, penunjang, serta bagian tata usaha dan keuangan.
              </p>
            </div>
          </div>
        </motion.div>

        <GroupDivider />

        {/* SECTION ACCORDION SATUAN KERJA (BAGIAN/BIDANG) */}
        {/* Satu Accordion root untuk SEMUA grup, controlled, biar buka salah satu
            item otomatis nutup item lain di grup manapun. Div per-grup di bawah
            cuma dipakai untuk spacing visual + separator, bukan root accordion baru. */}
        <Accordion
          type="single"
          collapsible
          value={openItem}
          onValueChange={setOpenItem}
          className="space-y-4"
        >

          {/* ==== GRUP 1: DIREKTUR ==== */}
          <div className="space-y-4">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              
              {/* 1. DIREKTUR */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="direktur" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    {/* Container Kiri: Icon & Teks */}
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Direktur</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pimpinan tertinggi dan penanggung jawab utama instansi</p>
                      </div>
                    </div>
                    
                    {/* Ikon panah akan otomatis simetris vertikal di sini 
                        karena parent-nya (AccordionTrigger) adalah flex items-center */}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Direktur mempunyai tugas memimpin penyelenggaraan Rumah Sakit, dengan menetapkan kebijakan, membina, mengawasi serta pengendalian terhadap pelaksanaan Rumah Sakit.
                      </p>
                      <p>
                        Direktur dalam pengelolaan keuangan dan barang milik Daerah serta bidang kepegawaian dan bertanggung jawab kepada kepala Dinas Kesehatan.
                      </p>
                      <p>
                        Pertanggungjawabannya dilaksanakan melalui penyampaian laporan pelaksanaan pengelolaan keuangan dan barang milik Daerah serta bidang kepegawaian Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Direktur membawahi 3 Wakil Direktur yaitu:
                      </p>
                        <ul className="space-y-2 pl-4 list-disc">
                            <li>
                                Wakil Direktur Umum dan Keuangan
                            </li>
                            <li>
                                Wakil Direktur Pelayanan Medik dan Keperawatan
                            </li>
                            <li>
                                Wakil Direktur Penunjang dan Pendidikan, Pelatihan dan Penelitian
                            </li>
                        </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

            </motion.div>
          </div>

          <GroupDivider />

          {/* ==== GRUP 2: WADIR UMUM & KEUANGAN + TURUNANNYA ==== */}
          <div className="space-y-4">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              
             {/* 2. WAKIL DIREKTUR UMUM DAN KEUANGAN */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="wadir-keuangan" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <Building className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Wakil Direktur Umum dan Keuangan</h3>
                        <p className="text-xs text-muted-foreground font-normal">Koordinasi bidang administrasi, kepegawaian, perencanaan, dan keuangan</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Wakil Direktur Umum dan Keuangan mempunyai tugas merumuskan kebijakan, mengembangkan, mengoordinasikan, mengawasi, membina dan mengendalikan penyelenggaraan perencanaan dan evaluasi kinerja Rumah Sakit, umum dan kepegawaian, keuangan dan akuntansi Rumah Sakit serta instalasi di bawah koordinasinya.
                      </p>
                      <p className="indent-0">
                        Wakil Direktur Umum dan Keuangan membawahi 3 bagian yaitu:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                            <li>
                                Bagian Umum dan Kepegawaian
                            </li>
                            <li>
                                Bagian Perencanaan dan Evaluasi
                            </li>
                            <li>
                                Bagian Keuangan dan Akuntansi
                            </li>
                        </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 3. BAGIAN UMUM DAN KEPEGAWAIAN */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="umum-kepegawaian" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bagian Umum dan Kepegawaian</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pengelolaan tata persuratan, rumah tangga, dan SDM</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bagian Umum dan Kepegawaian dipimpin oleh seorang Kepala Bagian yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Wakil Direktur Umum dan Keuangan.
                      </p>
                      <p>
                        Bagian Umum dan Kepegawaian mempunyai tugas menyusun rencana kerja, mengawasi dan mengevaluasi pelayanan umum, kepegawaian, kehumasan pelayanan informasi, kemitraan, pemasaran dan pengaduan masyarakat dan keamanan di Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Bagian Umum dan Kepegawaian membawahi:
                      </p>
                        <ul className="space-y-2 pl-4 list-disc">
                            <li>
                                Urusan Umum, Hukum, dan Kerjasama
                            </li>
                            <li>
                                Urusan Kepegawaian
                            </li>
                            <li>
                                Urusan Kehumasan
                            </li>
                            <li>
                                Urusan Kearsipan
                            </li>
                            <li>
                                Urusan Aset dan Perlengkapan
                            </li>
                        </ul>
                        <br />
                      <p className="indent-0">
                        Jumlah SDM sebanyak  23 orang yang terdiri atas PNS sebanyak 4 orang dan PPPK sebanyak 19 orang
                      </p>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 4. BAGIAN PERENCANAAN DAN EVALUASI */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="perencanaan-evaluasi" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <FileSpreadsheet className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bagian Perencanaan dan Evaluasi</h3>
                        <p className="text-xs text-muted-foreground font-normal">Penyusunan program kerja, anggaran, dan pelaporan kinerja</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bagian Perencanaan dan Evaluasi dipimpin oleh seorang Kepala Bagian yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Wakil Direktur Umum dan Keuangan.
                      </p>
                      <p>
                        Bagian Perencanaan dan Evaluasi mempunyai tugas menyusun rencana kerja, mengawasi dan mengevaluasi pengadaan barang dan jasa, perlengkapan dan sarana prasarana di Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Jumlah SDM sebanyak  5 orang yang terdiri atas PNS sebanyak 1 orang dan PPPK sebanyak 4 orang
                      </p>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 5. BAGIAN KEUANGAN DAN AKUNTANSI */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="keuangan-akuntansi" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <WalletCards className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bagian Keuangan dan Akuntansi</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pengelolaan anggaran pendapatan, belanja, dan verifikasi keuangan</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bagian Keuangan dan Akuntansi dipimpin oleh seorang Kepala Bagian yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Wakil Direktur Umum dan Keuangan.
                      </p>
                      <p>
                        Bagian Keuangan dan Akuntansi mempunyai tugas menyusun rencana kerja, mengawasi dan mengevaluasi pelayanan penyimpanan uang, pembuatan dokumen, pembuatan daftar gaji, bendahara, cesmix dan penyusunan klaim pasien di Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Jumlah SDM sebanyak 19 orang yang terdiri atas PNS sebanyak 5 orang dan PPPK sebanyak 14 orang
                      </p>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div> 

            </motion.div>
          </div>

          <GroupDivider />

          {/* ==== GRUP 3: WADIR PELAYANAN MEDIK & KEPERAWATAN + TURUNANNYA ==== */}
          <div className="space-y-4">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              
              {/* 6. WAKIL DIREKTUR PELAYANAN MEDIK DAN KEPERAWATAN */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="wadir-medik" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Wakil Direktur Pelayanan Medik dan Keperawatan</h3>
                        <p className="text-xs text-muted-foreground font-normal">Koordinasi mutu pelayanan medis, gawat darurat, dan asuhan keperawatan</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Wakil Direktur Pelayanan Medik dan Keperawatan mempunyai tugas melaksanakan rencana kerja program renstra Rumah Sakit dalam pelaksanaan kegiatan pelayanan medik dan keperawatan Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Wakil Direktur Pelayanan Medik dan Keperawatan membawahi 2 bidang yaitu:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                            Bidang Pelayanan Medik
                        </li>
                        <li>
                            Bidang Keperawatan
                        </li>    
                      </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 7. BIDANG PELAYANAN MEDIK */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="bidang-medik" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bidang Pelayanan Medik</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pengelolaan layanan kedokteran jiwa dan spesifik</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bidang Pelayanan Medik dipimpin oleh seorang Kepala Bidang yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Kepala Wakil Direktur Pelayanan Medik dan Keperawatan.
                      </p>
                      <p>
                        Bidang Pelayanan Medik mempunyai tugas menyusun rencana kerja, mengawasi dan mengevaluasi instalasi pelayanan medik rawat jalan, rawat inap, rawat darurat, pemulihan ketergantungan narkotika, psikotropika dan zat adiktif lainnya, rehabilitasi medik, rekam medik, promosi kesehatan Rumah Sakit, dan non kekhususan lainnya di Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Bidang Pelayanan Medik Membawahi:
                      </p>
                        <ul className="space-y-2 pl-4 list-disc">
                            <li>
                                Instalasi Gawat Darurat
                            </li>
                            <li>
                                Instalasi Rawat Jalan
                            </li>
                            <li>
                                Instalasi Rawat Inap
                            </li>
                            <li>
                                Instalasi Rekam Medik
                            </li>
                            <li>
                                Instalasi Rehabilitasi Medik
                            </li>
                            <li>
                                Instalasi Rehabilitasi Psikososial
                            </li>
                            <li>
                                Instalasi Keswamas
                            </li>
                            <li>
                                IPK NAPZA
                            </li>
                        </ul>
                        <br />
                      <p className="indent-0">
                        Jumlah SDM sebanyak 71 orang yang terdiri atas 21 orang PNS, 40 orang PPPK dan 10 orang Non ASN, SDM tersebut dijabarkan sebagai berikut:
                      </p>
                      <p className="indent-0">
                        PNS 21 orang yang terdiri atas:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                            Dokter Spesialis Jiwa: 4 orang
                        </li>
                        <li>
                            Dokter Spesialis Penyakit Dalam: 1 orang
                        </li>
                        <li>
                            Dokter Spesialis Gigi: 1 orang
                        </li>
                        <li>
                            Dokter Spesialis Anak: 1 orang
                        </li>
                        <li>
                            Dokter Spesialis Anastesi: 1 orang
                        </li>
                        <li>
                            Dokter Umum: 1 orang
                        </li>
                        <li>
                            Psikolog Klinis: 3 orang
                        </li>
                        <li>
                            Anastesi: 1 orang
                        </li>
                        <li>
                            Terapis Wicara: 1 orang
                        </li>
                        <li>
                            Terapis Okupasi: 2 orang
                        </li>
                        <li>
                            Fisioterapis: 3 orang
                        </li>
                        <li>
                            Perekam Medis: 2 orang
                        </li>
                        <li>
                            Adimistrasi: 1 orang
                        </li>
                      </ul>
                      <br />
                      <p className="indent-0">
                        PPPK 40 yang terdiri dari:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                            Dokter Umum: 15 orang
                        </li>
                        <li>
                            Fisioterapis: 1 orang
                        </li>
                        <li>
                            Perekam Medis: 5 orang
                        </li>
                        <li>
                            Penata Layanan Operasional: 10 orang
                        </li>
                        <li>
                            Operator Layanan Operasional: 5 orang
                        </li>
                        <li>
                            Pengadministrasi Perkantoran: 4 orang
                        </li>
                      </ul>
                      <br />
                      <p className="indent-0">
                        Non ASN yang terdiri atas:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Dokter Sub spesialis jiwa / konsultan anak dan remaja: 1 orang
                        </li>
                        <li>
                          Dokter Sub spesialis geriatri: 1 orang
                        </li>
                        <li>
                          Dokter Spesialis Jiwa: 3 orang
                        </li>
                        <li>
                          Dokter Spesialis Saraf: 2 orang
                        </li>
                        <li>
                          Dokter spesialis Patologi klinis: 1 orang
                        </li>
                        <li>
                          Dokter Spesialis Radiologi: 1 orang
                        </li>
                      </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 8. BIDANG KEPERAWATAN */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="bidang-keperawatan" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bidang Keperawatan</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pengembangan standar profesi dan asuhan keperawatan jiwa</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bidang Keperawatan dipimpin oleh seorang Kepala Bidang yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Wakil Direktur Pelayanan Medik dan Keperawatan.
                      </p>
                      <p>
                        Bidang Keperawatan mempunyai tugas menyusun rencana kerja, mengawasi dan mengevaluasi pelayanan keperawatan di Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Jumlah SDM sebanyak 70 orang PNS yang terdiri dari:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Spesialis Keperawatan Jiwa: 2 orang
                        </li>
                        <li>
                          Ners: 30 orang
                        </li>
                        <li>
                          Perawat Penyelia: 20 orang
                        </li>
                        <li>
                          Perawat Mahir: 11 orang
                        </li>
                        <li>
                          Perawat Terampil: 7 orang
                        </li>
                      </ul>
                      <br />
                      <p className="indent-0">
                        Jumlah SDM sebanyak 128 orang PPPK terdiri dari:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Ners: 38 orang
                        </li>
                        <li>
                          Perawat Terampil: 88 orang
                        </li>
                        <li>
                          Pengadminstrasi Perkantoran: 1 orang
                        </li>
                      </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

            </motion.div>
          </div>

          <GroupDivider />

          {/* ==== GRUP 4: WADIR PENUNJANG & DIKLAT + TURUNANNYA ==== */}
          <div className="space-y-4">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              
              {/* 9. WAKIL DIREKTUR PENUNJANG DAN PENDIDIKAN, PELATIHAN DAN PENELITIAN */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="wadir-penunjang" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Wakil Direktur Penunjang dan Pendidikan, Pelatihan dan Penelitian</h3>
                        <p className="text-xs text-muted-foreground font-normal">Koordinasi fasilitas penunjang medis, diklat, dan riset kesehatan</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Wakil Direktur Penunjang dan Pendidikan, Pelatihan dan Penelitian mempunyai tugas menyusun rencana kerja program renstra Rumah Sakit dalam pelaksanaan kegiatan penunjang, pendidikan, pelatihan dan penelitian Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Wakil Direktur Penunjang dan Pendidikan, Pelatihan dan Penelitian  membawahi 3 bagian yaitu:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Bidang Penunjang Medik
                        </li>
                        <li>
                          Bidang Penunjang Non Medik
                        </li>
                        <li>
                          Bidang Pendidikan, Pelatihan dan Penelitian
                        </li>
                      </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 10. BIDANG PENUNJANG MEDIK */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="bidang-penunjang-medik" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bidang Penunjang Medik</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pengelolaan layanan penunjang diagnostik dan terapeutik</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bidang Penunjang Medik dipimpin oleh seorang Kepala Bidang yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Wakil Direktur Penunjang dan Pendidikan, Pelatihan dan Penelitian.
                      </p>
                      <p>
                        Bidang Penunjang mempunyai tugas menyusun rencana kerja, mengawasi dan mengevaluasi instalasi farmasi, instalasi laboratorium, instalasi radiologi, instalasi sterilisasi dan loundry.
                      </p>
                      <p className="indent-0">
                        Bidang Penunjang Medik membawahi:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Instalasi Farmasi
                        </li>
                        <li>
                          Instalasi Radiologi
                        </li>
                        <li>
                          Instalasi Laboratorium
                        </li>
                        <li>
                          Instalasi CSSD Laundry
                        </li>
                      </ul>
                      <br />
                      <p className="indent-0">
                        Jumlah SDM sebanyak 13 orang PNS yang terdiri dari:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Apoteker: 2 orang
                        </li>
                        <li>
                          Asisten Apoteker: 3 orang
                        </li>
                        <li>
                          Pranata Laboratorium: 4 orang
                        </li>
                        <li>
                          Radiografer: 1 orang
                        </li>
                        <li>
                          Pengolah Data dan Informasi: 1 orang
                        </li>
                        <li>
                          Operator Layanan Operasional: 2 orang
                        </li>
                      </ul>
                      <br />
                      <p className="indent-0">
                        Jumlah SDM sebanyak 23 orang PPPK yang terdiri dari:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Apoteker: 7 orang
                        </li>
                        <li>
                          Asisiten Apoteker: 4 orang
                        </li>
                        <li>
                          Radiografer: 1 orang
                        </li>
                        <li>
                          Pranata Laboratorium: 6 orang
                        </li>
                        <li>
                          Operator Layanan Operasional: 5 orang
                        </li>
                      </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 11. BIDANG PENUNJANG NON MEDIK */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="bidang-penunjang-non-medik" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bidang Penunjang Non Medik</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pengelolaan fasilitas fisik, sarana, prasarana, dan logistik</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bidang Penunjang Non Medik dipimpin oleh seorang Kepala Bidang yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Wakil Direktur Penunjang dan Pendidikan, Pelatihan dan Penelitian.
                      </p>
                      <p>
                        Bidang Penunjang Non Medik mempunyai tugas menyusun rencana kerja, mengawasi dan mengevaluasi instalasi gizi, instalasi kesehatan dan keselamatan kerja, instalasi kesehatan lingkungan dan limbah, instalasi pemeliharaan sarana Rumah Sakit, instalasi sistem informasi manajemen Rumah Sakit.
                      </p>
                      <p className="indent-0">
                        Bidang Penunjang Non Medik membawahi:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Instalasi Gizi
                        </li>
                        <li>
                          Instalasi Pemeliharan Sarana dan Prasarana Rumah Sakit
                        </li>
                        <li>
                          Instalasi Kesehatan Lingkungan
                        </li>
                        <li>
                          Instalasi Keselamatan dan Kesehatan Kerja Rumah Sakit
                        </li>
                        <li>
                          Pemulasaran Jenazah
                        </li>
                      </ul>
                      <br />
                      <p className="indent-0">
                        Jumlah SDM sebanyak 14 orang PNS yang terdiri dari:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Nutrisionis: 3 orang
                        </li>
                        <li>
                          Sanitarian: 3 orang
                        </li>
                        <li>
                          Teknisi Elektromedis: 2 orang
                        </li>
                        <li>
                          Pengolah Data dan Informasi: 1 orang
                        </li>
                        <li>
                          Pengadministrasi Perkantoran: 3 orang
                        </li>
                        <li>
                          Operator Layanan Operasional: 2 orang
                        </li>
                      </ul>
                      <br />
                      <p className="indent-0">
                        Jumlah SDM sebanyak 30 orang PPPK yang terdiri dari:
                      </p>
                      <ul className="space-y-2 pl-4 list-disc">
                        <li>
                          Tenaga Sanitasi: 2 orang
                        </li>
                        <li>
                          Pembimbing Kesehatan kerja: 1 orang
                        </li>
                        <li>
                          Penata Operasional: 4 orang
                        </li>
                        <li>
                          Pengelola Layanan Operasional: 1 orang
                        </li>
                        <li>
                          Operator Layanan Operasional: 22 orang
                        </li>
                      </ul>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

              {/* 12. BIDANG PENDIDIKAN, PELATIHAN DAN PENELITIAN */}
              <motion.div variants={itemVariants}>
                <AccordionItem value="bidang-diklat-penelitian" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden transition-all hover:border-cyan-500/40">
                  <AccordionTrigger className="hover:no-underline py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-foreground">Bidang Pendidikan, Pelatihan dan Penelitian</h3>
                        <p className="text-xs text-muted-foreground font-normal">Pengembangan diklat profesi, akademis, dan riset kesehatan jiwa</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-3 border-t border-border/60 pt-6 h-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="indent-8 text-justify leading-relaxed"
                    >
                      <p>
                        Bidang Pendidikan, Pelatihan dan Penelitian dipimpin oleh seorang Kepala Bidang yang dalam melaksanakan tugasnya berada di bawah dan bertanggung jawab kepada Wakil Direktur Penunjang dan Pendidikan, Pelatihan dan Penelitian.
                      </p>
                      <p>
                        Bidang Pendidikan, Pelatihan dan Penelitian mempunyai tugas menyusun rencana kerja, mengawasi, pelaksanaan dan mengevaluasi kegiatan pendidikan, pelatihan dan penelitian di Rumah Sakit.
                      </p>
                      <p>
                        Jumlah SDM sebanyak 5 orang yang terdiri atas PNS sebanyak 2 orang dan PPPK sebanyak 3 oran 
                      </p>
                    </motion.p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>

            </motion.div>
          </div>

        </Accordion>

        {/* CTA KE HALAMAN PROFILE DAN DOKTER */}
        <div className="pt-4 flex items-center justify-between">
          <Button 
            onClick={() => navigate("/profil-rs")}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-6 py-5 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Profil Rumah Sakit</span>
          </Button>
          <Button 
            onClick={() => navigate("/dokter")}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-6 py-5 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <span>Dokter & Spesialis</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>

    </div>
  )
}