'use client';
export default function PhotoGallery({ photos }: { photos: string[] }) {
  return <div className="grid grid-cols-3 gap-2">{photos?.map((url, i) => <img key={i} src={url} alt={`Photo ${i}`} className="rounded" />)}</div>;
}
