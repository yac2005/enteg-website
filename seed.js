const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const tours = [
  {
    name: "Sahara Desert Trek",
    description: "A breathtaking 5-day journey through the golden dunes of the Sahara. Experience camel rides, traditional Tuareg camps, and unforgettable sunsets over the endless desert.",
    duration: "5 Days",
    price: 45000,
    category: "Adventure",
    region: "Timimoun",
    featured: true,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
  },
  {
    name: "Ghardaïa Old City",
    description: "Discover the UNESCO-listed M'Zab Valley and the ancient city of Ghardaïa. Walk through centuries-old markets, mosques, and traditional Mozabite architecture.",
    duration: "2 Days",
    price: 18000,
    category: "Cultural",
    region: "Ghardaïa",
    featured: true,
    image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800",
  },
  {
    name: "Tassili N'Ajjer Hike",
    description: "Trek through one of the world's most spectacular landscapes. Ancient rock art, towering sandstone formations, and a sky full of stars await you in this UNESCO World Heritage site.",
    duration: "7 Days",
    price: 72000,
    category: "Adventure",
    region: "Djanet",
    featured: true,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
  },
  {
    name: "M'Zab Valley",
    description: "Explore the five ancient ksour of the M'Zab Valley, a remarkable example of Ibadi Muslim culture and traditional desert architecture preserved for over a thousand years.",
    duration: "3 Days",
    price: 28000,
    category: "Cultural",
    region: "Ghardaïa",
    featured: false,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800",
  },
  {
    name: "Taghit Dunes Escape",
    description: "Escape to the magnificent dunes of Taghit, one of Algeria's most beautiful desert destinations. Sandboarding, 4x4 excursions, and authentic desert hospitality.",
    duration: "4 Days",
    price: 38000,
    category: "Adventure",
    region: "Béchar",
    featured: false,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
  },
  {
    name: "Oasis Village Trail",
    description: "A peaceful 2-day walk through lush palm groves and traditional oasis villages around Ghardaïa. Meet local families, taste fresh dates, and enjoy the tranquility of desert life.",
    duration: "2 Days",
    price: 16000,
    category: "Nature",
    region: "Ghardaïa",
    featured: false,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
  },
  {
    name: "Hoggar Mountains Trek",
    description: "An epic 8-day expedition through the volcanic Hoggar Mountains. Home of the Tuareg people, this remote landscape offers dramatic scenery and a true off-the-beaten-path experience.",
    duration: "8 Days",
    price: 85000,
    category: "Adventure",
    region: "Tamanrasset",
    featured: false,
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800",
  },
  {
    name: "El Goléa Palm Grove",
    description: "Visit the stunning palm groves of El Goléa, an ancient oasis town with a beautiful ksar and crystal-clear natural springs. Perfect for a relaxed nature escape.",
    duration: "3 Days",
    price: 24000,
    category: "Nature",
    region: "El Goléa",
    featured: false,
    image: "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800",
  },
  {
    name: "Beni Isguen Heritage Walk",
    description: "A guided half-day walk through Beni Isguen, the most sacred of the M'Zab ksour. Discover its unique architecture, traditional souks, and living Mozabite culture.",
    duration: "1 Day",
    price: 8000,
    category: "Cultural",
    region: "Ghardaïa",
    featured: false,
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
  },
];

const hotels = [
  {
    name: "Hotel Rostémides",
    location: "Ghardaïa",
    description: "A charming hotel in the heart of Ghardaïa, offering comfortable rooms with traditional Mozabite decor and stunning views over the valley.",
    rating: 4,
    amenities: ["WiFi", "Restaurant", "Terrace", "Air Conditioning", "Parking"],
    featured: true,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    name: "Auberge du Désert",
    location: "Timimoun",
    description: "A traditional desert auberge built with red ochre architecture, surrounded by palm groves and golden dunes. The perfect base for Sahara adventures.",
    rating: 3,
    amenities: ["WiFi", "Pool", "Restaurant", "Desert Tours", "Camel Rides"],
    featured: true,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
  {
    name: "Tamanrasset Grand Hotel",
    location: "Tamanrasset",
    description: "The finest hotel in the gateway city to the Hoggar Mountains. Modern amenities meet Tuareg hospitality in this spacious and welcoming property.",
    rating: 4,
    amenities: ["WiFi", "Restaurant", "Bar", "Conference Room", "Airport Transfer"],
    featured: true,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
  },
  {
    name: "Campement Tassili",
    location: "Djanet",
    description: "A unique eco-camp at the edge of the Tassili N'Ajjer plateau. Sleep under a sky full of stars and wake up to spectacular rock formations.",
    rating: 3,
    amenities: ["Meals Included", "Desert Guides", "Stargazing", "4x4 Transfers"],
    featured: false,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
  },
  {
    name: "Hotel Les Zibans",
    location: "Biskra",
    description: "A modern hotel in the oasis city of Biskra, known as the gateway to the Sahara. Comfortable rooms, excellent cuisine, and easy access to the desert.",
    rating: 4,
    amenities: ["WiFi", "Pool", "Restaurant", "Spa", "Parking"],
    featured: false,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
];

async function seed() {
  console.log("Seeding tours...");
  for (const tour of tours) {
    await addDoc(collection(db, "tours"), tour);
    console.log(`Added tour: ${tour.name}`);
  }

  console.log("Seeding hotels...");
  for (const hotel of hotels) {
    await addDoc(collection(db, "hotels"), hotel);
    console.log(`Added hotel: ${hotel.name}`);
  }

  console.log("Done!");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
