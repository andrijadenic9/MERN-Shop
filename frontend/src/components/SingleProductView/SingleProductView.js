import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux-store/cart/cartSlice';
import ShopService from '../../services/ShopService';
import './SingleProductView.scss';
import { showLoader } from '../../redux-store/loader/loaderSlice';

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


    useEffect(() => {

        if (params.productID) {
            dispatch(showLoader(true));

            ShopService.getSingleProduct(params.productID)
                .then(response => {

                    if (response && response.status === 200) {
                        // * without passing params.productID in getSingleProduct
                        // setProduct(response.data.products[params.productID - 1]);
                        setProduct(response.data);
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

    return (
        <>
            {noParamsLayout()}
            {
                product && product.hasOwnProperty('id') ?
                    <div className="container">
                        <div className="row">
                            <div className="col-6 single-product-picture">
                                <img src={product.images[0]} alt="" />
                                <div className="details">
                                    <span className="category"><span>cat:</span> <span>{product.category}</span></span>
                                    <span className="rating"><span>rating:</span> <span>{product.rating}</span></span>
                                    <span className="stock"><span>inStock:</span> <span>{product.stock}</span></span>
                                </div>
                            </div>
                            <div className="col-6 single-product-description">
                                <div className="headings">
                                    <p>{product.brand}</p>
                                    <h3>{product.title}</h3>
                                </div>
                                <p>{product.description}</p>
                                <div className="details">
                                    <span className="discount"><span>discount</span> <span>{product.discountPercentage}%</span></span>
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
        </>
    )
}

export default SingleProductView;
