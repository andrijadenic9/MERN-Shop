import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import customStyles from '../../assets/js/custom-modal-style';
import { setUser } from '../../redux-store/users/userSlice'
import { showLoader } from '../../redux-store/loader/loaderSlice';
import AuthService from '../../services/AuthService';
import { localStorageConfig } from '../../config/localStorageConfig';


function ProfileModal({ isModal, setIsModal, userProfile, setUserProfile }) {

    const [isValid, setIsValid] = useState(true);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const user = useSelector(state => state.userStore.user);
    const dispatch = useDispatch();

    const handleEditInputs = (e) => {
        let editedUser = { ...userProfile }
        editedUser[e.target.id] = e.target.value;
        setUserProfile(editedUser);
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        if (!user.username || !user.email || !user.email.includes("@")) {
            setUserProfile(user);
            setIsValid(false);
            return;
        }
        setIsValid(true);

        dispatch(showLoader(true));
        AuthService.updateUser(userProfile)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data, 'OVDEEE');
                    dispatch(setUser(userProfile));
                    localStorage.setItem(localStorageConfig.USER, JSON.stringify(userProfile));
                }
            })
            .catch(err => {
                console.log(err, 'GRESKA');
            })
            .finally(() => {
                dispatch(showLoader(false))
            })
        // console.log(e);
        // console.log('sve u redu');
    }

    const close = () => {
        setUserProfile(user);
        setIsModal(false);
    }

    return (
        <>
            {isModal && <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>
                {/* {isAPIFinished && !isAPIError ? <p className="notification text-success">Successfuly updated!</p> : null}
                {isAPIError ? <p className="notification text-warning">ERROR: Ooops, something went wrong, please try again later!</p> : null} */}

                <div className="">
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
                                    // onInput={handleEditInputs}
                                    readOnly
                                />
                                <div className="checkbox-container">
                                    <label className="label" htmlFor="checkbox">Show password? </label>
                                    <input className="mx-1"
                                        id="checkbox"
                                        type="checkbox"
                                        checked={isPasswordShown}
                                        onChange={() => { setIsPasswordShown(!isPasswordShown) }}
                                    />
                                </div>

                                <div className="select-container mt-3">
                                    <label className="label" htmlFor="gender">Gender: </label>
                                    <select className="mb-2" name="gender" id="gender"
                                        aria-selected defaultValue={user.gender || ''}
                                        onChange={handleEditInputs}
                                    >
                                        <option value={user.gender}>
                                            {user.gender === 'Female' ? 'Female' : 'Male'}
                                        </option>

                                        <option value={user.gender === 'Female' ? 'Male' : 'Female'}>
                                            {user.gender === 'Female' ? 'Male' : 'Female'}
                                        </option>
                                    </select> <br />
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

                                <label className="label" htmlFor="phoneNumber">Phone number</label>
                                <input className="form-control" type="number" id="phoneNumber" name="phoneNumber"
                                    defaultValue={user.phoneNumber || ''}
                                    onInput={handleEditInputs}
                                />

                                <label className="label" htmlFor="postCode">Post code</label>
                                <input className="form-control" type="text" id="postCode" name="postCode"
                                    defaultValue={user.postCode || ''}
                                    onInput={handleEditInputs}
                                />
                            </div>
                            <div className="btns-wrapper mt-4">
                                <button className="btn btn-primary mx-2" onClick={close}>Close</button>
                                <button className="btn btn-success mx-2 save">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Modal>}
        </>
    )
}

export default ProfileModal
