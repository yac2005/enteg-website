"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InquiryModal from "@/components/InquiryModal";
import { getTours, Tour } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Explore our Sahara desert tours, cultural circuits, and adventure trips across Algeria. All tours are designed and led by local Algerian guides.",
  openGraph: {
    title: "Sahara Tours & Circuits — ENTEG Voyages",
    images: [{ url: "/hero.jpg" }],
  },
};

const CATEGORIES = ["All", "Adventure", "Cultural", "Nature"];
const REGIONS = ["All", "Ghardaïa", "Timimoun", "Béchar", "Djanet", "El Goléa", "Tamanrasset"];

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState("default");
  const [modalSubject, setModalSubject] = useState<string | null>(null);

  useEffect(() => {
    getTours().then((data) => {
      setTours(data);
      setLoading(false);
    });
  }, []);

  const filtered = tours
    .filter((t) => category === "All" || t.category === category)
    .filter((t) => region === "All" || t.region === region)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });

  return (
    <>
      <section className="bg-brand-brown text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Our Tours</h1>
        <p className="text-brand-secondary text-sm">
          Explore the Sahara — handcrafted itineraries from Ghardaïa
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
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
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
              No tours match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tour) => (
                <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={tour.image}
                      alt={tour.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-brand-secondary uppercase tracking-wide">
                      {tour.category}
                    </span>
                    <h3 className="font-semibold text-brand-brown text-lg mt-1 mb-1">
                      {tour.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      {tour.duration} · {tour.region}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-brown">
                        From {tour.price.toLocaleString()} DZD
                      </span>
                      <button
                        onClick={() => setModalSubject(tour.name)}
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
        <InquiryModal subject={modalSubject} onClose={() => setModalSubject(null)} />
      )}
    </>
  );
}
