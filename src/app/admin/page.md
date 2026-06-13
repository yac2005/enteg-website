| use client; |
| --- |
| import { useState } from "react"; |
| import { collection |
| import { db } from "@/lib/firebase"; |
| const CORRECT_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234"; |
| type Tab = "tour" | "hotel"; |
| const emptyTour = { |
| name: "" |
| description: "" |
| duration: "" |
| price: "" |
| category: "Adventure" |
| region: "Ghardaïa" |
| image: "" |
| featured: false |
| }; |
| const emptyHotel = { |
| name: "" |
| description: "" |
| location: "Ghardaïa" |
| rating: "3" |
| amenities: "" |
| image: "" |
| featured: false |
| }; |
| const CATEGORIES = ["Adventure" |
| const REGIONS = ["Ghardaïa" |
| const LOCATIONS = ["Ghardaïa" |
| export default function AdminPage() { |
| const [pin |
| const [authed |
| const [pinError |
| const [tab |
| const [tour |
| const [hotel |
| const [loading |
| const [success |
| const handlePin = (e: React.FormEvent) => { |
| e.preventDefault(); |
| if (pin === CORRECT_PIN) { |
| setAuthed(true); |
| } else { |
| setPinError(true); |
| } |
| }; |
| const handleTourSubmit = async (e: React.FormEvent) => { |
| e.preventDefault(); |
| setLoading(true); |
| try { |
| await addDoc(collection(db |
| ...tour |
| price: Number(tour.price) |
| createdAt: serverTimestamp() |
| }); |
| setTour(emptyTour); |
| setSuccess("Tour added successfully!"); |
| setTimeout(() => setSuccess("") |
| } catch (err) { |
| console.error(err); |
| } finally { |
| setLoading(false); |
| } |
| }; |
| const handleHotelSubmit = async (e: React.FormEvent) => { |
| e.preventDefault(); |
| setLoading(true); |
| try { |
| await addDoc(collection(db |
| ...hotel |
| rating: Number(hotel.rating) |
| amenities: hotel.amenities.split(" |
| setTimeout(() => setSuccess("") |
| } catch (err) { |
| console.error(err); |
| } finally { |
| setLoading(false); |
| } |
| }; |
| if (!authed) { |
| return ( |
| <div className="min-h-screen bg-brand-beige flex items-center justify-center px-4"> |
| <div className="bg-white rounded-2xl p-8 shadow-sm w-full max-w-sm"> |
| <h1 className="text-2xl font-bold text-brand-brown mb-2 text-center">Admin Panel</h1> |
| <p className="text-sm text-brand-secondary text-center mb-6">Enter your PIN to continue</p> |
| <form onSubmit={handlePin} className="space-y-4"> |
| <input |
| type="password" |
| value={pin} |
| onChange={(e) => { setPin(e.target.value); setPinError(false); }} |
| placeholder="PIN" |
| className="w-full border border-brand-secondary rounded-lg px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:border-brand-brown" |
| /> |
| {pinError && <p className="text-red-500 text-sm text-center">Incorrect PIN</p>} |
| <button type="submit" className="w-full bg-brand-brown text-white py-3 rounded-full font-medium"> |
| Enter |
| </button> |
| </form> |
| </div> |
| </div> |
| ); |
| } |
| return ( |
| <div className="min-h-screen bg-brand-beige py-12 px-4"> |
| <div className="max-w-2xl mx-auto"> |
| <h1 className="text-3xl font-bold text-brand-brown mb-2">Admin Panel</h1> |
| <p className="text-brand-secondary text-sm mb-8">Add new tours and hotels</p> |
| {success && ( |
| <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm"> |
| {success} |
| </div> |
| )} |
| {/* Tabs */} |
| <div className="flex gap-2 mb-8"> |
| <button |
| onClick={() => setTab("tour")} |
| className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors ${ |
| tab === "tour" |
| ? "bg-brand-brown text-white border-brand-brown" |
| : "bg-white text-brand-brown border-brand-secondary" |
| }`} |
| > |
| Add Tour |
| </button> |
| <button |
| onClick={() => setTab("hotel")} |
| className={`px-6 py-2 rounded-full text-sm font-medium border transition-colors ${ |
| tab === "hotel" |
| ? "bg-brand-brown text-white border-brand-brown" |
| : "bg-white text-brand-brown border-brand-secondary" |
| }`} |
| > |
| Add Hotel |
| </button> |
| </div> |
| {/* Tour Form */} |
| {tab === "tour" && ( |
| <div className="bg-white rounded-2xl p-8 shadow-sm"> |
| <h2 className="text-xl font-bold text-brand-brown mb-6">New Tour</h2> |
| <form onSubmit={handleTourSubmit} className="space-y-4"> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Tour Name</label> |
| <input |
| required |
| type="text" |
| value={tour.name} |
| onChange={(e) => setTour({ ...tour |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown" |
| placeholder="e.g. Sahara Desert Trek" |
| /> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Description</label> |
| <textarea |
| required |
| rows={3} |
| value={tour.description} |
| onChange={(e) => setTour({ ...tour |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown resize-none" |
| placeholder="Describe the tour..." |
| /> |
| </div> |
| <div className="grid grid-cols-2 gap-4"> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Duration</label> |
| <input |
| required |
| type="text" |
| value={tour.duration} |
| onChange={(e) => setTour({ ...tour |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown" |
| placeholder="e.g. 5 Days" |
| /> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Price (DZD)</label> |
| <input |
| required |
| type="number" |
| value={tour.price} |
| onChange={(e) => setTour({ ...tour |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown" |
| placeholder="e.g. 45000" |
| /> |
| </div> |
| </div> |
| <div className="grid grid-cols-2 gap-4"> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Category</label> |
| <select |
| value={tour.category} |
| onChange={(e) => setTour({ ...tour |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown bg-white" |
| > |
| {CATEGORIES.map((c) => <option key={c}>{c}</option>)} |
| </select> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Region</label> |
| <select |
| value={tour.region} |
| onChange={(e) => setTour({ ...tour |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown bg-white" |
| > |
| {REGIONS.map((r) => <option key={r}>{r}</option>)} |
| </select> |
| </div> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Image URL</label> |
| <input |
| type="text" |
| value={tour.image} |
| onChange={(e) => setTour({ ...tour |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown" |
| placeholder="https://images.unsplash.com/..." |
| /> |
| </div> |
| <div className="flex items-center gap-2"> |
| <input |
| type="checkbox" |
| id="tour-featured" |
| checked={tour.featured} |
| onChange={(e) => setTour({ ...tour |
| className="accent-brand-brown" |
| /> |
| <label htmlFor="tour-featured" className="text-sm text-brand-brown"> |
| Featured on Home page |
| </label> |
| </div> |
| <button |
| type="submit" |
| disabled={loading} |
| className="w-full bg-brand-brown text-white py-3 rounded-full font-medium disabled:opacity-60" |
| > |
| {loading ? "Adding..." : "Add Tour"} |
| </button> |
| </form> |
| </div> |
| )} |
| {/* Hotel Form */} |
| {tab === "hotel" && ( |
| <div className="bg-white rounded-2xl p-8 shadow-sm"> |
| <h2 className="text-xl font-bold text-brand-brown mb-6">New Hotel</h2> |
| <form onSubmit={handleHotelSubmit} className="space-y-4"> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Hotel Name</label> |
| <input |
| required |
| type="text" |
| value={hotel.name} |
| onChange={(e) => setHotel({ ...hotel |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown" |
| placeholder="e.g. Hotel Rostémides" |
| /> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Description</label> |
| <textarea |
| required |
| rows={3} |
| value={hotel.description} |
| onChange={(e) => setHotel({ ...hotel |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown resize-none" |
| placeholder="Describe the hotel..." |
| /> |
| </div> |
| <div className="grid grid-cols-2 gap-4"> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Location</label> |
| <select |
| value={hotel.location} |
| onChange={(e) => setHotel({ ...hotel |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown bg-white" |
| > |
| {LOCATIONS.map((l) => <option key={l}>{l}</option>)} |
| </select> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Star Rating</label> |
| <select |
| value={hotel.rating} |
| onChange={(e) => setHotel({ ...hotel |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown bg-white" |
| > |
| {[1 |
| </select> |
| </div> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Amenities</label> |
| <input |
| type="text" |
| value={hotel.amenities} |
| onChange={(e) => setHotel({ ...hotel |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown" |
| placeholder="WiFi |
| /> |
| <p className="text-xs text-brand-secondary mt-1">Separate with commas</p> |
| </div> |
| <div> |
| <label className="text-sm font-medium text-brand-brown block mb-1">Image URL</label> |
| <input |
| type="text" |
| value={hotel.image} |
| onChange={(e) => setHotel({ ...hotel |
| className="w-full border border-brand-secondary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-brown" |
| placeholder="https://images.unsplash.com/..." |
| /> |
| </div> |
| <div className="flex items-center gap-2"> |
| <input |
| type="checkbox" |
| id="hotel-featured" |
| checked={hotel.featured} |
| onChange={(e) => setHotel({ ...hotel |
| className="accent-brand-brown" |
| /> |
| <label htmlFor="hotel-featured" className="text-sm text-brand-brown"> |
| Featured on Home page |
| </label> |
| </div> |
| <button |
| type="submit" |
| disabled={loading} |
| className="w-full bg-brand-brown text-white py-3 rounded-full font-medium disabled:opacity-60" |
| > |
| {loading ? "Adding..." : "Add Hotel"} |
| </button> |
| </form> |
| </div> |
| )} |
| </div> |
| </div> |
| ); |
| } |
