import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PostsContext } from "../../contexts/posts-context";

import PostWriter from "../../components/post-writer/post-writer";

const blankPost = {
    title: "",
    body: "",
    dateCreated: new Date().getTime(),
    dateModified: new Date().getTime(),
    datePublished: new Date().getTime()
};

const CreatePost = () => {
    const { createPost } = useContext(PostsContext);

    const [ post, setPost ] = useState(blankPost);

    const [ bodyText, setBodyText ] = useState("");

    let navigate = useNavigate();

    const onSubmit = () => {
        createPost({...post, body: bodyText});
        navigate("/blog");
    }

    const onCancel = () => {
        navigate("/blog");
    }

    return (
        <PostWriter
            headerText={"Create Post"}
            post={post} setPost={setPost}
            bodyText={bodyText} setBodyText={setBodyText}
            onSubmit={onSubmit} onCancel={onCancel} />
    )
}

export default CreatePost;