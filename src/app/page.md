| use client; |
| --- |
| import { useState } from "react"; |
| import Link from "next/link"; |
| import Image from "next/image"; |
| import InquiryModal from "@/components/InquiryModal"; |
| const featuredTours = [ |
| { id: 1 |
| { id: 2 |
| { id: 3 |
| ]; |
| const featuredHotels = [ |
| { id: 1 |
| { id: 2 |
| { id: 3 |
| ]; |
| export default function Home() { |
| const [modal |
| return ( |
| <main> |
| {modal && <InquiryModal subject={modal} onClose={() => setModal(null)} />} |
| {/* Hero */} |
| <section className="relative h-[92vh] flex items-center justify-center overflow-hidden"> |
| <Image src="/hero.jpg" alt="Algerian Sahara" fill className="object-cover object-center" priority /> |
| <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/65" /> |
| <div className="relative z-10 text-center text-white px-4 max-w-3xl mx-auto"> |
| <p className="text-sm uppercase tracking-widest mb-4 opacity-80 font-medium">Ghardaïa · Algeria</p> |
| <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg"> |
| Where the Sahara<br />Tells Its Story |
| </h1> |
| <p className="text-lg md:text-xl opacity-90 mb-10 max-w-xl mx-auto leading-relaxed"> |
| Authentic desert experiences crafted by locals who know every dune |
| </p> |
| <div className="flex flex-col sm:flex-row gap-4 justify-center"> |
| <Link href="/tours" className="bg-white text-brand-brown px-8 py-3 rounded-full font-semibold hover:bg-brand-beige transition shadow-lg"> |
| Explore Tours |
| </Link> |
| <a href="https://wa.me/2130771504301" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-brand-brown transition"> |
| WhatsApp Us |
| </a> |
| </div> |
| </div> |
| <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white opacity-60 animate-bounce text-2xl">↓</div> |
| </section> |
| {/* Stats bar */} |
| <section className="bg-brand-brown text-white py-6 px-4"> |
| <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center"> |
| <div><p className="text-2xl font-bold font-heading">9+</p><p className="text-xs opacity-75 uppercase tracking-wide mt-1">Tours</p></div> |
| <div><p className="text-2xl font-bold font-heading">5+</p><p className="text-xs opacity-75 uppercase tracking-wide mt-1">Hotels</p></div> |
| <div><p className="text-2xl font-bold font-heading">10+</p><p className="text-xs opacity-75 uppercase tracking-wide mt-1">Years Experience</p></div> |
| <div><p className="text-2xl font-bold font-heading">100%</p><p className="text-xs opacity-75 uppercase tracking-wide mt-1">Algerian</p></div> |
| </div> |
| </section> |
| {/* Featured Tours */} |
| <section className="py-16 px-4 bg-brand-beige"> |
| <div className="max-w-6xl mx-auto"> |
| <p className="text-center text-brand-secondary text-sm uppercase tracking-widest mb-2">Handpicked for you</p> |
| <h2 className="font-heading text-3xl font-bold text-brand-brown mb-10 text-center">Featured Tours</h2> |
| <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> |
| {featuredTours.map((tour) => ( |
| <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform"> |
| <div className="h-48 bg-brand-secondary/20 flex items-center justify-center text-4xl">🏜️</div> |
| <div className="p-5"> |
| <span className="text-xs bg-brand-beige text-brand-brown px-2 py-1 rounded-full">{tour.duration}</span> |
| <h3 className="font-heading font-bold text-brand-text text-lg mt-2 mb-1">{tour.name}</h3> |
| <p className="text-brand-secondary text-sm mb-4">{tour.price}</p> |
| <button onClick={() => setModal(`Inquiry — ${tour.name}`)} className="w-full bg-brand-brown text-white py-2 rounded-full text-sm font-medium hover:opacity-90 transition"> |
| Inquire |
| </button> |
| </div> |
| </div> |
| ))} |
| </div> |
| <div className="text-center mt-8"> |
| <Link href="/tours" className="border-2 border-brand-brown text-brand-brown px-8 py-3 rounded-full font-medium hover:bg-brand-brown hover:text-white transition text-sm"> |
| View All Tours → |
| </Link> |
| </div> |
| </div> |
| </section> |
| {/* Featured Hotels */} |
| <section className="py-16 px-4 bg-white"> |
| <div className="max-w-6xl mx-auto"> |
| <p className="text-center text-brand-secondary text-sm uppercase tracking-widest mb-2">Where you'll rest</p> |
| <h2 className="font-heading text-3xl font-bold text-brand-brown mb-10 text-center">Featured Hotels</h2> |
| <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> |
| {featuredHotels.map((hotel) => ( |
| <div key={hotel.id} className="bg-brand-beige rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform"> |
| <div className="h-48 bg-brand-secondary/20 flex items-center justify-center text-4xl">🏨</div> |
| <div className="p-5"> |
| <p className="text-xs text-brand-secondary mb-1">{hotel.location}</p> |
| <h3 className="font-heading font-bold text-brand-text text-lg mb-1">{hotel.name}</h3> |
| <p className="text-yellow-500 text-sm mb-4">{"★".repeat(hotel.stars)}</p> |
| <button onClick={() => setModal(`Inquiry — ${hotel.name}`)} className="w-full bg-brand-brown text-white py-2 rounded-full text-sm font-medium hover:opacity-90 transition"> |
| Inquire |
| </button> |
| </div> |
| </div> |
| ))} |
| </div> |
| <div className="text-center mt-8"> |
| <Link href="/hotels" className="border-2 border-brand-brown text-brand-brown px-8 py-3 rounded-full font-medium hover:bg-brand-brown hover:text-white transition text-sm"> |
| View All Hotels → |
| </Link> |
| </div> |
| </div> |
| </section> |
| {/* About teaser */} |
| <section className="py-16 px-4 bg-brand-beige"> |
| <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-center"> |
| <div className="flex-1"> |
| <p className="text-brand-secondary text-sm uppercase tracking-widest mb-2">Who we are</p> |
| <h2 className="font-heading text-3xl font-bold text-brand-brown mb-4">Born in the Desert |
| <p className="text-brand-text opacity-75 leading-relaxed mb-6"> |
| ENTEG Voyages is a licensed Algerian travel agency based in Ghardaïa. We've been guiding travellers through the M'Zab Valley |
| </p> |
| <Link href="/about" className="text-brand-brown font-semibold text-sm border-b-2 border-brand-brown pb-0.5 hover:opacity-70 transition"> |
| Our Story → |
| </Link> |
| </div> |
| <div className="flex-1 relative h-64 rounded-2xl overflow-hidden"> |
| <Image src="/hero.jpg" alt="ENTEG team" fill className="object-cover object-center" /> |
| <div className="absolute inset-0 bg-black/20 rounded-2xl" /> |
| </div> |
| </div> |
| </section> |
| {/* CTA Strip */} |
| <section className="bg-brand-brown py-14 px-4 text-center text-white"> |
| <h2 className="font-heading text-3xl font-bold mb-3">Ready to explore Algeria?</h2> |
| <p className="opacity-75 mb-8 text-sm">Contact us today — we'll build your perfect trip.</p> |
| <div className="flex flex-col sm:flex-row gap-4 justify-center"> |
| <a href="tel:+2130771504301" className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-brand-brown transition"> |
| Call Us |
| </a> |
| <a href="https://wa.me/2130771504301" className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition"> |
| WhatsApp |
| </a> |
| </div> |
| </section> |
| </main> |
| ); |
| } |
