import React from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ThemeContextProvider from './contexts/ThemeContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Signup from './pages/Users/Signup';
import Signin from './pages/Users/Signin';
import UserContextProvider from './contexts/UserContext';
import MyFavorites from './pages/MyFavorites/MyFavorites';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <UserContextProvider>
      <ThemeContextProvider>
        <Header />

        <Routes>
          <Route path="/" element= {<Homepage />} />
          <Route path="/myfavorites" element= {<MyFavorites />} />
          <Route path="/signin" element= {<Signin />} />
          <Route path="/signup" element= {<Signup />} />
          <Route path="/moviedetails/:movieId" element= {<MovieDetails />} />
        </Routes>
        
        <Footer />
      </ThemeContextProvider>
      </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
