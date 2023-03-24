import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { UserContext } from "../../contexts/user-context";

import "./post-summary.css";

const PostSummary = ({ post }) => {
  const { currentUser } = useContext(UserContext);

  let navigate = useNavigate();

  return (
    <div key={post.id} className="card mb-3 x-100">
      <Link className="row no-gutters" to={`/readPost/${post.id}`}>
        <div className="col-md-4">
          <img src={post.titleImage?.xs_img} className="card-img summary-img" alt="title" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.summary}</p>
            {post.tags && post.tags.map((tag) => (
              <Badge bg="secondary" className="m-1" key={tag.value}>{tag.label}</Badge>
            ))}
            <p className="card-text"><small className="text-muted">@{post.author.name}</small></p>
          </div>
        </div>
      </Link>
    </div>
    
    
    
    /*
    <Card key={post.id}>
      <Row className="row no-gutters">
        <Link className="col-md-6" to={`/readPost/${post.id}`}>
          <Card.Img src={post.titleImage} alt="title" className="postCardImage" />
        </Link>
        <Card.Title>
          <Link to={`/readPost/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
        </Card.Title>
        <Card.Body>
          {post.summary}
          {post.tags && post.tags.map((tag) => (
            <Badge bg="secondary" className="m-1" key={tag.value}>{tag.label}</Badge>
          ))}
        </Card.Body>
        <Card.Footer>
          <span className="float-start">
            @{post.author.name}
          </span>
        </Card.Footer>
      </Row>
    </Card>
    */
  );
}

export default PostSummary;