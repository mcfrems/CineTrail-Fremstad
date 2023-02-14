import {useState, createContext, useEffect} from 'react'

//1 - create blank context
export const ThemeContext = createContext();
//2 - assign a value
//3 - provide value to children
export default function ThemeContextProvider(props){
    //create my global state
    const [darkMode, setDarkMode] = useState(true)
    useEffect(
        ()=>{
            //get value from localStorage
            const theme = localStorage.getItem("darkmode")
            //make sure it is not null
            console.log(theme)
            if (theme != null){
                //all values in local Storage are stored as string
                setDarkMode(JSON.parse(theme))
            }

        }, [] //runs once when component loads
     )

    return(
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}