import { useContext } from 'react';

import { PostsContext } from '../../contexts/posts-context';

import PostCard from '../../components/post-card/post-card';

import './home.css';

const Home = ({isAuth}) => {

    const { posts } = useContext(PostsContext); 
    
    return (
        <div className="homePage">
            {posts.map(post => (
                <PostCard key={post.id} post={post} isAuth={isAuth} />
            ))}
        </div>
    )
}

export default Home;