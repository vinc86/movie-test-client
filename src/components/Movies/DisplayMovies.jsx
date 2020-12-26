import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import MovieContext from '../../context/MovieContext';
import { DELETE_MOVIE, GET_MOVIES } from '../../graphql/queries';
import trash from "../../svg/trash-alt-regular.svg";
import "./movies.css"

export default function DisplayMovies() {
    const [sort, setSort] = useState('name');
    const {currentUserId} = useContext(MovieContext)
    
    const [movieToDelete] = useMutation(DELETE_MOVIE,{refetchQueries: [
        {
            query: GET_MOVIES,
        }
    ]})
    
    const deleteMovie = (e,id) =>{
        e.preventDefault();
        movieToDelete({
            variables: {id: id},
        })
    }
    const sortingOptions = [
        "name",
        "duration",
        "releaseDate",
        "averageRating"
    ]
    const onChange =(e)=> setSort(e.target.value);

    const {data} = useQuery(GET_MOVIES,{
        variables: { sortBy: sort },
      })
     

    return (
        <>
        <div className="top">
            <h3 style={{color: "#fff"}}>Sort movies by: </h3>
            <select name="movie" id="movie">
                {sortingOptions.map(option => {
                    return (
                        <option onClick={onChange} value={option}>{option}</option>
                    )
                })}
            </select>
        </div>
        <div className="container">
            {data && data.getMovies.map(movie => {
               
                const {id,name,userId,imageURL,releaseDate,averageRating} = movie;
               
                return(
                    <div key={id} className="main-container">
                        <div className="bookmark-card">
                            <div className="title-container">
                        
                                <h2 className ="card-title">{name}</h2>
                            </div>
                            <img className="card-image" src={imageURL} alt="movie"/>
                           
                            <div className="info">
                                <p className ="released">Released in <strong>{releaseDate}</strong></p>
                                <p className ="rating">Average rating: {averageRating}</p>
                                <Link className="more" to={`/movie/${id}`}>More</Link>
                                {/* the user can delete only the movies associated with his id */}
                                {currentUserId === userId && <button onClick={(e)=>deleteMovie(e,id)} className ="btn-delete" ><img src={trash} alt="trash"></img></button>}
                            </div>
                        </div>
                    </div>
                
            )})}
        </div>    
       </>
    )
}
