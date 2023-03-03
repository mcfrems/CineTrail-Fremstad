import React, {useContext} from 'react'
import "./Header.css"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { ThemeContext } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';


function Header() {
    //active use Navigate
    const navigate = useNavigate();

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

  return (
    <div className={darkMode? "header-container":"header-container header-light"}>
        <a href="/" className="logo">CineTrail</a>
        <div className="search-container">
            <input placeholder="Search movies" />
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
                            <p>My Favorites</p>
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