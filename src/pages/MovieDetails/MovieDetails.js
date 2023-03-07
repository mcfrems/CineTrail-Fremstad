import React from 'react'
import "./MovieDetails.css"
import {useParams} from 'react-router-dom'
import axios from 'axios';
import ReactPlayer from 'react-player';
import Review from '../../components/Review/Review';
import Rating from '../../components/Rating/Rating';
import { UserContext } from '../../contexts/UserContext';



function MovieDetails() {

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const imageBase = process.env.REACT_APP_IMAGE_BASE;
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const {user, setUser, token, setToken} = React.useContext(UserContext);

    //I need to show info about a specific movie
    //what movie?
    //movieId is in params of url

    const {movieId} = useParams();

    //create state for video link
    const [videoLink, setVideoLink] = React.useState('')
    const [movie, setMovie] = React.useState()
    const [rating, setRating] = React.useState()

    //create state for reviews
    const [reviews, setReviews] = React.useState([])

    //state for number of reviews showing
    const [reviewNumber, setReviewNumber] = React.useState(3)
    const [totalReviews, setTotalReviews] = React.useState(0)

    //state for favorites
    const [added, setAdded] = React.useState(false)

    //gives me movie details
        // ${baseUrl}/movie/${movieId}?api_key=${apiKey}

        // ${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}

    //to set added properly
    React.useEffect(
        ()=>{
            //check if this movie has already been added
            axios.post(`${serverUrl}/favoriteMovies/Search`, 
            {
                user_id: user?._id, 
                tmdb_id: movieId
            })
            .then(res =>{
                console.log("search result: ")
                console.log(res)
                if(res.data){
                    setAdded(true)
                }
            })
            .catch(err => console.log(err))
        }, [user]
    )

    React.useEffect(
    ()=>{
        //call api to get video infor
        axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`)
        .then(res =>{
            //console.log(res.data.results)
            //I need one with "YouTube" and "Trailer"
            //filter to find this
            const youTubeLinks = res.data.results.filter(
                item => item.site==="YouTube" && item.type==="Trailer"
            )
            //store the first one in state
            setVideoLink(youTubeLinks[0].key)
            //console.log(youTubeLinks[0].key)
        })
        .catch(err => console.log(err))

        //make api call to get movie ifo
        axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`)
        .then(res => {
            //console.log(res.data)
            setMovie(res.data)
            setRating(res.data.vote_average/2)
        })
        .catch(err => console.log(err))

        //api call to get reviews
        //${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}

        axios.get(`${baseUrl}/movie/${movieId}/reviews?api_key=${apiKey}`)
        .then(res=>{
            //console.log(res.data.results)
            setReviews(res.data.results)
            setTotalReviews(res.data.total_results)
        })
        .catch(err => console.log(err))

    }, []
)


    const addToFavorites = () =>{
        console.log("add")
        //need movie id and user id 
        console.log("movie id is ", movieId)
        console.log("user id is ", user._id)
        //make api call to save favorites
        axios.post(`${serverUrl}/favoriteMovies`, {
            movie_id: movieId,
            user_id: user._id
        })
        .then(res =>{
            console.log(res)
            //mark as "added"
            setAdded(true)
        })
        .catch(err => console.log(err))
    }

    const removeFromFavorites = () =>{
        console.log("remove")
        //make delete request
        axios.delete(`${serverUrl}/favoriteMovies/${user._id}/${movieId}`)
        .then(res => {
            console.log(res)
            setAdded(false)
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='details-container'>
        {
            videoLink ?
            <div className='trailer-container'>
                <ReactPlayer
                    className="trailer-player"
                    url={`https://www.youtube.com/watch?v=${videoLink}`}
                    width='100%'
                    height='100%'
                />
            </div>
            :
            <div className='trailer-container-blank'
            style={{
                backgroundImage:`url("${imageBase}/${movie?.backdrop_path}")`,
                backgroundPosition:"center",
                backgroundSize:"cover"
            }}>
            <p>No Trailer Found</p>
            </div>
        }
        <div className='title-container'>
            <h2>{movie?.title}</h2>
            {
                token?
                <div>
                {
                    added?
                    <button className="btn-remove" onClick={removeFromFavorites}>Remove from favorites</button>
                    :
                    <button className="btn-add" onClick={addToFavorites}>Add to favorites</button>
                }
                </div>
                :
                null
            }
        </div>
        <Rating stars={rating}/>
        <div className='info-container'>
            <img src={`${imageBase}/${movie?.poster_path}`}
                className="details-poster" />
            <div className="movie-details-info">
                <h2>{movie?.tagline}</h2>
                <h4>{movie?.overview}</h4>
                <h4>Status: <span>{movie?.status}</span></h4>
                <h4>Runtime: <span>{movie?.runtime}</span></h4>
                <h4>Budget: <span>{movie?.budget}</span></h4>
            </div>
        </div>
        <div className='review-container'>
            {
                reviews.slice(0, reviewNumber).map(item =><Review review={item}/>)
            }
        </div>
        {
            reviewNumber <= totalReviews ?
        <p onClick={()=>setReviewNumber(reviewNumber + 3)}>Read more reviews</p>
        :
        <p onClick={()=>setReviewNumber(3)}>End of reviews</p>
        }
    </div>
  )
}

export default MovieDetails