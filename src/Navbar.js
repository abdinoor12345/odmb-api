import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from './SearchContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50  font-bold">
      <div className="container mx-auto p-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <Link to="/" className="flex items-center text-xl font-bold">
            <img src="/images/batman1.jpg" alt="OMDB Movies Logo" className="h-16 mr-2 w-20 rounded-full shadow-md" />
          </Link>
        </div>
        <form onSubmit={handleSearchSubmit} className="flex items-center w-full lg:w-auto lg:mr-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-gray-200 text-black rounded px-2 py-1 mr-4 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full lg:w-auto"
          />
          <button type="submit" className="text-white bg-blue-500 px-3 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Search
          </button>
        </form>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-black border-black hover:text-black hover:border-black focus:outline-none focus:ring-2 focus:ring-gray-300"
            onClick={toggleMenu}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className={`w-full lg:flex lg:items-center lg:w-auto ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="lg:flex lg:items-center lg:ml-4">
            <Link
              to="/register"
              className="block mt-4 lg:inline-block lg:mt-0 text-black mr-4 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/movies"
              className="block mt-4 lg:inline-block lg:mt-0 text-black mr-4 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              to="/favorites"
              className="block mt-4 lg:inline-block lg:mt-0 text-black mr-4 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              to="/login"
              className="block mt-4 lg:inline-block lg:mt-0 text-black mr-4 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/profile"
              className="block mt-4 lg:inline-block lg:mt-0 text-black mr-4 hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
