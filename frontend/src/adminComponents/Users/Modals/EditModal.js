import React, { useEffect } from 'react'
import { useState } from 'react';
import Modal from 'react-modal';
import AuthService from '../../../services/AuthService';
import customStyles from '../../../assets/js/custom-modal-style';
import '../users.scss';

function EditModal({ showModal, currentUser, renderView }) {

    const [updatedUser, setUpdatedUser] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        username: '',
        email: '',
        password: '',
        isAdmin: '',
        isActive: ''
    });
    const [newUser, setNewUser] = useState({ ...updatedUser, ...currentUser })
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isAPIError, setIsAPIError] = useState(false);
    const [isAPIFinished, setIsAPIFinished] = useState(false);
    const [isValidForm, setIsValidForm] = useState(true);

    const handleEditInputs = (e) => {
        newUser[e.target.name] = e.target.value;
        setUpdatedUser(newUser);
    }

    const togglePassword = () => {
        setIsPasswordShown(!isPasswordShown)
    }

    const closeModal = (e) => {
        e.preventDefault();
        showModal(false);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (!updatedUser.username || !updatedUser.password || !updatedUser.email || !updatedUser.email.includes("@")) {
            setIsValidForm(false);
            return;
        }

        setIsValidForm(true);
        AuthService.updateUser(updatedUser)
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
                <h3>Edit user {currentUser.username}</h3>

                {!isValidForm ? <p className="notification text-warning">All fields are required!</p> : null}
                {isAPIFinished ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isAPIError ? <p className="notification text-warning">ERROR: Ooops, something went wrong, please try again later!</p> : null}

                <form onSubmit={onSubmitForm} method="post">
                    <div className="row">
                        <div className="col-md-6">
                            <label className="label" htmlFor="username">Username</label>
                            <input className="form-control" name="username" type="text" id="username"
                                defaultValue={currentUser.username || ''}
                                onChange={handleEditInputs}
                            />

                            <label className="label" htmlFor="firstName">First name</label>
                            <input className="form-control" name="firstName" type="text" id="firstName"
                                defaultValue={currentUser.firstName || ''}
                                onInput={handleEditInputs}
                            />

                            <label className="label" htmlFor="lastName">Last name</label>
                            <input className="form-control" name="lastName" type="text" id="lastName"
                                defaultValue={currentUser.lastName || ''}
                                onChange={handleEditInputs}
                            />

                            <label className="label" htmlFor="password">Password</label>
                            <input className="form-control" name="password"
                                type={isPasswordShown ? "text" : "password"}
                                id="password"
                                defaultValue={currentUser.password || ''}
                                onInput={handleEditInputs}
                            />
                            <div className="checkbox-container">
                                <label className="label" htmlFor="checkbox">Show password? </label>
                                <input className="mx-1"
                                    id="checkbox"
                                    type="checkbox"
                                    checked={isPasswordShown}
                                    onChange={togglePassword}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="label" htmlFor="email">Email</label>
                            <input className="form-control " name="email" type="email" id="email"
                                defaultValue={currentUser.email || ''}
                                onInput={handleEditInputs}
                            />

                            <label className="label" htmlFor="address">Address</label>
                            <input className="form-control" type="text" id="address" name="address"
                                defaultValue={currentUser.address || ''}
                                onInput={handleEditInputs}
                            />

                            <label className="label" htmlFor="city">City</label>
                            <input className="form-control" type="text" id="city" name="city"
                                defaultValue={currentUser.city || ''}
                                onInput={handleEditInputs}
                            />
                            <div className="select-container mt-3">
                                <label className="label" htmlFor="isActive">Activation Status: </label>
                                <select className="mb-2" name="isActive" id="isActive"
                                    aria-selected defaultValue={currentUser.isActive}
                                    onChange={handleEditInputs}
                                >
                                    <option value={currentUser.isActive}>
                                        {currentUser.isActive === 'false' ? 'NOT' : 'Active'}
                                    </option>

                                    <option value={currentUser.isActive === 'true' ? 'false' : 'true'}>
                                        {currentUser.isActive === 'false' ? 'Active' : 'NOT'}
                                    </option>
                                </select> <br />
                                <label className="label" htmlFor="isAdmin">Role: </label>
                                <select name="isAdmin" id="isAdmin"
                                    aria-selected defaultValue={currentUser.isAdmin}
                                    onChange={handleEditInputs}
                                >
                                    <option value={currentUser.isAdmin}>
                                        {currentUser.isAdmin === 'false' ? "User" : "Admin"}
                                    </option>

                                    <option value={currentUser.isAdmin === "true" ? "false" : "true"}>
                                        {currentUser.isAdmin === 'false' ? "Admin" : "User"}
                                    </option>
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

export default EditModal;
