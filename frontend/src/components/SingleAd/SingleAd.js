import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routeConfig } from "../../config/routeConfig";
import ShopService from "../../services/ShopService";
import RatingStars from "../Rating/RatingStars";
import RatingStarsModal from "../Rating/RatingStarsModal";
import { toast } from "react-toastify";
import './SingleAd.scss';
import { checkPrice } from "../../redux-store/currency/currencySlice";

function SingleAd({ product }) {
    const symbol = useSelector(state => state.currencyStore.symbol);
    const currency = useSelector(state => state.currencyStore.currency);
    useEffect(() => {
        // console.log(product);
    }, [currency])

    // * MAKING PRICESES LOOK
    function getEndPrice(price) {
        const endPrice = price.toFixed(2).split('');
        if (endPrice.length > 6 && endPrice.length < 10) {
            endPrice.splice(-6, 0, ',');
        } else if (endPrice.length >= 10) {
            endPrice.splice(-6, 0, ',');
            endPrice.splice(-10, 0, ',');
        }
        return endPrice;
    }

    // * GETING PRICESES
    function checkPrice() {
        if (currency === 'USD') {
            const price = product.price;
            return getEndPrice(price);
        }
        if (currency === 'EUR') {
            const price = product.price * 0.98;
            return getEndPrice(price);
        }
        if (currency === 'RSD') {
            const price = product.price * 118.32;
            return getEndPrice(price);
        }
    }

    const [isModal, setIsModal] = useState(false);
    const [getRatings, setGetRatings] = useState(0);
    const dispatch = useDispatch();

    const openModal = (id) => {
        if (localStorage.user) {
            setIsModal(true);
            ShopService.getRating(id)
                .then(res => {
                    console.log(res.data, "podaci");
                    setGetRatings(res.data)
                })
                .catch(err => {
                    console.log(err, "greska");
                });
        } else {
            toast.info('Please login to vote');
        }
    }

    return (
        <>
            {/* FROM DB */}
            <div className="col-md-6 col-lg-4 col-xl-3" key={product._id}>
                <div className="card text-black">
                    <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                    <img src={`http://localhost:4000/uploadedFiles/${product.img}`} className="card-img-top" alt={product.title} />
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title">{product.title}</h5>
                            {/* <p className="text-muted mb-4">{product.brand}</p> */}
                            <div onClick={() => { openModal(product._id, product.title) }}>
                                <RatingStars ratingNumber={product.rating} product={product} />
                            </div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between">
                                <span>Rating</span><span>{product.rating}</span>
                            </div>
                            {/* <div className="d-flex justify-content-between">
                                <span>Discout</span><span>{product.discountPercentage}</span>
                            </div> */}
                            <div className="d-flex justify-content-between">
                                <span>Price</span><span>{checkPrice()} {symbol}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between total font-weight-bold mt-4">
                            <span>{product.description}</span>
                        </div>
                        <button><Link to={routeConfig.PRODUCT_PAGE.realUrl(product._id)}>View add</Link></button>
                    </div>
                </div>
            </div>

            <RatingStarsModal product={product} getRatings={getRatings} isModal={isModal} setIsModal={setIsModal} />
        </>
    )
}

export default SingleAd;


{/* <div className="col-md-6 col-lg-4 col-xl-3" key={ad.id}>
                <div className="card text-black">
                    <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                    <img src={ad.images[0]} className="card-img-top" alt="Apple Computer" />
                    <div className="card-body">
                        <div className="text-center">
                            <h5 className="card-title">{ad.title}</h5>
                            <p className="text-muted mb-4">{ad.brand}</p>
                            <div onClick={() => { openModal(ad._id, ad.title) }}>
                                <RatingStars ratingNumber={ad.rating} product={ad} />
                            </div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between">
                                <span>Rating</span><span>{ad.rating}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Discout</span><span>{ad.discountPercentage}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Price</span><span>{checkPrice()} {symbol}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between total font-weight-bold mt-4">
                            <span>{ad.description}</span>
                        </div>
                        <button><Link to={routeConfig.PRODUCT_PAGE.realUrl(ad.id)}>View add</Link></button>
                    </div>
                </div>
            </div>

            <RatingStarsModal product={ad} getRatings={getRatings} isModal={isModal} setIsModal={setIsModal} />
        </> */}