'use client';
export default function StatusBadge({ status }: { status: string }) {
  return <span className={`px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800`}>{status}</span>;
}
