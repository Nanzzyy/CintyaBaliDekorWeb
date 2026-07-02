'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Failed to fetch customers:', err));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          + Tambah Customer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">Nama</th>
              <th className="text-left p-3">Telepon</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Total Job</th>
              <th className="text-left p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">{customer.name}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.job_count || 0}</td>
                <td className="p-3">
                  <Link href={`/dashboard/customers/${customer.id}`} className="text-primary">
                    Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
