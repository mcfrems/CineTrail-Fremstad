import React from 'react'
import "./MyFavorites.css"
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import MovieCard from '../../components/Movie Card/MovieCard';


function MyFavorites() {
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const {user, setUser, token, setToken} = React.useContext(UserContext);

    const [movies, setMovies] = React.useState([])

    //show all favorite movies for a particular user
    //when page loads
    //favoriteMovies/user/:userid
    React.useEffect(
        ()=>{
            //make api call to get favorites for this user
            axios.get(`${serverUrl}/favoriteMovies/user/${user?._id}`)
            .then(res =>{
                console.log(res.data.favorites)
                setMovies(res.data.favorites)
            })
            .catch(err => console.log(err))
        }, [user]
    )

  return (
    <div className="favorites-container">
        {
            token?
            // {item?.movie[0].title}
            movies.map(item =><MovieCard 
                key={item.movie[0]._id}
                movie={item.movie[0]}
                imageUrl={item.movie[0].poster_path}
                imgHeight="300px"
                radius="16px"
                cardStyle="popular-card"/>)
            :
            <p>Sign in to save movies</p>
        }
    </div>
  )
}

export default MyFavorites