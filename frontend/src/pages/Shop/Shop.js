import React, { useState, useEffect } from 'react';
import ShopService from '../../services/ShopService';
import SingleAd from '../../components/SingleAd/SingleAd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import BySelection from '../../components/Filters/BySelection/BySelection';
import { ToastContainer, toast } from "react-toastify";
import BySearch from '../../components/Filters/BySearch/BySearch';
import ByRange from '../../components/Filters/ByRange/ByRange';

function Shop() {

    const dispatch = useDispatch();
    const [constProducts, setConstProducts] = useState([]);
    const [allProducts, setAllProducts] = useState('');

    useEffect(() => {
        dispatch(showLoader(true));
        ShopService.getProductsFromDB()
            .then(res => {
                if (res && res.status === 200) {
                    // console.log(res);
                    setAllProducts(res.data)
                    setConstProducts(res.data);

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
        // console.log('use eff...', flg);
        if (flg) {
            ShopService.getProductsFromDB()
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

    return (
        <div className="container py-5">
            {/* <button onClick={addProduct}>Add new product</button> */}
            <div className="filters">
                <ByRange allProducts={allProducts} setAllProducts={setAllProducts} constProducts={constProducts} />
                <BySearch allProducts={allProducts} setAllProducts={setAllProducts} constProducts={constProducts} />
                <BySelection allProducts={allProducts} setAllProducts={setAllProducts} constProducts={constProducts} />
            </div>

            <div className="row justify-content-center">
                {
                    allProducts.length > 0 ?
                        allProducts.map(product => {
                            return <SingleAd product={product} key={product._id} />
                        })
                        : null
                }

                <ToastContainer />
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