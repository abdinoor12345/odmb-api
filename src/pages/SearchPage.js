import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFavorites } from '../FavoritesContext';

function MovieDetails() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=bfd813b7`);
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddFavorite = (movie) => {
    addFavorite(movie);
    alert('⚠ Favorite added successfully!');
  };

  const handleRemoveFavorite = (imdbID) => {
    removeFavorite(imdbID);
    alert('⚠ Favorite removed successfully!');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full border border-red-300 rounded-md px-4 py-2 mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies && movies.map((movie) => (
          <div key={movie.imdbID} className="bg-white p-4 rounded shadow">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
            <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
            <p className="text-gray-600">{movie.Year}</p>
            {favorites.some(favorite => favorite.imdbID === movie.imdbID) ? (
              <button 
                className="text-red-500 rounded-full" 
                onClick={() => handleRemoveFavorite(movie.imdbID)} 
              >
                Remove from Favorites
              </button>
            ) : (
              <button 
                className="text-green-500 rounded-full" 
                onClick={() => handleAddFavorite(movie)} 
              >
                Add to Favorites
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetails;
