// src/pages/ProfilRsPage.tsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Shadcn UI Accordion & Breadcrumb Components
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
  Building2, 
  History, 
  Target, 
  CheckCircle2, 
  MapPin, 
  Award, 
  ArrowRight,
  Info,
  Phone,
  Mail,
  Globe,
  ShieldCheck,
  UserCheck,
  FileText,
  Megaphone,
  ArrowLeft
} from "lucide-react"

export default function ProfilRsPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  // State untuk Switch Mode Ringkas/Lengkap di Sejarah (tersimpan di localStorage)
  const [isRingkas, setIsRingkas] = useState(() => {
    const savedMode = localStorage.getItem("rs_profil_ringkas_mode")
    return savedMode !== null ? JSON.parse(savedMode) : true
  })

  useEffect(() => {
    localStorage.setItem("rs_profil_ringkas_mode", JSON.stringify(isRingkas))
  }, [isRingkas])

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
          <Skeleton className="h-48 w-full rounded-3xl" />
          <Skeleton className="h-72 w-full rounded-3xl" />
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
                  Profil Rumah Sakit
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Profil RSJD Atma Husada Mahakam
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
            <Info className="w-4 h-4 text-cyan-600 shrink-0" />
            Pusat informasi lengkap mengenai sambutan direktur, sejarah, visi-misi, hingga maklumat pelayanan rumah sakit.
          </p>
        </div>

        {/* HIGHLIGHT UTAMA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="p-4 bg-cyan-600 text-white rounded-2xl shadow-sm shrink-0">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-foreground">Pusat Layanan Kesehatan Jiwa Terpadu Kelas A</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                <strong className="font-semibold text-foreground/90">Rumah Sakit Jiwa Daerah (RSJD) Atma Husada Mahakam</strong> adalah rumah sakit khusus Kelas A milik Pemerintah Provinsi Kalimantan Timur yang berlokasi di Jl. Kakap, Samarinda, berkomitmen memberikan pelayanan kesehatan mental dan penanggulangan NAPZA terbaik.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ACCORDION DAFTAR MENU PROFIL */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Accordion type="single" collapsible defaultValue="sambutan" className="space-y-4">
            
            {/* 1. SAMBUTAN DIREKTUR */}
            <AccordionItem value="sambutan" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">Sambutan Direktur</h2>
                    <p className="text-xs text-muted-foreground font-normal">Pesan dan arah kebijakan dari pimpinan tertinggi rumah sakit</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-4 border-t border-border/60 pt-6 h-auto">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
                  <p>
                    <em>
                      <strong className="font-semibold text-foreground/90">Assalamu’alaikum warahmatullahi wabarakatuh,</strong><br/>
                      Salam sejahtera bagi kita semua.
                    </em>
                  </p>
                  <p className="indent-8 text-justify">
                    Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa, atas rahmat dan karunia-Nya sehingga RSJD Atma Husada Mahakam dapat terus menjalankan amanah sebagai institusi pelayanan kesehatan jiwa yang profesional, humanis, dan berorientasi pada pemulihan pasien.
                  </p>
                  <p className="indent-8 text-justify">
                    Sebagai Rumah Sakit Jiwa Daerah milik Pemerintah Provinsi Kalimantan Timur, RSJD Atma Husada Mahakam senantiasa berupaya meningkatkan mutu pelayanan melalui pengembangan fasilitas, teknologi, serta kompetensi sumber daya manusia. Sejalan dengan perkembangan ilmu kesehatan jiwa dan tuntutan masyarakat terhadap pelayanan yang berkualitas, kami berkomitmen untuk memberikan layanan yang aman, efektif, serta mudah diakses oleh seluruh lapisan masyarakat.
                  </p>
                  <p className="indent-8 text-justify">
                    Sejak berdiri pada tahun 1933 dan melalui berbagai perubahan kelembagaan hingga menjadi Rumah Sakit Jiwa Kelas A, kami terus memperkuat peran sebagai pusat layanan kesehatan jiwa, pusat rujukan regional, pusat edukasi, serta mitra pemerintah dan lembaga pendidikan dalam upaya promotif, preventif, kuratif, dan rehabilitatif.
                  </p>
                  <p className="indent-8 text-justify">
                    Website resmi ini kami hadirkan sebagai sarana informasi dan komunikasi bagi masyarakat, tenaga kesehatan, instansi pemerintah, maupun mitra kerja. Melalui platform ini, kami berharap masyarakat dapat memperoleh informasi yang akurat mengenai layanan, fasilitas, inovasi, serta berbagai kegiatan yang kami laksanakan. Transparansi dan keterbukaan informasi merupakan bagian dari komitmen kami dalam mewujudkan pelayanan publik yang lebih baik.
                  </p>
                  <p className="indent-8 text-justify">
                    Kami mengucapkan terima kasih kepada seluruh tenaga kesehatan, pegawai, mitra kerja, serta masyarakat yang terus mendukung perkembangan RSJD Atma Husada Mahakam. Semoga sinergi yang terbangun membawa manfaat bagi peningkatan kesehatan jiwa masyarakat Kalimantan Timur.
                  </p>
                  <p className="indent-8 text-justify">
                    Akhir kata, kami siap memberikan layanan terbaik dan terus berupaya mewujudkan rumah sakit jiwa yang unggul, berdaya saing, dan berlandaskan nilai kemanusiaan.
                  </p>
                  <p>
                    <em>
                      <strong className="font-semibold text-foreground/90">Wassalamu’alaikum warahmatullahi wabarakatuh,</strong>
                    </em>
                  </p>
                  <div className="pt-3">
                    <span className="font-bold text-foreground text-sm sm:text-base block">dr. Indah Puspitasari, MARS</span>
                    <span className="text-xs sm:text-sm text-muted-foreground">Direktur RSJD Atma Husada Mahakam</span>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* 2. SEKAPUR SIRIH */}
            <AccordionItem value="sekapursirih" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">Sekapur Sirih</h2>
                    <p className="text-xs text-muted-foreground font-normal">Pengantar filosofis dan dedikasi pelayanan kesehatan mental</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-4 border-t border-border/60 pt-6 h-auto">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
                  <p className="indent-8 text-justify">
                    Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas segala rahmat dan karunia-Nya. Dengan rasa bangga dan penuh syukur, kami mempersembahkan informasi mengenai Rumah Sakit Jiwa Daerah Atma Husada Mahakam, sebagai bentuk komitmen kami dalam memberikan pelayanan kesehatan jiwa yang profesional, humanis, dan berorientasi pada pemulihan.
                  </p>
                  <p className="indent-8 text-justify">
                    Sejak berdiri pada tahun 1933 dan melalui berbagai fase perkembangan, RSJD Atma Husada Mahakam terus berupaya meningkatkan mutu pelayanan, melengkapi sarana dan prasarana, serta memperkuat kualitas sumber daya manusia. Transformasi rumah sakit dari masa ke masa merupakan wujud komitmen kami dalam menjawab kebutuhan masyarakat akan pelayanan kesehatan jiwa yang aman, terpercaya, dan berstandar tinggi.
                  </p>
                  <p className="indent-8 text-justify">
                    Sebagai rumah sakit jiwa milik Pemerintah Provinsi Kalimantan Timur, kami menyadari pentingnya peran kemitraan dengan berbagai pihak—pemerintah, masyarakat, lembaga pendidikan, serta institusi kesehatan—dalam mewujudkan upaya promotif, preventif, kuratif, dan rehabilitatif bagi seluruh penderita gangguan kesehatan jiwa di Kalimantan Timur.
                  </p>
                  <p className="indent-8 text-justify">
                    Melalui kehadiran informasi ini, kami berharap masyarakat dapat mengenal lebih dekat RSJD Atma Husada Mahakam, termasuk layanan, fasilitas, serta dedikasi kami dalam memberikan pelayanan terbaik. Semoga langkah kecil ini dapat memperkuat kepercayaan masyarakat dan menjadi jembatan yang baik dalam penyampaian informasi serta peningkatan kualitas layanan kesehatan jiwa.
                  </p>
                  <p className="indent-8 text-justify">
                    Akhir kata, kami mengucapkan terima kasih atas dukungan semua pihak. Semoga RSJD Atma Husada Mahakam terus menjadi pusat pelayanan kesehatan jiwa yang unggul, bermartabat, dan memberikan manfaat sebesar-besarnya bagi masyarakat.
                  </p>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* 3. SEJARAH & EVOLUSI KELEMBAGAAN */}
            <AccordionItem value="sejarah" className="border border-border rounded-3xl px-6 bg-card shadow-sm">
                <AccordionTrigger className="hover:no-underline py-5">
                    <div className="flex items-center gap-3 text-left">
                    <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                        <History className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-foreground">Sejarah & Evolusi Kelembagaan</h2>
                        <p className="text-xs text-muted-foreground font-normal">Perjalanan berdiri dari tahun 1933 hingga menjadi Kelas A</p>
                    </div>
                    </div>
                </AccordionTrigger>
                
                <AccordionContent className="pb-6 text-xs sm:text-sm text-muted-foreground space-y-4 border-t border-border/60 pt-4 h-auto">
                    
                    {/* SWITCH MODE RINGKAS */}
                    <div className="flex items-center space-x-3 bg-secondary/50 border border-border/60 p-3 rounded-2xl w-fit mb-4">
                      <Switch 
                          id="mode-lengkap-switch"
                          checked={isRingkas}
                          onCheckedChange={setIsRingkas}
                      />
                      <Label 
                          htmlFor="mode-lengkap-switch" 
                          className="text-xs font-semibold cursor-pointer text-foreground"
                      >
                          Mode Ringkas
                      </Label>
                    </div>

                    <div className="overflow-hidden">
                      {isRingkas ? (
                        <motion.div 
                          key="ringkas"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-3"
                        >
                          <p className="indent-8 text-justify">
                              Cikal bakal rumah sakit ini dimulai pada tahun <strong className="font-semibold text-foreground/90">1933</strong> sebagai Rumah Perawatan Sakit Jiwa <em>&ldquo;Tempoe Doeloe&rdquo;</em> (Rumah Sakit Jiwa Pusat Samarinda) di atas tanah seluas <strong className="font-semibold text-foreground/90">20.157 m²</strong> yang dibiayai oleh Kesultanan Kutai. Pada awal pendiriannya, instansi ini dibangun bersamaan dengan Rumah Sakit Umum berdasarkan penetapan Ketua <em>Bestwer College</em> Samarinda.
                          </p>
                          <p>
                              Dalam perjalanan sejarahnya, instansi ini melewati berbagai fase penting pengelolaan dan transisi kepemimpinan:
                          </p>
                          <ul className="space-y-2 pl-4 list-disc">
                          <li>
                              <strong className="font-semibold text-foreground/90">20 April 1949</strong>: Berdasarkan ketentuan No. 558/IH-9-Fed, urusan pembiayaan Rumah Sakit Umum dan Rumah Sakit Jiwa Pusat (RSJP) diserahkan oleh Kesultanan Kutai kepada Dewan Kesultanan dan Kerajaan di Kalimantan Timur.
                          </li>
                          <li>
                              <strong className="font-semibold text-foreground/90">1 Januari 1951</strong>: Pembiayaan operasional rumah sakit resmi diambil alih sepenuhnya oleh Pemerintah Pusat Republik Indonesia. Melalui Surat Keputusan bulan November 1951, kantor RSJP resmi dipisahkan dari Rumah Sakit Umum pada tahun <strong className="font-semibold text-foreground/90">1952</strong>.
                          </li>
                          <li>
                              <strong className="font-semibold text-foreground/90">28 April 1978</strong>: Berdasarkan Surat Keputusan Menteri Kesehatan RI No. 135/Menkes/SK/IV/1978, status instansi ditetapkan secara resmi sebagai <strong className="font-semibold text-foreground/90">Rumah Sakit Jiwa Kelas B</strong>.
                          </li>
                          <li>
                              <strong className="font-semibold text-foreground/90">Tahun 2000–2001</strong>: Sejalan dengan pelaksanaan otonomi daerah, pengelolaan UPTD Rumah Sakit Jiwa Pusat Samarinda dialihkan ke pemerintah daerah. Berdasarkan revisi Surat Depkes No. 196/Menkes-Sos/III/2001, operasionalnya sempat berjalan di bawah Pemerintah Kota Samarinda sebelum akhirnya ditetapkan kedudukannya di bawah Pemerintah Provinsi Kalimantan Timur lewat SK Gubernur Kaltim No. 16 Tahun 2001.
                          </li>
                          <li>
                              <strong className="font-semibold text-foreground/90">17 Januari 2005</strong>: Berdasarkan Surat Keputusan Gubernur Kaltim No. 03 Tahun 2005, nama Rumah Sakit Jiwa Samarinda resmi berganti menjadi <strong className="font-semibold text-foreground/90">Rumah Sakit Atma Husada Mahakam</strong> guna mereduksi stigma negatif di tengah masyarakat. Pada tahun yang sama, dilakukan penambahan fasilitas Gedung NAPZA seluas <strong className="font-semibold text-foreground/90">1.035,8 m²</strong> untuk rehabilitasi ketergantungan obat.
                          </li>
                          <li>
                              <strong className="font-semibold text-foreground/90">Tahun 2011</strong>: Melalui Keputusan Menteri Kesehatan RI No. 231/MENKES/SK/II/2011, status rumah sakit resmi naik tingkat menjadi <strong className="font-semibold text-foreground/90">Rumah Sakit Khusus Kelas A</strong> dengan dukungan kapasitas ratusan tempat tidur layanan.
                          </li>
                          </ul>
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="lengkap"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="space-y-4"
                        >
                          <p className="indent-8 text-justify">
                              Rumah Sakit Jiwa Pusat (RSJP) Samarinda didirikan pada tahun <strong className="font-semibold text-foreground/90">1933</strong> di atas tanah seluas <strong className="font-semibold text-foreground/90">20.157 m²</strong>, yang dibiayai oleh Kesultanan Kutai dan berfungsi sebagai Rumah Keperawatan Sakit Jiwa. Pada awalnya, RSJP Samarinda didirikan bersama dengan Rumah Sakit Umum berdasarkan penetapan Ketua <strong className="font-semibold text-foreground/90">Bestwer College</strong> Samarinda.
                          </p>
                          <p className="indent-8 text-justify">
                              Pada tanggal <strong className="font-semibold text-foreground/90">20 April 1949</strong> No. 558/IH-9-Fed, masalah pembiayaan Rumah Sakit Umum dan RSJP diserahkan oleh Kesultanan Kutai kepada Dewan Kesultanan dan Kerajaan di Kalimantan Timur. Selanjutnya, pada <strong className="font-semibold text-foreground/90">1 Januari 1951</strong>, pembiayaan RSJP diambil alih oleh pemerintah pusat.
                          </p>
                          <p className="indent-8 text-justify">
                              Berdasarkan Surat Keputusan bulan November 1951, pada tahun <strong className="font-semibold text-foreground/90">1952</strong> kantor RSJP dipisahkan dari Rumah Sakit Umum. Berdasarkan SK Menkes No. <strong className="font-semibold text-foreground/90">135/Menkes/SK/IV/1978</strong> tanggal <strong className="font-semibold text-foreground/90">28 April 1978</strong>, RSJP ditetapkan sebagai <strong className="font-semibold text-foreground/90">Rumah Sakit Jiwa Kelas B</strong>.
                          </p>
                          <p className="indent-8 text-justify">
                              Sejalan dengan pelaksanaan otonomi daerah, UPTD Rumah Sakit Jiwa Pusat Samarinda dilimpahkan kepada pemerintah daerah sesuai Surat Menkes No. 1732/Menkes-Kesos/XII/2000 tentang pengalihan UPTD kepada pemerintah kabupaten/kota, serta revisi melalui Surat Depkes No. <strong className="font-semibold text-foreground/90">196/Menkes-Sos/III/2001</strong> tanggal <strong className="font-semibold text-foreground/90">7 Maret 2001</strong>. Pada tahun <strong className="font-semibold text-foreground/90">2001</strong>, RS Jiwa Samarinda beroperasi di bawah Pemerintah Kota Samarinda dalam bentuk UPTD.
                          </p>
                          <p className="indent-8 text-justify">
                              Selanjutnya, kedudukan RS Atma Husada Mahakam ditetapkan berdasarkan <strong className="font-semibold text-foreground/90">Surat Keputusan Gubernur Kaltim No. 16 Tahun 2001</strong> tanggal <strong className="font-semibold text-foreground/90">24 September 2001</strong> tentang Pembentukan Susunan Organisasi dan Tata Kerja Unit Pelaksana Teknis pada Dinas-Dinas Provinsi Kalimantan Timur.
                          </p>
                          <p className="indent-8 text-justify">
                              Pada tahun <strong className="font-semibold text-foreground/90">2005</strong>, untuk menghilangkan stigma di masyarakat, Rumah Sakit Jiwa Samarinda berganti nama menjadi <strong className="font-semibold text-foreground/90">Rumah Sakit Atma Husada Mahakam</strong> berdasarkan Surat Keputusan Gubernur No. <strong className="font-semibold text-foreground/90">03 Tahun 2005</strong> tanggal <strong className="font-semibold text-foreground/90">17 Januari 2005</strong>. Pada tahun yang sama dilakukan penambahan gedung baru, yaitu <strong className="font-semibold text-foreground/90">Gedung Narkoba/NAPZA</strong> untuk melayani pasien dengan ketergantungan narkotika, psikotropika, dan zat adiktif lainnya. Dengan demikian, luas rumah sakit bertambah menjadi <strong className="font-semibold text-foreground/90">1.035,8 m²</strong>.
                          </p>
                          <p className="indent-8 text-justify">
                              Rumah Sakit Khusus Daerah Atma Husada Mahakam bertujuan memberikan pelayanan kesehatan jiwa bagi seluruh masyarakat Kalimantan Timur yang tersebar di <strong className="font-semibold text-foreground/90">14 kabupaten/kota</strong>. Rumah sakit ini bekerja sama dengan berbagai instansi terkait, seperti <strong className="font-semibold text-foreground/90">Fakultas Kedokteran Universitas Mulawarman</strong> dan institusi pendidikan lainnya, sebagai fasilitas prevensi, promosi, kuratif, rehabilitatif, serta riset di bidang kesehatan jiwa.
                          </p>
                          <p className="indent-8 text-justify">
                              Rumah sakit juga melaksanakan pelayanan kesehatan jiwa intra mural dan ekstra mural, serta melakukan pembinaan dan integrasi ke puskesmas serta rumah sakit di Provinsi Kalimantan Timur dengan mengirimkan psikiater secara berkala.
                          </p>
                          <p className="indent-8 text-justify">
                              Berdasarkan <strong className="font-semibold text-foreground/90">Peraturan Daerah No. 10 Tahun 2008</strong> tentang Organisasi dan Tata Kerja Rumah Sakit Daerah Kalimantan Timur tanggal <strong className="font-semibold text-foreground/90">23 Juli 2008</strong>, Rumah Sakit Atma Husada Mahakam berkedudukan sebagai unsur pendukung tugas kepala daerah di bidang pelayanan kesehatan jiwa yang bersifat khusus dan spesifik, dalam bentuk Lembaga Teknis Daerah.
                          </p>
                          <p className="indent-8 text-justify">
                              Menurut <strong className="font-semibold text-foreground/90">Surat Keputusan Menteri Kesehatan RI Nomor YM.01.10/III/02/11</strong> tanggal <strong className="font-semibold text-foreground/90">3 Januari 2011</strong>, Rumah Sakit Khusus Daerah Atma Husada Mahakam memperoleh status Akreditasi Penuh Tingkat Lanjut. Selanjutnya, melalui <strong className="font-semibold text-foreground/90">Keputusan Menteri No. 231/MENKES/SK/II/2011</strong>, rumah sakit ini naik menjadi <strong className="font-semibold text-foreground/90">Rumah Sakit Jiwa Kelas A</strong>.
                          </p>
                          <p className="indent-8 text-justify">
                              Berdasarkan <strong className="font-semibold text-foreground/90">Peraturan Daerah Provinsi Kalimantan Timur Nomor 06 Tahun 2011</strong> tentang Perubahan atas Perda Nomor 10 Tahun 2008 tentang Organisasi dan Tata Kerja Rumah Sakit Daerah Provinsi Kalimantan Timur, Rumah Sakit Khusus Daerah Atma Husada Mahakam resmi berubah nama menjadi <strong className="font-semibold text-foreground/90">Rumah Sakit Jiwa Daerah Atma Husada Mahakam</strong>.
                          </p>
                          <p className="indent-8 text-justify">
                              Berdasarkan <strong className="font-semibold text-foreground/90">Peraturan Gubernur Kalimantan Timur No. 22 Tahun 2023</strong> Tentang Pembentukan, Kedudukan, Susunan Organisasi, Tugas, Fungsi, Uraian Tugas And Tata Kerja Rumah Sakit Daerah Pada Dinas Kesehatan, RSJD Atma Husada Mahakam mempunyai tugas memberikan pelayanan kesehatan jiwa perorangan secara paripurna meliputi pelayanan rawat inap, rawat jalan dan gawat darurat, dan pemulihan ketergantungan narkotika, psikotropika dan zat adiktif lainnya serta menyelenggarakan kegiatan pendidikan dan penelitian.
                          </p>
                        </motion.div>
                      )}
                    </div>
                </AccordionContent>
            </AccordionItem>

            {/* 4. VISI & MISI */}
            <AccordionItem value="visimisi" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">Visi & Misi Rumah Sakit</h2>
                    <p className="text-xs text-muted-foreground font-normal">Komitmen pelayanan kesehatan mental berkualitas internasional</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-5 border-t border-border/60 pt-6 h-auto">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-5">
                  <div>
                    <h4 className="font-semibold text-foreground/90 mb-2 text-xs sm:text-sm uppercase tracking-wide">Visi</h4>
                    <p className="italic border-l-2 border-cyan-500 pl-4 py-1.5 leading-relaxed bg-secondary/30 rounded-r-2xl">
                      &ldquo;Menjadi rumah sakit jiwa terkemuka dan pusat rujukan kesehatan jiwa yang profesional, bermutu, dan berstandar internasional di Indonesia.&rdquo;
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground/90 mb-3 text-xs sm:text-sm uppercase tracking-wide">Misi</h4>
                    <ul className="space-y-3 pl-1 leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>Menyelenggarakan pelayanan kesehatan jiwa yang holistik, aman, dan berorientasi pada kesembuhan pasien.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan berkelanjutan.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>Mengembangkan sistem manajemen rumah sakit yang transparan dan akuntabel.</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* 5. MAKLUMAT PELAYANAN */}
            <AccordionItem value="maklumat" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">Maklumat Pelayanan</h2>
                    <p className="text-xs text-muted-foreground font-normal">Pernyataan kesanggupan penyelenggaraan pelayanan publik</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-4 border-t border-border/60 pt-6 h-auto">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-4">
                  <div className="p-5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center space-y-2">
                    <p className="font-semibold text-foreground/90 italic">
                      &ldquo;Dengan ini kami menyatakan sanggup menyelenggarakan pelayanan kesehatan jiwa yang cepat, tepat, transparan, adil, dan bebas dari korupsi sesuai dengan standar pelayanan yang telah ditetapkan.&rdquo;
                    </p>
                    <span className="text-xs text-muted-foreground block">— Seluruh Pegawai & Manajemen RSJD Atma Husada Mahakam</span>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* 6. PENGHARGAAN */}
            <AccordionItem value="penghargaan" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">Penghargaan</h2>
                    <p className="text-xs text-muted-foreground font-normal">Daftar prestasi, akreditasi, dan penghargaan instansi</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-4 border-t border-border/60 pt-6 h-auto">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="space-y-3">
                  <p className="indent-8 text-justify">
                    Sebagai rumah sakit khusus rujukan kelas A, RSJD Atma Husada Mahakam secara konsisten meraih berbagai pencapaian membanggakan dalam bidang mutu pelayanan kesehatan, akreditasi paripurna rumah sakit, serta predikat zona integritas Wilayah Bebas dari Korupsi (WBK).
                  </p>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

            {/* 7. IDENTITAS & OPERASIONAL */}
            <AccordionItem value="identitas" className="border border-border rounded-3xl px-6 bg-card shadow-sm overflow-hidden">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2.5 bg-secondary rounded-xl text-cyan-600 dark:text-cyan-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground">Identitas & Operasional Rumah Sakit</h2>
                    <p className="text-xs text-muted-foreground font-normal">Informasi lengkap kelas, alamat, dan kontak resmi</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-8 text-xs sm:text-sm text-muted-foreground space-y-4 border-t border-border/60 pt-6 h-auto">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-secondary/30 rounded-2xl space-y-1">
                    <span className="font-semibold text-foreground/90 block">Klasifikasi / Kelas:</span>
                    <span>Rumah Sakit Khusus Kelas A</span>
                  </div>
                  <div className="p-3.5 bg-secondary/30 rounded-2xl space-y-1">
                    <span className="font-semibold text-foreground/90 block">Lokasi Utama:</span>
                    <span className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> Samarinda, Kalimantan Timur
                    </span>
                  </div>
                  <div className="p-3.5 bg-secondary/30 rounded-2xl sm:col-span-2 space-y-2">
                    <span className="font-semibold text-foreground/90 block">Kontak Resmi:</span>
                    <div className="flex flex-wrap items-center gap-4 pt-0.5">
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> (0541) 743364
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> rsjdahm@gmail.com
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-cyan-600 shrink-0" /> rsjdahm.kaltimprov.go.id
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </motion.div>

        {/* CTA KE HALAMAN DOKTER DAN STRUKTUR*/}
        <div className="pt-4 flex items-center justify-between">
          <Button 
            onClick={() => navigate("/dokter")}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-6 py-5 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dokter & Spesialis</span>
          </Button>
          <Button 
            onClick={() => navigate("/struktur")}
            className="rounded-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs px-6 py-5 gap-2 shadow-sm font-medium transition-transform hover:scale-105 active:scale-95"
          >
            <span>Struktur Organisasi & Satuan Kerja</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>

    </div>
  )
}