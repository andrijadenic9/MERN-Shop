import React, { useEffect, useState } from 'react'
import CommentService from '../../services/CommentService';
import DeleteCommentModal from './DeleteCommentModal';
import './comments.scss';

function Comments() {

    const [comments, setComments] = useState('');
    const [currentComment, setCurrentComment] = useState('');
    const [isModalDelete, setIsModalDelete] = useState(false);

    useEffect(() => {
        getAllComments();
    }, []);

    function getAllComments() {
        CommentService.getAllComments()
            .then(res => {
                if (res.status === 200) {
                    setComments(res.data)
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    function displayCommentsLayout() {
        return comments.map((comment, index) => {
            return <tr key={index}>
                <th>{index + 1}</th>
                <td>{comment.product_title}</td>
                <td>{comment.comment_author}</td>
                <td>{comment.comment_content}</td>
                <td>{comment.comment_date}</td>
                <td className="text-center">
                    {comment.comment_status === true ? <button style={{ width: '75%' }} className="btn btn-warning" onClick={e => { changeStatus(comment) }}>Forbid</button> : <button style={{ width: '75%' }} className="btn btn-success" onClick={e => { changeStatus(comment) }}>Approve</button>}
                </td>
                <td>
                    <button className="btn btn-danger" onClick={e => deleteComment(comment)}>Delete</button>
                </td>
            </tr>
        });
    }

    const changeStatus = (comment) => {
        comment.comment_status === true ? comment.comment_status = false : comment.comment_status = true;
        CommentService.changeCommentStatus(comment)
            .then(res => {
                if (res.status === 200) {
                    getAllComments();
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteComment = (comment) => {
        setIsModalDelete(true);
        setCurrentComment(comment);
    }

    return (
        <>
            <div className="table-comments-container">
                <table className="table table-striped table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Content</th>
                            <th scope="col">Date</th>
                            <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{comments ? displayCommentsLayout() : null}</tbody>
                </table>
            </div>
            {isModalDelete && <DeleteCommentModal showModal={setIsModalDelete} currentComment={currentComment} renderView={getAllComments} />}
        </>
    )
}

export default Comments;
