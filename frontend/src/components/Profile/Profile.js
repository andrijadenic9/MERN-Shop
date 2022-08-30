import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import customStyles from '../../assets/js/custom-modal-style';
import AuthService from '../../services/AuthService';

function Profile() {

    const user = useSelector(state => state.userStore.user);
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        // avatar: '',
        address: '',
        city: '',
        gender: '',
        postCode: '',
        phoneNumber: '',
        ...user
    })

    useEffect(() => {
        console.log(userProfile,' ALE ALE');

        // AuthService.getUser(user._id)
        //     .then(res=>{
        //         if(res.status === 200) {
        //             console.log()
        //         }
        //     })
    }, [userProfile])

    const handleEditInputs = () => {

    }

    const onSubmitForm = () => {

    }

    const closeModal = () => {

    }

    const togglePassword = () => {
        setIsPasswordShown(!isPasswordShown);
    }

    return (
        <>
            <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>
                {/* {isAPIFinished && !isAPIError ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isAPIError ? <p className="notification text-warning">ERROR: Ooops, something went wrong, please try again later!</p> : null} */}

                <div className="text-center">
                    <form onSubmit={onSubmitForm}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="label" htmlFor="username">Username</label>
                                <input className="form-control" name="username" type="text" id="username"
                                    defaultValue={user.username || ''}
                                    onChange={handleEditInputs}
                                />

                                <label className="label" htmlFor="firstName">First name</label>
                                <input className="form-control" name="firstName" type="text" id="firstName"
                                    defaultValue={user.firstName || ''}
                                    onInput={handleEditInputs}
                                />

                                <label className="label" htmlFor="lastName">Last name</label>
                                <input className="form-control" name="lastName" type="text" id="lastName"
                                    defaultValue={user.lastName || ''}
                                    onChange={handleEditInputs}
                                />

                                <label className="label" htmlFor="password">Password</label>
                                <input className="form-control" name="password"
                                    type={isPasswordShown ? "text" : "password"}
                                    id="password"
                                    defaultValue={user.password || ''}
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
                                    defaultValue={user.email || ''}
                                    onInput={handleEditInputs}
                                />

                                <label className="label" htmlFor="address">Address</label>
                                <input className="form-control" type="text" id="address" name="address"
                                    defaultValue={user.address || ''}
                                    onInput={handleEditInputs}
                                />

                                <label className="label" htmlFor="city">City</label>
                                <input className="form-control" type="text" id="city" name="city"
                                    defaultValue={user.city || ''}
                                    onInput={handleEditInputs}
                                />
                                <div className="select-container mt-3">
                                    <label className="label" htmlFor="gender">Gender: </label>
                                    <select className="mb-2" name="gender" id="gender"
                                        aria-selected defaultValue={user.gender || ''}
                                        onChange={handleEditInputs}
                                    >
                                        <option value={user.gender}>
                                            {user.gender === 'Male' ? 'Male' : 'Female'}
                                        </option>

                                        <option value={user.gender === 'Male' ? 'Female' : 'Male'}>
                                            {user.gender === 'Male' ? 'Female' : 'Male'}
                                        </option>
                                    </select> <br />
                                </div>
                            </div>
                            <div className="btns-wrapper mt-4">
                                <button className="btn btn-primary mx-2" onClick={closeModal}>Close</button>
                                <button className="btn btn-success mx-2 save">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default Profile
