import React from 'react'
import fourOfour from '../../svg/404.png';
import "./notfound.css";

export default function NotFound() {
    return (
        <div className = "container-not-found">
            <img src={fourOfour} alt="not-found"/>
        </div>
    )
}
