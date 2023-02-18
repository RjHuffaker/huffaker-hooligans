import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { PostsContext } from "../../contexts/posts-context";

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
        <Card className="m-5">
            <Card.Img src={post.titleImage} alt="title image" />
            <Card.Title><h1>{post.title}</h1></Card.Title>
            <Card.Body>
                <p>{post.datePublished}</p>
                <ReactQuill
                    value={post.body}
                    readOnly={true}
                    theme={"bubble"}
                />
            </Card.Body>
        </Card>
    )
}

export default ReadPost;