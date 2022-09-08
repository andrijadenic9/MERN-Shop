import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AuthService from '../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import PasswordModal from './PasswordModal';
import './profile.scss';
import ProfileModal from './ProfileModal';

function Profile() {

    const user = useSelector(state => state.userStore.user);
    const [isProfileModal, setIsProfileModal] = useState(false);
    const [isPasswordModal, setIsPasswordModal] = useState(false);

    const [userProfile, setUserProfile] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        avatar: '',
        address: '',
        city: '',
        gender: '',
        postCode: '',
        phoneNumber: '',
        ...user
    })

    // useEffect(() => {
    //     // console.log(user, 'USERR');
    //     // console.log(userProfile, ' ALE ALE');
    // }, [userProfile, user])

    return (
        <>
            <ToastContainer />
            <div className="container">
                <h3>{userProfile && userProfile.username} account</h3>
                <div className="row pb-5 pt-5">
                    <div className="col-md-2 flexColumnEvenly">
                        <div className="avatar">{!userProfile.avatar ? <img src={`http://localhost:4000/uploadedFiles/no-user-profile-picture.jpg`} alt="no-image" /> : <img src={`http://localhost:4000/uploadedFiles/avatars/${userProfile.avatar}`} alt="image" />}</div>
                    </div>
                    <div className="col-md-5 flexColumnEvenly">
                        <div><span>Username: </span><span>{userProfile.username}</span></div>
                        <div><span>Email: </span><span>{userProfile.email}</span></div>
                        <div><span>First name: </span><span>{userProfile.firstName}</span></div>
                        <div><span>Last name: </span><span>{userProfile.lastName}</span></div>
                        <div><span>Gender: </span><span>{userProfile.gender}</span></div>
                    </div>
                    <div className="col-md-5 flexColumnEvenly">
                        <div><span>Password: </span><span><button className="btn btn-success" onClick={() => { setIsPasswordModal(true) }}>Change</button></span></div>
                        <div><span>City: </span><span>{userProfile.city}</span></div>
                        <div><span>Address: </span><span>{userProfile.address}</span></div>
                        <div><span>Post Code: </span><span>{userProfile.postCode}</span></div>
                        <div><span>Phone Number: </span><span>{userProfile.phoneNumber}</span></div>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary" onClick={() => { setIsProfileModal(true) }}>Edit profile</button>
                </div>
            </div>

            <ProfileModal isProfileModal={isProfileModal} setIsProfileModal={setIsProfileModal} userProfile={userProfile} setUserProfile={setUserProfile} />
            <PasswordModal isPasswordModal={isPasswordModal} setIsPasswordModal={setIsPasswordModal} />
        </>
    )
}

export default Profile
