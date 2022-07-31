import axios from "axios";

class AdminService {

    static getAllStats(){
        return axios.get('/api/admin/get-all-stats');
    }

}

export default AdminService;