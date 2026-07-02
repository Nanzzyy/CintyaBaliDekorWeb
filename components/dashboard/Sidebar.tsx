'use client';
export default function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return <aside className={`bg-sidebar text-white ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300`}><nav>{/* Sidebar navigation */}</nav></aside>;
}
