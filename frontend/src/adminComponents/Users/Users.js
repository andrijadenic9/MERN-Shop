import React, { useEffect, useState } from 'react'
import AdminService from '../../services/AdminService';
import './users.scss';
import DeleteModal from './Modals/DeleteModal';
import EditModal from './Modals/EditModal';

function Users() {

    const [users, setUsers] = useState('');
    const [currentUser, setCurrentUser] = useState('');
    const [isModalEdit, setIsModalEdit] = useState(false);
    const [isModalDelete, setIsModalDelete] = useState(false);

    useEffect(() => {
        getAllUsers();
    }, []);

    function getAllUsers() {
        AdminService.getAllUsers()
            .then(res => {
                if (res.status === 200) {
                    setUsers(res.data)
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function displayUsersLayout() {
        return users.map((user, index) => {
            return <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td style={user.isActive === 'true' ? { color: 'green' } : { color: 'tomato' }}>{user.isActive === "true" ? 'Active' : 'NOT'}</td>
                <td>{user.isAdmin === "true" ? 'Admin' : 'User'}</td>
                <td>
                    <div className="btns-wrapper">
                        <button className="btn btn-warning" onClick={e => editUser(user)}>Edit</button>
                        <button className="btn btn-danger" onClick={e => deleteUser(user)}>Delete</button>

                    </div>
                </td>
            </tr>
        });
    }

    const editUser = (user) => {
        setIsModalEdit(true);
        setCurrentUser(user);
    }

    const deleteUser = (user) => {
        setIsModalDelete(true);
        setCurrentUser(user);
    }

    return (
        <>
            <div className="table-users-container">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Email</th>
                            <th scope="col">Username</th>
                            <th scope="col">Status</th>
                            <th scope="col">Role</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{users ? displayUsersLayout() : null}</tbody>
                </table>
            </div>
            {isModalEdit && <EditModal showModal={setIsModalEdit} currentUser={currentUser} renderView={getAllUsers} />}
            {isModalDelete && <DeleteModal showModal={setIsModalDelete} currentUser={currentUser} renderView={getAllUsers} />}
        </>
    )
}

export default Users;
