import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { UserContext } from '../../contexts/user-context';
import { PostsContext } from '../../contexts/posts-context';

import PostCard from '../../components/post-card/post-card';
import PostCardAdd from '../../components/post-card-add/post-card-add';

const Blog = () => {

  const { currentUser } = useContext(UserContext)

  const { posts } = useContext(PostsContext);

  return (
    <Container className="scrollPage">
      <Row>
        {posts
          .sort((a, b) => a.datePublished > b.datePublished ? 1 : -1)
          .map(post => (
            <Col lg={4} md={6} sm={12} key={post.id} className="my-2">
              <PostCard post={post} />
            </Col>
          ))
        }
        {currentUser && <Col lg={4} md={6} sm={12} className="my-2">
          <PostCardAdd />
        </Col>}
      </Row>
    </Container>
  )
}

export default Blog;