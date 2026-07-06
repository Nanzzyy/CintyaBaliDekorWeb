'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CalendarCheck, DollarSign, Package, Users,
  TrendingUp, Plus, ArrowRight, Bell,
  Clock, CheckCircle2, AlertCircle,
  Briefcase, LayoutDashboard
} from 'lucide-react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// ── Glass Card Component ──
function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  trend, 
  color = 'primary',
  delay = 0 
}: { 
  icon: any, 
  label: string, 
  value: string | number, 
  trend?: { value: string; positive: boolean },
  color?: 'primary' | 'secondary' | 'teal' | 'amber',
  delay?: number 
}) {
  const colorMap = {
    primary: 'from-primary to-primary/80 shadow-primary/20',
    secondary: 'from-secondary to-secondary/80 shadow-secondary/20',
    teal: 'from-[#0A6E57] to-[#1A936F] shadow-[#0A6E57]/20',
    amber: 'from-[#D4A853] to-[#E4C07A] shadow-[#D4A853]/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card-hover p-5 sm:p-6 group cursor-default"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`
          w-12 h-12 rounded-2xl bg-gradient-to-br ${colorMap[color]}
          flex items-center justify-center shadow-lg
          group-hover:scale-110 transition-transform duration-300
        `}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {trend && (
          <div className={`
            flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg
            ${trend.positive 
              ? 'bg-green-50 text-green-600 border border-green-200' 
              : 'bg-red-50 text-red-600 border border-red-200'
            }
          `}>
            <TrendingUp className={`w-3.5 h-3.5 ${!trend.positive && 'rotate-180'}`} />
            {trend.value}
          </div>
        )}
      </div>
      
      <p className="text-sm text-[#8E8E9A] mb-1">{label}</p>
      <p className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] tracking-tight">
        {value}
      </p>
    </motion.div>
  )
}

// ── Welcome Banner ──
function WelcomeBanner({ username, stats }: { username: string; stats: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden glass-card p-6 sm:p-8 mb-8 group"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#1A1A2E]">
            Selamat datang kembali, {username}! 👋
          </h1>
          <p className="text-sm sm:text-base text-[#8E8E9A] mt-1">
            {stats.activeJobs} pekerjaan aktif • {stats.todayJobs} jadwal hari ini
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="premium-btn text-sm flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Pekerjaan Baru</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Quick Actions ──
function QuickActions() {
  const actions = [
    { icon: CalendarCheck, label: 'Buat Job', color: 'from-primary to-primary/80' },
    { icon: Package, label: 'Cek Inventaris', color: 'from-secondary to-secondary/80' },
    { icon: DollarSign, label: 'Catat Transaksi', color: 'from-[#0A6E57] to-[#1A936F]' },
    { icon: Users, label: 'Kelola Staff', color: 'from-[#D4A853] to-[#E4C07A]' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card p-5 sm:p-6 mb-8"
    >
      <h2 className="section-title mb-5 flex items-center gap-2">
        <LayoutDashboard className="w-4 h-4 text-primary" />
        Aksi Cepat
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="glass-card-hover p-4 flex flex-col items-center gap-2.5 group"
          >
            <div className={`
              w-10 h-10 rounded-xl bg-gradient-to-br ${action.color}
              flex items-center justify-center shadow-md
              group-hover:scale-110 transition-transform duration-300
            `}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-[#1A1A2E] text-center">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// ── Upcoming Jobs ──
function UpcomingJobs() {
  const jobs = [
    { 
      id: 1, 
      client: 'Made & Putu', 
      date: '15 Jan 2024', 
      time: '08:00',
      location: 'Ubud, Gianyar',
      status: 'persiapan',
      items: 24 
    },
    { 
      id: 2, 
      client: 'Ketut & Luh', 
      date: '16 Jan 2024', 
      time: '10:00',
      location: 'Sanur, Denpasar',
      status: 'verifikasi',
      items: 18 
    },
    { 
      id: 3, 
      client: 'Nyoman & Komang', 
      date: '18 Jan 2024', 
      time: '07:00',
      location: 'Jimbaran, Badung',
      status: 'selesai',
      items: 30 
    },
  ]

  const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
    persiapan: { icon: Clock, color: 'text-amber-500 bg-amber-50 border-amber-200', label: 'Persiapan' },
    verifikasi: { icon: AlertCircle, color: 'text-blue-500 bg-blue-50 border-blue-200', label: 'Verifikasi' },
    selesai: { icon: CheckCircle2, color: 'text-green-500 bg-green-50 border-green-200', label: 'Selesai' },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-5 sm:p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="section-title flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          Pekerjaan Mendatang
        </h2>
        <button className="text-sm text-primary hover:text-primary/80 
                        transition-all duration-300 flex items-center gap-1">
          Lihat semua <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map((job, idx) => {
          const config = statusConfig[job.status]
          const StatusIcon = config.icon

          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="glass-card-hover p-4 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-semibold text-[#1A1A2E] truncate">
                      {job.client}
                    </h3>
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full 
                      text-xs font-medium border ${config.color}
                    `}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8E8E9A]">
                    <span className="flex items-center gap-1">
                      <CalendarCheck className="w-3.5 h-3.5" />
                      {job.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {job.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" />
                      {job.items} item
                    </span>
                  </div>
                </div>
                <button className="p-2 text-[#8E8E9A] hover:text-primary 
                                 group-hover:translate-x-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ── Main Dashboard Page ──
export default function DashboardPage() {
  const [username, setUsername] = useState('Admin')
  const [stats, setStats] = useState({
    activeJobs: 12,
    todayJobs: 3,
  })
  
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <WelcomeBanner username={username} stats={stats} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={Briefcase} 
            label="Total Pekerjaan" 
            value="156" 
            trend={{ value: '+12%', positive: true }}
            color="primary"
            delay={0.1}
          />
          <StatCard 
            icon={DollarSign} 
            label="Pendapatan Bulan Ini" 
            value="Rp 45.5M" 
            trend={{ value: '+8.5%', positive: true }}
            color="amber"
            delay={0.2}
          />
          <StatCard 
            icon={Package} 
            label="Item Disewa" 
            value="432" 
            color="teal"
            delay={0.3}
          />
          <StatCard 
            icon={Users} 
            label="Klien Aktif" 
            value="28" 
            trend={{ value: '-2%', positive: false }}
            color="secondary"
            delay={0.4}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <QuickActions />
            <UpcomingJobs />
          </div>
          
          <div className="space-y-8">
            {/* You can add RecentActivity or RevenueChart here in the future */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card p-6"
            >
              <h2 className="section-title mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" />
                Notifikasi
              </h2>
              <div className="text-center py-8 text-[#8E8E9A]">
                <p className="text-sm">Belum ada notifikasi baru</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
