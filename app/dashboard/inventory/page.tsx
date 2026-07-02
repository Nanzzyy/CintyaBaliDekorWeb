'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetch('/api/inventory')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Failed to fetch inventory:', err));
  }, []);

  const getStockStatus = (available, minimum) => {
    if (available <= minimum * 0.1) return { status: 'critical', color: 'bg-red-100 text-red-800' };
    if (available <= minimum * 0.3) return { status: 'low', color: 'bg-yellow-100 text-yellow-800' };
    return { status: 'ok', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <Link href="/dashboard/inventory/add" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          + Tambah Barang
        </Link>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Cari barang..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">Semua Kategori</option>
          {/* Categories would be fetched from API */}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.filter(item => 
          item.name.toLowerCase().includes(search.toLowerCase()) &&
          (categoryFilter === 'all' || item.category_id === categoryFilter)
        ).map(item => {
          const stockStatus = getStockStatus(item.quantity_available, item.minimum_stock);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow p-4">
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="w-full h-32 object-cover rounded mb-2" />
              )}
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.code}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Stok: {item.quantity_available} {item.unit}</span>
                <span className={`px-2 py-1 rounded text-xs ${stockStatus.color}`}>
                  {stockStatus.status === 'critical' ? 'Kritis' : stockStatus.status === 'low' ? 'Menipis' : 'Aman'}
                </span>
              </div>
              <p className="text-sm font-bold mt-2">Rp {Number(item.rental_price_per_unit).toLocaleString('id-ID')}/{item.unit}</p>
              <Link href={`/dashboard/inventory/${item.id}`} className="text-primary text-sm mt-2 inline-block">
                Detail →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
