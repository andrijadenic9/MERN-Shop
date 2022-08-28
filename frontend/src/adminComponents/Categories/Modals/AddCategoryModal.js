import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import AdminService from '../../../services/AdminService';
import customStyles from '../../../assets/js/custom-modal-style';
import { useRef } from 'react';
// import '../users.scss';

function AddCategoryModal({ showModal, renderView }) {

    const [newCategory, setNewCategory] = useState({
        categoryName: '',
        nameLower: ''
    });
    const categoryInput = useRef();
    const [isAPIError, setIsAPIError] = useState(false);
    const [isAPIFinished, setIsAPIFinished] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    useEffect(()=>{
        console.log(categoryInput,'eeee');
        // categoryInput.current.focus();
    },[])

    const handleEditInputs = (e) => {
        newCategory[e.target.name] = e.target.value;
        setNewCategory(newCategory);
    }

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        
        if (!newCategory.categoryName) {
            setIsValidForm(false);
            return;
        }
        setIsValidForm(true);
        AdminService.addCategory(newCategory)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res.data,'aaaa');
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
                <h3>Add new category</h3>

                {!isValidForm ? <p className="notification text-warning">All fields are required!</p> : null}
                {isAPIFinished ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isAPIError ? <p className="notification text-warning">ERROR: Ooops, something went wrong, please try again later!</p> : null}

                <form onSubmit={onSubmitForm} method="post">
                    <div className="row">
                        <div className="col-md-12">
                            <label className="label" htmlFor="categoryName">Category name</label>
                            <input ref={categoryInput} className="form-control" name="categoryName" type="text" id="categoryName"
                                defaultValue=""
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

export default AddCategoryModal;
