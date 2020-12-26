import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import MovieContext from '../../context/MovieContext';

import "./home.css";
export default function Home() {
    const {userToken} = useContext(MovieContext);
    const history = useHistory() 
    
    return (
        <div className="container">
            <div className="main-heading">
                <h1 className="heading-title">Welcome to the Movie Client</h1>
                <input type="submit" onClick={userToken ? ()=>history.push("/movies") : ()=>history.push("/login")} className="btn-auth" value={userToken ? "Browse catalog" : "Login"}/>
            </div>
        </div>
    )
}
