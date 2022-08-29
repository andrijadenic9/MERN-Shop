import React, { useState } from 'react';
import { useEffect } from 'react';
import CommentService from '../../services/CommentService';
import './comment.scss';

function Comments({ product }) {

    const [comment, setComment] = useState({
        comment_author: '',
        comment_content: '',
        comment_date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
    });

    const [isFormValid, setIsFormValid] = useState(true);
    const [isAuthor, setIsAuthor] = useState(true);
    const [isContent, setIsContent] = useState(true);
    const [isCommented, setIsCommented] = useState(false);

    const [allComments, setAllComments] = useState([]);

    useEffect(() => {
        // console.log(product._id, 'product ID');
        CommentService.getComments(product._id)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setAllComments(res.data)
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [product]);

    const handleInputs = (e) => {
        let newComment = { ...comment }
        newComment[e.target.id] = e.target.value;
        setComment(newComment);
    }

    // useEffect(() => {
    //     console.log(product);
    // }, [product])

    const submitComment = (e) => {
        e.preventDefault();

        !comment.comment_author ? setIsAuthor(false) : setIsAuthor(true);
        !comment.comment_content ? setIsContent(false) : setIsContent(true);

        if (!comment.comment_author || !comment.comment_content) {
            setIsFormValid(false);
            return;
        }
        setIsFormValid(true);

        let commentObject = {
            ...comment,
            product_id: product._id,
            product_title: product.title
        }
        CommentService.addComment(commentObject)
            .then(res => {
                if (res.status === 200) {
                    console.log('USPESNO');
                    setIsCommented(true);
                }
            })
            .catch(err => {
                console.log(err);
                setIsCommented(true);
            })
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div class="col-md-6">
                        <h4>Leave a comment</h4>
                        <form method="post">
                            <label htmlFor="comment_author" style={isAuthor ? { color: '' } : { color: 'tomato' }}>{isAuthor ? 'Name' : 'Name is required'}</label>
                            <input type="text" class="form-control mb-3" id="comment_author" name="comment_author" onInput={handleInputs} />
                            <label htmlFor="comment_content" style={isContent ? { color: '' } : { color: 'tomato' }}>{isContent ? 'Comment' : 'Comment is required'}</label>
                            <textarea maxlength="500" class="form-control pb-3" id="comment_content" name="comment_content" onInput={handleInputs}></textarea>

                            {!isFormValid && <div style={{ color: 'tomato' }}>Form is not valid, please fullfill all required files</div>}

                            {isCommented ? <div style={{ color: 'green' }}>Your comment is succesfully sent, now administrator needs to aprove it. Thank you for your time :)</div> : null}

                            <button name="create_comment" class="btn btn-primary my-3" onClick={submitComment}>Submit</button>
                        </form>
                    </div>
                </div>

                {
                    product && <div class="comments col-md-6 my-3">
                        <h4 class="my-3">Comments({allComments.length})</h4>
                        {allComments.length > 0 ? allComments.map((comment, index) => {
                            return (<div class="comment">
                                <div class="comment-holder">
                                    <div class="comment-header d-flex justify-content-between align-items-center">
                                        <p class="author ">{comment.comment_author}</p>
                                        <p class="date">{comment.comment_date}</p>
                                    </div>
                                    <hr />
                                    <div class="comment-body">
                                        <p class="content ">{comment.comment_content}</p>
                                    </div>
                                </div>
                            </div>)
                        }) : null}
                    </div>
                }
            </div>
        </>
    )
}

export default Comments
