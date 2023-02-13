import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { PostsContext } from "../../contexts/posts-context";

import './read-post.css';

const blankPost = {
    title: "",
    body: ""
};

const ReadPost = () => {
    const { getPost } = useContext(PostsContext);
    
    const [ post, setPost ] = useState(blankPost);

    const { postId } = useParams();

    let navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async() => {
            const response = await getPost(postId);
            setPost(response);
        }
        
        fetchPost();
    }, [postId]);

    return (
        <div className="editPostPage">
            <h1>{post.title}</h1>
            <img className="titleImage" src={post.titleImage} alt="title image" />
            <ReactQuill
                value={post.body}
                readOnly={true}
                theme={"bubble"}
            />
        </div>
    )
}

export default ReadPost;