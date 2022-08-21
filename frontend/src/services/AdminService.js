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

}

export default AdminService;