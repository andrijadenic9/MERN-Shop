import React, { useEffect, useState } from 'react';
import '../filters.scss';

function ByRange({ allAds, setAllAds, constAds }) {

    const [filterValue, setFilterValue] = useState('');
    const [maxPrice, setMaxPrice] = useState(0);

    // * ON RANGE CHANGE SHOW ADS WHERE PRICE IS SMALLER THAN CHOOSEN
    const handleInputRange = (e) => {
        // ? set value from range that user selected
        let price = e.target.value;
        setFilterValue(price);

        let sortedAds = [...allAds];
        if (parseInt(price) !== 0) {
            // ? and give me back array with ads witch price is smaller or equal than selected price by user
            sortedAds = constAds.filter(item => item.price <= parseInt(price));
            setAllAds(sortedAds);
        } else {
            setAllAds(constAds);
        }
    }

    // * WHEN 'constAds' ARIVES AT COMPONENT MAKE ARRAY FULL OF ALL PRICES AND GIVE ME THE HIGHEST ONE
    useEffect(() => {
        let allPrices = [];
        // ? go throught all ads and fill new array with prices only
        for (let i = 0; i < constAds.length; i++) {
            allPrices.push(constAds[i].price);
        }
        // ? give me back the highest price
        let highestPrice = Math.max(...allPrices);
        setMaxPrice(highestPrice);
    }, [constAds]);

    return (
        <div className="range">
            <label htmlFor="priceRange" className="form-label">Price: {filterValue > 0 ? '$' + filterValue : null} </label>
            {maxPrice && <input onInput={e => handleInputRange(e)} type="range" className="form-range" defaultValue="0" min="0" max={maxPrice} step="1" id="priceRange" />}
        </div>
    )
}

export default ByRange
