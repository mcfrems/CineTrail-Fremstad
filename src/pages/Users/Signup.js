import React from 'react'
import "./Users.css"
import axios from 'axios';
import {Link} from "react-router-dom"

function Signup() {

    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [username, setUsername] = React.useState("")
    const [success, setSuccess] = React.useState(false)

    const handleSignup = (e) =>{
        e.preventDefault();
        console.log(email)
        //make post request and send email, passowrd, and username to create new user
        axios.post(`${serverUrl}/users/signup`, {email, password, username})
        .then( res => {
            console.log(res.data)
            //status 409 mean user already exists
            if (res.data.status === 409){
                alert('email already exists')
            }
            else{
                //clear text boxes
                setEmail("")
                setPassword("")
                setUsername("")
                setSuccess(true)
            }
        })
        .catch(err => console.log(err))
    }

  return (
    <div className="sign-container">
        <form className="signup-form" onSubmit={handleSignup}>
            <div className="title-container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
            </div>

            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" required/>
            </div>

            <div className="input-wrapper">
                <label htmlFor="pwd">Password</label>
                <input type="password" id="pwd" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter password" required/>
            </div>

            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Enter username" required/>
            </div>

            <div className="button-container">
                <button type="reset" className="cancel-btn">Cancel</button>
                <button type="submit" className="sign-btn">Sign up</button>
            </div>
            
            {
            success?
            <p className="sign-message">You are signed up successfully &nbsp;
            <Link to="/signin" className="red-text">Signin</Link></p>     
            :
            <p className="sign-message">Already have an account? &nbsp;
            <Link to="/signin" className="red-text">Signin</Link></p>    
            }

        </form>
    </div>
  )
}

export default Signup