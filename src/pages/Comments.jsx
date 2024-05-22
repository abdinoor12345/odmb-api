import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comments = ({ movieId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || {};
    setComments(storedComments[movieId] || []);
  }, [movieId]);

  const handleAddComment = () => {
    const sanitizedComment = DOMPurify.sanitize(comment);
    const newComments = [...comments, sanitizedComment];
    const allComments = JSON.parse(localStorage.getItem('comments')) || {};
    allComments[movieId] = newComments;
    localStorage.setItem('comments', JSON.stringify(allComments));
    setComments(newComments);
    setComment('');
  };

  const toggleComments = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="comments mt-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold">Comments</h2>
        <button
          onClick={toggleComments}
          className="bg-indigo-500 text-white py-1 px-3 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          {isCollapsed ? 'Show' : 'Hide'} Comments
        </button>
      </div>
      {!isCollapsed && (
        <>
          <div className="mb-2">
            {comments.map((c, index) => (
              <p key={index} className="mb-2 bg-gray-100 p-2 rounded-md">{c}</p>
            ))}
          </div>
          <div className="mb-2">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            />
            <button
              onClick={handleAddComment}
              className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 mt-2"
            >
              Add Comment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
