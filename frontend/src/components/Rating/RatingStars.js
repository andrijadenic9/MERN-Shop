import React from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import './rating.scss';

const starStyle = {
    color: '#ffc107',
    fontSize: '25px',
}

function RatingStars({ ratingNumber }) {
    let ratingStars = [];

    getStars();
    function getStars() {
        for (let i = 0; i < 5; i++) {
            if (ratingNumber > i) {
                if (ratingNumber > 0.5 + i) ratingStars.push(<span><FaStar style={starStyle} /></span>);
                else ratingStars.push(<span><FaStarHalfAlt style={starStyle} /></span>);
            } else {
                ratingStars.push(<span><FaRegStar style={starStyle} /></span>);
            }
        }
    }

    return (
        <>
            <div className="rating-stars">{ratingStars.map(star => star)}</div>
        </>
    )
}

export default RatingStars;
