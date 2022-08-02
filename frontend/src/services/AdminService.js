import axios from "axios";

class AdminService {

    static getAllStats() {
        return axios.get('/api/admin/get-all-stats');
    }

    static getAllUsers() {
        return axios.get('/api/admin/get-all-users');
    }

    // static editUser(user){
    //     return axios.put('/api/admin/edit-user', user);
    // }

}

export default AdminService;