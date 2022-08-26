import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../components/Rating/RatingStars";
import RatingStarsModal from "../../components/Rating/RatingStarsModal";
import { routeConfig } from "../../config/routeConfig";
import ShopService from "../../services/ShopService";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function About() {

    const [allProducts, setAllProducts] = useState('');

    useEffect(() => {
        ShopService.getProductFromDB()
            .then(res => {
                console.log(res);
                setAllProducts(res.data)
            })
            .catch(err => {
                console.log(err);
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

    // const displayProducts = () => {
    //     return allProducts.map(product => {

    //         <RatingStarsModal product={product} getRatings={getRatings} isModal={isModal} setIsModal={setIsModal} />

    //         return (
    //             <div className="col-md-6 col-lg-4 col-xl-3" key={product._id}>
    //                 <div className="card text-black">
    //                     <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
    //                     {/* <img src={`http://localhost:4000/uploadedFiles/${product.img}`} className="card-img-top" alt={product.title} /> */}
    //                     <img src={product.img} className="card-img-top" alt={product.title} />
    //                     <div className="card-body">
    //                         <div className="text-center">
    //                             <h5 className="card-title">{product.title}</h5>
    //                             <p className="text-muted mb-4">{product.category}</p>
    //                             <div onClick={() => { openModal(product._id, product.title) }}>
    //                                 <RatingStars ratingNumber={product.rating} product={product} />
    //                             </div>
    //                         </div>
    //                         <div>
    //                             <div className="d-flex justify-content-between">
    //                                 <span>Rating</span><span>{product.rating}</span>
    //                             </div>
    //                             <div className="d-flex justify-content-between">
    //                                 <span>Price</span><span>{product.price} $</span>
    //                             </div>
    //                         </div>
    //                         <div className="d-flex justify-content-between total font-weight-bold mt-4">
    //                             <span>{product.description}</span>
    //                         </div>
    //                         <button><Link to={routeConfig.PRODUCT_PAGE.realUrl(product._id)}>View add</Link></button>
    //                     </div>
    //                 </div>
    //             </div>
    //         )

    //     })
    // }

    const [isModal, setIsModal] = useState(false);
    const [getRatings, setGetRatings] = useState(0);

    const openModal = (id, title) => {
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
            <h1>About page</h1>
            <div className="row">
                {allProducts && allProducts.map(product => {

                    return (
                        <div className="col-md-6 col-lg-4 col-xl-3" key={product._id}>
                            <div className="card text-black">
                                <i className="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                                {/* <img src={`http://localhost:4000/uploadedFiles/${product.img}`} className="card-img-top" alt={product.title} /> */}
                                <img src={product.img} className="card-img-top" alt={product.title} />
                                <div className="card-body">
                                    <div className="text-center">
                                        <h5 className="card-title">{product.title}</h5>
                                        <p className="text-muted mb-4">{product.category}</p>
                                        <div onClick={() => { openModal(product._id, product.title) }}>
                                            <RatingStars ratingNumber={product.rating} product={product} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <span>Rating</span><span>{product.rating}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span>Price</span><span>{product.price} $</span>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between total font-weight-bold mt-4">
                                        <span>{product.description}</span>
                                    </div>
                                    <button><Link to={routeConfig.PRODUCT_PAGE.realUrl(product._id)}>View add</Link></button>
                                </div>
                            </div>
                            {<RatingStarsModal product={product} getRatings={getRatings} isModal={isModal} setIsModal={setIsModal} />}
                        </div>

                    )
                })
                }


            </div>
        </>
    )
}

export default About;