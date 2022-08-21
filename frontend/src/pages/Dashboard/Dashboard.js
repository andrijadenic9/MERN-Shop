import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../adminComponents/Sidebar/Sidebar';
import { showDashboard } from '../../redux-store/dashboard/dashboardSlice';

function Dashboard() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showDashboard(true));
    }, [])

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row m-0">
                    <div className="col-md-3 p-0">
                        <Sidebar />
                    </div>
                    <div className="col-md-9 p-0">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
