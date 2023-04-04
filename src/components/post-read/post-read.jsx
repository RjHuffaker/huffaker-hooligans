import { useContext, useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { UserContext } from "../../contexts/user-context";
import { PostsContext } from "../../contexts/posts-context";

const blankPost = {
  title: "",
  body: ""
};

const PostRead = ({postId}) => {

  const { currentUser } = useContext(UserContext);
  const { getPost } = useContext(PostsContext);

  const [post, setPost] = useState(blankPost);
  
  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost(postId);
      setPost(response);
    }

    fetchPost();
  }, [getPost, postId]);
  
  const editHandler = () => {}

  return (
      <Row>
        <Col>
          <Card>
            <Card.Title><h2>{post?.title}</h2></Card.Title>
            <Card.Body>
              <ReactQuill
                value={post?.body}
                readOnly={true}
                theme={"bubble"}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
  );
}

export default PostRead;