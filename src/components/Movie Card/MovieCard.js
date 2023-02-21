import React from 'react'
import "./MovieCard.css"
import Rating from '../Rating/Rating';

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
    <div className={cardStyle}>
        <div style={imageStyle}>
            <div className="movie-info-top">
                <p>{movie.vote_average}</p>
            </div>
            <div className='movie-info-bottom'>
                <p>{movie.original_title}</p>
                <Rating />
            </div>
            {
                cardStyle==="top-rated-card"?
                <p>{movie.title}</p>
                :
                null
            }
        </div>
    </div>
  )
}

export default MovieCard