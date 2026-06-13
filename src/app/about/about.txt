import Link from "next/link";

const TEAM = [
  { name: "Ahmed Abanou", role: "Founder & CEO", bio: "20+ years guiding travelers through the Algerian Sahara." },
  { name: "Mohamed Abanou", role: "Tour Operations", bio: "Expert in Saharan logistics and desert safety protocols." },
  { name: "Yacine Abanou", role: "Client Relations", bio: "Fluent in Arabic, French & English — your point of contact." },
];

const STATS = [
  { value: "500+", label: "Happy Travelers" },
  { value: "15+", label: "Years of Experience" },
  { value: "30+", label: "Destinations" },
  { value: "100%", label: "Locally Operated" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-brown text-white py-20 text-center px-6">
        <h1 className="font-montserrat text-4xl font-bold mb-3">About ENTEG</h1>
        <p className="text-brand-secondary max-w-xl mx-auto text-sm leading-relaxed">
          We are a Ghardaïa-based travel agency passionate about sharing the
          authentic beauty of the Algerian Sahara with the world.
        </p>
      </section>

      {/* Story */}
      <section className="bg-brand-beige py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-montserrat text-2xl font-bold text-brand-brown mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Founded in Ghardaïa, the heart of the M'Zab Valley, ENTEG was born
            from a deep love for the Sahara and a desire to share it responsibly.
            We believe travel should connect people — to landscapes, to cultures,
            and to each other.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Every tour we design is rooted in local knowledge, built around
            authentic experiences, and operated with the safety and comfort of
            our guests as the top priority.
          </p>
          <p className="text-gray-600 leading-relaxed">
            From the ancient ksar of Ghardaïa to the towering dunes of Taghit
            and the prehistoric rock art of Tassili N'Ajjer, we open doors to
            some of the world's most extraordinary places.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-brown py-14 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <p className="font-montserrat text-3xl font-bold text-brand-secondary">
                {s.value}
              </p>
              <p className="text-brand-secondary text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-brand-beige py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-montserrat text-2xl font-bold text-brand-brown mb-10 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM.map(member => (
              <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-brand-secondary opacity-70 mx-auto mb-4" />
                <h3 className="font-montserrat font-semibold text-brand-brown text-base">
                  {member.name}
                </h3>
                <p className="text-brand-secondary text-xs font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-brown py-16 px-6 text-center">
        <h2 className="font-montserrat text-2xl font-bold text-white mb-3">
          Ready to explore the Sahara?
        </h2>
        <p className="text-brand-secondary text-sm mb-6">
          Get in touch — we'll craft the perfect journey for you.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-brand-secondary text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
        >
          Contact Us
        </Link>
      </section>
    </>
  );
}
