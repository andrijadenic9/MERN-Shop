import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import customStyles from '../../assets/js/custom-modal-style';
import { setUser } from '../../redux-store/users/userSlice';
import AuthService from '../../services/AuthService';
import { localStorageConfig } from '../../config/localStorageConfig';
import { toast } from 'react-toastify';
import AdminService from '../../services/AdminService';

function ProfileModal({ isProfileModal, setIsProfileModal, userProfile, setUserProfile }) {

    const [error, setError] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [file, setFile] = useState(null);
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [oldAvatar, setOldAvatar] = useState(null);
    const user = useSelector(state => state.userStore.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setOldAvatar(user.avatar);
        // console.log(user, 'userr');
    }, [user]);

    useEffect(() => {
        // console.log(userProfile, 'userProfiler');
    }, [userProfile]);

    const handleEditInputs = (e) => {
        let editedUser = { ...userProfile }
        editedUser[e.target.id] = e.target.value;
        setUserProfile(editedUser);
        // mozda bih ovde trebao reci da je ovo 'user'
        // KADA KUCAM JE userProfile
    }

    const onSubmitForm = (e) => {
        e.preventDefault()

        userProfile.email ? setIsEmailValid(true) : setIsEmailValid(false);
        userProfile.username ? setIsUsernameValid(true) : setIsUsernameValid(false);

        if (!userProfile.username || !userProfile.email || !userProfile.email.includes("@")) {
            setUserProfile(userProfile);
            return;
        }

        if (file !== null) {
            let updatedUser = new FormData();
            updatedUser.append('userProfile', JSON.stringify(userProfile));
            updatedUser.append('file', file);
            AuthService.updateUserWithAvatar(updatedUser)
                .then(res => {
                    if (res.status === 200) {
                        let newUser = {
                            ...userProfile,
                            avatar: res.data.fileName
                        }
                        dispatch(setUser(newUser));
                        localStorage.setItem(localStorageConfig.USER, JSON.stringify(newUser));
                        setUserProfile(newUser);
                        setError(false);
                        setIsProfileModal(false);
                        toast.success('Profile successfully edited');
                        AdminService.deleteOldAvatar(oldAvatar)
                            .then(res => {
                                if (res.status === 200) {
                                    console.log(res.data, 'res.data');
                                }
                            })
                            .catch(err => {
                                console.log(err, 'GRESKA');
                            })
                    }
                })
                .catch(err => {
                    console.log(err, 'GRESKA');
                    setError(true);
                })

        } else {
            AuthService.updateUser(userProfile)
                .then(res => {
                    if (res.status === 200) {
                        dispatch(setUser(userProfile));
                        localStorage.setItem(localStorageConfig.USER, JSON.stringify(userProfile));
                        setUserProfile(userProfile);
                        setError(false);
                        setIsProfileModal(false);
                        toast.success('Profile successfully edited');
                    }
                })
                .catch(err => {
                    console.log(err, 'GRESKA');
                    setError(true);
                })
        }
    }

    const close = () => {
        setUserProfile(user);
        setIsProfileModal(false);
    }

    return (
        <>
            {isProfileModal && <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>
                <div className="">
                    <form onSubmit={onSubmitForm}>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="label" htmlFor="username" style={isUsernameValid ? { color: '' } : { color: 'tomato' }}>{isUsernameValid ? 'Username' : 'Username is required'}</label>
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
                                <label className="label" htmlFor="email" style={isEmailValid ? { color: '' } : { color: 'tomato' }}>{isEmailValid ? 'Email' : 'Email is required'}</label>
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
                            <div className="row">
                                <div className="col-12">
                                    <label className="label" htmlFor="image">Upload image</label>
                                    <input className="form-control" name="image" type="file" id="image" onChange={(e) => { setFile(e.target.files[0]) }} />
                                </div>
                            </div>
                            {error && <div style={{ color: 'tomato', marginTop: '15px' }}>Something went wrong, try again later.</div>}
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
