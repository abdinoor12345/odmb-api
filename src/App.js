import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
 import Login from './pages/Login';
 import Registration from './pages/Registeration';
 import SearchPage from './pages/SearchPage';

import FavoritesPage from './pages/FavoritesPage';
import MovieDetails from './pages/MovieDetails';
import MovieDetailsPage from './pages/MovieDetailsPage';
import UserProfilePage from './pages/UserProfilePage';
import { FavoritesProvider } from './FavoritesContext';
import { AuthProvider, useAuth } from './AuthContext';  
import Footer from './pages/Footer';
 


import { SearchProvider } from './SearchContext';
import VisitorCounter from './pages/VisitorsCounter';


const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();

  return user ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <SearchProvider>
          <Router>
            <div className="App">
              <header className="App-header">
                <Navbar />
              </header>
              <main className="mt-8 p-4">
                <Routes>
                <Route path="/register" element={<Registration />} />
                <Route path="/search" element={<SearchPage />} />

                  <Route path="/" element={<MovieDetailsPage />} />
                  <Route path="/login" element={<Login />} />

                   <Route path="/profile" element={<PrivateRoute element={UserProfilePage} />} />
                  <Route path="/movies" element={<PrivateRoute element={MovieDetails} />} />
                  <Route path="/favorites" element={<PrivateRoute element={FavoritesPage} />} />

                </Routes>
              </main>
            </div>
            <VisitorCounter/>

             <Footer />
           </Router>
        </SearchProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
