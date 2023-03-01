import React from 'react'
import axios from 'axios';

function Genres({movieGenres}) {

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    //create state for all genres
    const [allGenres, setAllGenres] = React.useState([])

    //get the list of all genre ids when the page loads
    React.useEffect(
        ()=>{
            axios.get(`${baseUrl}/genre/movie/list?api_key=${apiKey}`)
            .then(res => {
                console.log(res.data.genres)
                setAllGenres(res.data.genres)
            })
            .catch(err => console.log(err))
        },[]
    )
    
    const genreList = () =>{
        //walk through movieGenres, find the match in all genres, add to an array that will be returned
        const glist = []
        movieGenres?.map(id =>{
            //find name in all genres that matches id
            for (let i = 0; i < allGenres.length; i++)
            {
                //check for match
                if (id === allGenres[i].id){
                    //add the anme to my array
                    glist.push(allGenres[i].name)
                }
            }
        })
            //return this array
            return glist.join(", ")
    }
  return (
    <div>
        <p>Genres: {genreList()}</p>
    </div>
  )
}

export default Genres