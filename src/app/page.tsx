"use client";
import { useState } from "react";
import Link from "next/link";
import InquiryModal from "@/components/InquiryModal";

const featuredTours = [
  { id: 1, name: "Sahara Desert Trek", duration: "3 days", price: "From 15,000 DZD" },
  { id: 2, name: "Ghardaïa Old City", duration: "1 day", price: "From 5,000 DZD" },
  { id: 3, name: "M'Zab Valley", duration: "2 days", price: "From 9,000 DZD" },
];

const featuredHotels = [
  { id: 1, name: "Hotel El Djanoub", location: "Ghardaïa", stars: 4 },
  { id: 2, name: "Auberge Taghit", location: "Taghit", stars: 3 },
  { id: 3, name: "Hotel Rostémides", location: "Ghardaïa", stars: 4 },
];

export default function Home() {
  const [modal, setModal] = useState<string | null>(null);

  return (
    <main>
      {modal && <InquiryModal subject={modal} onClose={() => setModal(null)} />}

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center bg-brand-brown">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Discover the Sahara with ENTEG
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl mx-auto">
            Authentic travel experiences from Ghardaïa, Algeria
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tours" className="bg-brand-brown text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
              Explore Tours
            </Link>
            <a href="https://wa.me/213540263850" className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-brand-brown transition">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Featured Tours */}
      <section className="py-16 px-4 bg-brand-beige">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-brand-brown mb-10 text-center">Featured Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
                <div className="h-48 bg-brand-secondary/30" />
                <div className="p-5">
                  <span className="text-xs bg-brand-beige text-brand-brown px-2 py-1 rounded-full">{tour.duration}</span>
                  <h3 className="font-heading font-bold text-brand-text text-lg mt-2 mb-1">{tour.name}</h3>
                  <p className="text-brand-secondary text-sm mb-4">{tour.price}</p>
                  <button onClick={() => setModal(`Inquiry — ${tour.name}`)} className="w-full bg-brand-brown text-white py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-brand-brown mb-10 text-center">Featured Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-brand-beige rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 transition-transform">
                <div className="h-48 bg-brand-secondary/30" />
                <div className="p-5">
                  <p className="text-xs text-brand-secondary mb-1">{hotel.location}</p>
                  <h3 className="font-heading font-bold text-brand-text text-lg mb-1">{hotel.name}</h3>
                  <p className="text-yellow-500 text-sm mb-4">{"★".repeat(hotel.stars)}</p>
                  <button onClick={() => setModal(`Inquiry — ${hotel.name}`)} className="w-full bg-brand-brown text-white py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
                    Inquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-brand-brown py-12 px-4 text-center text-white">
        <h2 className="font-heading text-2xl font-bold mb-4">Ready to explore?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+213540263850" className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-brand-brown transition">
            Call Us
          </a>
          <a href="https://wa.me/213540263850" className="bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
