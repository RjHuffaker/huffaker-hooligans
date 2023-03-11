import { useContext } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { PostsContext } from "../../contexts/posts-context";

import PostSummary from "../../components/post-summary/post-summary";

import ImageCarousel from "../../components/image-carousel/image-carousel";

const Home = () => {

  const { featuredPosts } = useContext(PostsContext);

  const slideList = [
    {
      label: "First Image",
      text: "Nulla vitae elit libero, a pharetra augue mollis interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      image: "https://firebasestorage.googleapis.com/v0/b/huffaker-hooligans.appspot.com/o/images%2FIMG_3717.JPG?alt=media&token=ad5aeb38-9cd3-4516-9a29-29865e7b0295"
    },
    {
      label: "Second Image",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://firebasestorage.googleapis.com/v0/b/huffaker-hooligans.appspot.com/o/images%2F58B1D5B2-65D4-45D9-83F8-3B331AA98F75.jpeg?alt=media&token=79643e12-9ece-4e3e-abb7-83a24c5f81a7"
    },
    {
      label: "Third Image",
      text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      image: "https://firebasestorage.googleapis.com/v0/b/huffaker-hooligans.appspot.com/o/images%2FIMG_4176.JPG?alt=media&token=696b7188-f9f9-4201-a98c-23f7d2b0af7e"
    },
    {
      label: "Fourth Image",
      text: "Fdsa rewqreqwj jkrewjejkwq thwqthrjek thrjekw.",
      image: "https://firebasestorage.googleapis.com/v0/b/huffaker-hooligans.appspot.com/o/images%2FIMG_2972.JPG?alt=media&token=46b22341-0c09-487e-a6c6-8aa74590c348"
    }
  ];

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <ImageCarousel slideList={slideList} />
        </Col>
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