import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { PostsContext } from "../../contexts/posts-context";

import PostSummary from "../../components/post-summary/post-summary";

const Home = () => {

  const { featuredPosts } = useContext(PostsContext);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          {featuredPosts.map(post =>
            <PostSummary key={post.id} post={post} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home;