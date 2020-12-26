import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import MovieContext from '../../context/MovieContext';

export default function MovieCard() {
    const { movieList } = useContext(MovieContext);

    return (
        <>
            {movieList.map(movie => {
                const {id,name,imageURL,releaseDate,duration,actors,averageRating,reactions} = movie;
                console.log(imageURL)
                return(
                    <div key={id} className="main-container">
                        <div className="bookmark-card">
                            <div className="title-container">
                                <h2 className ="card-title">{name}</h2>
                            </div>
                            <img className="card-image" src="https://images-na.ssl-images-amazon.com/images/I/51AlhsSOmsL._AC_.jpg" alt="movie"/>
                           
                            <div className="info">
                                <p className ="released">Released in <strong>{releaseDate}</strong></p>
                                <p className ="rating">Average rating: {averageRating}</p>
                                <Link className="more" to ="/">More</Link>
                            </div>
                        </div>
                    </div>
                
            )

            })}
        </>
    )
}
