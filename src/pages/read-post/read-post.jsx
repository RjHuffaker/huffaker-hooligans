import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

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

    useEffect(() => {
        const fetchPost = async() => {
            const response = await getPost(postId);
            setPost(response);
        }
        
        fetchPost();
    }, [getPost, postId]);

    return (
        <Card className="m-5">
            <Card.Img src={post.titleImage} alt="title image" />
            <Card.Title><h2>{post.title}</h2></Card.Title>
            <Card.Body>
                <ReactQuill
                    value={post.body}
                    readOnly={true}
                    theme={"bubble"}
                />
                <p>Created: {new Date(post.dateCreated).toLocaleDateString()}</p>
                <p>Modified: {new Date(post.dateModified).toLocaleDateString()}</p>
                <p>Published: {new Date(post.datePublished).toLocaleDateString()}</p>
            </Card.Body>
        </Card>
    )
}

export default ReadPost;