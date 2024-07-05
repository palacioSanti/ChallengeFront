import React from 'react';
import Filters from './Filters';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setSortOption: (option: string) => void;
  setFilterFavorites: (isFavorite: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  setSortOption,
  setFilterFavorites
}) => (
  <header className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">
    <div className="p-4">
      <h1 className="text-left text-4xl font-bold">Find what you need</h1>
    </div>
    <Filters
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      setSortOption={setSortOption}
      setFilterFavorites={setFilterFavorites}
    />
  </header>
);

export default Header;