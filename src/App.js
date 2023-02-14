import React from 'react';
import './App.css';
import Homepage from './pages/Homepage/Homepage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ThemeContextProvider from './contexts/ThemeContext';



function App() {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Header />
        <Homepage />
        <Footer />
      </ThemeContextProvider>
    </div>
  );
}

export default App;
