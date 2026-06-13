import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";





const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://enteg.vercel.app"), // replace with your actual Vercel URL
  title: {
    default: "ENTEG Voyages — Travel Agency Ghardaïa, Algeria",
    template: "%s | ENTEG Voyages",
  },
  description:
    "ENTEG Voyages is a licensed Algerian travel agency based in Ghardaïa. We offer Sahara tours, desert circuits, hotel reservations, transport, and custom trips across Algeria.",
  keywords: [
    "travel agency Algeria",
    "Ghardaïa tours",
    "Sahara desert tour",
    "circuit Algérie",
    "agence de voyage Ghardaïa",
    "ENTEG Voyages",
    "Algeria travel",
    "Tassili N'Ajjer",
    "Taghit",
    "M'Zab Valley",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ENTEG Voyages",
    images: [{ url: "/hero.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${poppins.variable}`}>
      <body className="font-poppins antialiased">
        <Header />
        <JsonLd />
        {children}
        <Footer />
      </body>
    </html>
  );
}
