import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchContext } from '../SearchContext';
import { useFavorites } from '../FavoritesContext';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
 

const SearchPage = () => {
  const { searchQuery } = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState([]);
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  const [sortCriteria, setSortCriteria] = useState('');
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const fetchMovies = async () => {
        try {
          let query = `http://www.omdbapi.com/?s=${searchQuery}&apikey=bfd813b7`;
          if (year) query += `&y=${year}`;
          if (genre) query += `&genre=${genre}`;
          if (rating) query += `&imdbRating=${rating}`;

          const response = await axios.get(query);
          if (response.data.Search) {
            setSearchResults(response.data.Search);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Error fetching movie data:', error);
          setSearchResults([]);
        }
      };

      fetchMovies();
    }
  }, [searchQuery, year, genre, rating]);

  useEffect(() => {
    const fetchRelatedMovies = async (movieId) => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=bfd813b7`);
        const genre = response.data.Genre.split(',')[0];
        const relatedResponse = await axios.get(`http://www.omdbapi.com/?s=${genre}&apikey=bfd813b7`);
        if (relatedResponse.data.Search) {
          setRelatedMovies(relatedResponse.data.Search);
        } else {
          setRelatedMovies([]);
        }
      } catch (error) {
        console.error('Error fetching related movies:', error);
        setRelatedMovies([]);
      }
    };

    if (searchResults.length > 0) {
      fetchRelatedMovies(searchResults[0].imdbID);
    }
  }, [searchResults]);

  const handleAddFavorite = (movie) => {
    addFavorite(movie);
    toast.success('Favorite added successfully!');
  };

  const handleRemoveFavorite = (imdbID) => {
    removeFavorite(imdbID);
    toast.error('Favorite removed successfully!');
  };

  const sortMovies = (movies) => {
    switch (sortCriteria) {
      case 'release-date':
        return movies.sort((a, b) => new Date(b.Year) - new Date(a.Year));
      case 'rating':
        return movies.sort((a, b) => b.imdbRating - a.imdbRating);
      case 'title':
        return movies.sort((a, b) => a.Title.localeCompare(b.Title));
      default:
        return movies;
    }
  };

  const sortedMovies = sortMovies(searchResults);

  return (
    <div className="container mx-auto p-4 mt-36 lg:mt-20">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{searchQuery}"</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="mr-2 p-2 border rounded"
        />
        <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value)} className="p-2 border rounded">
          <option value="">Sort By</option>
          <option value="release-date">Release Date</option>
          <option value="rating">Rating</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedMovies.map((result) => (
          <div key={result.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={result.Poster} alt={result.Title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{result.Title}</h2>
              <p className="text-gray-700">{result.Year}</p>
              {favorites.some(favorite => favorite.imdbID === result.imdbID) ? (
                <button 
                  className="text-red-500 rounded-full mt-2" 
                  onClick={() => handleRemoveFavorite(result.imdbID)} 
                >
                  Remove from Favorites
                </button>
              ) : (
                <button 
                  className="text-green-500 rounded-full mt-2" 
                  onClick={() => handleAddFavorite(result)} 
                >
                  Add to Favorites
                </button>
              )}
              <div className="social-sharing mt-2 flex space-x-2">
                <FacebookShareButton url={`https://www.imdb.com/title/${result.imdbID}`} quote={result.Title}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={`https://www.imdb.com/title/${result.imdbID}`} title={result.Title}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">{result.Plot}</p>
                 
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="related-movies mt-4">
        <h2 className="text-2xl font-semibold mb-2 text-center animate-pulse text-red-500">Related Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {relatedMovies.map((movie) => (
            <div key={movie.imdbID} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
                <p className="text-gray-700">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchPage;
