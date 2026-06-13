import Link from "next/link";
import Image from "next/image";
import { getCountFromServer, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

const TEAM = [
  {
    name: "Ahmed Abanou",
    role: "Founder & CEO",
    bio: "Born and raised in Ghardaïa, Ahmed has spent over a decade guiding travellers through the M'Zab Valley and the Sahara.",
    initials: "AA",
  },
  {
    name: "Mohamed Abanou",
    role: "Operations Manager",
    bio: "Mohamed ensures every trip runs seamlessly — from logistics to last-minute changes in the desert.",
    initials: "MA",
  },
  {
    name: "Yacine Abanou",
    role: "Travel Consultant",
    bio: "Yacine crafts custom itineraries for families and groups, specialising in cultural and adventure experiences.",
    initials: "YA",
  },
];

async function getStats() {
  try {
    const [toursSnap, hotelsSnap] = await Promise.all([
      getCountFromServer(collection(db, "tours")),
      getCountFromServer(collection(db, "hotels")),
    ]);
    return {
      tours: toursSnap.data().count,
      hotels: hotelsSnap.data().count,
    };
  } catch {
    return { tours: 0, hotels: 0 };
  }
}

export default async function AboutPage() {
  const stats = await getStats();

  const STATS = [
    { value: `${stats.tours}+`, label: "Tours" },
    { value: `${stats.hotels}+`, label: "Partner Hotels" },
    { value: "10+", label: "Years Experience" },
    { value: "100%", label: "Algerian" },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src="/about.jpg"
          alt="Ghardaïa market"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12">
          <p className="text-white/60 text-xs uppercase tracking-[0.25em] mb-3">
            Ghardaïa · Algeria
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
            We are ENTEG Voyages
          </h1>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="bg-[var(--color-brand-beige)] py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-brand-secondary)] mb-4">
              Our Story
            </p>
            <h2 className="text-3xl font-bold text-[var(--color-brand-brown)] mb-6 leading-snug">
              Born from a love for the Sahara
            </h2>
            <p className="text-[var(--color-brand-text)] leading-relaxed mb-4 opacity-80">
              Founded in Ghardaïa, ENTEG Voyages grew from a simple belief — that Algeria's landscapes deserve to be shared with the world. The M'Zab Valley, the towering dunes of Taghit, the prehistoric rock art of Tassili N'Ajjer — we bring travellers to places that change the way they see the world.
            </p>
            <p className="text-[var(--color-brand-text)] leading-relaxed opacity-80">
              Every tour we design is rooted in local knowledge, responsible travel, and a genuine passion for our homeland. We are not just a travel agency — we are your hosts in Algeria.
            </p>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/hero.jpg"
              alt="Algerian Sahara"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#1C1C1C] py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-brand-secondary)] mb-3 text-center">
            The People Behind ENTEG
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-brand-brown)] mb-12 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map((member) => (
              <div key={member.name}>
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-brown)] flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{member.initials}</span>
                </div>
                <h3 className="font-bold text-[var(--color-brand-brown)] text-base mb-0.5">
                  {member.name}
                </h3>
                <p className="text-xs text-[var(--color-brand-secondary)] uppercase tracking-widest mb-3">
                  {member.role}
                </p>
                <p className="text-[var(--color-brand-text)] text-sm leading-relaxed opacity-70">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-[var(--color-brand-beige)] py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--color-brand-secondary)] mb-3 text-center">
            What We Stand For
          </p>
          <h2 className="text-3xl font-bold text-[var(--color-brand-brown)] mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                title: "Local First",
                body: "Every guide, driver, and partner we work with is Algerian. Your money stays in the community.",
              },
              {
                title: "Honest Travel",
                body: "No hidden fees, no overpriced packages. We tell you exactly what you get and what it costs.",
              },
              {
                title: "Real Experiences",
                body: "We skip the tourist traps. Our itineraries are built around genuine encounters with Algeria's culture and nature.",
              },
            ].map((v) => (
              <div key={v.title} className="border-t-2 border-[var(--color-brand-brown)] pt-5">
                <h3 className="font-bold text-[var(--color-brand-brown)] mb-2">{v.title}</h3>
                <p className="text-[var(--color-brand-text)] text-sm leading-relaxed opacity-70">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[var(--color-brand-brown)] py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">
          Ready to explore Algeria?
        </h2>
        <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
          Get in touch — we will craft the perfect journey for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-block bg-white text-[var(--color-brand-brown)] font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            Contact Us
          </Link>
          <a
            href="https://wa.me/2130771504301"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[var(--color-brand-brown)] transition"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}