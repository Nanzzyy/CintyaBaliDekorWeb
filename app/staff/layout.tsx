'use client';

import { useState } from 'react';

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-sidebar text-white p-4">
        <h2 className="text-xl font-bold mb-6">Staff Dashboard</h2>
        <nav className="space-y-2">
          <a href="/staff" className="block p-2 hover:bg-gray-700 rounded">Overview</a>
          <a href="/staff/jobs" className="block p-2 hover:bg-gray-700 rounded">My Jobs</a>
          <a href="/staff/inventory/scan" className="block p-2 hover:bg-gray-700 rounded">Scan Inventory</a>
        </nav>
      </div>
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}
