| use client; |
| --- |
| import { useState } from "react"; |
| import { collection |
| import { db } from "@/lib/firebase"; |
| interface Props { |
| subject: string; |
| onClose: () => void; |
| } |
| export default function InquiryModal({ subject |
| const [form |
| const [submitted |
| const [loading |
| const [error |
| const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { |
| setForm({ ...form |
| }; |
| const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { |
| e.preventDefault(); |
| setLoading(true); |
| setError(""); |
| try { |
| await addDoc(collection(db |
| ...form |
| subject |
| source: "modal" |
| createdAt: serverTimestamp() |
| }); |
| await fetch("/api/inquiries" |
| method: "POST" |
| headers: { "Content-Type": "application/json" } |
| body: JSON.stringify({ ...form |
| }); |
| setSubmitted(true); |
| } catch (err) { |
| console.error(err); |
| setError("Something went wrong. Please try WhatsApp instead."); |
| } finally { |
| setLoading(false); |
| } |
| }; |
| return ( |
| <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"> |
| <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl"> |
| {submitted ? ( |
| <div className="text-center py-8"> |
| <div className="text-4xl mb-4">✓</div> |
| <h3 className="font-heading font-bold text-brand-brown text-xl mb-2">Request Sent!</h3> |
| <p className="text-brand-secondary text-sm mb-6">We will contact you shortly.</p> |
| <button onClick={onClose} className="bg-brand-brown text-white px-8 py-2 rounded-full text-sm font-medium"> |
| Close |
| </button> |
| </div> |
| ) : ( |
| <> |
| <div className="flex items-center justify-between mb-5"> |
| <h3 className="font-heading font-bold text-brand-brown text-lg">{subject}</h3> |
| <button onClick={onClose} className="text-brand-secondary text-xl leading-none">✕</button> |
| </div> |
| <form onSubmit={handleSubmit} className="space-y-4"> |
| <input |
| required |
| type="text" |
| name="name" |
| value={form.name} |
| onChange={handleChange} |
| placeholder="Your name" |
| className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-brown" |
| /> |
| <input |
| required |
| type="tel" |
| name="phone" |
| value={form.phone} |
| onChange={handleChange} |
| placeholder="Phone number" |
| className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-brown" |
| /> |
| <input |
| required |
| type="email" |
| name="email" |
| value={form.email} |
| onChange={handleChange} |
| placeholder="Email address" |
| className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-brown" |
| /> |
| <textarea |
| name="message" |
| value={form.message} |
| onChange={handleChange} |
| placeholder="Message (optional)" |
| rows={3} |
| className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-brown resize-none" |
| /> |
| {error && <p className="text-red-500 text-sm">{error}</p>} |
| <button |
| type="submit" |
| disabled={loading} |
| className="w-full bg-brand-brown text-white py-3 rounded-full text-sm font-medium disabled:opacity-60" |
| > |
| {loading ? "Sending..." : "Send Inquiry"} |
| </button> |
| </form> |
| </> |
| )} |
| </div> |
| </div> |
| ); |
| } |
