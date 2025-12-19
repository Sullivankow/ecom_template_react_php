const avantages = [
  {
    title: "Livraison rapide",
    description: "Expédition sous 24/48h partout en France.",
    icon: (
      <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h1l2 7h13l2-7h1" />
        <circle cx="7" cy="20" r="2" />
        <circle cx="17" cy="20" r="2" />
      </svg>
    )
  },
  {
    title: "Paiement sécurisé",
    description: "Transactions protégées et cryptées.",
    icon: (
      <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="4" y="8" width="16" height="10" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v2m0 0h.01" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 8V6a4 4 0 018 0v2" />
      </svg>
    )
  },
  {
    title: "Satisfait ou remboursé",
    description: "Retour gratuit sous 30 jours.",
    icon: (
      <svg className="w-10 h-10 text-blue-600 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    )
  }
];

export default function AvantageSection() {
  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900">Pourquoi nous choisir ?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {avantages.map((a, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition-shadow duration-300">
            {a.icon}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{a.title}</h3>
            <p className="text-sm text-gray-500">{a.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


