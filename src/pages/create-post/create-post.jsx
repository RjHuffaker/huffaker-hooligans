import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PostsContext } from "../../contexts/posts-context";

import PostEditor from "../../components/post-editor/post-editor";

import './create-post.css';

const blankPost = {
    title: "",
    subtitle: "",
    summary: "",
    body: ""
};

const CreatePost = () => {
    const { createPost } = useContext(PostsContext);

    const [ post, setPost ] = useState(blankPost);

    let navigate = useNavigate();

    const submitHandler = () => {
        createPost(post);
        navigate("/");
    }

    return (
        <div className="createPostPage">
            <h1>Create Post</h1>
            <PostEditor post={post} setPost={setPost}></PostEditor>
            <button onClick={submitHandler}>Create Post</button>
        </div>
    )
}

export default CreatePost;