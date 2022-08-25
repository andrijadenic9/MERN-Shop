import React, { useState, useEffect } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import customStyles from '../../assets/js/custom-modal-style';
import { ToastContainer, toast } from "react-toastify";
import './rating.scss';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import { flg } from '../../redux-store/rating-stars/ratingStarsSlice';
import AuthService from '../../services/AuthService';
import ShopService from '../../services/ShopService';

function RatingStarsModal({ product, getRatings, isModal, setIsModal }) {

    const { user } = useSelector(state => state.userStore);
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(null);
    const dispatch = useDispatch();
    const [isDisabled, setIsDisabled] = useState(true);
    let aVotes;

    const rateProduct = async (rating, id) => {
        dispatch(showLoader(true))

        // * GET VOTING FORM SPECIFIC USER
        await AuthService.getVoting(user._id)
            .then(res => {
                aVotes = res.data
                console.log(res.data, 'votedFor ARRAY');
            })
            .catch(err => {
                console.log(err, 'greska');
            })

        let isRated = aVotes.includes(id);
        if (!isRated) {
            await AuthService.setVoting({ userID: user._id, productID: id, rating })
                .then(res => {
                    console.log(res.data, 'ubacili smo u usera da je glasao za taj product');
                })
                .catch(err => {
                    console.log(err);
                })

            const allRatings = getRatings.allRatings;
            allRatings.push(rating);
            let ratingsSum = 0;
            allRatings.forEach(el => ratingsSum = ratingsSum + el);

            let averageRating = (ratingsSum / (allRatings.length)).toFixed(2);

            ShopService.setRatingStars({ allRatings, averageRating, id })
                .then(res => {
                    setIsModal(false);
                    dispatch(showLoader(false))
                    toast.success('You are successfully voted!');
                    dispatch(flg('test'))
                })
                .catch(err => {
                    console.log(err, "greska");
                    dispatch(showLoader(false))
                });
        } else {
            setIsModal(false);
            dispatch(showLoader(false));
            toast.warning('You already voted for this product');
            setRating(null);
        }
    }

    const enableRating = (ratingValue) => {
        setRating(ratingValue);
        setIsDisabled(false);
    }

    const cancelRating = () => {
        setRating(null);
        setIsDisabled(true);
        setIsModal(false);
    }

    return (
        <>
            {product && product.hasOwnProperty('_id') && <Modal isOpen={isModal} ariaHideApp={false} style={customStyles} centered>
                <h3 className='heading'>{product.title}</h3>
                <div className="stars-wrapper">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i + 1;
                        return (
                            <label key={i}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => {
                                        enableRating(ratingValue)
                                    }}
                                />
                                <FaStar
                                    className="ratingStarFill"
                                    color={
                                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                                    }
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                    size={30}
                                />
                            </label>
                        );
                    })}
                </div>

                <div className="btns-wrapper">
                    <button className="cancel" onClick={(e) => cancelRating()}>
                        Cancel
                    </button>
                    <button disabled={isDisabled} className={isDisabled ? "rateNo" : "rateYes"} onClick={(e) => rateProduct(rating, product._id)}>Rate</button>
                </div>
            </Modal>}

            <ToastContainer />
        </>
    )
}

export default RatingStarsModal;
