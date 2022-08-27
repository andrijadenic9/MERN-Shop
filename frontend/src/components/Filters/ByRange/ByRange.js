import React, { useEffect, useState } from 'react';
import '../filters.scss';

function ByRange({ allProducts, setAllProducts, constProducts }) {

    const [filterValue, setFilterValue] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);

    // * ON RANGE CHANGE SHOW ADS WHERE PRICE IS SMALLER THAN CHOOSEN
    const handleInputRange = (e) => {
        // ? set value from range that user selected
        let price = e.target.value;
        setFilterValue(price);

        let sortedProducts = [...allProducts];
        if (parseInt(price) !== 0) {
            // ? and give me back array with ads witch price is smaller or equal than selected price by user
            sortedProducts = constProducts.filter(item => item.price <= parseInt(price));
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
            <label htmlFor="priceRange" className="form-label">Price: {filterValue > 0 ? '$' + filterValue : null} </label>
            {maxPrice && <input onInput={e => handleInputRange(e)} type="range" className="form-range" defaultValue="0" min="0" max={maxPrice} step="1" id="priceRange" />}
        </div>
    )
}

export default ByRange
