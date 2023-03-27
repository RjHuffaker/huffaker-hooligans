import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PostsContext } from "../../contexts/posts-context";

import { ImagesContext } from "../../contexts/images-context";

import PostSummary from "../../components/post-summary/post-summary";

import ImageCarousel from "../../components/image-carousel/image-carousel";

const Home = () => {

  const { featuredPosts } = useContext(PostsContext);

  const { allImages } = useContext(ImagesContext);

  return (
    <Container>
      <Row className="my-3">
        <Col lg={5} md={12} className="mb-3">
          <ImageCarousel slideList={allImages} />
        </Col>
        <Col lg={7} md={12}>
          {featuredPosts.map(post =>
            <PostSummary key={post.id} post={post} />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Home;