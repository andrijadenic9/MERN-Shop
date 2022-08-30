import '../node_modules/bootstrap/dist/css/bootstrap.css';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import TopNavigation from './components/TopNavigation/TopNavigation';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Shop from './pages/Shop/Shop';
import Contact from './pages/Contact/Contact';
import Authorization from "./pages/Authorization/Authorization";
import ActivateUser from "./pages/ActivateUser/ActivateUser";
import ProductPage from './pages/ProductPage/ProductPage';
import Order from './pages/Order/Order';
import { setUser } from './redux-store/users/userSlice';
import { setCart } from './redux-store/cart/cartSlice';
import { routeConfig } from './config/routeConfig';
import { localStorageConfig } from './config/localStorageConfig';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';
import Profile from './components/Profile/Profile';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './adminComponents/Users/Users';
import Products from './adminComponents/Products/Products';
import Emails from './adminComponents/Emails/Emails';
import Categories from './adminComponents/Categories/Categories';
import Statistics from './adminComponents/Statistics';
import AddProducts from './adminComponents/AddProducts/AddProducts';
import Comments from './adminComponents/Comments/Comments';

axios.defaults.baseURL = 'http://localhost:4000';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCheckingUser, setIsCheckingUser] = useState(false);
  const isDashboard = useSelector(state => state.dashboardStore.show)


  useEffect(() => {
    handleUserLogin();
    handleShopCart();
  }, []);


  function handleUserLogin() {
    if (!localStorage.hasOwnProperty(localStorageConfig.USER)) {
      // navigate('/')
    } else {
      dispatch(setUser(JSON.parse(localStorage.getItem(localStorageConfig.USER))));
    }
    setIsCheckingUser(true);
  }

  function handleShopCart() {
    if (localStorage.hasOwnProperty(localStorageConfig.CART)) {
      dispatch(setCart(JSON.parse(localStorage.getItem(localStorageConfig.CART))));
    }
  }

  return (
    <>
      {!isDashboard && <TopNavigation />}
      {!isDashboard && <Navigation />}
      <main>
        <Loader />
        {isCheckingUser && <Routes>
          <Route path={routeConfig.HOME.url} element={<Home />} />
          <Route path={routeConfig.ABOUT.url} element={<About />} />
          <Route path={routeConfig.SHOP.url} element={<Shop />} />
          <Route path={routeConfig.PRODUCT_PAGE.url} element={<ProductPage />} />
          <Route path={routeConfig.CONTACT.url} element={<Contact />} />
          <Route path={routeConfig.AUTORIZATION.url} element={<Authorization />} />
          <Route path={routeConfig.ACTIVATE_USER.url} element={<ActivateUser />} />
          <Route path={routeConfig.ORDER.url} element={<Order />} />
          <Route path={routeConfig.PROFILE.url} element={<Profile />} />

          {/* ADMIN DASHBOARD */}
          <Route path={routeConfig.DASHBOARD.url} element={<AdminProtect><Dashboard /></AdminProtect>}>
            <Route index element={<Statistics />} />
            <Route path={routeConfig.DASHBOARD_USER.url} element={<Users />} />
            <Route path={routeConfig.DASHBOARD_PRODUCTS.url} element={<Products />} />
            <Route path={routeConfig.DASHBOARD_ADD_PRODUCTS.url} element={<AddProducts />} />
            <Route path={routeConfig.DASHBOARD_EMAILS.url} element={<Emails />} />
            <Route path={routeConfig.DASHBOARD_COMMENTS.url} element={<Comments />} />
            <Route path={routeConfig.DASHBOARD_CATEGORIES.url} element={<Categories />} />
          </Route>
        </Routes>}
      </main>
    </>
  )
}

function AdminProtect(props) {

  const { user } = useSelector(state => state.userStore);

  return (
    <>
      {user?.isAdmin === 'true' ? { ...props.children } : <Navigate to={routeConfig.SHOP.url} />}
    </>
  )
}

export default App;
