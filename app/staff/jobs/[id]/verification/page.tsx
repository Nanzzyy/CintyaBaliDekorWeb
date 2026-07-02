'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import VerificationChecklist from '@/components/ui/VerificationChecklist';
import PhotoGallery from '@/components/ui/PhotoGallery';

export default function StaffVerificationPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [jobItems, setJobItems] = useState([]);

  useEffect(() => {
    const jobId = params.id;
    fetch(`/api/jobs/${jobId}`)
      .then(res => res.json())
      .then(data => {
        setJob(data);
        setJobItems(data.job_items || []);
      })
      .catch(err => console.error('Failed to fetch job:', err));
  }, [params.id]);

  const handleVerifyTaken = async (itemId, data) => {
    try {
      const response = await fetch(`/api/jobs/${params.id}/items/${itemId}/verify-taken`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Verifikasi berhasil!');
        router.refresh();
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Verifikasi Barang Dibawa</h1>
      <p className="text-gray-500">Job: {job.job_number} - {job.title}</p>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Daftar Barang</h2>
        <VerificationChecklist 
          items={jobItems}
          onVerify={handleVerifyTaken}
          readOnly={false}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Foto Barang</h2>
        <PhotoGallery 
          images={[]}
          onUpload={(files) => console.log('Upload:', files)}
          maxFiles={10}
        />
      </div>
    </div>
  );
}
