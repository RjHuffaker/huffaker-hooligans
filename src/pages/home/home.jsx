import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { PostsContext } from "../../contexts/posts-context";

import PostCard from "../../components/post-card/post-card";

const Home = () => {

  const { posts } = useContext(PostsContext);

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <h3>Home Page</h3>
            <p>Have a few excerpts from featured posts. Ideally the intro page would have content that could be changed from within the website, not having to hard-code anything. Which to me says that it should be a post of some sort.</p>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {posts.map(post => post.featured ?
            <PostCard key={post.id} post={post} /> : <></>
          )}
        </Col>
      </Row>

    </Container>
  )
}

export default Home;