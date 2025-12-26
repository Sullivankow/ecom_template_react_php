import Header from '../../components/layout/headers';
import Footer from '../../components/layout/footer';
import React from 'react';
import CategoryCard from '../../components/category/categoryCard';
import type { CategoryCardProps } from '../../components/category/categoryCard';

// Données mockées pour les catégories (à remplacer par l'API plus tard)
const categories: CategoryCardProps[] = [
  {
    id: '1',
    name: 'Vêtements',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    description: 'T-shirts, pantalons, robes, vestes et plus.'
  },
  {
    id: '2',
    name: 'Chaussures',
    image: './public/shoes.jpg',
    description: 'Sneakers, bottes, sandales, baskets...'
  },
  {
    id: '3',
    name: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    description: 'Sacs, ceintures, chapeaux, bijoux.'
  },
  {
    id: '4',
    name: 'Nouveautés',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Les dernières tendances de la boutique.'
    },
    {
    id: '5',
    name: 'Vêtements',
    image: './public/shoes.jpg',
    description: 'T-shirts, pantalons, robes, vestes et plus.'
  },
  {
    id: '6',
    name: 'Chaussures',
    image: './public/shoes.jpg',
    description: 'Sneakers, bottes, sandales, baskets...'
  },
  {
    id: '7',
    name: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    description: 'Sacs, ceintures, chapeaux, bijoux.'
  },
  {
    id: '8',
    name: 'Nouveautés',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Les dernières tendances de la boutique.'
  },
];






const CategoriesPage: React.FC = () => {
  return (
    <>
      <Header />
      <div id="categories" className="max-w-6xl mx-auto py-10 px-4">
        <h1 className="text-3xl text-black font-bold mb-8 text-center">Toutes les catégories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map(cat => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CategoriesPage;


