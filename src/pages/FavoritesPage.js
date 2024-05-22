import React, { useState } from 'react';
import { useFavorites } from '../FavoritesContext';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import RatingReview from './RatingReview';
import Comments from './Comments';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const [expandedMovie, setExpandedMovie] = useState(null);

  const toggleExpand = (movieId) => {
    setExpandedMovie(expandedMovie === movieId ? null : movieId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-3xl text-red-900 mb-4'>MY Favorite Movies ❤️🌟</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="bg-white p-4 rounded shadow-md">
            <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank" rel="noopener noreferrer" className='text-red-500'>
              <img src={movie.Poster} alt={movie.Title} className="w-full h-auto rounded-lg" />
              <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
              <p className="text-gray-600">{movie.Year}</p>
            </a>
            <div className="social-sharing mt-2 flex space-x-2">
              <FacebookShareButton url={`https://www.imdb.com/title/${movie.imdbID}`} quote={movie.Title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={`https://www.imdb.com/title/${movie.imdbID}`} title={movie.Title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white"
                onClick={() => toggleExpand(movie.imdbID)}
              >
                {expandedMovie === movie.imdbID ? 'Collapse Details' : 'Expand Details'}
              </button>
              {expandedMovie === movie.imdbID && (
                <div className="mt-4">
                  <RatingReview movieId={movie.imdbID} />
                  <Comments movieId={movie.imdbID} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
