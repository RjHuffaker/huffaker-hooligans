import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { UserContext } from "../../contexts/user-context";
import { PostsContext } from "../../contexts/posts-context";

import "./read-post.css";

const blankPost = {
  title: "",
  body: ""
};

const ReadPost = () => {
  const { currentUser } = useContext(UserContext);
  const { getPost } = useContext(PostsContext);

  const [post, setPost] = useState(blankPost);

  const { postId } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost(postId);
      setPost(response);
    }

    fetchPost();
  }, [getPost, postId]);

  const editHandler = (postId) => {
    navigate(`/editPost/` + postId);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Img
              className="read-post-img"
              srcSet={`
                ${post?.titleImage?.md_img} 992w,
                ${post?.titleImage?.lg_img} 1200w,
                ${post?.titleImage?.xl_img} 1400w
              `}
              src={post?.titleImage?.sm_img}
              alt="title image"
            />
            <Card.Title><h2>{post.title}</h2></Card.Title>
            <Card.Body>
              <ReactQuill
                value={post?.body}
                readOnly={true}
                theme={"bubble"}
              />
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col>
                  {
                    currentUser?.uid === post.author?.id &&
                    <Button variant="outline-primary" onClick={() => { editHandler(post.id) }}>&#9998;</Button>
                  }
                </Col>
                <Col>
                  Created: {new Date(post.dateCreated).toLocaleDateString()} &nbsp;|&nbsp;
                  Modified: {new Date(post.dateModified).toLocaleDateString()} &nbsp;|&nbsp;
                  Published: {new Date(post.datePublished).toLocaleDateString()}
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ReadPost;