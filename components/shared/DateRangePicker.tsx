'use client';
export default function DateRangePicker({ start, end, onChange }: any) {
  return <div className="flex gap-2"><input type="date" value={start} onChange={e => onChange?.({ start: e.target.value, end })} className="border rounded px-2 py-1"/></div>;
}
