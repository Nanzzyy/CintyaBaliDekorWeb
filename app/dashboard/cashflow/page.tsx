'use client';

import { useState, useEffect } from 'react';
import DataTable from '@/components/ui/DataTable';
import DateRangePicker from '@/components/shared/DateRangePicker';

export default function CashflowPage() {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error('Failed to fetch transactions:', err));
  }, []);

  const totalIncome = transactions
    .filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Cashflow Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Pemasukan</p>
          <p className="text-xl font-bold text-green-600">Rp {totalIncome.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Pengeluaran</p>
          <p className="text-xl font-bold text-red-600">Rp {totalExpense.toLocaleString('id-ID')}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Saldo Bersih</p>
          <p className={`text-xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            Rp {netBalance.toLocaleString('id-ID')}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm text-gray-500">Jumlah Transaksi</p>
          <p className="text-xl font-bold text-gray-800">{transactions.length}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <DateRangePicker onChange={setDateRange} />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="all">Semua Tipe</option>
              <option value="income">Pemasukan</option>
              <option value="expense">Pengeluaran</option>
            </select>
          </div>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
            + Tambah Transaksi
          </button>
        </div>
        
        <DataTable 
          columns={[
            { key: 'transaction_date', label: 'Tanggal' },
            { key: 'description', label: 'Deskripsi' },
            { key: 'category', label: 'Kategori' },
            { key: 'amount', label: 'Jumlah', render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}` },
            { key: 'transaction_type', label: 'Tipe', render: (val) => (
              <span className={`px-2 py-1 rounded text-xs ${val === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {val === 'income' ? 'Pemasukan' : 'Pengeluaran'}
              </span>
            )},
          ]}
          data={transactions}
        />
      </div>
    </div>
  );
}
