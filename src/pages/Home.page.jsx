import { useState, useEffect } from 'react';

import {
    doc,
    getDocs,
    deleteDoc,
    collection
} from 'firebase/firestore';

import { db, auth } from '../utils/firebase/firebase.utils';

const Home = ({isAuth}) => {
    const [ posts, setPosts ] = useState([]);
    const postCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
            try {
                const data = await getDocs(postCollectionRef);
                setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            } catch(error){
                console.log("Error retrieving posts");
            }
        };

        getPosts();
    }, [postCollectionRef]);


    const deletePost = async (postId) => {
        const postDoc = doc(db, "posts", postId);
        await deleteDoc(postDoc);
    }

    return (
        <div className="homePage">
            {posts.map(post => (
                <div className="post" key={post.id}>
                    <div className='postHeader'>
                        <div className="postTitle">
                            <h1>{post.title}</h1>
                        </div>
                        {
                            isAuth &&
                            post.author.id === auth.currentUser.uid &&
                            <div className="deletePost">
                                <button onClick={() => {deletePost(post.id)}}>&#128465;</button>
                            </div>
                        }
                    </div>
                    <div className="postTextContainer">
                        <p>{post.postText}</p>
                    </div>
                    <h3>@{post.author.name}</h3>
                </div>
            ))}
        </div>
    )
}

export default Home;