import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PostsContext } from "../../contexts/posts-context";

import PostEditor from "../../components/post-editor/post-editor";

import './edit-post.css';

const blankPost = {
    title: "",
    body: ""
};

const EditPost = () => {
    const { getPost, updatePost } = useContext(PostsContext);
    
    const [ post, setPost ] = useState(blankPost);

    const { postId } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async() => {
            const response = await getPost(postId);
            setPost(response);
        }
        
        fetchPost();
    }, []);

    const submitHandler = () => {
        updatePost(post);
        navigate("/");
    }

    return (
        <div className="editPostPage">
            <h1>Edit Post</h1>
            <PostEditor post={{...post, id: postId}} setPost={setPost} />
            <button onClick={submitHandler}>Save Post</button>
        </div>
    )
}

export default EditPost;