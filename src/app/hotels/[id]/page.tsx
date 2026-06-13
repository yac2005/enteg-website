"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import InquiryModal from "@/components/InquiryModal";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  description: string;
  image?: string;
  amenities?: string[];
  featured?: boolean;
}

export default function HotelPage() {
  const { id } = useParams<{ id: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchHotel() {
      try {
        const snap = await getDoc(doc(db, "hotels", id));
        if (!snap.exists()) {
          setNotFound(true);
        } else {
          setHotel({ id: snap.id, ...snap.data() } as Hotel);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchHotel();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-brand-beige)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[var(--color-brand-brown)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--color-brand-secondary)] text-sm tracking-widest uppercase">
            Chargement…
          </p>
        </div>
      </div>
    );
  }

  if (notFound || !hotel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-brand-beige)] gap-4 px-6 text-center">
        <span className="text-6xl">🏨</span>
        <h1 className="text-2xl font-bold text-[var(--color-brand-brown)]">
          Hôtel introuvable
        </h1>
        <p className="text-[var(--color-brand-secondary)]">
          Cet hôtel n&apos;existe pas ou a été supprimé.
        </p>
        <a
          href="/hotels"
          className="mt-2 inline-block px-6 py-3 bg-[var(--color-brand-brown)] text-white rounded-full text-sm font-semibold hover:opacity-90 transition"
        >
          Voir tous les hôtels
        </a>
      </div>
    );
  }

  const stars = hotel.rating ? Math.min(Math.max(Math.round(hotel.rating), 1), 5) : null;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[400px] w-full overflow-hidden">
        {hotel.image ? (
          <img
            src={hotel.image}
            alt={hotel.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B6342] to-[#3D2210]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

        {/* breadcrumb */}
        <div className="absolute top-6 left-0 right-0 px-6 md:px-12">
          <nav className="flex items-center gap-2 text-white/70 text-xs tracking-widest uppercase">
            <a href="/" className="hover:text-white transition">Accueil</a>
            <span>/</span>
            <a href="/hotels" className="hover:text-white transition">Hôtels</a>
            <span>/</span>
            <span className="text-white truncate max-w-[200px]">{hotel.name}</span>
          </nav>
        </div>

        {/* hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 md:pb-14">
          {hotel.location && (
            <span className="inline-block mb-3 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full border border-white/30">
              📍 {hotel.location}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
            {hotel.name}
          </h1>
          {stars && (
            <p className="mt-3 text-yellow-400 text-xl tracking-wider">
              {"★".repeat(stars)}
              <span className="text-white/50">{"★".repeat(5 - stars)}</span>
            </p>
          )}
        </div>
      </section>

      {/* ── STICKY CTA BAR (mobile) ───────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[var(--color-brand-brown)] shadow-lg md:hidden">
        <div className="flex items-center justify-between px-5 py-3">
          <div>
            <p className="text-white/70 text-xs uppercase tracking-widest">Hôtel</p>
            <p className="text-white font-bold text-base leading-tight">{hotel.name}</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-5 py-2.5 bg-white text-[var(--color-brand-brown)] rounded-full font-bold text-sm hover:bg-[var(--color-brand-beige)] transition"
          >
            Demander un séjour
          </button>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <div className="bg-[var(--color-brand-beige)] pb-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* LEFT COLUMN */}
          <div className="md:col-span-2 space-y-12">

            {/* Description */}
            <section>
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-brand-secondary)] mb-3">
                À propos de cet hôtel
              </h2>
              <p className="text-[var(--color-brand-text)] text-base md:text-lg leading-relaxed">
                {hotel.description}
              </p>
            </section>

            {/* Amenities */}
            {hotel.amenities && hotel.amenities.length > 0 && (
              <section>
                <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-brand-secondary)] mb-4">
                  Équipements & services
                </h2>
                <div className="flex flex-wrap gap-3">
                  {hotel.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E0D8D0] rounded-full text-sm text-[var(--color-brand-text)] shadow-sm"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Quick info */}
            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Localisation", value: hotel.location, icon: "📍" },
                { label: "Classement", value: stars ? "★".repeat(stars) : null, icon: "⭐" },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-2xl p-4 border border-[#E0D8D0]"
                  >
                    <p className="text-xl mb-1">{item.icon}</p>
                    <p className="text-xs text-[var(--color-brand-secondary)] uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[var(--color-brand-text)] font-semibold text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
            </section>
          </div>

          {/* RIGHT COLUMN — sticky booking card (desktop) */}
          <div className="hidden md:block">
            <div className="sticky top-6 bg-white rounded-3xl border border-[#E0D8D0] shadow-xl overflow-hidden">
              <div className="bg-[var(--color-brand-brown)] px-6 py-5">
                <p className="text-white font-bold text-xl">{hotel.name}</p>
                {hotel.location && (
                  <p className="text-white/70 text-sm mt-1">📍 {hotel.location}</p>
                )}
                {stars && (
                  <p className="text-yellow-400 text-base mt-1">{"★".repeat(stars)}</p>
                )}
              </div>

              <div className="px-6 py-5 space-y-4">
                <ul className="space-y-2 text-sm text-[var(--color-brand-text)]">
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-brand-brown)]">✓</span>
                    Devis gratuit & sans engagement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-brand-brown)]">✓</span>
                    Réponse sous 24h
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[var(--color-brand-brown)]">✓</span>
                    Hôtels sélectionnés par ENTEG
                  </li>
                </ul>

                <button
                  onClick={() => setModalOpen(true)}
                  className="w-full py-3.5 bg-[var(--color-brand-brown)] text-white rounded-2xl font-bold text-sm hover:opacity-90 transition"
                >
                  Demander un séjour
                </button>

                <a
                  href="https://wa.me/2130771504301"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-[#25D366] text-[#25D366] rounded-2xl font-semibold text-sm hover:bg-[#25D366]/10 transition"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>

                <p className="text-center text-xs text-[var(--color-brand-secondary)]">
                  ou appelez le{" "}
                  <a href="tel:0771504301" className="font-semibold text-[var(--color-brand-brown)] hover:underline">
                    0771 50 43 01
                  </a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {modalOpen && (
        <InquiryModal
          tourName={hotel.name}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
