import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_SIDEBAR_CONFIG } from '../../config/adminSidebarConfig';
import { routeConfig } from '../../config/routeConfig';
import { showDashboard } from '../../redux-store/dashboard/dashboardSlice';
import './Sidebar.scss';

function Sidebar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isShown, setIsShown] = useState(false);
    const [activeName, setActiveName] = useState(ADMIN_SIDEBAR_CONFIG[0].name);

    const goTo = (name, url) => {
        setActiveName(name);
        navigate(url);
    }

    const displayOptions = () => {
        return ADMIN_SIDEBAR_CONFIG.map((item, index) => {
            return (
                <li key={index} onClick={e => goTo(item.name, item.url)}>
                    <p className={`mb-0 ${activeName === item.name ? 'active' : ''}`}><i className={item.icon}></i><span>{item.name}</span></p>
                </li>
            )
        })
    }

    return (
        <>
            <section className="app">
                <aside className="sidebar">
                    <header>
                        <div className="d-flex" style={{justifyContent: 'space-between'}}>
                            <h5 className="me-2">Admin panel</h5>
                            <span><h5>|</h5></span>
                            <h5 className="ms-2"><Link onClick={e => dispatch(showDashboard(false))} to={routeConfig.HOME.url} style={{ color: '#fff' }}>Home page</Link></h5>
                        </div>
                    </header>
                    <nav className="sidebar-nav">

                        <ul>
                            {displayOptions()}
                            <li onMouseEnter={e => setIsShown(true)} onMouseLeave={e => setIsShown(false)}>
                                <a href="#"><i className="ion-ios-cog"></i> <span className="">Options</span></a>
                                {isShown && <ul className="nav-flyout">
                                    <li>
                                        <a href="#"><i className="ion-ios-flame-outline"></i>Burn</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-lightbulb-outline"></i>Bulbs</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-location-outline"></i>Where You</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-locked-outline"></i>On Lock</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="ion-ios-navigate-outline"></i>Ghostface</a>
                                    </li>
                                </ul>}
                            </li>
                        </ul>
                    </nav>
                </aside>
            </section>
        </>
    )
}

export default Sidebar
