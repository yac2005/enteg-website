"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const SERVICES = [
  {
    label: "Tours",
    description: "Sahara, culture & adventure",
    icon: "🏜️",
    href: "/tours",
  },
  {
    label: "Accommodation",
    description: "Guesthouse & partner hotels",
    icon: "🏨",
    href: "/hotels",
  },
  {
    label: "Transport",
    description: "Chauffeur & family transfers",
    icon: "🚌",
    href: null, // opens modal
  },
  {
    label: "Custom Trip",
    description: "Flights, hotels & full planning",
    icon: "✈️",
    href: "/voyage-sur-mesure",
  },
];

export default function Header({ onServiceModal }: { onServiceModal?: (service: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleServiceClick(service: typeof SERVICES[0]) {
    if (service.href) return; // Link handles navigation
    setMenuOpen(false);
    setDropdownOpen(false);
    onServiceModal?.(service.label);
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="ENTEG Voyages" width={45} height={35} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-text">
          <Link href="/" className="hover:text-brand-brown transition-colors">Home</Link>

          {/* Our Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 hover:text-brand-brown transition-colors"
            >
              Our Services
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12" fill="none"
              >
                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown panel */}
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[420px] bg-white rounded-2xl shadow-xl border border-gray-100 p-3 grid grid-cols-2 gap-2">
                {/* little arrow */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45" />
                {SERVICES.map((s) =>
                  s.href ? (
                    <Link
                      key={s.label}
                      href={s.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-beige transition-colors group"
                    >
                      <span className="text-2xl mt-0.5">{s.icon}</span>
                      <div>
                        <p className="font-semibold text-brand-text group-hover:text-brand-brown transition-colors text-sm">
                          {s.label}
                        </p>
                        <p className="text-xs text-brand-secondary mt-0.5">{s.description}</p>
                      </div>
                    </Link>
                  ) : (
                    <button
                      key={s.label}
                      onClick={() => handleServiceClick(s)}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-beige transition-colors group text-left w-full"
                    >
                      <span className="text-2xl mt-0.5">{s.icon}</span>
                      <div>
                        <p className="font-semibold text-brand-text group-hover:text-brand-brown transition-colors text-sm">
                          {s.label}
                        </p>
                        <p className="text-xs text-brand-secondary mt-0.5">{s.description}</p>
                      </div>
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <Link href="/about" className="hover:text-brand-brown transition-colors">About</Link>
          <Link href="/contact" className="hover:text-brand-brown transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/2130771504301"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hidden md:inline-block hover:bg-green-700 transition-colors"
          >
            WhatsApp
          </a>
          {/* Mobile hamburger */}
          <button className="md:hidden text-brand-text text-xl w-8 h-8 flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-1 text-sm font-medium text-brand-text">
          <Link href="/" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl hover:bg-brand-beige">
            Home
          </Link>

          {/* Mobile Our Services accordion */}
          <button
            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-brand-beige w-full text-left"
          >
            Our Services
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
              viewBox="0 0 12 12" fill="none"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {mobileServicesOpen && (
            <div className="ml-3 flex flex-col gap-1 border-l-2 border-brand-beige pl-3 mb-1">
              {SERVICES.map((s) =>
                s.href ? (
                  <Link
                    key={s.label}
                    href={s.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-brand-beige"
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </Link>
                ) : (
                  <button
                    key={s.label}
                    onClick={() => handleServiceClick(s)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-brand-beige text-left w-full"
                  >
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </button>
                )
              )}
            </div>
          )}

          <Link href="/about" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl hover:bg-brand-beige">
            About
          </Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-3 py-2.5 rounded-xl hover:bg-brand-beige">
            Contact
          </Link>
          <a
            href="https://wa.me/2130771504301"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white text-sm px-4 py-2 rounded-full text-center mt-2"
          >
            WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}