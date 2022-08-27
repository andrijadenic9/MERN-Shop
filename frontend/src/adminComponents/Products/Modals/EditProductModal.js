import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import customStyles from '../../../assets/js/custom-modal-style';
import { productCategories } from '../../../config/productCategories';
import AdminService from '../../../services/AdminService';
import '../product.scss';

function EditProductModal({ showModal, currentProduct, renderView }) {

    const [updatedProduct, setUpdatedProduct] = useState({
        img: '',
        title: '',
        price: '',
        category: '',
        rating: ''
    });

    const [newProduct, setNewProduct] = useState({ ...updatedProduct, ...currentProduct })
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isAPIError, setIsAPIError] = useState(false);
    const [isAPIFinished, setIsAPIFinished] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    // useEffect(() => {
    //     console.log(otherCategories, 'asadasa');
    // }, [otherCategories])

    const handleEditInputs = (e) => {
        newProduct[e.target.name] = e.target.value;
        setUpdatedProduct(newProduct);
    }

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    }

    const onSubmitForm = (e) => {
        console.log(updatedProduct, 'aloha');
        e.preventDefault();
        if (!updatedProduct.title) {
            setIsValidForm(false);
            return;
        }

        setIsValidForm(true);
        AdminService.updateProduct(updatedProduct)
            .then(res => {
                if (res.status === 200) {
                    renderView();
                    setIsAPIError(false);
                    setTimeout(() => showModal(false), 2500);
                    console.log(res.data, 'aloha');
                }
            })
            .catch(err => {
                setIsAPIError(true);
                console.log(err);
            })
            .finally(() => {
                setIsAPIFinished(true);
            })
    }

    return (
        <>
            <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>
                <h3>Edit product {currentProduct.title}</h3>

                {!isValidForm ? <p className="notification text-warning">All fields are required!</p> : null}
                {isAPIFinished ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isAPIError ? <p className="notification text-warning">ERROR: Ooops, something went wrong, please try again later!</p> : null}

                <form onSubmit={onSubmitForm} method="post">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="label" htmlFor="title">Title</label>
                            <input className="form-control" name="title" type="text" id="title"
                                defaultValue={currentProduct.title || ''}
                                onChange={handleEditInputs}
                            />
                            <label className="label" htmlFor="description">Description</label>
                            <input className="form-control" name="description" type="text" id="description"
                                defaultValue={currentProduct.description || ''}
                                onInput={handleEditInputs}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="label" htmlFor="price">Price</label>
                            <input className="form-control" name="price" type="text" id="price"
                                defaultValue={currentProduct.price || ''}
                                onChange={handleEditInputs}
                            />
                            <label className="label" htmlFor="rating">Rating</label>
                            <input className="form-control" type="text" id="rating" name="rating"
                                defaultValue={currentProduct.rating || ''}
                                onInput={handleEditInputs}
                            />
                            <div className="select-container mt-3">
                                <label className="label" htmlFor="category">Category: </label>
                                <select className="mb-2" name="category" id="category"
                                    aria-selected defaultValue={currentProduct.category}
                                    onChange={handleEditInputs}
                                >
                                    {
                                        productCategories.map(category => {
                                            return <option value={category.toLocaleLowerCase()}>{category}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="btns-wrapper mt-4">
                            <button className="btn btn-primary mx-2" onClick={closeModal}>Close</button>
                            <button className="btn btn-success mx-2 save">Save</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}

export default EditProductModal;
