import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import AdminService from '../../../services/AdminService';
import customStyles from '../../../assets/js/custom-modal-style';
// import '../users.scss';

function EditCategoryModal({ showModal, currentCategory, renderView }) {

    const [updatedCategory, setUpdatedCategory] = useState({
        categoryName: '',
        nameLower: ''
    });
    const [newCategory, setNewCategory] = useState({ ...updatedCategory, ...currentCategory })
    const [isAPIError, setIsAPIError] = useState(false);
    const [isAPIFinished, setIsAPIFinished] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    const handleEditInputs = (e) => {
        newCategory[e.target.name] = e.target.value;
        setUpdatedCategory(newCategory);
    }

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!updatedCategory.categoryName) {
            setIsValidForm(false);
            return;
        }

        setIsValidForm(true);
        AdminService.updateCategory(updatedCategory)
            .then(res => {
                if (res.status === 200) {
                    renderView();
                    setIsAPIError(false);
                    setTimeout(() => showModal(false), 2500);
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
                <h3>Edit category {currentCategory.categoryName}</h3>

                {!isValidForm ? <p className="notification text-warning">All fields are required!</p> : null}
                {isAPIFinished ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isAPIError ? <p className="notification text-warning">ERROR: Ooops, something went wrong, please try again later!</p> : null}

                <form onSubmit={onSubmitForm} method="post">
                    <div className="row">
                        <div className="col-md-12">
                            <label className="label" htmlFor="categoryName">Category name</label>
                            <input className="form-control" name="categoryName" type="text" id="categoryName"
                                defaultValue={currentCategory.categoryName || ''}
                                onChange={handleEditInputs}
                            />
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

export default EditCategoryModal;
