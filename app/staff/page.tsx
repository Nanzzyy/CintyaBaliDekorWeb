'use client';

import { useEffect, useState } from 'react';

export default function StaffDashboard() {
  const [stats, setStats] = useState({
    activeJobs: 0,
    pendingVerifications: 0,
    completedToday: 0
  });

  useEffect(() => {
    fetch('/api/staff/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch staff stats:', err));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Staff Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Active Jobs</p>
          <p className="text-2xl font-bold text-primary">{stats.activeJobs}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Pending Verifications</p>
          <p className="text-2xl font-bold text-warning">{stats.pendingVerifications}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Completed Today</p>
          <p className="text-2xl font-bold text-success">{stats.completedToday}</p>
        </div>
      </div>
    </div>
  );
}
