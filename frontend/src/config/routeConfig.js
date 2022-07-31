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
        url: 'products'
    },
    DASHBOARD_EMAILS: {
        url: 'emails'
    },
    DASHBOARD_SUBSCRIPTIONS: {
        url: 'subscriptions'
    }
}