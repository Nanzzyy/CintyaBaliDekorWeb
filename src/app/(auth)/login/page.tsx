'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mail, Lock, Eye, EyeOff, 
  ArrowRight, Leaf, Loader2 
} from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// ── Background SVG decoratif Bali ──
function BaliDecorationBg() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradien latar */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F6F2] via-white to-[#E8F5F0]" />
      
      {/* Ornamen bunga teratai (dekoratif) */}
      <svg className="absolute -top-20 -right-20 w-96 h-96 text-primary/5" viewBox="0 0 200 200">
        <path d="M100 20C100 20 80 50 80 80C80 110 100 140 100 140C100 140 120 110 120 80C120 50 100 20 100 20Z" fill="currentColor" />
        <path d="M60 60C60 60 40 80 40 100C40 120 60 140 60 140C60 140 80 120 80 100C80 80 60 60 60 60Z" fill="currentColor" opacity="0.7"/>
        <path d="M140 60C140 60 120 80 120 100C120 120 140 140 140 140C140 140 160 120 160 100C160 80 140 60 140 60Z" fill="currentColor" opacity="0.7"/>
      </svg>
      
      {/* Lingkaran blur dekoratif */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-subtle" />
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" />
      
      {/* Garis-garis elegan */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="w-full h-full opacity-[0.03]" viewBox="0 0 1440 900" fill="none">
          <path d="M0 450C360 300 720 600 1080 450C1260 375 1350 525 1440 450" stroke="#0A6E57" strokeWidth="2"/>
          <path d="M0 550C360 400 720 700 1080 550C1260 475 1350 625 1440 550" stroke="#D4A853" strokeWidth="1.5"/>
        </svg>
      </div>
    </div>
  )
}

// ── Komponen Input dengan Floating Label ──
function InputField({ 
  icon: Icon, 
  label, 
  type = 'text', 
  value, 
  onChange, 
  error,
  isLoading 
}: { 
  icon: any, 
  label: string, 
  type?: string, 
  value: string, 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  error?: string,
  isLoading?: boolean
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type
  const hasValue = value.length > 0

  return (
    <div className="relative mb-5">
      <div className={`
        relative flex items-center glass-card overflow-hidden
        ${error ? 'border-red-400/50 bg-red-50/30' : ''}
        ${isFocused ? 'ring-2 ring-primary/30 border-primary/40' : ''}
        transition-all duration-300
      `}>
        <Icon className="absolute left-4 w-5 h-5 text-[#8E8E9A] z-10" />
        
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isLoading}
          placeholder={label}
          className="w-full px-12 py-4 bg-transparent text-[#1A1A2E] 
                     placeholder:text-[#8E8E9A]/50 
                     focus:outline-none
                     disabled:opacity-60 disabled:cursor-not-allowed
                     transition-all duration-300"
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 p-1 text-[#8E8E9A] hover:text-[#1A1A2E] 
                       transition-all duration-300 hover:scale-110"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="mt-1.5 ml-1 text-xs text-red-500 font-medium"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Login Form Utama ──
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [rememberMe, setRememberMe] = useState(false)
  
  const supabase = createClientComponentClient()

  // ── Validasi ──
  const validate = () => {
    const newErrors: typeof errors = {}
    
    if (!email) newErrors.email = 'Email harus diisi'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
      newErrors.email = 'Format email tidak valid'
    
    if (!password) newErrors.password = 'Password harus diisi'
    else if (password.length < 6) 
      newErrors.password = 'Minimal 6 karakter'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // ── Handle Submit ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsLoading(true)
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setErrors({ email: 'Email atau password salah', password: 'Email atau password salah' })
        } else {
          setErrors({ email: error.message })
        }
        return
      }
      
      // Redirect ke dashboard
      window.location.href = '/dashboard'
    } catch (err) {
      setErrors({ email: 'Terjadi kesalahan. Silakan coba lagi.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <BaliDecorationBg />
      
      <main className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[460px]"
        >
          {/* ── Card Utama ── */}
          <div className="glass-card p-8 sm:p-10">
            {/* Logo & Brand */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 
                            bg-gradient-primary rounded-2xl shadow-lg shadow-primary/30 
                            mb-4 group cursor-pointer">
                <Leaf className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h1 className="text-2xl font-bold text-[#1A1A2E] tracking-tight">
                Cintya Bali Dekorasi
              </h1>
              <p className="text-sm text-[#8E8E9A] mt-1.5">
                Kelola dekorasi pernikahan dengan mudah
              </p>
            </motion.div>

            {/* ── Form ── */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              noValidate
            >
              <InputField
                icon={Mail}
                label="Alamat Email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: undefined })) }}
                error={errors.email}
                isLoading={isLoading}
              />
              
              <InputField
                icon={Lock}
                label="Password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: undefined })) }}
                error={errors.password}
                isLoading={isLoading}
              />

              {/* Remember & Lupa Password */}
              <div className="flex items-center justify-between mb-8">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-[#8E8E9A]/30 
                             text-primary focus:ring-primary/30 
                             transition-all duration-300"
                  />
                  <span className="text-sm text-[#8E8E9A] group-hover:text-[#1A1A2E] 
                                 transition-colors duration-300">
                    Ingat saya
                  </span>
                </label>
                
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 
                           transition-all duration-300 hover:underline"
                >
                  Lupa password?
                </button>
              </div>

              {/* ── Tombol Login ── */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="premium-btn w-full flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* ── Register Link ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-[#8E8E9A]">
                Belum punya akun?{' '}
                <a 
                  href="/register" 
                  className="text-primary font-semibold hover:text-primary/80 
                           transition-all duration-300 hover:underline"
                >
                  Daftar sekarang
                </a>
              </p>
            </motion.div>
          </div>

          {/* ── Footer ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center text-xs text-[#8E8E9A]/60 mt-6"
          >
            &copy; 2024 Cintya Bali Dekorasi. All rights reserved.
          </motion.p>
        </motion.div>
      </main>
    </>
  )
}
