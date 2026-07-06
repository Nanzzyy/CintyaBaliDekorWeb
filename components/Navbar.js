import Link from 'next/link';
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Beranda</Link>
        </li>
        <li>
          <Link href="/job">Job</Link>
        </li>
        <li>
          <Link href="/cashflow">Cashflow</Link>
        </li>
      </ul>
    </nav>
  );
}