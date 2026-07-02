'use client';

import { useEffect, useState } from 'react';
import KPICards from '@/components/dashboard/KPICards';
import RevenueChart from '@/components/dashboard/Charts/RevenueChart';
import JobDistributionChart from '@/components/dashboard/Charts/JobDistributionChart';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch dashboard stats
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex gap-2">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
            + Buat Job Baru
          </button>
          <button className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-gold-dark">
            + Catat Transaksi
          </button>
        </div>
      </div>
      
      <KPICards stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <JobDistributionChart />
      </div>
    </div>
  );
}
