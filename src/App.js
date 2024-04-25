import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetails from './pages/MovieDetails';
import MovieDetailsPage from './pages/MovieDetailsPage';
import { FavoritesProvider } from './FavoritesContext';
import Footer from './pages/Footer';
 function App() {
  return ( <FavoritesProvider>
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
        <Route path="/" element={<MovieDetailsPage/>} />
          <Route path="/movies" element={<MovieDetails />} />
           <Route path="/search" element={<SearchPage />} /> {/* Render SearchPage on the main page */}
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        
      </div>
    </Router>   <Footer />          
   </FavoritesProvider>
  
  );
}

export default App;
