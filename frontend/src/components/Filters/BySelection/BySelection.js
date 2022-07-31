import React, { useState, useEffect } from 'react';
import '../filters.scss';

function BySelection({ allAds, setAllAds, constAds }) {

    const [selected, setSelected] = useState('default');

    // * WHEN USER CHANGE OPTION, GIVE ME WHAT HE WANT AND SORT ALL OF MY ADS BASE ON OPTION USER CHOOSE
    useEffect(() => {
        let sortedAds;

        if (selected === "default") {
            setAllAds(constAds);
        } else if (selected === "low-price") {
            // ? go throught all my copy ads and give me back array of ads where price goes from lower to higher 
            sortedAds = [...allAds];
            sortedAds = sortedAds.sort((a, b) => a.price - b.price);
            setAllAds(sortedAds);

        } else if (selected === "high-price") {
            // ? go throught all my copy ads and give me back array of ads where price goes from higher to lower 
            sortedAds = [...allAds];
            sortedAds = sortedAds.sort((a, b) => b.price - a.price);
            setAllAds(sortedAds);
        }
    }, [selected]);

    return (
        <select onChange={e => { setSelected(e.target.value) }} defaultValue="default" className="select form-select" name="prices">
            <option value="default">Default</option>
            <option value="low-price">Low price</option>
            <option value="high-price">High price</option>
        </select>
    )
}

export default BySelection;
