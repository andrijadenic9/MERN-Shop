import React, { useState, useEffect } from 'react';
import ShopService from '../../services/ShopService';
import SingleAd from '../../components/SingleAd/SingleAd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import BySelection from '../../components/Filters/BySelection/BySelection';
import BySearch from '../../components/Filters/BySearch/BySearch';
import ByRange from '../../components/Filters/ByRange/ByRange';

function Shop() {

    const dispatch = useDispatch();
    const [constAds, setConstAds] = useState([]);
    const [allProducts, setAllProducts] = useState('');

    useEffect(() => {
        dispatch(showLoader(true));
        ShopService.getProductFromDB()
            .then(res => {
                if (res && res.status === 200) {
                    console.log(res);
                    setAllProducts(res.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                dispatch(showLoader(false));
            })
    }, []);

    const flg = useSelector(state => state.ratingStarsStore.flg);

    useEffect(() => {
        console.log('use eff...', flg);
        if (flg) {
            ShopService.getProductFromDB()
                .then(res => {
                    if (res.data) setAllProducts(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [flg]);

    // const dispatch = useDispatch();
    // const [allAds, setAllAds] = useState([]);
    // const [constAds, setConstAds] = useState([]);

    // useEffect(() => {
    //     dispatch(showLoader(true));
    //     ShopService.getAds()
    //         .then(response => {
    //             if (response && response.status === 200) {
    //                 // console.log(response.data.products);
    //                 setAllAds(response.data.products);
    //                 setConstAds(response.data.products);
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    //         .finally(() => {
    //             dispatch(showLoader(false));
    //         })
    // }, []);

    // const addProduct = (e) => {
    //     e.preventDefault();
    //     ShopService.addNewProduct({
    //         img: 'https://img.gigatron.rs/img/products/large/45cbe9f9259d774b35ad767eed8ec815.png',
    //         title: 'LENOVO IdeaPad Gaming 3 15ACH6',
    //         description: 'EAN:214019 Model procesora:AMD Cezanne Ryzen 5 5600H do 4.2GHz Dijagonala ekrana:15.6" Tip grafičke karte:GeForce GTX 1650 RAM (memorija):8GB HDD SSD:512GB SSD',
    //         category: 'tehnology',
    //         price: 750,
    //         rating: 2.21,
    //         userId: "629b988fb09d209265018eec",
    //         allRatings: []
    //     })
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch(err => {

    //         })
    // }
    return (
        <div className="container py-5">
            {/* <button onClick={addProduct}>Add new product</button> */}
            <div className="filters">
                <ByRange allProducts={allProducts} setAllProducts={setAllProducts} constAds={constAds} />
                <BySearch allProducts={allProducts} setAllProducts={setAllProducts} constAds={constAds} />
                <BySelection allProducts={allProducts} setAllProducts={setAllProducts} constAds={constAds} />
            </div>

            <div className="row justify-content-center">
                {
                    allProducts.length > 0 ?
                        allProducts.map(product => {
                            return <SingleAd product={product} key={product.id} />
                        })
                        : null
                }
            </div>
        </div>

        // <div className="container py-5">
        //     {/* <button onClick={addProduct}>Add new product</button> */}
        //     <div className="filters">
        //         <ByRange allAds={allAds} setAllAds={setAllAds} constAds={constAds} />
        //         <BySearch allAds={allAds} setAllAds={setAllAds} constAds={constAds} />
        //         <BySelection allAds={allAds} setAllAds={setAllAds} constAds={constAds} />
        //     </div>

        //     <div className="row justify-content-center">
        //         {
        //             allAds.length > 0 ?
        //                 allAds.map(ad => {
        //                     return <SingleAd ad={ad} key={ad.id} />
        //                 })
        //                 : null
        //         }
        //     </div>
        // </div>
    )
}

export default Shop;