// src/components/Navbar.tsx
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  User, 
  Activity, 
  HelpCircle, 
  LogOut,
  ChevronsUpDown, 
  Bell, 
  Menu, 
  X, 
  Home, 
  ClipboardList, 
  Calendar, 
  BookOpen, 
  MessageSquareWarning 
} from "lucide-react"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  // State untuk Mobile Drawer / Sidebar
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // State Notifikasi Popover
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Jadwal Konsultasi Disetujui",
      desc: "Janji temu dengan Dr. Anita pada besok 09.00 WIB.",
      time: "10 mnt lalu",
      unread: true,
    },
    {
      id: 2,
      title: "Hasil Skrining Selesai",
      desc: "Evaluasi kesehatan mandiri Anda telah diperbarui.",
      time: "1 jam lalu",
      unread: true,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  // Diperbarui: Path Dashboard mengarah ke /dashboard, bukan root (/)
  const navMenus = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Skrining", path: "/skrining", icon: ClipboardList },
    { name: "Booking", path: "/booking", icon: Calendar },
  ]

  const rightNavMenus = [
    { name: "Survey", path: "/survey" },
    { name: "Pengaduan", path: "/pengaduan" },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    navigate("/login")
  }

  return (
    <>
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <header className="w-full max-w-6xl bg-card/80 backdrop-blur-md border border-border shadow-md rounded-full px-6 h-14 flex items-center justify-between transition-colors">
          
          {/* KIRI: Logo & Menu Utama Desktop */}
          <div className="flex items-center gap-6">
            <span 
              onClick={() => handleNavigation("/")} 
              className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 tracking-wide cursor-pointer select-none"
            >
              RSJD
            </span>

            {/* Desktop Navigation dengan Framer Motion */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground bg-secondary/50 p-1 rounded-full relative">
              {navMenus.map((menu) => {
                const isActive = location.pathname === menu.path
                return (
                  <button
                    key={menu.name}
                    onClick={() => handleNavigation(menu.path)}
                    className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer relative z-10 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-background rounded-full shadow-sm z-[-1]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {menu.name}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* KANAN: Survey, Pengaduan, Notifikasi, User Dropdown, & Mobile Hamburger */}
          <div className="flex items-center gap-2 md:gap-4">
            
            {/* Navigasi Tambahan (Survey & Pengaduan) khusus Desktop */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground bg-secondary/50 p-1 rounded-full relative mr-2">
              {rightNavMenus.map((menu) => {
                const isActive = location.pathname === menu.path
                return (
                  <button
                    key={menu.name}
                    onClick={() => handleNavigation(menu.path)}
                    className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer relative z-10 ${
                      isActive
                        ? "text-foreground font-semibold"
                        : "hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeRightNavIndicator"
                        className="absolute inset-0 bg-background rounded-full shadow-sm z-[-1]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    {menu.name}
                  </button>
                )
              })}
            </nav>

            {/* ICON NOTIFIKASI DENGAN RED DOT */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="relative p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-background animate-pulse" />
                  )}
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-80 rounded-2xl p-3 shadow-xl border-border bg-popover text-popover-foreground" align="end">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-border px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">Notifikasi</span>
                    {unreadCount > 0 && (
                      <span className="bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} Baru
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                    className="text-[11px] text-muted-foreground hover:text-cyan-600 transition-colors cursor-pointer"
                  >
                    Tandai dibaca
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-center text-xs text-muted-foreground py-4">Tidak ada notifikasi</p>
                  ) : (
                    notifications.map((item) => (
                      <div 
                        key={item.id}
                        className={`p-2.5 rounded-xl border text-xs transition-colors ${
                          item.unread 
                            ? "bg-secondary/60 border-cyan-500/20" 
                            : "bg-transparent border-transparent"
                        }`}
                      >
                        <div className="flex justify-between items-start font-semibold text-foreground mb-0.5">
                          <span>{item.title}</span>
                          <span className="text-[10px] text-muted-foreground font-normal shrink-0">{item.time}</span>
                        </div>
                        <p className="text-muted-foreground text-[11px] leading-relaxed">{item.desc}</p>
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* USER DROPDOWN (Desktop & Tablet) */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 bg-secondary hover:bg-secondary/80 transition-colors rounded-full p-1 pr-2.5 outline-none cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-foreground text-xs font-semibold">AP</AvatarFallback>
                    </Avatar>
                    <ChevronsUpDown className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-64 rounded-2xl p-2 shadow-xl border-border bg-popover text-popover-foreground" align="end">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-secondary text-foreground font-semibold text-sm">AP</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">Andi Pratama</span>
                      <span className="text-xs text-muted-foreground">andi@email.com</span>
                    </div>
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup className="space-y-0.5">
                    <DropdownMenuItem 
                      onClick={() => navigate("/profil")} 
                      className="rounded-xl cursor-pointer gap-2 py-2 focus:bg-secondary"
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>Profile info</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem 
                      onClick={() => navigate("/booking")} 
                      className="rounded-xl cursor-pointer gap-2 py-2 focus:bg-secondary"
                    >
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      <span>Aktivitas</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  {/* Toggle Dark Mode */}
                  <div className="flex items-center justify-between px-3 py-2 text-sm">
                    <span>Dark mode</span>
                    <Switch 
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      size="sm" 
                    />
                  </div>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem 
                    onClick={() => navigate("/pengaduan")} 
                    className="rounded-xl cursor-pointer gap-2 py-2 focus:bg-secondary"
                  >
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    <span>Bantuan</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="rounded-xl cursor-pointer gap-2 py-2 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* MOBILE HAMBURGER BUTTON (Hanya tampil di HP) */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-full h-9 w-9 cursor-pointer hover:bg-secondary"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

          </div>
        </header>
      </div>

      {/* MOBILE DRAWER / SIDEBAR KHUSUS HP */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-xs"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-card border-l border-border z-50 p-6 flex flex-col justify-between md:hidden shadow-2xl overflow-y-auto"
            >
              <div className="space-y-6">
                
                {/* Profil Singkat di Bagian Atas Drawer */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-secondary text-foreground font-semibold text-xs">AP</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold leading-tight text-foreground">Andi Pratama</span>
                      <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">andi@email.com</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full h-8 w-8 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* List Menu Navigasi Mobile */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1">Menu Utama</span>
                  {[
                    { name: "Dashboard", path: "/dashboard", icon: Home },
                    { name: "Skrining", path: "/skrining", icon: ClipboardList },
                    { name: "Booking", path: "/booking", icon: Calendar },
                    { name: "Survey", path: "/survey", icon: BookOpen },
                    { name: "Pengaduan", path: "/pengaduan", icon: MessageSquareWarning },
                  ].map((menu) => {
                    const Icon = menu.icon
                    const isActive = location.pathname === menu.path
                    return (
                      <button
                        key={menu.name}
                        onClick={() => handleNavigation(menu.path)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {menu.name}
                      </button>
                    )
                  })}
                </div>

                {/* Menu Tambahan Akun & Pengaturan Mobile */}
                <div className="flex flex-col gap-1.5 pt-2 border-t border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1">Pengaturan & Akun</span>
                  
                  <button
                    onClick={() => handleNavigation("/profil")}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    Profile info
                  </button>

                  {/* Toggle Dark Mode di Mobile */}
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-semibold text-muted-foreground bg-secondary/40">
                    <span>Dark mode</span>
                    <Switch 
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      size="sm" 
                    />
                  </div>
                </div>

              </div>

              {/* Tombol Logout & Copyright */}
              <div className="space-y-4 pt-4 border-t border-border mt-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-xs font-semibold text-rose-500 bg-rose-500/10 hover:bg-rose-500/20 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Keluar
                </button>
                <div className="text-center text-[10px] text-muted-foreground">
                  © 2026 RSJD Kocak. All rights reserved.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}