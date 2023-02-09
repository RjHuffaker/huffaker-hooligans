import { useState, useEffect } from 'react';

import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase';

import PostCard from '../../components/post-card/post-card';

import './home.css';

const Home = ({isAuth}) => {
    const [ posts, setPosts ] = useState([]);
    
    useEffect(() => {
        const postCollectionRef = collection(db, "posts");
        const getPosts = async () => {
            try {
                const data = await getDocs(postCollectionRef);
                setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            } catch(error){
                console.log("Error retrieving posts");
            }
        };

        getPosts();
    }, [isAuth]);

    return (
        <div className="homePage">
            {posts.map(post => (
                <PostCard key={post.id} post={post} isAuth={isAuth} />
            ))}
        </div>
    )
}

export default Home;