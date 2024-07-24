/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import useProductFilters from './hooks/useProductFilters';

const App: React.FC = () => {
  const {
    products,
    favorites,
    toggleFavorite,
    handleSearchTermChange,
    handleSortOptionChange,
    handleFilterFavoritesChange,
    searchTerm,
  } = useProductFilters();

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={handleSearchTermChange}
        setSortOption={handleSortOptionChange}
        setFilterFavorites={handleFilterFavoritesChange}
      />
      <main className="max-w-6xl mx-auto p-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default App;