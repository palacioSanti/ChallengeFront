import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../models/Product';

const useProductFilters = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, searchParams]);

  useEffect(() => {
    const searchTerm = searchParams.get('searchTerm') || '';
    fetchProducts(searchTerm);
  }, [searchParams.get('searchTerm')]);

  const fetchProducts = async (searchTerm: string = '') => {
    try {
      const queryParams = searchTerm ? '/search?q=' + searchTerm : '';
      const response = await axios.get(`https://dummyjson.com/products${queryParams}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getFavorites = (): Set<number> => {
    return new Set(JSON.parse(localStorage.getItem('favorites') || '[]'));
  };

  const updateFavorites = (favorites: Set<number>) => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
  };

  const toggleFavorite = (id: number) => {
    const favorites = getFavorites();
    if (favorites.has(id)) {
      favorites.delete(id);
    } else {
      favorites.add(id);
    }
    updateFavorites(favorites);
    applyFiltersAndSort();
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];
    const favorites = getFavorites();

    const sortOption = searchParams.get('sortOption') || '';
    const filterFavorites = searchParams.get('filterFavorites') === 'true';

    if (sortOption) {
      filtered = sortProducts(filtered, sortOption);
    }

    if (filterFavorites) {
      filtered = filtered.filter(product => favorites.has(product.id));
    }

    setFilteredProducts(filtered);
  };

  const sortProducts = (products: Product[], sort: string) => {
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

  const handleSearchTermChange = (term: string) => {
    setSearchParams(prev => {
      prev.set('searchTerm', term);
      return new URLSearchParams(prev);
    });
  };

  const handleSortOptionChange = (option: string) => {
    setSearchParams(prev => {
      prev.set('sortOption', option);
      return new URLSearchParams(prev);
    });
  };

  const handleFilterFavoritesChange = (filter: boolean) => {
    setSearchParams(prev => {
      prev.set('filterFavorites', filter.toString());
      return new URLSearchParams(prev);
    });
  };

  return {
    products: filteredProducts,
    favorites: getFavorites(),
    toggleFavorite,
    handleSearchTermChange,
    handleSortOptionChange,
    handleFilterFavoritesChange,
    searchTerm: searchParams.get('searchTerm') || '',
    sortOption: searchParams.get('sortOption') || '',
    filterFavorites: searchParams.get('filterFavorites') === 'true',
  };
};

export default useProductFilters;