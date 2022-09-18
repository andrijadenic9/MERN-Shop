import React, { useEffect } from 'react';
import Modal from 'react-modal';
import customStyles from '../../../assets/js/custom-modal-style';
import { Link } from "react-router-dom";
import { routeConfig } from '../../../config/routeConfig';
import { FaWindowClose } from "react-icons/fa";

function CategoryProductModal({ showModal, allProducts }) {

    // useEffect(() => {
    //     console.log(allProducts, 'allproducts');
    // }, [])

    const displayAllProducts = () => {
        return allProducts.map((product, index) => {
            return (
                <tr key={index}>
                    <th scope="col">{index + 1}</th>
                    <th scope="col">{product.title}</th>
                    <th scope="col">{product.price} $</th>
                    <th scope="col"><a href={`http://localhost:4000/uploadedFiles/${product.img}`} target="_blank">IMAGE</a></th>
                    <th scope="col"><Link to={routeConfig.PRODUCT_PAGE.realUrl(product._id)} target="_blank">Product</Link></th>
                </tr>
            );
        })
    }

    return (
        <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>
            <div className="d-flex" style={{ justifyContent: 'space-between' }}>
                <h3>All products for category {allProducts[0].category}</h3>
                <span className="mx-2" onClick={e => { showModal(false) }}><FaWindowClose style={{ fontSize: '1.5rem', color: 'tomato', cursor: 'pointer' }} /></span>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Image</th>
                        <th scope="col">Info</th>
                    </tr>
                </thead>
                <tbody>
                    {displayAllProducts()}
                </tbody>
            </table>
        </Modal>
    )
}

export default CategoryProductModal
