import axios from "axios";

class AdminService {

    static getAllStats() {
        return axios.get('/api/admin/get-all-stats');
    }

    static getAllUsers() {
        return axios.get('/api/admin/get-all-users');
    }

    static getAllCategories() {
        return axios.get('/api/admin/get-all-categories');
    }

    static addProduct(product) {
        return axios.post('/api/admin/add-product', product);
    }

    static addCategory(category) {
        return axios.post('/api/admin/add-category', category);
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

    static updateCategory(category) {
        return axios.put('/api/admin/update-category', category);
    }

    static deleteProduct(id) {
        return axios.delete(`/api/admin/delete-product/${id}`);
    }

    static deleteCategory(id) {
        return axios.delete(`/api/admin/delete-category/${id}`)
    }

}

export default AdminService;