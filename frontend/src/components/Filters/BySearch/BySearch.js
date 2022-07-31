import React, { useState, useEffect } from 'react';
import '../filters.scss';

function BySearch({ allAds, setAllAds, constAds }) {

    const [searchTerm, setSearchTerm] = useState('');

    // TODO - WHEN SEARCH MAKE SEARCH TERM BE HIGHLITED ON AD
    // * GO THROUGH ALL ADS AND GIVE ME BACK IF SEARCHED TERM IS SAME AS AD TITLE OR DESCRIPTION
    useEffect(() => {
        if (searchTerm !== '') {
            let sortedAds = [...allAds]
            // ? filter through all my copy ads and where you find ad title or ad description include letters as searched term, fill my new array with these ads
            sortedAds = constAds.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()));
            setAllAds(sortedAds);
        } else {
            setAllAds(constAds);
        }
    }, [searchTerm])

    return (
        <div className="" role="search">
            <input className="form-control" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchTerm(e.target.value)} />
        </div>
    )
}

export default BySearch;
