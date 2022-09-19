import React, { useState, useEffect } from 'react';
import AdminService from '../../services/AdminService';
import DeleteProductModal from './Modals/DeleteProductModal';
import EditProductModal from './Modals/EditProductModal';
import './product.scss';

function Products() {

    const [allProducts, setAllProducts] = useState('');
    const [currentProduct, setCurrentProduct] = useState('');
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);

    useEffect(() => {
        getAllProducts();
    }, []);

    function getAllProducts() {
        AdminService.getProductsFromDB()
            .then(res => {
                if (res.status === 200) {
                    setAllProducts(res.data)
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function displayProductLayout() {
        return allProducts.map((product, index) => {
            return <tr key={index}>
                <th>{index + 1}</th>
                <td>
                    <img src={`http://localhost:4000/uploadedFiles/${product.img}`} alt={product.title} />
                </td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>{product.rating}</td>
                <td>{product.price} $</td>
                <td>
                    <div className="btns-wrapper">
                        <button className="btn btn-warning" onClick={(e) => editProduct(product)}>Edit</button>
                        <button className="btn btn-danger" onClick={(e) => deleteProduct(product)}>Delete</button>
                    </div>
                </td>
            </tr>
        });
    }

    const editProduct = (product) => {
        setIsModalEdit(true);
        setCurrentProduct(product);
    }

    const deleteProduct = (product) => {
        setIsModalDelete(true);
        setCurrentProduct(product);
    }

    return (
        <>
            <div className="table-product-container">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Image</th>
                            <th scope="col">Title</th>
                            <th scope="col">Category</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Price</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{allProducts ? displayProductLayout() : null}</tbody>
                </table>
            </div>
            {isModalEdit && <EditProductModal showModal={setIsModalEdit} currentProduct={currentProduct} renderView={getAllProducts} />}
            {isModalDelete && <DeleteProductModal showModal={setIsModalDelete} currentProduct={currentProduct} renderView={getAllProducts} />}
        </>
    )
}

export default Products;
