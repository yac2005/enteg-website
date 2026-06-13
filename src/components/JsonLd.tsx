export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://enteg.vercel.app/#organization",
        "name": "ENTEG Voyages",
        "url": "https://enteg.vercel.app",
        "logo": "https://enteg.vercel.app/logo.png",
        "image": "https://enteg.vercel.app/hero.jpg",
        "description": "Licensed Algerian travel agency based in Ghardaïa offering Sahara tours, desert circuits, hotel reservations, transport, and custom trips across Algeria.",
        "telephone": "+2130771504301",
        "email": "avtenteg@yahoo.fr",
        "foundingDate": "2014",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Ghardaïa",
          "addressCountry": "DZ"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "32.4903",
          "longitude": "3.6739"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday",
            "Thursday", "Saturday", "Sunday"
          ],
          "opens": "08:00",
          "closes": "20:00"
        },
        "sameAs": [
          "https://wa.me/2130771504301"
        ],
        "areaServed": {
          "@type": "Country",
          "name": "Algeria"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "ENTEG Voyages Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Sahara Desert Tours",
                "description": "Guided desert circuits across the Algerian Sahara including Taghit, Tassili N'Ajjer and the M'Zab Valley."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "LodgingBusiness",
                "name": "Hotel & Guesthouse Reservations",
                "description": "Handpicked hotels and maison d'hôte across Algeria."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TaxiService",
                "name": "Chauffeur & Transfer Service",
                "description": "Private family transfers between Algerian cities with professional drivers."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "TouristTrip",
                "name": "Custom Trip Planning",
                "description": "End-to-end trip planning including flights, hotels and full itinerary across Algeria."
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://enteg.vercel.app/#website",
        "url": "https://enteg.vercel.app",
        "name": "ENTEG Voyages",
        "publisher": {
          "@id": "https://enteg.vercel.app/#organization"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}