import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { PostsContext } from "../../contexts/posts-context";

import './read-post.css';

const blankPost = {
    title: "",
    subtitle: "",
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
    }, []);

    return (
        <div className="editPostPage">
            <h1>{post.title}</h1>
            <h3>{post.subtitle}</h3>
            <ReactQuill
                value={post.body}
                readOnly={true}
                theme={"bubble"}
            />
        </div>
    )
}

export default ReadPost;