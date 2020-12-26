import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { RATE_MOVIE } from '../../graphql/queries'
import "./starsRating.css"
const Star = ({starId, rating,onMouseEnter,onMouseLeave, onClick}) =>{

    let styleClass = "star-rating-blank"
    if(rating > starId){
        styleClass = "star-rating-filled"
    }
    return(
        <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        >
            <svg
            className={styleClass}
                height="55px"
                width="53px"
                viewBox="0 0 25 23"
                data-rating="1"
              >
                <polygon
                  stroke-width="0"
                  points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
                />
              </svg>
        </div>
    )
}

export default function StarsRating() {
    const [rating, setRating]= useState(0);
    const [hoverState, setHoverState]= useState(0);
    const stars = [1,2,3,4,5];
    console.log("hover state",hoverState)
    console.log("rating",rating)

    

    return (
        <div className ="stars-container">
            <h2>Rate Movie</h2>
            <div className="stars-box">
            {stars.map((star,i)=>{
                return(
                    <Star 
                        key={i}
                        starId={i}
                        rating={hoverState || rating}
                        onMouseEnter={()=>setHoverState(i+1)}
                        onMouseLeave={()=>setHoverState(0)}
                        onClick={()=>{setRating(i+1)}}
                    />
                )
            })}
            </div>
        </div>
    )
}
