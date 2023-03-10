import React, {useContext} from 'react'
import "./Header.css"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../SearchResult/SearchResult';


function Header() {
    //active use Navigate
    const navigate = useNavigate();

    const apiKey = process.env.REACT_APP_API_KEY;
    const baseUrl = process.env.REACT_APP_BASE_URL;

    //create state for search
    const [query, setQuery] = React.useState("")
    const [queryResults, setQueryResults] = React.useState([])

    const [profileOptions, setProfileOptions] = React.useState(false);

    //note CURLY brackets here to access global state!
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    const {user, setUser, token, setToken} = React.useContext(UserContext);

    const handleTheme = () => {
        console.log("toggle")
        //toggle darkMode
        setDarkMode(!darkMode)
        //save value in localStorage
        localStorage.setItem("darkmode", !darkMode)
    }

    const handleLogout = () =>{
        //clear local storage
        localStorage.clear()
        setUser("")
        setToken("")
        //navigate to home page
        navigate("/")
    }

    //{baseUrl}/search/movie?api_key={apiKey}&query={}

    const handleSearch = (e) => {
        //console.log("search")
        //store use input in state
        setQuery(e.target.value)
        //make api call to get matching movies
        axios.get(`${baseUrl}/search/movie?api_key=${apiKey}&query=${e.target.value}`)
        .then(res =>{
            console.log(res.data.results)
            //store results 
            setQueryResults(res.data.results.slice(0, 6))
        })
        .catch(err => console.log(err))
    }

  return (
    <div className={darkMode? "header-container":"header-container header-light"}>
        <a href="/" className="logo">CineTrail</a>
        <div className="search-container">
            <input placeholder="Search movies" 
            className="search-input"
            onChange = {handleSearch} />
            {
                query? 
                <div className="search-results-container">
                    {
                        queryResults.map(item => <SearchResult movie={item}/>)
                    }
                </div>
                :
                null
            }
        </div>
        <div className="header-buttons-container">
            {
                darkMode?
                <div className='theme-buttons'>
                    <MdOutlineLightMode onClick={handleTheme} className="theme-icon"/>
                    <MdOutlineDarkMode className="theme-icon theme-icon-active"/>
                </div>
                :
                <div className='theme-buttons'>
                    <MdOutlineLightMode className="theme-icon theme-icon-active"/>
                    <MdOutlineDarkMode onClick={handleTheme} className="theme-icon"/>
                </div>
            }
            {
                token?
                <div className="profile-container">
                    <img src ={user.image_url} onClick={()=>setProfileOptions(!profileOptions)} className="profile-img" />
                    <p>Welcome {user.username}</p>
                    {
                        profileOptions?
                        <div className="profile-options">
                            <Link to="/myfavorites">My Favorites</Link>
                            <p className="Logout" onClick={handleLogout}>Log Out</p>
                        </div>
                        :
                        null
                    }
                </div>
                :
            <button onClick = {() => navigate("/signup")} className="create-account-btn">Create an account</button>
            }
        </div>
    </div>
  )
}

export default Header