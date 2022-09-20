import React, { useState, useEffect } from 'react';
import ShopService from '../../services/ShopService';
import SingleAd from '../../components/SingleAd/SingleAd';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import BySelection from '../../components/Filters/BySelection/BySelection';
import BySearch from '../../components/Filters/BySearch/BySearch';
import ByRange from '../../components/Filters/ByRange/ByRange';
import Pagination from '../../components/Pagination/Pagination';
import { ToastContainer } from "react-toastify";

function Shop() {

    const dispatch = useDispatch();
    const [constProducts, setConstProducts] = useState([]);
    const [allProducts, setAllProducts] = useState('');

    useEffect(() => {
        dispatch(showLoader(true));
        ShopService.getProductsFromDB()
            .then(res => {
                if (res && res.status === 200) {
                    console.log(res);
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

    // * pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // * current product form pagination
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    // const currentAds = ads.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginationLayout = () => {
        return (
            <>
                <div className="row">
                    {allProducts.length ? <Pagination
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalItems={allProducts.length}
                    /> : null}
                </div>
            </>
        )
    }

    return (
        <div className="container py-5">
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

            {paginationLayout()}
        </div>
    )
}

export default Shop;