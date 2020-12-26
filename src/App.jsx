import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar'
import Login from './components/Auth/Login/Login'
import Register from './components/Auth/Register/Register'
import Footer from "./components/Footer/Footer";
import "./styles/main.css"
import DisplayMovies from './components/Movies/DisplayMovies';
import MovieContext from './context/MovieContext';
import NotFound from './components/NotFound/NotFound';
import AddMovie from './components/Movies/AddMovie';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/queries';
import MovieDetails from './components/Movies/MovieDetails';



export default function App() {

   
    const [errorMessage, setErrorMessage] = useState();
    const [registered, setRegistered] =useState(false)
    const [users, setUsers] = useState();
    const [userToken, setUserToken] = useState()
    const [currentUserId, setCurrentUserId] = useState()
    
    
    
    useEffect(()=>{
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("currentUserId")
        setUserToken(token);
        setCurrentUserId(userId)
    },[])
    
    const {loading, data } = useQuery(GET_USERS)
    let getAllUsers = null;
    
    /* if(!loading){
     getAllUsers = data.getAllUsers;
    } */
    
   
   
    const values = {
        currentUserId,
        getAllUsers,
        errorMessage,
        setErrorMessage,
        registered,
        setRegistered,
        userToken,
        data 
    }

    return (
            <MovieContext.Provider value={values}>
                <Router>
                    <Navbar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {userToken && <Route path="/movies" component={DisplayMovies} />}
                            {userToken && <Route path="/add" component={AddMovie} />}
                            {userToken && <Route path="/movie/:id" component={MovieDetails} />}
                            <Route exact path="/login" component={Login} />
                            <Route exact  path="/register" component={Register} />
                            <Route component={NotFound}/>
                        </Switch>
                        <Footer />
                </Router>  
            </MovieContext.Provider>
    )
}
