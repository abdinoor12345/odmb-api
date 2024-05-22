import React, { useState, useEffect } from 'react';

const MovieDetailsPage = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);

    useEffect(() => {
       const interval = setInterval(() => {
        setBackgroundIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);

  return (<>
     <div className="search-page h-96 bg-cover bg-center" style={{ 
    backgroundImage: `url(/images/batman${backgroundIndex + 1}.jpg)`, 
    filter: 'brightness(120%) contrast(120%)', 
}}>
    </div> </>
  );
};

export default MovieDetailsPage;
