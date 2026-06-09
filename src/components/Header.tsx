import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand-brown text-xl">
          ENTEG
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-brand-text">
          <Link href="/">Home</Link>
          <Link href="/tours">Tours</Link>
          <Link href="/hotels">Hotels</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <a href="https://wa.me/213 5 40 26 38 50" className="bg-green-600 text-white text-sm px-4 py-2 rounded-full">WhatsApp</a>
      </div>
    </header>
  );
}
