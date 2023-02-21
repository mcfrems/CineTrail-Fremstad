import React from 'react'
import "./PopularMovies.css"
import axios from "axios"
import MovieCard from '../Movie Card/MovieCard';
import "./PopularMovies.css"


function PopularMovies() {

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageBase = process.env.REACT_APP_IMAGE_BASE;

    //create state to hold popular movies
    const [upcomingMovies, setUpcomingMovies] = React.useState([])
    //this page shows all the popular movies
    //what is the endpoint?
    //https://api.themoviedb.org/3/movie/popular?api_key=ab9967a1e28a132cd4af4000c701f739&page=1

    React.useEffect(
        ()=>{
            //call the api
            axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}&page=1`)
            .then(res =>{
                console.log(res.data.results)
                //store data in state
                setUpcomingMovies(res.data.results)
            })
            .catch(err => console.log(err))

        }, []
    )

  return (
    <div className='popular-container'>
        <h3>Popular Movies</h3>
        <div className='popular-wrapper'>
            {
            upcomingMovies.map(item =><MovieCard 
                    key={item.id}
                    movie={item}
                    imageUrl={item.poster_path}
                    imgHeight="300px"
                    radius="16px"
                    cardStyle="popular-card"/>)
            }
            {/* {upcomingMovies.map(item =><p>{item.original_title}</p>)} */}
        </div>
        <div className='page-numbers'>
            Page numbers go here
        </div>
    </div>
  )
}

export default PopularMovies