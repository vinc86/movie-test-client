import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import MovieContext from '../../context/MovieContext';
import { ADD_MOVIE, GET_MOVIES } from '../../graphql/queries';

export default function AddMovie() {
    const {errorMessage, setErrorMessage, currentUserId} = useContext(MovieContext);
    const [movie, setMovie]= useState({});
    const [actors, setActors] = useState([])
    const [message, setMessage] = useState()
    const history = useHistory()
    const [addMovie, {loading, onError}] = useMutation(ADD_MOVIE,{
        onCompleted(data){
            setMessage("Movie added successfully!")
        },
        onError(onError){
            console.log(onError)
            setErrorMessage(onError.message)
            setTimeout(()=>{setErrorMessage()},3000)
        }
    })
    
    const onChange = (e) => {
        if(e.target.name !== "actors"){
            setMovie({...movie,userId:currentUserId,[e.target.name]:e.target.value})
        } else {
            setActors({...actors,[e.target.name]:e.target.value.split(",")})
        }
        
    };
    const newMovie = {...movie, ...actors};
   
    const saveMovie =(e)=>{
        e.preventDefault();
        addMovie({variables: {
            ...newMovie,
            releaseDate: +newMovie.releaseDate,
            duration: +newMovie.duration
            },
            refetchQueries: [
                {
                  query: GET_MOVIES,
                },
            ],
        })
        
       
    }

    return (
        <div className="container">
        <div className="movie-wrapper">
            <div className="movie-container">
                <h1 style={{color:"#fff", textAlign:"center"}} >ADD A NEW MOVIE</h1>
                <form onSubmit={saveMovie} className="auth-form">
                    <div className="form-group">
                        <label className ="movie-label" htmlFor="name">
                            Name*
                        </label>
                        <input autoComplete="off" required className="movie-input" onChange={onChange} type="text" id="name" name="name" />
                    </div>
                        
                    <div className="form-group">
                        <label className ="movie-label" htmlFor="imageURL">
                            Image URL*
                        </label>
                        <input autoComplete="off" required className="movie-input" onChange={onChange} placeholder="E.g.: https://www.image.example.jpg" type="url" id="imageURL" name="imageURL" />
                    </div>
                    <div className="form-group">
                        <label className ="movie-label" htmlFor="releaseDate">
                            Release year*
                        </label>
                        <input autoComplete="off" required className="movie-input" onChange={onChange} type="number" id="releaseDate" name="releaseDate" />
                    </div>
                    <div className="form-group">
                        <label className ="movie-label" htmlFor="duration">
                            Duration* (in minutes)
                        </label>
                        <input autoComplete="off" required className="movie-input" onChange={onChange} type="number" id="duration" name="duration" />
                    </div>
                    <div className="form-group">
                        <label className ="movie-label" htmlFor="actors">
                            Actors* (separated by comma)
                        </label>
                        <input autoComplete="off" required className="movie-input" onChange={onChange} type="text" id="actors" name="actors" />
                    </div>
                    <div className="form-group">
                        <button className="btn-auth" type="submit">Save</button>
                    </div>
                </form>
            </div>
          {errorMessage && <p className ="errors">{errorMessage}</p>}
          {message && <p className ="errors">{message}</p>}
        </div>
        
    </div>
    )
}
