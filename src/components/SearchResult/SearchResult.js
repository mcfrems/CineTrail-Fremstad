import React from 'react'
import "./SearchResult.css"
import avatar from "../../assets/image-not-found.png"


function SearchResult({movie}) {
    const [imageError, setImageError] = React.useState(false)

  return (
    <a href={`/moviedetails/${movie.id}`} className="search-link" >
        <img onError={() => setImageError(true)}
        src={imageError ? avatar : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
        <p>{movie.title}</p>
    </a>
  )
}

export default SearchResult