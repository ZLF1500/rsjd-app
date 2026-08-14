// src/pages/SkriningPage.tsx
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { 
  Activity, 
  Brain, 
  Smartphone, 
  HeartHandshake, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Flame,
  Moon,
  Baby,
  ShieldAlert
} from "lucide-react"

interface Question {
  id: number
  text: string
  subtext?: string
}

interface Option {
  key: string
  label: string
  sub: string
  value: number
}

interface Category {
  id: string
  title: string
  subtitle: string
  desc: string
  icon: any
  options: Option[]
  questions: Question[]
}

// 1. OPSI GAD-7 & PHQ-9 (Frekuensi 2 Minggu)
const frequencyOptions: Option[] = [
  { key: "A", label: "Tidak Pernah", sub: "Sama sekali tidak mengalaminya", value: 0 },
  { key: "B", label: "Beberapa Hari", sub: "Mengalami 1 - 6 hari dalam 2 minggu", value: 1 },
  { key: "C", label: "Lebih dari Separuh Hari", sub: "Mengalami 7 - 11 hari dalam 2 minggu", value: 2 },
  { key: "D", label: "Hampir Setiap Hari", sub: "Mengalami 12 - 14 hari dalam 2 minggu", value: 3 },
]

// 2. OPSI PSS-10 (Perceived Stress - Standar Baku 5 Skala Medis)
const stressOptions: Option[] = [
  { key: "A", label: "Tidak Pernah", sub: "Sama sekali tidak pernah merasakan hal tersebut", value: 0 },
  { key: "B", label: "Hampir Tidak Pernah", sub: "Sangat jarang terjadi dalam sebulan terakhir", value: 1 },
  { key: "C", label: "Kadang-kadang", sub: "Beberapa kali terjadi dalam sebulan terakhir", value: 2 },
  { key: "D", label: "Cukup Sering", sub: "Sering dirasakan dalam aktivitas harian", value: 3 },
  { key: "E", label: "Sangat Sering", sub: "Hampir selalu dirasakan sepanjang waktu", value: 4 },
]

// 3. OPSI ISI-7 (Insomnia - Standar Baku 5 Skala Medis)
const insomniaOptions: Option[] = [
  { key: "A", label: "Tidak Ada", sub: "Tidak ada gangguan sama sekali", value: 0 },
  { key: "B", label: "Ringan", sub: "Gangguan kecil yang tidak terlalu mengganggu", value: 1 },
  { key: "C", label: "Sedang", sub: "Cukup mengganggu kenyamanan tidur", value: 2 },
  { key: "D", label: "Parah", sub: "Sangat mengganggu fungsi dan fokus harian", value: 3 },
  { key: "E", label: "Sangat Parah", sub: "Kondisi terburuk yang sangat menyiksa", value: 4 },
]

// 4. OPSI SDQ-25 (Likert 5 Skala Elegan & Profesional)
const sdqOptions: Option[] = [
  { key: "A", label: "Sangat Tidak Sesuai", sub: "Sama sekali tidak menggambarkan kondisi anak/remaja", value: 0 },
  { key: "B", label: "Tidak Sesuai", sub: "Cenderung tidak terjadi dalam banyak situasi", value: 1 },
  { key: "C", label: "Netral / Cukup Sesuai", sub: "Kadang-kadang terjadi dalam situasi tertentu", value: 2 },
  { key: "D", label: "Sesuai", sub: "Sesuai dengan perilaku dan kondisi harian", value: 3 },
  { key: "E", label: "Sangat Sesuai", sub: "Sangat menggambarkan kondisi harian secara konsisten", value: 4 },
]

// 5. OPSI IAT-8 (Kecanduan Gadget)
const gadgetOptions: Option[] = [
  { key: "A", label: "Jarang / Tidak Pernah", sub: "Hanya sesekali atau tidak pernah", value: 0 },
  { key: "B", label: "Kadang-kadang", sub: "Beberapa kali terjadi dalam seminggu", value: 1 },
  { key: "C", label: "Sering", sub: "Terjadi hampir setiap hari", value: 2 },
  { key: "D", label: "Selalu", sub: "Menjadi rutinitas utama tanpa henti", value: 3 },
]

const categories: Category[] = [
  {
    id: "gad7",
    title: "Skrining Kecemasan",
    subtitle: "GAD-7 (Generalized Anxiety Disorder-7)",
    desc: "Evaluasi 7 indikator medis utama kecemasan & rasa khawatir berlebih dalam 2 minggu terakhir.",
    icon: Brain,
    options: frequencyOptions,
    questions: [
      { id: 1, text: "Merasa gugup, cemas, atau gelisah?", subtext: "Pilih seberapa sering Anda mengalaminya 2 minggu terakhir." },
      { id: 2, text: "Tidak mampu menghentikan atau mengontrol rasa khawatir?", subtext: "Termasuk perasaan panik atau pikiran berputar tanpa henti." },
      { id: 3, text: "Sangat mengkhawatirkan berbagai macam hal?", subtext: "Khawatir berlebih pada pekerjaan, kesehatan, atau keluarga." },
      { id: 4, text: "Sangat sulit untuk santai atau rileks?", subtext: "Otot terasa tegang atau pikiran sulit diistirahkan." },
      { id: 5, text: "Sangat gelisah sehingga sulit untuk duduk diam?", subtext: "Kondisi fisik yang tidak tenang atau mondar-mandir." },
      { id: 6, text: "Mudah menjadi jengkel, kesal, atau lekas marah?", subtext: "Toleransi stres atau emosi terasa menurun." },
      { id: 7, text: "Merasa takut seolah-olah sesuatu yang buruk akan terjadi?", subtext: "Perasaan firasat buruk tanpa alasan yang jelas." },
    ],
  },
  {
    id: "phq9",
    title: "Skrining Depresi",
    subtitle: "PHQ-9 (Patient Health Questionnaire-9)",
    desc: "Evaluasi 9 kriteria medis klinis suasana hati, energi, dan motivasi harian.",
    icon: Activity,
    options: frequencyOptions,
    questions: [
      { id: 1, text: "Kurang berminat atau tidak ada kesenangan dalam melakukan sesuatu?", subtext: "Kehilangan motivasi pada hobi atau aktivitas harian." },
      { id: 2, text: "Merasa murung, muram, putus asa, atau sedih?", subtext: "Perasaan sedih berkepanjangan tanpa alasan yang jelas." },
      { id: 3, text: "Sulit tidur, sering terbangun, atau justru terlalu banyak tidur?", subtext: "Gangguan pada kualitas dan pola tidur harian." },
      { id: 4, text: "Merasa lelah atau kurang bertenaga sepanjang hari?", subtext: "Kelelahan fisik dan mental meskipun tidak beraktivitas berat." },
      { id: 5, text: "Kurang nafsu makan atau justru makan terlalu banyak?", subtext: "Perubahan signifikan pada pola makan harian." },
      { id: 6, text: "Merasa buruk tentang diri sendiri, atau merasa gagal?", subtext: "Perasaan bersalah atau mengecewakan diri sendiri/keluarga." },
      { id: 7, text: "Sulit berkonsentrasi pada sesuatu (misal membaca atau menonton TV)?", subtext: "Fokus mudah teralih dan pikiran linglung." },
      { id: 8, text: "Bergerak/bicara sangat lambat, atau sebaliknya sangat gelisah?", subtext: "Perubahan tempo motorik yang disadari orang lain." },
      { id: 9, text: "Pikiran bahwa Anda lebih baik mati atau ingin menyakiti diri?", subtext: "Dorongan negatif pada diri sendiri." },
    ],
  },
  {
    id: "pss10",
    title: "Stres Kerja & Perceived Stress",
    subtitle: "PSS-10 (Perceived Stress Scale-10)",
    desc: "Mengukur tingkat beban emosional, tekanan, & persepsi kontrol individu dalam sebulan terakhir.",
    icon: Flame,
    options: stressOptions,
    questions: [
      { id: 1, text: "Seberapa sering Anda marah karena hal-hal yang terjadi tidak terduga?", subtext: "Tekanan dari situasi yang tiba-tiba berubah." },
      { id: 2, text: "Seberapa sering Anda merasa tidak mampu mengontrol hal-hal penting dalam hidup?", subtext: "Perasaan kehilangan kendali atas rutinitas." },
      { id: 3, text: "Seberapa sering Anda merasa gugup dan tertekan oleh pekerjaan/tugas?", subtext: "Bebannya terasa di luar batas kemampuan Anda." },
      { id: 4, text: "Seberapa sering Anda merasa yakin dengan kemampuan menyelesaikan masalah?", subtext: "Persepsi kepercayaan diri mengatasi tantangan." },
      { id: 5, text: "Seberapa sering Anda merasa bahwa segala sesuatunya berjalan sesuai keinginan?", subtext: "Perasaan positif pada alur aktivitas harian." },
      { id: 6, text: "Seberapa sering Anda merasa tidak mampu mengatasi semua tugas yang menumpuk?", subtext: "Kewalahan menghadapi beban kerja/kuliah." },
      { id: 7, text: "Seberapa sering Anda mampu mengontrol kejengkelan dalam hidup Anda?", subtext: "Manajemen respons emosi pribadi." },
      { id: 8, text: "Seberapa sering Anda merasa berada di puncak kendali atas segalanya?", subtext: "Perasaan memegang kendali penuh atas hidup." },
      { id: 9, text: "Seberapa sering Anda marah karena hal-hal yang terjadi di luar kendali Anda?", subtext: "Frustrasi pada kondisi eksternal." },
      { id: 10, text: "Seberapa sering Anda merasa kesulitan menumpuk begitu tinggi hingga tak tertandingi?", subtext: "Perasaan jalan buntu atau burnout berat." },
    ],
  },
  {
    id: "isi7",
    title: "Kualitas Tidur & Insomnia",
    subtitle: "ISI (Insomnia Severity Index-7)",
    desc: "Evaluasi 7 indikator keparahan insomnia, kualitas istirahat, & dampaknya pada siang hari.",
    icon: Moon,
    options: insomniaOptions,
    questions: [
      { id: 1, text: "Seberapa parah kesulitan Anda untuk mulai memejamkan mata (jatuh tidur)?", subtext: "Butuh waktu sangat lama sebelum akhirnya tertidur." },
      { id: 2, text: "Seberapa parah kesulitan Anda mempertahankan tidur (sering terbangun)?", subtext: "Tidur malam yang terputus-putus dan terganggu." },
      { id: 3, text: "Seberapa parah masalah bangun terlalu awal di pagi hari dan tak bisa tidur lagi?", subtext: "Terbangun lebih awal dari jadwal yang diinginkan." },
      { id: 4, text: "Seberapa puas/tidak puas Anda dengan pola tidur Anda saat ini?", subtext: "Evaluasi subjektif kenyamanan istirahat harian." },
      { id: 5, text: "Seberapa terlihat gangguan tidur Anda mengganggu fungsi harian Anda?", subtext: "Menggangu kinerja kerja/belajar, konsentrasi, dan mood." },
      { id: 6, text: "Seberapa khawatirnya Anda terhadap masalah tidur Anda saat ini?", subtext: "Tingkat kecemasan akibat pola tidur yang buruk." },
      { id: 7, text: "Seberapa jauh masalah tidur ini mengurangi kualitas hidup Anda secara umum?", subtext: "Dampak jangka panjang bagi kebugaran tubuh." },
    ],
  },
  {
    id: "sdq25",
    title: "Kesehatan Mental Anak & Remaja",
    subtitle: "SDQ (Strengths and Difficulties Questionnaire)",
    desc: "Skrining 25 indikator emosional, perilaku, hiperaktivitas, & interaksi sosial anak/remaja.",
    icon: Baby,
    options: sdqOptions,
    questions: [
      { id: 1, text: "Sering mengeluh sakit kepala, sakit perut, atau mual?", subtext: "Gejala somatis akibat tekanan emosional." },
      { id: 2, text: "Sering khawatir berlebih atau tampak cemas dalam banyak situasi?", subtext: "Gelisah atau mudah takut pada hal baru." },
      { id: 3, text: "Sering merasa tidak bahagia, murung, atau menangis tanpa alasan jelas?", subtext: "Perubahan suasana hati anak/remaja." },
      { id: 4, text: "Gugup atau mudah kehilangan rasa percaya diri saat menghadapi situasi baru?", subtext: "Kecemasan sosial atau kurang percaya diri." },
      { id: 5, text: "Mudah takut dan mudah panik dalam situasi tertentu?", subtext: "Respons ketakutan yang berlebihan." },
      { id: 6, text: "Gelisah, tidak bisa diam, atau tidak dapat duduk tenang dalam waktu lama?", subtext: "Indikasi perilaku hiperaktif." },
      { id: 7, text: "Sering bergerak-gerak atau gelisah dengan tangan/kaki saat duduk?", subtext: "Respons motorik yang tidak bisa tenang." },
      { id: 8, text: "Mudah teralih perhatiannya dan sulit berkonsentrasi menyelesaikan tugas?", subtext: "Kesulitan mempertahankan fokus belajar." },
      { id: 9, text: "Bertindak sebelum berpikir (impulsif)?", subtext: "Kesulitan mengontrol dorongan diri." },
      { id: 10, text: "Tidak mampu menyelesaikan tugas hingga selesai?", subtext: "Perhatian rentan terputus di tengah jalan." },
      { id: 11, text: "Sering marah meledak-ledak atau sering kehilangan kesabaran (tantrum)?", subtext: "Kesulitan regulasi emosi amarah." },
      { id: 12, text: "Sering bertengkar atau memaksa orang lain menuruti kehendaknya?", subtext: "Perilaku oposisional atau dominan." },
      { id: 13, text: "Sering tidak menuruti aturan atau permintaan dari orang dewasa/guru?", subtext: "Kecenderungan tidak patuh aturan." },
      { id: 14, text: "Sering dituduh berbohong atau berbuat curang?", subtext: "Tantangan pada norma kejujuran." },
      { id: 15, text: "Sering mengambil barang yang bukan miliknya (mencuri)?", subtext: "Perilaku pelanggaran batas milik orang lain." },
      { id: 16, text: "Cenderung lebih suka menyendiri daripada bermain dengan teman sebaya?", subtext: "Kecenderungan isolasi sosial." },
      { id: 17, text: "Tidak memiliki setidaknya satu teman baik untuk berbagi cerita?", subtext: "Keterbatasan hubungan persahabatan." },
      { id: 18, text: "Kurang disukai atau sering dijauhi oleh anak-anak/teman seusianya?", subtext: "Dinamika penerimaan di kelompok sebaya." },
      { id: 19, text: "Sering dikerjai, diintimidasi, atau dibully oleh teman-temannya?", subtext: "Pengalaman perundungan di lingkungan sekitar." },
      { id: 20, text: "Lebih mudah bergaul dengan orang dewasa daripada anak seusianya?", subtext: "Pola penyesuaian interaksi sosial." },
      { id: 21, text: "Peka dan peduli terhadap perasaan orang lain (empati tinggi)?", subtext: "Indikator kekuatan sosial prososial." },
      { id: 22, text: "Suka berbagi makanan, mainan, atau pensil dengan teman?", subtext: "Sikap kooperatif dan kebaikan hati." },
      { id: 23, text: "Suka menolong jika ada orang lain yang terluka, kecewa, atau sakit?", subtext: "Tindakan kepedulian sosial spontan." },
      { id: 24, text: "Bersikap baik dan ramah kepada anak-anak yang lebih muda?", subtext: "Sikap pengasuhan dan kasih sayang." },
      { id: 25, text: "Sering menawarkan bantuan kepada orang tua, guru, atau teman?", subtext: "Sifat proaktif dalam membantu lingkungan." },
    ],
  },
  {
    id: "iat8",
    title: "Kecanduan Gadget & Medsos",
    subtitle: "IAT-8 (Internet Addiction Test-8)",
    desc: "Mengukur tingkat ketergantungan penggunaan smartphone, media sosial, & internet harian.",
    icon: Smartphone,
    options: gadgetOptions,
    questions: [
      { id: 1, text: "Seberapa sering Anda menghabiskan waktu di internet/gadget lebih lama dari niat awal?", subtext: "Niat awal 5 menit berakhir jadi berjam-jam scrolling." },
      { id: 2, text: "Seberapa sering Anda mengabaikan pekerjaan rumah atau tugas akibat keasyikan HP?", subtext: "Tugas terbengkalai karena layar gawai." },
      { id: 3, text: "Seberapa sering Anda lebih memilih hiburan gadget dibanding interaksi bersama keluarga/teman?", subtext: "Menarik diri dari obrolan langsung." },
      { id: 4, text: "Seberapa sering Anda membentuk relasi baru dengan pengguna internet lain dibanding teman nyata?", subtext: "Interaksi dunia maya mendominasi." },
      { id: 5, text: "Seberapa sering orang sekitar mengeluhkan lama waktu Anda berada di depan layar?", subtext: "Teguran dari orang terdekat." },
      { id: 6, text: "Seberapa sering produktivitas atau nilai akademik/kerja Anda menurun akibat internet?", subtext: "Dampak buruk pada performa harian." },
      { id: 7, text: "Seberapa sering Anda memeriksa medsos/pesan sebelum melakukan hal penting lain?", subtext: "Kebiasaan impulsif memeriksa layar HP." },
      { id: 8, text: "Seberapa sering Anda merasa defensif atau rahasia ketika ditanya apa yang dilakukan di HP?", subtext: "Perasaan tidak nyaman saat diperiksa." },
    ],
  },
]

export default function SkriningPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [selectedCat, setSelectedCat] = useState<Category | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const handleResetToMenu = () => {
    setSelectedCat(null)
    setCurrentStep(0)
    setAnswers({})
    setIsCompleted(false)
  }

  const handleSelectCat = (cat: Category) => {
    setSelectedCat(cat)
    setCurrentStep(0)
    setAnswers({})
    setIsCompleted(false)
  }

  const handleSelectOption = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }))
  }

  const handleNextQuestion = () => {
    if (!selectedCat) return
    if (answers[currentStep] === undefined) {
      toast.error("Pilih salah satu opsi jawaban terlebih dahulu.")
      return
    }

    if (currentStep < selectedCat.questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setIsCompleted(true)
      toast.success("Skrining Selesai!", {
        description: "Hasil evaluasi medis terstandar Anda telah dihitung.",
      })

      const newNotif = {
        id: Date.now(),
        title: "Hasil Skrining Keluar",
        desc: `Evaluasi ${selectedCat.title} (${selectedCat.subtitle}) telah diperbarui.`,
        time: "Baru saja",
        unread: true,
      }
      window.dispatchEvent(new CustomEvent("add-notification", { detail: newNotif }))
    }
  }

  const handlePrevQuestion = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const calculateTotalScore = () => {
    return Object.values(answers).reduce((acc, curr) => acc + curr, 0)
  }

  const getResultAnalysis = () => {
    if (!selectedCat) return { level: "", color: "", desc: "", needDoctor: false }
    
    const score = calculateTotalScore()
    const maxVal = Math.max(...selectedCat.options.map(o => o.value))
    const maxScore = selectedCat.questions.length * maxVal
    const ratio = score / maxScore

    if (ratio <= 0.25) {
      return {
        level: "Tingkat Rendah / Normal",
        color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
        desc: "Kondisi emosional dan mental Anda tergolong stabil dan sehat. Tetap jaga pola istirahat dan gaya hidup seimbang.",
        needDoctor: false,
      }
    } else if (ratio <= 0.55) {
      return {
        level: "Tingkat Ringan - Sedang",
        color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
        desc: "Indikasi tekanan mental atau kecemasan tingkat ringan hingga sedang. Disarankan melakukan konseling preventif atau teknik relaksasi.",
        needDoctor: false,
      }
    } else {
      return {
        level: "Tingkat Sedang - Berat",
        color: "text-rose-500 bg-rose-500/10 border-rose-500/20",
        desc: "Terdapat indikasi beban mental atau gejala klinis yang cukup signifikan. Sangat disarankan berkonsultasi langsung dengan psikiater/psikolog.",
        needDoctor: true,
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground transition-colors">
      
      <div className="container mx-auto max-w-5xl pt-28 pb-16 px-4 space-y-8 flex-grow">
        
        {/* BREADCRUMB DINAMIS */}
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

              {selectedCat ? (
                <>
                  <BreadcrumbItem>
                    <BreadcrumbLink 
                      className="cursor-pointer hover:text-cyan-600 transition-colors"
                      onClick={handleResetToMenu}
                    >
                      Skrining Mandiri
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-foreground">
                      {selectedCat.title}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-foreground">
                    Skrining Mandiri
                  </BreadcrumbPage>
                </BreadcrumbItem>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          {/* HEADER TITLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground flex items-center gap-2">
                {selectedCat ? selectedCat.title : "Skrining Mandiri"} <Sparkles className="w-5 h-5 text-cyan-500" />
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {selectedCat 
                  ? selectedCat.subtitle 
                  : "Kuesioner evaluasi kesehatan mental lengkap terstandar medis klinis"}
              </p>
            </div>

            {selectedCat && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetToMenu}
                className="rounded-full text-xs w-fit"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Ganti Kategori
              </Button>
            )}
          </div>
        </div>

        {/* LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="rounded-3xl p-6 space-y-4">
                <Skeleton className="h-10 w-10 rounded-2xl" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-12 w-full" />
              </Card>
            ))}
          </div>
        ) : !selectedCat ? (
          
          /* MENU 6 KATEGORI Utama */
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Pilih Instrumen Asesmen Klinis (Full Assessment):
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const IconComp = cat.icon
                return (
                  <Card 
                    key={cat.id}
                    onClick={() => handleSelectCat(cat)}
                    className="hover:border-cyan-500/50 hover:shadow-lg transition-all duration-300 rounded-3xl p-6 cursor-pointer bg-card group border-border flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-muted-foreground">
                          {cat.questions.length} Soal
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
                          {cat.subtitle}
                        </span>
                        <h3 className="font-bold text-base text-foreground group-hover:text-cyan-600 transition-colors mt-0.5">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 flex items-center text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                      Mulai Evaluasi <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Card>
                )
              })}
            </div>
          </motion.div>
        ) : isCompleted ? (

          /* HASIL AKHIR SKRINING */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto space-y-4"
          >
            <Card className="rounded-3xl p-8 border-border bg-card shadow-xl text-center space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  Hasil Kuesioner {selectedCat.subtitle}
                </span>
                <h2 className="text-xl font-bold">{selectedCat.title}</h2>
              </div>

              {(() => {
                const result = getResultAnalysis()
                const maxVal = Math.max(...selectedCat.options.map(o => o.value))
                const maxScore = selectedCat.questions.length * maxVal

                return (
                  <div className="space-y-5">
                    <div className={`p-5 rounded-2xl border ${result.color} space-y-1.5`}>
                      <p className="text-[10px] font-bold uppercase tracking-wide">Status Indikasi Klinis</p>
                      <h3 className="text-xl font-black">{result.level}</h3>
                      <p className="text-xs font-semibold">
                        Total Skor: {calculateTotalScore()} / {maxScore}
                      </p>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {result.desc}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => handleSelectCat(selectedCat)}
                        className="rounded-full text-xs h-10 px-6"
                      >
                        Ulangi Kuesioner Ini
                      </Button>

                      {result.needDoctor ? (
                        <Button
                          onClick={() => navigate("/dokter")}
                          className="rounded-full text-xs h-10 px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          <HeartHandshake className="w-4 h-4 mr-1.5" /> Konsultasi Dokter
                        </Button>
                      ) : (
                        <Button
                          onClick={handleResetToMenu}
                          className="rounded-full text-xs h-10 px-6 bg-cyan-600 hover:bg-cyan-700 text-white"
                        >
                          Selesai & Ke Menu Skrining
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })()}
            </Card>

            {/* DISCLAIMER MEDIS */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Catatan Medis:</strong> Hasil skrining ini merupakan alat evaluasi awal dan bukan merupakan diagnosis medis mutlak. Jika Anda mengalami kendala emosional yang mengganggu produktivitas harian, disarankan untuk berkonsultasi dengan profesional jiwa.
              </p>
            </div>
          </motion.div>
        ) : (

          /* SHADCN QUESTIONNAIRE COMPONENT */
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            {/* PROGRESS & STEP INDICATOR */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
                <span>{selectedCat.subtitle}</span>
                <span>Question {currentStep + 1} of {selectedCat.questions.length}</span>
              </div>
              
              <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-cyan-600 h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / selectedCat.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* QUESTION TEXT */}
            <div className="space-y-1.5 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                {selectedCat.questions[currentStep].text}
              </h2>
              {selectedCat.questions[currentStep].subtext && (
                <p className="text-xs text-muted-foreground">
                  {selectedCat.questions[currentStep].subtext}
                </p>
              )}
            </div>

            {/* QUESTIONNAIRE OPTIONS */}
            <div className="space-y-3 pt-2">
              {selectedCat.options.map((opt) => {
                const isSelected = answers[currentStep] === opt.value
                return (
                  <div
                    key={opt.key}
                    onClick={() => handleSelectOption(opt.value)}
                    className={`group relative flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-cyan-600 bg-cyan-500/5 dark:bg-cyan-500/10 shadow-sm"
                        : "border-border/80 hover:border-border hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? "border-cyan-600 bg-cyan-600" : "border-slate-300 dark:border-slate-600"
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>

                      <div>
                        <p className={`text-xs sm:text-sm font-semibold ${
                          isSelected ? "text-cyan-600 dark:text-cyan-400" : "text-foreground"
                        }`}>
                          {opt.label}
                        </p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {opt.sub}
                        </p>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-md border text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                      isSelected 
                        ? "bg-cyan-600 text-white border-cyan-600" 
                        : "bg-muted text-muted-foreground border-border group-hover:border-slate-400"
                    }`}>
                      {opt.key}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ACTION BUTTONS (PREV & NEXT) */}
            <div className="pt-4 flex items-center justify-between">
              <Button
                variant="ghost"
                disabled={currentStep === 0}
                onClick={handlePrevQuestion}
                className="rounded-full text-xs h-10 px-5 text-muted-foreground"
              >
                Kembali
              </Button>

              <Button
                onClick={handleNextQuestion}
                className="rounded-full px-7 text-xs h-10 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white font-bold transition-all"
              >
                {currentStep === selectedCat.questions.length - 1 ? "Selesai & Lihat Hasil" : "Next"}
              </Button>
            </div>
          </motion.div>
        )}

      </div>

    </div>
  )
}