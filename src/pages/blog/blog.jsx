import { useContext } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { PostsContext } from '../../contexts/posts-context';

import PostCard from '../../components/post-card/post-card';

const Blog = () => {

    const { posts } = useContext(PostsContext); 
    
    return (
        <Container>
            <Row>
            {posts.map(post => (
                <Col lg={4} md={6} sm={12} key={post.id} className="my-2">
                    <PostCard post={post} />
                </Col>
            ))}
            </Row>
        </Container>
    )
}

export default Blog;