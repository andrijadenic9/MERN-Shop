import axios from "axios";

class AdminService {

    static getAllStats() {
        return axios.get('/api/admin/get-all-stats');
    }

    static getAllUsers() {
        return axios.get('/api/admin/get-all-users');
    }

    static addProduct(product) {
        return axios.post('/api/admin/add-product', product);
    }

    // static editUser(user){
    //     return axios.put('/api/admin/edit-user', user);
    // }

    static getProductsFromDB() {
        return axios.get('/api/product/get-all-product-from-db');
    }

    static updateProduct(product) {
        return axios.put('/api/admin/update-product', product);
    }

    static deleteProduct(product) {
        return axios.delete(`/api/admin/delete-product/${product}`);
    }

}

export default AdminService;