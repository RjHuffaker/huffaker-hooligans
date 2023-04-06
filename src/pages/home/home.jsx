import { useContext, useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { PostsContext } from "../../contexts/posts-context";

import { ImagesContext } from "../../contexts/images-context";

import PostSummary from "../../components/post-summary/post-summary";

import ImageCarousel from "../../components/image-carousel/image-carousel";

const Home = () => {

  const { featuredPosts, getPost } = useContext(PostsContext);

  const { allImages } = useContext(ImagesContext);

  const [ post, setPost ] = useState();

  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPost('mZklEwRx8gFzZcRQ8P02');
      setPost(response);
    }

    fetchPost();
  }, [getPost]);

  return (
    <Container>
      <Row className="my-3">
        <Col lg={7} md={12} className="mb-3">
          <ImageCarousel
            slideList={allImages
              .filter((obj) => obj.featured)
              .sort((a, b) => b.dateTaken - a.dateTaken)
            }
          />
        </Col>
        <Col lg={5} md={12}>
          {featuredPosts.map(post =>
            <PostSummary key={post.id} post={post} />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <ReactQuill
            value={post?.body}
            readOnly={true}
            theme={"bubble"}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Home;