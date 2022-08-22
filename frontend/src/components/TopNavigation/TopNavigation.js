import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routeConfig } from '../../config/routeConfig';
import ShopCart from "../ShopCart/ShopCart";
import { setUser } from "../../redux-store/users/userSlice";
// import ShopService from "../../services/shopService";
// import { exampleContext } from "../../App.js"

import {
    FaPhoneAlt,
    FaMailBulk,
    FaAngleDown,
    FaLaptopHouse,
    FaSearch,
} from "react-icons/fa";
import './top-navigation.scss';
import { setCurrency } from "../../redux-store/currency/currencySlice";


function TopNavigation() {
    // const [search, setSearch] = useState("");
    const { currency } = useSelector((state) => state.currencyStore);
    // const { user } = useSelector(state => state.userStore);
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // // const user = useContext(exampleContext)

    useEffect(() => {
        // console.log(user, 'usereeerer');
        localStorage.setItem("currency", currency);
    }, [currency]);

    // const logOut = () => {
    //     localStorage.removeItem("user");
    //     localStorage.removeItem("token");
    //     dispatch(setUser({}));
    //     navigate("/auth");
    // };

    // const userBtnLayout = () => {
    //     return user.hasOwnProperty("username") ? (
    //         <li className="nav-item dropdown">
    //             <a
    //                 className="nav-link dropdown-toggle"
    //                 href="/"
    //                 id="navbarDropdown"
    //                 role="button"
    //                 data-bs-toggle="dropdown"
    //                 aria-expanded="false"
    //             >
    //                 {user.username}
    //             </a>
    //             <ul
    //                 className="dropdown-menu dropdown-menu-end"
    //                 aria-labelledby="navbarDropdown"
    //             >
    //                 <li>
    //                     <Link
    //                         to={routeConfig.USER_PROFILE.url}
    //                         className="dropdown-item user-dropdown"
    //                     >
    //                         {/*TODO: change icons*/}
    //                         {user.isAdmin ? (
    //                             <i className="bi bi-person-workspace me-2"></i>
    //                         ) : (
    //                             <i className="bi bi-person-circle me-2"></i>
    //                         )}
    //                         Profile
    //                     </Link>
    //                 </li>
    //                 <li>
    //                     <Link to="/my-ads" className="dropdown-item" href="/">
    //                         <i className="bi bi-card-list me-2"></i>
    //                         My ads
    //                     </Link>
    //                 </li>
    //                 {user.isAdmin === 'true' &&
    //                     <li>
    //                         <Link to="/dashboard" className="dropdown-item">
    //                             <i className="bi bi-card-list me-2"></i>
    //                             Dashboard
    //                         </Link>
    //                     </li>}
    //                 <li onClick={logOut}>
    //                     <Link to="#" className="dropdown-item">
    //                         <i className="bi bi-box-arrow-right me-2"></i>
    //                         Logout
    //                     </Link>
    //                 </li>
    //             </ul>
    //         </li>
    //     ) : (
    //         <li className="nav-item">
    //             <Link to="/auth" className="nav-link">
    //                 Login/Register
    //             </Link>
    //         </li>
    //     );
    // };

    // const onSearch = e => {
    //     e.preventDefault();
    //     setSearch(e.target.value);
    // };

    // const goToShop = e => {
    //     e.preventDefault();
    //     search.length > 3 && navigate(`${routeConfig.SHOP.url}?search=${search}`)
    // }

    // const test = e => {
    //     if (e.keyCode === 13)
    //         goToShop(e);
    // }

    // const currencyBtn = (e) => {
    //     // dispatch(setCurrency(e.target.value));
    // };

    const dispatch = useDispatch();

    const changeCurrency = (e) => {
        dispatch(setCurrency(e.target.value))
    }

    const checkCurrency = () => {
        if (currency === "USD") {
            return "USD";
        }
        if (currency === "RSD") {
            return "RSD";
        }
        if (currency === "EUR") {
            return "EUR";
        }
    };

    return (
        <section className="nav-bar-wrapper">
            <article className="nav-bar-info container">
                <div className="info-phone">
                    <a href="tel:1234567890">
                        {" "}
                        <FaPhoneAlt /> &nbsp; <span>Phone: </span> (+1) 123 - 456 - 7890{" "}
                    </a>
                </div>

                <div className="info-email-currency">
                    <div className="email">
                        <a href="mailto:info@ourdomain.com">
                            {" "}
                            <FaMailBulk /> &nbsp; <span>
                                {" "}
                                Email:{" "}
                            </span> Info@Ourdomain.Com{" "}
                        </a>
                    </div>
                    <div className="currency">
                        <label htmlFor="currency">Currency : </label>

                        <select
                            id="currency"
                            defaultValue={checkCurrency()}
                            onChange={changeCurrency}
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RSD">RSD</option>
                        </select>
                    </div>
                </div>

                {/* <div className="info-account">{userBtnLayout()}</div> */}
            </article>
            <hr className="line" />
        </section>
    );
}

export default TopNavigation;