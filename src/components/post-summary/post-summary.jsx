import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import { UserContext } from "../../contexts/user-context";

const PostSummary = ({ post }) => {
    const { currentUser } = useContext(UserContext);

    let navigate = useNavigate();

    return (
        <Card key={post.id}>
            <Link to={`/readPost/${post.id}`}>
                <Card.Img src={post.titleImage} alt="title" className="postCardImage"/>
            </Link>
            <Card.Title>
                <Link to={`/readPost/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
            </Card.Title>
            <Card.Body>
                {post.summary}
                {post.tags && post.tags.map((tag)=> (
                    <Badge bg="secondary" className="m-1" key={tag.value}>{tag.label}</Badge>
                ))}
            </Card.Body>
            <Card.Footer>
                <span className="float-start">
                    @{post.author.name}    
                </span>
            </Card.Footer>
        </Card>
    );
}

export default PostSummary;