import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFavorites } from '../FavoritesContext';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
} from 'react-share';
import RatingReview from './RatingReview';
import Comments from './Comments';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MovieDetails() {
  const [movies, setMovies] = useState([]);
  const [expandedMovie, setExpandedMovie] = useState(null); // State to track expanded movie
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [sortCriteria, setSortCriteria] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://www.omdbapi.com/?s=batman&apikey=bfd813b7');
        if (response.data.Search) {
          setMovies(response.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    const sortMovies = (movies) => {
      switch (sortCriteria) {
        case 'year':
          return [...movies].sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        case 'title':
          return [...movies].sort((a, b) => a.Title.localeCompare(b.Title));
        default:
          return movies;
      }
    };

    const sortedMovies = sortMovies(movies);
    setMovies(sortedMovies);
  }, [sortCriteria]);

  const handleAddFavorite = (movie) => {
    addFavorite(movie);
    toast.success('Favorite added successfully!');
  };

  const handleRemoveFavorite = (imdbID) => {
    removeFavorite(imdbID);
    toast.success('Favorite removed successfully!');
  };

  const toggleExpand = (movieId) => {
    setExpandedMovie(expandedMovie === movieId ? null : movieId); // Toggle expand state
  };

  return (
    <div className="container mx-auto p-4  mt-24 ">
      <div className="mb-4">
        <select
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="year">Year</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="bg-white p-4 rounded shadow-md">
            <a
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-auto rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
              <p className="text-gray-600">{movie.Year}</p>
            </a>
            <div className="social-sharing mt-2 flex space-x-2">
              <FacebookShareButton
                url={`https://www.imdb.com/title/${movie.imdbID}`}
                quote={movie.Title}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={`https://www.imdb.com/title/${movie.imdbID}`}
                title={movie.Title}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            {favorites.some((favorite) => favorite.imdbID === movie.imdbID) ? (
              <button
                className="text-red-500 mt-2"
                onClick={() => handleRemoveFavorite(movie.imdbID)}
              >
                Remove from Favorites
              </button>
            ) : (
              <button
                className="text-green-500 mt-2"
                onClick={() => handleAddFavorite(movie)}
              >
                Add to Favorites
              </button>
            )}
            <div className="mt-4">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white"
                onClick={() => toggleExpand(movie.imdbID)}
              >
                {expandedMovie === movie.imdbID
                  ? 'Collapse Details'
                  : 'Expand Details'}
              </button>
              {expandedMovie === movie.imdbID && (
                <div className="mt-4">
                  <p className="text-gray-600">{movie.Plot}</p>
                  <RatingReview movieId={movie.imdbID} />
                  <Comments movieId={movie.imdbID} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MovieDetails;
