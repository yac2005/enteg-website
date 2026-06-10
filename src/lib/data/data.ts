import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export interface Tour {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  category: string;
  region: string;
  featured: boolean;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  rating: number;
  amenities: string[];
  featured: boolean;
  image: string;
}

export async function getTours(): Promise<Tour[]> {
  const snapshot = await getDocs(collection(db, "tours"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Tour));
}

export async function getFeaturedTours(): Promise<Tour[]> {
  const q = query(collection(db, "tours"), where("featured", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Tour));
}

export async function getHotels(): Promise<Hotel[]> {
  const snapshot = await getDocs(collection(db, "hotels"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Hotel));
}

export async function getFeaturedHotels(): Promise<Hotel[]> {
  const q = query(collection(db, "hotels"), where("featured", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Hotel));
}
