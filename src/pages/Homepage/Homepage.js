import React, {useContext} from 'react'
import "./Homepage.css"
import Slider from '../../components/Slider/Slider';
import { ThemeContext } from '../../contexts/ThemeContext';
import PopularMovies from '../../components/Popular Movies/PopularMovies';
import TopMovies from '../../components/Top Movies/TopMovies';



function Homepage() {

    //note CURLY brackets here to access global state!
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageBase = process.env.REACT_APP_IMAGE_BASE;


  return (
    <div className={darkMode? "homepage-container":"homepage-container homepage-light"}>
      <Slider />
        <div className='movies-wrapper'>
          <PopularMovies />
          <TopMovies />
        </div>
      </div>
  )
}

export default Homepage