import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../redux-store/loader/loaderSlice';
import AdminService from '../../services/AdminService';
import './statistics.scss';

function Statistics() {

    const [numbers, setNumbers] = useState('');
    const [finished, setFinished] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoader(true));
        AdminService.getAllStats()
        .then(res => {
            if (res && res.status === 200) {
                console.log(res.data);
                    setNumbers(res.data);
                    setFinished(true);
                } else {
                    console.log('naso sam samo 1')
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(e => {
                dispatch(showLoader(false));
            })
    }, [])

    return (
        <>
            {finished &&
                <div className="container">
                    <div className="row wrapper">
                        <div className="col-md-3">
                            <h3>Users</h3>
                            <p>{numbers.users}</p>
                        </div>
                        <div className="col-md-3">
                            <h3>Products</h3>
                            <p>{numbers.products}</p>
                        </div>
                        <div className="col-md-3">
                            <h3>Emails</h3>
                            <p>{numbers.emails}</p>
                        </div>
                        <div className="col-md-3">
                            <h3>Subscriptions</h3>
                            <p>N/A</p>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Statistics;
