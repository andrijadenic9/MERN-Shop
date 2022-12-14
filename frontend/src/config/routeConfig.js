export const routeConfig = {
    HOME: {
        url: '/'
    },
    ABOUT: {
        url: '/about'
    },
    SHOP: {
        url: '/shop'
    },
    PRODUCT_PAGE: {
        url: '/shop/product/:productID',
        realUrl: (productID) => {
            return `/shop/product/${productID}`
        }
    },
    CONTACT: {
        url: '/contact'
    },
    SHOP_CART: {
        url: ''
    },
    AUTORIZATION: {
        url: '/authorization'
    },
    ACTIVATE_USER: {
        url: '/activate-account/:id',
        realUrl: (id) => {
            return `/activate-account/${id}`
        }
    },
    PROFILE: {
        url: '/profile'
    },
    ORDER: {
        url: '/order'
    },
    DASHBOARD: {
        url: '/dashboard'
    },
    DASHBOARD_USER: {
        url: 'users'
    },
    DASHBOARD_PRODUCTS: {
        url: 'products',
    },
    DASHBOARD_ADD_PRODUCTS: {
        url: 'add-products',
    },
    DASHBOARD_EMAILS: {
        url: 'emails'
    },
    DASHBOARD_COMMENTS: {
        url: 'comments'
    },
    DASHBOARD_CATEGORIES: {
        url: 'categories'
    }
}