import { useMutation } from '@apollo/client';
import Axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import MovieContext from '../../../context/MovieContext';
import { LOGIN } from '../../../graphql/queries';


import "../auth.css"

export default function Login() {
    
    const history = useHistory()
    const [credentials, setCredentials] = useState({})
    const [welcomeMessage, setWelcomeMessage] = useState("")
    const {errorMessage, setErrorMessage } = useContext(MovieContext);
    
    const onChange = (e) => setCredentials({...credentials, [e.target.name]: e.target.value});

    useEffect(()=>{
        const welcome = localStorage.getItem("welcome");
        setWelcomeMessage(welcome);
    },[])

    const [userLogIn, {loginError}] = useMutation(LOGIN,{
        onCompleted(data){
            
            localStorage.setItem("token", data.login.token);
            localStorage.setItem("currentUserId", data.login.id);
            window.location.replace("/movies")
        },
        onError(error){
            setErrorMessage(error.message)
            setTimeout(()=>{setErrorMessage()},3000)
        }
    })

    const handleLogin = (e)=>{
        e.preventDefault();
        const username = credentials.username;
        const password = credentials.password;
        userLogIn({variables:{username, password}})
        
    }
    
    return (
        <div className="container">
            <div className="auth-wrapper">
                <div className="auth-container">
                    <h1 style={{color:"rgb(21, 54, 116)", textAlign:"center"}}>LOGIN</h1>
                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <input className="form-input" required autcomplete="off" onChange={onChange} type="text" id="username" name="username" />
                            <label className="form-label" htmlFor="username">
                                <span>Username*</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <input className="form-input" required autoomplete="off" onChange={onChange} type="password" id="password" name="password" />
                            <label className="form-label" htmlFor="password">
                                <span>Password*</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <button className="btn-auth" type="submit">Login</button>
                        </div>
                        <p style={{margin: "auto"}}>Not yet registered? <Link style={{color: "green"}} to="/register">Register</Link></p>
                    </form>
                </div>
                {errorMessage && <p className ="errors">{errorMessage}</p>}
                {welcomeMessage && <p className ="welcome">{welcomeMessage}</p>}
            </div>
        </div>
    )
}