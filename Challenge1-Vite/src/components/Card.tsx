import React from 'react';

interface CardProps {
  product: {
    id: number;
    thumbnail: string;
    title: string;
    description: string;
    price: number;
  };
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ product, favorites, toggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden flex flex-col p-4 shadow hover:shadow-lg transition transform hover:scale-101">
      <img src={product.thumbnail} alt={product.title} className="w-full h-auto mb-4" />
      <h2 className="text-2xl mb-2">{product.title}</h2>
      <p className="text-lg mb-4">{product.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl text-gray-700">€{product.price}</span>
        <img
          src="/src/assets/icons/Heart.svg"
          alt="heart"
          className={`w-6 h-6 cursor-pointer ${favorites.has(product.id) ? '' : 'opacity-50'}`}
          onClick={() => toggleFavorite(product.id)}
        />
      </div>
    </div>
  );
};

export default Card;