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

    static deleteComment(id){
        return axios.delete(`/api/comment/delete-comment/${id}`)
    }

    static changeCommentStatus(id) {
        return axios.put('/api/comment/change-comment-status', id);
    }
}

export default CommentService;