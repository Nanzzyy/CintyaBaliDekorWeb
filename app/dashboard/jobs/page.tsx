'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import JobProgressBar from '@/components/ui/JobProgressBar';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'kanban'
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Failed to fetch jobs:', err));
  }, []);

  const stages = ['order_taken', 'preparing', 'delivering', 'setup', 'event_ongoing', 'teardown', 'returning', 'completed'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Jobs Management</h1>
        <Link href="/dashboard/jobs/create" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          + Buat Job Baru
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button
          onClick={() => setViewMode(viewMode === 'table' ? 'kanban' : 'table')}
          className="border rounded px-3 py-2"
        >
          {viewMode === 'table' ? 'Kanban View' : 'Table View'}
        </button>
      </div>

      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-4 gap-4 overflow-x-auto">
          {stages.map(stage => (
            <div key={stage} className="bg-gray-100 rounded-lg p-4 min-w-[250px]">
              <h3 className="font-semibold mb-3 capitalize">{stage.replace('_', ' ')}</h3>
              {jobs.filter(job => job.progress_stage === stage).map(job => (
                <div key={job.id} className="bg-white p-3 rounded shadow mb-2">
                  <p className="font-medium">{job.job_number}</p>
                  <p className="text-sm text-gray-500">{job.customer?.name}</p>
                  <p className="text-xs text-gray-400">{job.event_date}</p>
                  <Link href={`/dashboard/jobs/${job.id}`} className="text-primary text-xs">
                    Detail
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">Job No</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Tanggal</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Progress</th>
                <th className="text-left p-3">Pembayaran</th>
                <th className="text-left p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jobs.filter(job => statusFilter === 'all' || job.status === statusFilter).map(job => (
                <tr key={job.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{job.job_number}</td>
                  <td className="p-3">{job.customer?.name}</td>
                  <td className="p-3">{job.event_date}</td>
                  <td className="p-3">
                    <StatusBadge status={job.status} type="job" />
                  </td>
                  <td className="p-3">
                    <JobProgressBar currentStage={job.progress_stage} stages={stages} />
                  </td>
                  <td className="p-3">
                    <StatusBadge status={job.payment_status} type="payment" />
                  </td>
                  <td className="p-3">
                    <Link href={`/dashboard/jobs/${job.id}`} className="text-primary mr-2">View</Link>
                    <button className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
