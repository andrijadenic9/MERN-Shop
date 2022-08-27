import React, { useState } from 'react'
import Modal from 'react-modal';
import customStyles from '../../../assets/js/custom-modal-style';
import AdminService from '../../../services/AdminService';
import '../product.scss';

function DeleteProductModal({ showModal, currentProduct, renderView }) {

    const [isAPIError, setIsAPIError] = useState(false);
    const [isAPIFinished, setIsAPIFinished] = useState(false);

    function cancel(e) {
        e.preventDefault();
        showModal(false);
    }

    function deleteCurrentProduct() {
        AdminService.deleteProduct(currentProduct._id)
            .then(res => {
                if (res.status === 200) {
                    renderView();
                    setIsAPIError(false);
                    setTimeout(() => showModal(false), 2500);
                }
            })
            .catch(err => {
                setIsAPIError(true)
                console.log(err);
            })
            .finally(() => {
                setIsAPIFinished(true);
            })
    }

    return (
        <>
            <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>

                {isAPIFinished && !isAPIError ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isAPIError ? <p className="notification text-warning">ERROR: Ooops, something went wrong, please try again later!</p> : null}

                <div className="text-center">
                    <h3>Delete {currentProduct.title} product</h3>
                    <div className="btns-wrapper mt-4">
                        <button className="btn btn-primary no" onClick={cancel}>Cancel</button>
                        <button className="btn btn-danger yes" onClick={deleteCurrentProduct}>Delete</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default DeleteProductModal;
