import { useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react'
import actorIMG from "../../svg/user-circle-regular.svg"
import { GET_SELECTED_MOVIE } from '../../graphql/queries';
import MovieContext from '../../context/MovieContext';
import StarsRating from './StarsRating';

export default function MovieDetails(props) {
    const {id} = props.match.params;
    const { currentUserId} = useContext(MovieContext)
    const [rating, setRating] = useState()
    const {loading,error,data} = useQuery(GET_SELECTED_MOVIE,{
        variables: {
            id: id
        }
    })
   
    if(loading){
        return "Loading...";
        
    }
    if(error){
        return `Error! ${error.message}`
    }

    if (data){

        const {name,imageURL,releaseDate,duration,actors,averageRating} = data.getSelectedMovie;
        return (
            <div className="container">
                <div key={id} className="main-container big">
                    <div className="bookmark-card">
                        <div className="title-container">
                            <h2 className ="card-title">{name}</h2>
                        </div>
                        <img className="card-image-big" src={imageURL} alt="movie"/>       
                        
                        <div className="movie-details">
                            <div className="detail-box">
                                <h3>Release year:</h3>
                                <p>{releaseDate}</p>
                            </div>
                            <div className="detail-box">
                                <h3>Average rating:</h3>
                                <p>{averageRating}</p>
                            </div>
                            <div className="detail-box">
                                <h3>Duration:</h3>
                                <p>{duration} min</p>
                            </div>
                        </div>
                       <StarsRating />
                    </div>
                </div>
                <div className="actors-section">
                    <h2>Main actors</h2>
                    <div className="actors-container">
                        {actors.map(actor => {
                            return(
                                <div className="actor-box">
                                    <div className="header">
                                        <img className="actor-img" src={actorIMG} alt="actor"/>
                                    </div>
                                    <h3>{actor}</h3>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>       
        )


    }
}
