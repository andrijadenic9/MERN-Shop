import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routeConfig } from "../../config/routeConfig";
import Rating from "../Rating/Rating";
import './SingleAd.scss';

function SingleAd({ ad }) {
    const symbol = useSelector(state => state.currencyStore.symbol);
    const currency = useSelector(state => state.currencyStore.currency);

    // useEffect(() => {
    //     console.log(currency, 'CUR');
    //     console.log(symbol, 'SYMB');
    // }, [currency])

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
            const price = ad.price;
            return getEndPrice(price);
        }
        if (currency === 'EUR') {
            const price = ad.price * 0.98;
            return getEndPrice(price);
        }
        if (currency === 'RSD') {
            const price = ad.price * 118.32;
            return getEndPrice(price);
        }
    }

    return (
        <div className="col-md-6 col-lg-4 col-xl-3" key={ad.id}>
            <div className="card text-black">
                <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                <img src={ad.images[0]} className="card-img-top" alt="Apple Computer" />
                <div className="card-body">
                    <div className="text-center">
                        <h5 className="card-title">{ad.title}</h5>
                        <p className="text-muted mb-4">{ad.brand}</p>
                        {/* <Rating /> */}
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
    )
}

export default SingleAd;
