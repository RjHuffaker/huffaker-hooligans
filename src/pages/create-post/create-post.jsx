import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PostsContext } from "../../contexts/posts-context";

import PostWriter from "../../components/post-writer/post-writer";

const blankPost = {
    title: "",
    body: ""
};

const CreatePost = () => {
    const { createPost } = useContext(PostsContext);

    const [ post, setPost ] = useState(blankPost);

    let navigate = useNavigate();

    const onSubmit = () => {
        createPost(post);
        navigate("/blog");
    }

    const onCancel = () => {
        navigate("/blog");
    }

    return (
        <PostWriter headerText={"Create Post"} post={post} setPost={setPost} onSubmit={onSubmit} onCancel={onCancel} />
    )
}

export default CreatePost;