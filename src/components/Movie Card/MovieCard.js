import React from 'react'
import "./MovieCard.css"
import Rating from '../Rating/Rating';
import {Link} from 'react-router-dom'

function MovieCard({movie, imageUrl, imgHeight, radius, cardStyle}) {
    const imageBase = process.env.REACT_APP_IMAGE_BASE;

    const imageStyle={
        height: imgHeight,
        width: "200px",
        // backgroundImage: `url("${imageBase}${movie?.poster_path}")`,
        backgroundImage: `url("${imageBase}${imageUrl}")`,
        borderRadius: radius,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative", //needed to use absolute on other stuff
    }   

  return (
    // <div className='movie-card'>
    <Link className={cardStyle} 
        to={movie._id?  `/moviedetails/${movie?.tmdb_id}`:
        `/moviedetails/${movie?.id}`}>
        <div style={imageStyle}>
            <div className="movie-info-top">
                <p>{movie.vote_average}</p>
            </div>
            <div className='movie-info-bottom'>
                <p>{movie.original_title}</p>
                <Rating stars={movie?.vote_average/2}/>
            </div>
            {
                cardStyle==="top-rated-card"?
                <p>{movie.title}</p>
                :
                null
            }
        </div>
    </Link>
  )
}

export default MovieCard