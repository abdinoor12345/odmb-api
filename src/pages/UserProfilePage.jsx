import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useFavorites } from '../FavoritesContext';

const UserProfilePage = () => {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-8">
       

        <div>
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          {user ? (
            <>
              <h2 className="text-xl font-semibold mb-2">Username: {user.username}</h2>
              <h2 className="text-xl font-semibold mb-4">Email: {user.email}</h2>
            </>
          ) : (
            <p>Please log in to view your profile.</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Favorite Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.length > 0 ? (
            favorites.map((movie) => (
              <div key={movie.imdbID} className="bg-white p-4 rounded shadow">
                <a
                  href={`https://www.imdb.com/title/${movie.imdbID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500"
                >
                  <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
                  <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
                  <p className="text-gray-600">{movie.Year}</p>
                </a>
              </div>
            ))
          ) : (
            <p>No favorite movies added yet.</p>
          )}
        </div>
      </div>

      {user && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default UserProfilePage;
