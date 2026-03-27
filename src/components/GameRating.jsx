import React, { useEffect, useState } from 'react'
import './gameRating.css'

function GameRating({ rating }) {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        if (rating > 5 || rating < 1) {
            setStars([]);
            return;
        }

        setStars(Array.from({ length: rating }, (_, index) => index));
    }, [rating])
    return (
        <div className="gameRating">
            {stars.map((star, index) => (
                <i key={index} className="bi bi-star-fill"></i>
            ))}
        </div>
    )
}

export default GameRating