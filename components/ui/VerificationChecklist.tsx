'use client';
export default function VerificationChecklist({ items, onVerify }: any) {
  return <div className="space-y-2">{items?.map((item: any, i: number) => <div key={i} className="flex items-center gap-2"><input type="checkbox" onChange={() => onVerify?.(item.id)} /><span>{item.name}</span></div>)}</div>;
}
