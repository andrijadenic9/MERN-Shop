import axios from 'axios';

class ShopService {

    static getAds() {
        // return axios.get('https://api.storerestapi.com/products');
        return axios.get('https://dummyjson.com/products');
    }

    static getSingleProduct(id) {
        return axios.get(`https://dummyjson.com/products/${id}`);
    }

    static getPayment(body) {
        return axios.post('/api/payment/init-payment', body);
    }

    static addNewProduct(product) {
        return axios.post('/api/product/add-new-product', product);
    }

    static getProductFromDB() {
        return axios.get('/api/product/get-all-product-from-db');
    }

    static getSingleProductFromDB(id) {
        return axios.get(`/api/product/get-single-product-from-db/${id}`);
    }

    static setRatingStars(body) {
        return axios.put('/api/products/set-rating', body);
    }

    static getRating(id){
        return axios.get(`/api/products/get-rating/${id}`);
    }
}

export default ShopService;