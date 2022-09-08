import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import customStyles from '../../assets/js/custom-modal-style';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import AuthService from '../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import { setUser } from '../../redux-store/users/userSlice';
import { localStorageConfig } from '../../config/localStorageConfig';


function PasswordModal({ isPasswordModal, setIsPasswordModal }) {

    const [isOldPasswordValid, setIsOldPasswordValid] = useState(true);
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
    const [isPasswordsShown, setIsPasswordsShown] = useState(false);
    const user = useSelector(state => state.userStore.user);
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        repeatNewPassword: ''
    })
    const dispatch = useDispatch();
    // useEffect(() => {
    // console.log(user, 'USERR');
    // console.log(password, 'PASSWORD');
    // }, [user, password]);

    const handleInputs = (e) => {
        password[e.target.name] = e.target.value;
        setPassword(password);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (user.password !== password.oldPassword) {
            setIsOldPasswordValid(false);
            return;
        } else {
            setIsOldPasswordValid(true);
        }

        if (password.newPassword !== password.repeatNewPassword || !password.newPassword || !password.repeatNewPassword) {
            setIsNewPasswordValid(false);
            return;
        } else {
            setIsNewPasswordValid(true);
        }

        dispatch(showLoader(true));
        AuthService.changePassword({ userID: user._id, newPassword: password.newPassword })
            .then(res => {
                if (res.status === 200) {
                    dispatch(setUser({ ...user, password: password.newPassword }))
                    localStorage.setItem(localStorageConfig.USER, JSON.stringify({ ...user, password: password.newPassword }));
                    setIsPasswordModal(false);
                    toast.success('Password is succesfully updated')
                    // console.log(res.data);
                }
            })
            .catch(err => {
                toast.error('Something went wrong, please try again')
                console.log(err, 'greska');
            })
            .finally(() => {
                dispatch(showLoader(false));
            })
    }

    const close = () => {
        setIsPasswordModal(false);
        setIsPasswordsShown(false);
        setIsOldPasswordValid(true);
        setIsNewPasswordValid(true);
    }

    return (
        <>
            {isPasswordModal && <Modal isOpen={true} ariaHideApp={false} style={customStyles} centered>
                <div className="">
                    <form onSubmit={onSubmitForm}>
                        <div className="row">
                            <div className="col-md-12">

                                {!setIsOldPasswordValid && <div></div>}
                                <span></span>
                                <label className="label" htmlFor="oldPassword" style={isOldPasswordValid ? { color: '' } : { color: 'tomato' }}>{isOldPasswordValid ? 'Old Password' : 'Old Password is not correct'}</label>
                                <input className="form-control" name="oldPassword" type={isPasswordsShown ? 'text' : 'password'} onInput={handleInputs} />

                                <label className="label" htmlFor="newPassword">New Password</label>
                                <input className="form-control" name="newPassword" type={isPasswordsShown ? 'text' : 'password'} onInput={handleInputs} />

                                <label className="label" htmlFor="repeatNewPassword" style={isNewPasswordValid ? { color: '' } : { color: 'tomato' }}>{isNewPasswordValid ? 'Repat new Password' : 'Repeated password is not valid'}</label>
                                <input className="form-control" name="repeatNewPassword" type={isPasswordsShown ? 'text' : 'password'} onInput={handleInputs} />
                                <br />

                                <label htmlFor="showOldPassword" style={{ marginRight: '5px' }}>Show passwords?</label>
                                <input type="checkbox" checked={isPasswordsShown} onChange={() => { setIsPasswordsShown(!isPasswordsShown) }} />
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

export default PasswordModal;
