```
"use client";
```

```
import { useState } from "react";
import InquiryModal from "@/components/InquiryModal";
const ALL_HOTELS = [
  { id: 1, name: "Hotel El Djenoub", stars: 4, price: 8500, category: "Hotel",
region: "Ghardaïa", amenities: ["WiFi", "Pool", "Restaurant"] },
  { id: 2, name: "Auberge Taghit", stars: 3, price: 5200, category: "Auberge",
region: "Béchar", amenities: ["WiFi", "Restaurant"] },
  { id: 3, name: "Hotel Rostémides", stars: 3, price: 4800, category: "Hotel",
region: "Ghardaïa", amenities: ["WiFi", "Parking"] },
  { id: 4, name: "Camping Tassili", stars: 2, price: 2200, category: "Camping",
region: "Djanet", amenities: ["Parking"] },
  { id: 5, name: "Auberge Sable d'Or", stars: 3, price: 5800, category:
"Auberge", region: "Timimoun", amenities: ["WiFi", "Pool", "Restaurant"] },
  { id: 6, name: "Hotel Hoggar", stars: 4, price: 9200, category: "Hotel",
region: "Tamanrasset", amenities: ["WiFi", "Pool", "Restaurant", "Parking"] },
  { id: 7, name: "Gîte M'Zab", stars: 2, price: 3100, category: "Gîte", region:
"Ghardaïa", amenities: ["WiFi"] },
  { id: 8, name: "Camping Oasis", stars: 1, price: 1500, category: "Camping",
region: "El Goléa", amenities: ["Parking"] },
  { id: 9, name: "Auberge El Goléa", stars: 3, price: 4400, category: "Auberge",
region: "El Goléa", amenities: ["WiFi", "Restaurant"] },
];
const CATEGORIES = ["All", "Hotel", "Auberge", "Gîte", "Camping"];
const REGIONS = ["All", "Ghardaïa", "Béchar", "Djanet", "Timimoun",
"Tamanrasset", "El Goléa"];
function Stars({ count }: { count: number }) {
  return (
    <span className="text-brand-secondary text-xs tracking-tight">
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}
```

```
export default function HotelsPage() {
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState("default");
  const [modalSubject, setModalSubject] = useState<string | null>(null);
  const filtered = ALL_HOTELS
    .filter(h => category === "All" || h.category === category)
    .filter(h => region === "All" || h.region === region)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "stars-desc") return b.stars - a.stars;
      return 0;
    });
  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-brown text-white py-16 text-center">
        <h1 className="font-heading text-4xl font-bold mb-2">Our Hotels</h1>
        <p className="text-brand-secondary text-sm">
          Handpicked stays across the Algerian Sahara
        </p>
      </section>
```

```
      {/* Filters */}
      <section className="bg-brand-beige border-b border-brand-secondary py-4
px-6 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border
transition-colors ${
                  category === c
                    ? "bg-brand-brown text-white border-brand-brown"
                    : "bg-brand-beige text-brand-brown border-brand-secondary
hover:border-brand-brown"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          {/* Region */}
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="ml-auto border border-brand-secondary rounded-lg px-3
py-1.5 text-sm text-brand-brown bg-brand-beige"
          >
            {REGIONS.map(r => <option key={r}>{r}</option>)}
          </select>
          {/* Sort */}
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-brand-secondary rounded-lg px-3 py-1.5
text-sm text-brand-brown bg-brand-beige"
          >
            <option value="default">Sort: Default</option>
            <option value="stars-desc">Stars: High → Low</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </section>
      {/* Grid */}
      <section className="bg-brand-beige min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-brand-brown opacity-60 py-24">
              No hotels match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
gap-6">
              {filtered.map(hotel => (
                <div key={hotel.id} className="bg-white rounded-2xl overflow-
hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Placeholder image */}
                  <div className="h-48 bg-brand-secondary opacity-60" />
```

```
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-brand-brown
uppercase tracking-wide">
                        {hotel.category}
                      </span>
                      <Stars count={hotel.stars} />
                    </div>
                    <h3 className="font-heading font-semibold text-brand-brown
text-lg mb-1">
                      {hotel.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">{hotel.region}</p>
                    {/* Amenities */}
                    <div className="flex gap-1 flex-wrap mb-4">
                      {hotel.amenities.map(a => (
                        <span
                          key={a}
                          className="text-xs bg-brand-beige text-brand-brown
border border-brand-secondary px-2 py-0.5 rounded-full"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-brown">
                        From {hotel.price.toLocaleString()} DZD<span
className="font-normal text-xs text-gray-400"> /night</span>
                      </span>
                      <button
                        onClick={() => setModalSubject(hotel.name)}
                        className="bg-brand-brown text-white text-xs px-4 py-2
rounded-full hover:opacity-90 transition"
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
```

```
      {modalSubject && (
        <InquiryModal subject={modalSubject} onClose={() =>
setModalSubject(null)} />
      )}
    </>
  );
}
```

