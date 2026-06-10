## `"use client";` 

```
import { useState } from "react";
import InquiryModal from "@/components/InquiryModal";
```

```
const ALL_TOURS = [
  { id: 1, name: "Sahara Desert Trek", duration: "5 Days", price: 45000,
category: "Adventure", region: "Timimoun" },
  { id: 2, name: "Ghardaïa Old City", duration: "2 Days", price: 18000,
category: "Cultural", region: "Ghardaïa" },
  { id: 3, name: "M'Zab Valley", duration: "3 Days", price: 28000, category:
"Cultural", region: "Ghardaïa" },
  { id: 4, name: "Taghit Dunes Escape", duration: "4 Days", price: 38000,
category: "Adventure", region: "Béchar" },
  { id: 5, name: "Tassili N'Ajjer Hike", duration: "7 Days", price: 72000,
category: "Adventure", region: "Djanet" },
  { id: 6, name: "Oasis Village Trail", duration: "2 Days", price: 16000,
category: "Nature", region: "Ghardaïa" },
  { id: 7, name: "El Goléa Palm Grove", duration: "3 Days", price: 24000,
category: "Nature", region: "El Goléa" },
  { id: 8, name: "Hoggar Mountains Trek", duration: "8 Days", price: 85000,
category: "Adventure", region: "Tamanrasset" },
  { id: 9, name: "Beni Isguen Heritage Walk", duration: "1 Day", price: 8000,
category: "Cultural", region: "Ghardaïa" },
];
```

```
const CATEGORIES = ["All", "Adventure", "Cultural", "Nature"];
const REGIONS = ["All", "Ghardaïa", "Timimoun", "Béchar", "Djanet", "El Goléa",
"Tamanrasset"];
```

```
export default function ToursPage() {
  const [category, setCategory] = useState("All");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState("default");
  const [modalSubject, setModalSubject] = useState<string | null>(null);
  const filtered = ALL_TOURS
    .filter(t => category === "All" || t.category === category)
    .filter(t => region === "All" || t.region === region)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return 0;
    });
  return (
    <>
      {/* Page Header */}
      <section className="bg-brand-brown text-white py-16 text-center">
        <h1 className="font-montserrat text-4xl font-bold mb-2">Our Tours</h1>
        <p className="text-brand-secondary text-sm">
          Explore the Sahara — handcrafted itineraries from Ghardaïa
        </p>
      </section>
      {/* Filters */}
      <section className="bg-brand-beige border-b border-brand-secondary py-4
px-6 sticky top-16 z-10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center">
          {/* Category */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c}
```

```
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
              No tours match your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
gap-6">
              {filtered.map(tour => (
                <div key={tour.id} className="bg-white rounded-2xl overflow-
hidden shadow-sm hover:shadow-md transition-shadow">
                  {/* Placeholder image */}
                  <div className="h-48 bg-brand-secondary opacity-60" />
                  <div className="p-5">
                    <span className="text-xs font-medium text-brand-secondary
uppercase tracking-wide">
                      {tour.category}
                    </span>
                    <h3 className="font-montserrat font-semibold text-brand-
brown text-lg mt-1 mb-1">
                      {tour.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                      {tour.duration} · {tour.region}
```

```
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-brand-brown">
                        From {tour.price.toLocaleString()} DZD
                      </span>
                      <button
                        onClick={() => setModalSubject(tour.name)}
                        className="bg-brand-brown text-white text-xs px-4 py-2
rounded-full hover:opacity-90 transition"
```

```
                      >
```

```
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
```

```
      )}
    </>
  );
}
```

