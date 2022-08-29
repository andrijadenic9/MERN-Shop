import axios from "axios";

class CommentService {

    static addComment(commentObject) {
        return axios.post('/api/comment/add-comment', commentObject);
    }

    static getComments(id){
        return axios.get(`/api/comment/get-comments/${id}`)
    }

    static getAllComments(){
        return axios.get('/api/comment/get-all-comments');
    }
}

export default CommentService;