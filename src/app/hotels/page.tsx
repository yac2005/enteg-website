"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InquiryModal from "@/components/InquiryModal";
import { getHotels, Hotel } from "@/lib/data";

const CATEGORIES = ["All", "Hotel", "Auberge", "Gîte", "Camping"];
const REGIONS = ["All", "Ghardaïa", "Béchar", "Djanet", "Timimoun", "Tamanrasset", "El Goléa"];

function Stars({ count }: { count: number }) {
  return (
    <span className="text-brand-secondary text-xs tracking-tight">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState("default");
  const [modalSubject, setModalSubject] = useState<string | null>(null);

  useEffect(() => {
    getHotels().then((data) => {
      setHotels(data);
      setLoading(false);
    });
  }, []);

  const filtered = hotels
    .filter((h) => category === "All" || h.location === region || region === "All")
    .filter((h) => category === "All" || h.name.includes(category) || category === "All")
    .sort((a, b) => {
      if (sort === "price-asc") return (a.rating - b.rating);
      if (sort === "price-desc") return (b.rating - a.rating);
      if (sort === "stars-desc") return b.rating - a.rating;
      return 0;
    });

  return (
    <>
      <section className="bg-brand-brown text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Our Hotels</h1>
        <p className="text-brand-secondary text-sm">
          Handpicked stays across the Algerian Sahara
        </p>
      </section>

      <section className="bg-brand-beige border-b border-brand-secondary py-4 px-6 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  category === c
                    ? "bg-brand-brown text-white border-brand-brown"
                    : "bg-brand-beige text-brand-brown border-brand-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="ml-auto border border-brand-secondary rounded-lg px-3 py-1.5 text-sm text-brand-brown bg-brand-beige"
          >
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-brand-secondary rounded-lg px-3 py-1.5 text-sm text-brand-brown bg-brand-beige"
          >
            <option value="default">Sort: Default</option>
            <option value="stars-desc">Stars: High to Low</option>
            <option value="price-asc">Rating: Low to High</option>
            <option value="price-desc">Rating: High to Low</option>
          </select>
        </div>
      </section>

      <section className="bg-brand-beige min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-brand-secondary opacity-30" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-brand-brown opacity-60 py-24">
              No hotels match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-brand-brown uppercase tracking-wide">
                        {hotel.location}
                      </span>
                      <Stars count={hotel.rating} />
                    </div>
                    <h3 className="font-semibold text-brand-brown text-lg mb-1">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2">{hotel.description}</p>
                    <div className="flex gap-1 flex-wrap mb-4">
                      {hotel.amenities.map((a) => (
                        <span
                          key={a}
                          className="text-xs bg-brand-beige text-brand-brown border border-brand-secondary px-2 py-0.5 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Stars count={hotel.rating} />
                      <button
                        onClick={() => setModalSubject(hotel.name)}
                        className="bg-brand-brown text-white text-xs px-4 py-2 rounded-full"
                      >
                        Inquire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {modalSubject && (
      <InquiryModal subject={modalSubject} onClose={() => setModalSubject("")} />
      )}
    </>
  );
}
