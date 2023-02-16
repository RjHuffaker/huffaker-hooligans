import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PostsContext } from "../../contexts/posts-context";

import PostWriter from "../../components/post-writer/post-writer";

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

    const onSubmit = () => {
        updatePost(post);
        navigate("/blog");
    }

    const onCancel = () => {
        navigate("/blog");
    }

    return (
        <PostWriter headerText={"Edit Post"} post={post} setPost={setPost} onSubmit={onSubmit} onCancel={onCancel}/>
    )
}

export default EditPost;