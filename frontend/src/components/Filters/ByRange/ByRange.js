import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRangePrice } from '../../../redux-store/currency/byRangeSlice';
import '../filters.scss';

function ByRange({ allProducts, setAllProducts, constProducts }) {

    const [filterValue, setFilterValue] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);
    const currency = useSelector(state => state.currencyStore.currency);
    const dispatch = useDispatch();
    const rangePrice = useSelector(state => state.byRangeStore.rangePrice);

    useEffect(() => {
        if (currency === 'USD') setFilterValue(rangePrice);
        if (currency === 'EUR') setFilterValue(rangePrice * 0.98);
        if (currency === 'RSD') setFilterValue(rangePrice * 118);
    }, [currency])

    const checkSymbol = () => {
        if (currency === 'USD') return '$'
        if (currency === 'EUR') return '€'
        if (currency === 'RSD') return 'дин'
    }

    // * ON RANGE CHANGE SHOW ADS WHERE PRICE IS SMALLER THAN CHOOSEN
    const handleInputRange = (e) => {
        // ? set value from range that user selected
        if (currency === 'USD') var price = e.target.value;
        if (currency === 'EUR') var price = e.target.value * 0.98;
        if (currency === 'RSD') var price = e.target.value * 118;
        dispatch(setRangePrice(e.target.value));
        setFilterValue(price);

        let sortedProducts = [...allProducts];
        if (parseInt(price) !== 0) {
            // ? and give me back array with ads witch price is smaller or equal than selected price by user
            if (currency === 'USD') sortedProducts = constProducts.filter(item => item.price <= parseInt(price));
            if (currency === 'EUR') sortedProducts = constProducts.filter(item => item.price * 0.98 <= parseInt(price));
            if (currency === 'RSD') sortedProducts = constProducts.filter(item => item.price * 118 <= parseInt(price));
            setAllProducts(sortedProducts);
        } else {
            setAllProducts(constProducts);
        }
    }

    // * WHEN 'constProducts' ARIVES AT COMPONENT MAKE ARRAY FULL OF ALL PRICES AND GIVE ME THE HIGHEST ONE
    useEffect(() => {
        let allPrices = [];
        // ? go throught all ads and fill new array with prices only
        for (let i = 0; i < constProducts.length; i++) {
            allPrices.push(constProducts[i].price);
        }
        // ? give me back the highest price
        let highestPrice = Math.max(...allPrices);
        setMaxPrice(highestPrice);
    }, [constProducts]);

    return (
        <div className="range">
            <label htmlFor="priceRange" className="form-label">Price: {filterValue > 0 ? filterValue + ' ' + checkSymbol() : null}</label>
            {maxPrice && <input onInput={e => handleInputRange(e)} type="range" className="form-range" defaultValue="0" min="0" max={maxPrice} step="1" id="priceRange" />}
        </div>
    )
}

export default ByRange
