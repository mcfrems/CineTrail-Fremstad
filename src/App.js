import React from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ThemeContextProvider from './contexts/ThemeContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from './pages/MovieDetails/MovieDetails';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeContextProvider>
        <Header />

        <Routes>
          <Route path="/" element= {<Homepage />} />
          <Route path="/moviedetails/:movieId" element= {<MovieDetails />} />
        </Routes>
        
        <Footer />
      </ThemeContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
