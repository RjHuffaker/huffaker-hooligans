import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

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
                    <Link to={`/read/${post.id}`}><h1>{post.title}</h1></Link>
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
            <img className="titleImage" src={post.titleImage} alt="title image"/>
            <div className="postSummary">
                <p>{post.summary}</p>
            </div>
            <h3>@{post.author.name}</h3>
        </div>
    );
}

export default PostCard;