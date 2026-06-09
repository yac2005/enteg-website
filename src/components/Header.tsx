"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/tours", label: "Tours" },
  { href: "/hotels", label: "Hotels" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-bold text-brand-brown text-xl">
          ENTEG
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-brand-text">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand-brown transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop WhatsApp */}
        <a
          href="https://wa.me/213XXXXXXXXX"
          className="hidden md:inline-block bg-green-600 text-white text-sm px-4 py-2 rounded-full"
        >
          WhatsApp
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-brand-brown transition-transform ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-brown transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-brand-brown transition-transform ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>

      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-brand-text text-sm font-medium hover:text-brand-brown"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/213XXXXXXXXX"
            className="inline-block bg-green-600 text-white text-sm px-4 py-2 rounded-full text-center"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
