import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Redirect, Link } from 'react-router-dom';
import {useMutation} from '@apollo/client';
import "../auth.css"
import { REGISTER } from '../../../graphql/queries';
import MovieContext from '../../../context/MovieContext';

export default function Signup() {

    const history = useHistory()
    const {errorMessage, setErrorMessage, registered, setRegistered} = useContext(MovieContext);
    const [credentials, setCredentials] = useState({})

    const [userRegister, {registerError}] = useMutation(REGISTER,{
        onCompleted(user){
            user && setRegistered(!registered)
            localStorage.setItem("welcome","Now you can login with your new account!")
        },
        onError(error){
            setErrorMessage(error.message)
            setTimeout(()=>{setErrorMessage()},3000)
        }
    })
    
    const onChange = (e) => setCredentials({...credentials, [e.target.name]: e.target.value});
    

    const handleRegister = (e)=>{
        e.preventDefault();
        let username = credentials.username;
        let password = credentials.password;
        let confirmPassword = credentials.confirmPassword;
        userRegister({variables: {username, password, confirmPassword}})
    }
    
    return (
        <div className="container">
            <div className="auth-wrapper">
                <div className="auth-container">
                    <h1 style={{color:"rgb(21, 54, 116)", textAlign:"center"}} >REGISTER</h1>
                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="form-group">
                            <input autoComplete="off" required className="form-input" onChange={onChange} type="text" id="username" name="username" />
                            <label className="form-label" htmlFor="username">
                                <span>Username*</span> 
                            </label>
                        </div>
                        
                        <div className="form-group">
                            <input autoComplete="off" required className="form-input" onChange={onChange}type="password" id="password" name="password" />
                            <label className="form-label" htmlFor="password">
                                <span>Password*</span> 
                            </label>
                        </div>
                        <div className="form-group">
                            <input autoComplete="off" required className="form-input" onChange={onChange} type="password" id="confirmPassword" name="confirmPassword" />
                            <label className="form-label" htmlFor="confirmPassword">
                                <span>Confirm Password*</span> 
                            </label>
                        </div>
                        <div className="form-group">
                            <button className="btn-auth" type="submit">Register</button>
                        </div>
                        <p style={{margin: "auto"}}>Alrady registered? <Link style={{color: "green"}} to="/login">Login</Link></p>
                    </form>
                </div>
              {errorMessage && <p className ="errors">{errorMessage}</p>}
            </div>
            {registered && <Redirect to="/login" />}
        </div>
    )
}