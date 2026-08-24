// src/pages/LoginPage.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Import komponen Shadcn UI
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Import Lucide Icons untuk estetika
import { Stethoscope, Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulasi delay autentikasi
    setTimeout(() => {
      setIsLoading(false)
      navigate("/dokter/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-sm border-border shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto p-3 bg-cyan-100/50 dark:bg-cyan-900/20 rounded-full w-fit mb-2">
            <Stethoscope className="w-8 h-8 text-cyan-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Login Dokter</CardTitle>
          <CardDescription>
            Masukkan ID Dokter dan kata sandi Anda
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="id-dokter">ID Dokter / Email</Label>
              <Input 
                id="id-dokter" 
                type="email" 
                placeholder="dr.nama@rsjdahm.com" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  required 
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-700 mt-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memverifikasi...
                </>
              ) : (
                "Masuk ke Panel"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col text-xs text-muted-foreground pt-0">
          <p>Butuh bantuan akses? Hubungi Admin IT</p>
        </CardFooter>
      </Card>
    </div>
  )
}