'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StaffJobsPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch('/api/staff/jobs')
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Failed to fetch staff jobs:', err));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Jobs</h1>
      
      <div className="space-y-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{job.job_number} - {job.title}</h3>
                <p className="text-sm text-gray-500">{job.customer?.name} | {job.event_date}</p>
                <p className="text-sm text-gray-400">{job.location}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${
                job.progress_stage === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                job.progress_stage === 'delivering' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {job.progress_stage?.replace('_', ' ')}
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <Link href={`/staff/jobs/${job.id}/verification`} className="bg-primary text-white px-3 py-1 rounded text-sm">
                Verifikasi Barang
              </Link>
              <Link href={`/staff/jobs/${job.id}/completion`} className="bg-success text-white px-3 py-1 rounded text-sm">
                Verifikasi Selesai
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
