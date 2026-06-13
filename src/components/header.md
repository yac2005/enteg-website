| use client; |
| --- |
| import { useState } from "react"; |
| import Link from "next/link"; |
| import Image from "next/image"; |
| import { usePathname } from "next/navigation"; |
| export default function Header() { |
| const [open |
| const pathname = usePathname(); |
| if (pathname.startsWith("/admin")) return null; |
| return ( |
| <header className="bg-white border-b border-gray-100 sticky top-0 z-50"> |
| <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between"> |
| <Link href="/" className="flex items-center gap-2"> |
| <Image src="/logo.png" alt="ENTEG Voyages" width={45} height={35} priority /> |
| </Link> |
| {/* Desktop nav */} |
| <nav className="hidden md:flex gap-6 text-sm font-medium text-brand-text"> |
| <Link href="/">Home</Link> |
| <Link href="/tours">Tours</Link> |
| <Link href="/hotels">Hotels</Link> |
| <Link href="/about">About</Link> |
| <Link href="/contact">Contact</Link> |
| </nav> |
| <div className="flex items-center gap-3"> |
| <a href="https://wa.me/213 771 50 43 01" className="bg-green-600 text-white text-sm px-4 py-2 rounded-full hidden md:inline-block">WhatsApp</a> |
| {/* Mobile hamburger */} |
| <button className="md:hidden text-brand-text" onClick={() => setOpen(!open)}> |
| {open ? "✕" : "☰"} |
| </button> |
| </div> |
| </div> |
| {/* Mobile menu */} |
| {open && ( |
| <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4 text-sm font-medium text-brand-text"> |
| <Link href="/" onClick={() => setOpen(false)}>Home</Link> |
| <Link href="/tours" onClick={() => setOpen(false)}>Tours</Link> |
| <Link href="/hotels" onClick={() => setOpen(false)}>Hotels</Link> |
| <Link href="/about" onClick={() => setOpen(false)}>About</Link> |
| <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link> |
| <a href="https://wa.me/213 771 50 43 01" className="bg-green-600 text-white text-sm px-4 py-2 rounded-full text-center">WhatsApp</a> |
| </div> |
| )} |
| </header> |
| ); |
| } |
