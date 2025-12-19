

// Exemple de données de catégories
const categories = [
  {
    name: "Homme",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    description: "Mode masculine tendance et intemporelle."
  },
  {
    name: "Femme",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
    description: "Collection femme élégante et moderne."
  },
  {
    name: "Enfant",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    description: "Vêtements confortables pour enfants."
  },
  {
    name: "Accessoires",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    description: "Accessoires pour sublimer chaque look."
  }
];

export default function CategorySection() {
  return (
    <section className="py-12 px-4 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-gray-900">Nos catégories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="group bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4 cursor-pointer hover:bg-gray-100"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-4 border-4 border-gray-200 group-hover:border-primary-500 transition-all duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">
              {cat.name}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-2">{cat.description}</p>
            <span className="inline-block mt-auto text-primary-600 font-medium group-hover:underline">Découvrir</span>
          </div>
        ))}
      </div>
      {/* Bouton voir tout */}
      <div className="flex justify-center mt-8">
        <button
          className="px-6 py-2 rounded-lg bg-primary-600 text-white font-semibold shadow hover:bg-primary-700 transition-colors duration-200 text-base"
          onClick={() => window.location.href = '#'}
        >
          Voir tout
        </button>
      </div>
    </section>
  );
}


