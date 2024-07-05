/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Card from './components/Card';
import axios from 'axios';

const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set(JSON.parse(localStorage.getItem('favorites') || '[]')));
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('');
  const [filterFavorites, setFilterFavorites] = useState<boolean>(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [searchTerm, sortOption, filterFavorites, products, favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prevState => {
      const newFavorites = new Set(prevState);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption) {
      filtered = sortProducts(filtered, sortOption);
    }

    if (filterFavorites) {
      filtered = filtered.filter(product => favorites.has(product.id));
    }

    setFilteredProducts(filtered);
  };

  const sortProducts = (products: any[], sort: string) => {
    if (sort === 'priceAsc') {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sort === 'priceDesc') {
      return [...products].sort((a, b) => b.price - a.price);
    }
    if (sort === 'nameAsc') {
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === 'nameDesc') {
      return [...products].sort((a, b) => b.title.localeCompare(a.title));
    }
    return products;
  };

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSortOption={setSortOption}
        setFilterFavorites={setFilterFavorites}
      />
      <main className="max-w-6xl mx-auto p-4">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <Card
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