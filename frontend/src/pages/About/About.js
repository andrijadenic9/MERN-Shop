import React, { useEffect, useState } from "react";
import ShopService from "../../services/ShopService";

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

    const displayProducts = () => {
        return allProducts.map(product => {
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
                            {/* <button><Link to={routeConfig.PRODUCT_PAGE.realUrl(ad.id)}>View add</Link></button> */}
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div>
            <h1>About page</h1>
            <div className="row">
                {allProducts && displayProducts()}
            </div>
        </div>
    )
}

export default About;