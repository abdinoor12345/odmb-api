import React, { useState, useEffect } from 'react';

function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Function to initialize or increment visitor count
    const updateVisitorCount = () => {
      // Get today's date
      const today = new Date().toLocaleDateString();
      
      // Retrieve visitor count from local storage for today
      const storedCount = localStorage.getItem(today);

      // If count exists, increment it by 1, otherwise set to 1
      const updatedCount = storedCount ? parseInt(storedCount) + 1 : 1;

      // Update visitor count in local storage
      localStorage.setItem(today, updatedCount.toString());

      // Set visitor count state
      setVisitorCount(updatedCount);
    };

    // Call the updateVisitorCount function when component mounts
    updateVisitorCount();
  }, []);

  return (
    <div>
      <h2 className='text-red-600'>Visitor Count Today: {visitorCount}</h2>
    </div>
  );
}

export default VisitorCounter;
