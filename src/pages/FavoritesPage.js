import React from 'react';
import { useFavorites } from '../FavoritesContext';

function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1 className='text-3xl text-red-900'>MY Favorites Movies ❤️🌟</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="bg-white p-4 rounded shadow">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
            <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
            <p className="text-gray-600">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
