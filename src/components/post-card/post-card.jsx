import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { doc, deleteDoc } from 'firebase/firestore';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { db, auth } from '../../config/firebase';

import { PostsContext } from "../../contexts/posts-context";

import './post-card.css';

const PostCard = ({ post, isAuth }) => {
    
    const { deletePost } = useContext(PostsContext);

    let navigate = useNavigate();

    const editHandler = (postId) => {
        navigate(`/edit/`+postId);
    }

    const deleteHandler = (postId) => {
        deletePost(postId);
    }

    return (
        <div className="post" key={post.id}>
            <div className='postHeader'>
                <div className="title">
                    <h1>{post.title}</h1>
                </div>
                {
                    isAuth &&
                    post.author.id === auth.currentUser.uid &&
                    <div className="icons">
                        <button onClick={() => {deleteHandler(post.id)}}>&#128465;</button>
                        <button onClick={() => {editHandler(post.id)}}>&#9998;</button>
                    </div>
                    
                }
            </div>
            <div className="bodyContainer">
                <ReactQuill
                    value={post.body}
                    readOnly={true}
                    theme={"bubble"}
                />
            </div>
            <h3>@{post.author.name}</h3>
        </div>
    );
}

export default PostCard;