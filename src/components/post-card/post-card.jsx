import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Badge from "react-bootstrap/Badge"

import { UserContext } from "../../contexts/user-context";
import { PostsContext } from "../../contexts/posts-context";

import './post-card.css';

const PostCard = ({ post }) => {

    const { currentUser } = useContext(UserContext);
    
    const { deletePost } = useContext(PostsContext);

    let navigate = useNavigate();

    const editHandler = (postId) => {
        navigate(`/edit/`+postId);
    }

    const deleteHandler = (post) => {
        deletePost(post);
    }

    return (
        <Card key={post.id} className="h-100" >
            <Link to={`/read/${post.id}`}>
                <Card.Img src={post.titleImage} alt="title" className="postCardImage"/>
            </Link>
            <Card.Title>
                <Link to={`/read/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
            </Card.Title>
            <Card.Body>
                {post.tags && post.tags.map((tag)=> (
                    <Badge bg="secondary" className="m-1" key={tag.value}>{tag.label}</Badge>
                ))}
            </Card.Body>
            <Card.Footer>
                <span className="float-start">
                    @{post.author.name}    
                </span>
                    {
                        currentUser &&
                        post.author.id === currentUser.uid &&
                        <ButtonGroup className="float-end">
                            <Button variant="outline-primary" onClick={() => {editHandler(post.id)}}>&#9998;</Button>
                            <Button variant="outline-danger" onClick={() => {deleteHandler(post)}}>&#128465;</Button>
                        </ButtonGroup>
                        
                    }
            </Card.Footer>
        </Card>
    );
}

export default PostCard;