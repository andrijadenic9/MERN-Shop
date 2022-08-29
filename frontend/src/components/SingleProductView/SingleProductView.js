import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux-store/cart/cartSlice';
import ShopService from '../../services/ShopService';
import './SingleProductView.scss';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import RatingStars from '../Rating/RatingStars';
import RatingStarsModal from '../Rating/RatingStarsModal';
import { ToastContainer, toast } from "react-toastify";
import Comment from '../Comment/Comment';

function SingleProductView() {

    // * trenutno nicemu ne sluzi
    const [isAPIFinished, setIsAPIFinished] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const [isParamsValid, setIsParamsValid] = useState(true);
    const [product, setProduct] = useState({});
    const params = useParams();
    const dispatch = useDispatch();
    const symbol = useSelector(state => state.currencyStore.symbol);
    const currency = useSelector(state => state.currencyStore.currency);
    const flg = useSelector(state => state.ratingStarsStore.flg);


    useEffect(() => {
        console.log('use eff...', flg);
        if (flg) {
            ShopService.getSingleProductFromDB(product._id)
                .then(res => {
                    if (res.data) {
                        setProduct(res.data);
                        console.log(res.data, 'proizvod');
                    }
                })
                .catch(err => console.log(err));
        }
    }, [flg]);

    useEffect(() => {
        if (params.productID) {
            dispatch(showLoader(true));

            ShopService.getSingleProductFromDB(params.productID)
                .then(response => {
                    if (response && response.status === 200) {
                        // * without passing params.productID in getSingleProductFromDB
                        // setProduct(response.data.products[params.productID - 1]);
                        setProduct(response.data);
                        // console.log(response.data);
                    }
                    if (!response.data) {
                        setIsParamsValid(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setIsParamsValid(false);
                    // setIsParamsValid(err);
                })
                .finally(() => {
                    setIsAPIFinished(true);
                    dispatch(showLoader(false));
                })
        } else {
            setIsParamsValid(false);
        }
    }, [])

    function noParamsLayout() {
        return !isParamsValid ? <div>Such a product does not exist</div> : null;
    }

    const addToCart = () => {
        setIsAdded(true);
        dispatch(addItem(product))
    }

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

    // TODO MAKE ARROWS TO SHOW NEXT AND PREVIOUS PRODUCT


    const [isModal, setIsModal] = useState(false);
    const [getRatings, setGetRatings] = useState(0);

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
            {noParamsLayout()}
            {
                product && product.hasOwnProperty('_id') ?
                    <div className="container">
                        <div className="row">
                            <div className="col-6 single-product-picture">
                                <img src={`http://localhost:4000/uploadedFiles/${product.img}`} alt={product.title} />
                                <div className="details">
                                    <span className="category"><span>cat: </span><span>{product.category}</span></span>
                                    {/* <span className="rating"><span>rating:</span> <span>{product.rating}</span></span> */}
                                    {/* <span className="stock"><span>inStock:</span> <span>{product.stock}</span></span> */}
                                </div>
                            </div>
                            <div className="col-6 single-product-description">
                                <div className="headings">
                                    {/* <p>{product.brand}</p> */}
                                    <h3>{product.title}</h3>
                                    {/* <Rating ratingNumber={product.rating} singleProduct={product} /> */}
                                    <div onClick={() => { openModal(product._id, product.title) }}>
                                        <RatingStars ratingNumber={product.rating} product={product} />
                                    </div>
                                </div>
                                <p>{product.description}</p>
                                <div className="details">
                                    {/* <span className="discount"><span>discount</span> <span>{product.discountPercentage}%</span></span> */}
                                    <span className="price">{checkPrice()} {symbol}</span>
                                </div>
                                <div className="add-to-cart-btn-wrapper">
                                    <button onClick={addToCart}>Add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }

            <Comment product={product} />

            <RatingStarsModal product={product} getRatings={getRatings} isModal={isModal} setIsModal={setIsModal} />

            <ToastContainer />
        </>
    )
}

export default SingleProductView;
