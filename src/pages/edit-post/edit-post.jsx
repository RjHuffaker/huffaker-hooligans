import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PostsContext } from "../../contexts/posts-context";

import PostWriter from "../../components/post-writer/post-writer";

const blankPost = {
    title: "",
    titleImage: "",
    tags: []
};

const EditPost = () => {
    const { getPost, updatePost } = useContext(PostsContext);

    const [ post, setPost ] = useState(blankPost);

    const [ bodyText, setBodyText ] = useState("");

    const { postId } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async() => {
            const response = await getPost(postId);

            console.log(response);

            setPost(response);
            setBodyText(response.body);
        }
        
        fetchPost();
    }, []);

    const onSubmit = () => {
        updatePost({...post, body: bodyText});
        navigate("/blog");
    }

    const onCancel = () => {
        navigate("/blog");
    }

    return (
        <PostWriter
            headerText={"Edit Post"}
            post={post}
            setPost={setPost}
            bodyText={bodyText}
            setBodyText={setBodyText}
            onSubmit={onSubmit}
            onCancel={onCancel}
        />
    )
}

export default EditPost;