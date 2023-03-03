import {useState, createContext, useEffect} from 'react'

//1 - create blank context
export const UserContext = createContext();
//2 - assign a value
//3 - provide value to children
export default function UserContextProvider(props){
    //create my global state
    const [user, setUser] = useState("")
    const [token, setToken] = useState("")

    useEffect(
        ()=>{
            //get value from localStorage
            setToken(localStorage.getItem("token"))
            setUser(JSON.parse(localStorage.getItem("userInfo")))

        }, [] //runs once when component loads
     )

    return(
        <UserContext.Provider value={{user, setUser, token, setToken}}>
            {props.children}
        </UserContext.Provider>
    )
}