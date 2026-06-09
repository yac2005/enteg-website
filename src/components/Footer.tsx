export default function Footer() {
  return (
    <footer className="bg-brand-brown text-white py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">ENTEG</h3>
          <p className="text-sm opacity-75">Agence de Voyage — Ghardaia, Algeria</p>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm uppercase tracking-wide">Contact</h4>
          <ul className="text-sm opacity-75 space-y-1">
            <li>+213 5 40 26 38 50</li>
            <li>contact@enteg.dz</li>
            <li>Ghardaia, Algeria</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-sm uppercase tracking-wide">WhatsApp</h4>
          <a href="https://wa.me/213540263850" className="inline-block bg-green-600 text-white text-sm px-4 py-2 rounded-full">Chat with us</a>
        </div>
      </div>
    </footer>
  );
}
