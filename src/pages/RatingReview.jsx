import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RatingReview = ({ movieId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
    setReviews(storedReviews[movieId] || []);
  }, [movieId]);

  const handleSubmit = () => {
    const newReview = { rating, review };
    const updatedReviews = [...reviews, newReview];
    const allReviews = JSON.parse(localStorage.getItem('reviews')) || {};
    allReviews[movieId] = updatedReviews;
    localStorage.setItem('reviews', JSON.stringify(allReviews));
    setReviews(updatedReviews);
    setRating(0);
    setReview('');
    toast.success('review submitted succefully!');
  };

  return (
    <div className="rating-review mt-4">
      <h2 className="text-2xl font-semibold mb-2">Rate and Review</h2>
      <div className="mb-2">
        {reviews.map((r, index) => (
          <div key={index} className="mb-2 bg-gray-100 p-2 rounded-md">
            <p className="font-semibold">Rating: {r.rating}</p>
            <p>{r.review}</p>
          </div>
        ))}
      </div>
      <div className="mb-2">
        <label className="block text-lg font-medium">
          Rating:
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
          />
        </label>
      </div>
      <div className="mb-2">
        <label className="block text-lg font-medium">
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
          />
        </label>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Submit
      </button><ToastContainer/>
    </div>
  );
};

export default RatingReview;
