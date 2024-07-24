import React, { useState } from 'react';

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSortOption: (option: string) => void;
  setFilterFavorites: (isFavorite: boolean) => void;
}

const Filters: React.FC<FiltersProps> = ({ searchTerm, setSearchTerm, setSortOption, setFilterFavorites }) => {
  const [isFavorites, setIsFavorites] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
    setIsDropdownOpen(false);
  };

  const handleFavoritesToggle = () => {
    setIsFavorites((prev) => !prev);
    setFilterFavorites(!isFavorites);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex items-center self-center">
        <input
          type="text"
          placeholder="Search"
          className="p-2 text-lg border border-gray-300 rounded"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <img
          src="/src/assets/icons/Magnifer.svg"
          alt="magnifier"
          className="absolute right-2 w-6 h-6"
        />
      </div>
      <div className="relative inline-block self-center">
        <button
          className="flex items-center justify-between p-2 text-lg border border-gray-300 rounded bg-white"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          Sort by
          <img
            src="/src/assets/icons/ArrowDown.svg"
            alt="filter"
            className="ml-4 w-8 h-8"
          />
        </button>
        {isDropdownOpen && (
          <div className="absolute bg-white shadow-lg w-full mt-1 z-10">
            <button onClick={() => handleSortChange('priceAsc')} className="w-full text-left p-2 hover:bg-gray-200">Price ↑</button>
            <button onClick={() => handleSortChange('priceDesc')} className="w-full text-left p-2 hover:bg-gray-200">Price ↓</button>
            <button onClick={() => handleSortChange('nameAsc')} className="w-full text-left p-2 hover:bg-gray-200">Name A-Z</button>
            <button onClick={() => handleSortChange('nameDesc')} className="w-full text-left p-2 hover:bg-gray-200">Name Z-A</button>
            <button onClick={handleFavoritesToggle} className="w-full text-left p-2 hover:bg-gray-200">{isFavorites ? 'All Products' : 'Favorites'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;