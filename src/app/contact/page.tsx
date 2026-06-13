"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ENTEG Voyages. Call, WhatsApp, or email us to plan your perfect trip to Algeria.",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  try {
    await addDoc(collection(db, "inquiries"), {
      ...form,
      source: "contact",
      createdAt: serverTimestamp(),
    });

    await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, subject: "Contact Form", source: "contact" }),
    });

    setSubmitted(true);
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again or contact us on WhatsApp.");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <section className="bg-brand-brown text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
        <p className="text-brand-secondary text-sm">We love to hear from you</p>
      </section>

      <section className="bg-brand-beige min-h-screen py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-brown mb-6">Send a Message</h2>
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-brand-brown font-semibold text-lg">Message sent!</p>
                <p className="text-gray-500 text-sm mt-2">We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-brand-brown font-medium block mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm text-brand-brown font-medium block mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-brand-brown font-medium block mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="+213 XX XX XX XX"
                  />
                </div>
                <div>
                  <label className="text-sm text-brand-brown font-medium block mb-1">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-brown text-white font-medium py-3 rounded-full disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
              <h2 className="text-2xl font-bold text-brand-brown">Get in Touch</h2>
              <div>
                <p className="text-xs text-brand-secondary uppercase tracking-wide mb-1">Phone</p>
                <a href="tel:+213XXXXXXXXX" className="text-brand-brown font-medium">
                  +213 XX XX XX XX
                </a>
              </div>
              <div>
                <p className="text-xs text-brand-secondary uppercase tracking-wide mb-1">WhatsApp</p>
                <a href="https://wa.me/213XXXXXXXXX" className="inline-block bg-green-600 text-white text-sm px-5 py-2 rounded-full">
                  Chat on WhatsApp
                </a>
              </div>
              <div>
                <p className="text-xs text-brand-secondary uppercase tracking-wide mb-1">Email</p>
                <a href="mailto:contact@enteg.dz" className="text-brand-brown font-medium">
                  contact@enteg.dz
                </a>
              </div>
              <div>
                <p className="text-xs text-brand-secondary uppercase tracking-wide mb-1">Address</p>
                <p className="text-sm">Ghardaia, Algeria</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d3.6741!3d32.4943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDI5JzM5LjUiTiAzwrA0MCcyNi44IkU!5e0!3m2!1sen!2sdz!4v1234567890"
                width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
