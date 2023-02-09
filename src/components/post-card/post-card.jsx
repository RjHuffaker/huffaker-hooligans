import { doc, deleteDoc } from 'firebase/firestore';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { db, auth } from '../../config/firebase';

import './post-card.css';

const PostCard = ({ post, isAuth }) => {
    
    const deletePost = async (postId) => {
        console.log(postId);
        const postDoc = doc(db, "posts", postId);
        await deleteDoc(postDoc);
    }

    const editPost = (postId) => {

    }

    return (
        <div className="post" key={post.id}>
            <div className='postHeader'>
                <div className="title">
                    <h1>{post.title}</h1>
                </div>
                {
                    isAuth &&
                    post.author.id === auth.currentUser.uid &&
                    <div className="icons">
                        <button onClick={() => {deletePost(post.id)}}>&#128465;</button>
                        <button onClick={() => {editPost(post.id)}}>&#9998;</button>
                    </div>
                    
                }
            </div>
            <div className="bodyContainer">
                <ReactQuill
                    value={post.body}
                    readOnly={true}
                    theme={"bubble"}
                />
            </div>
            <h3>@{post.author.name}</h3>
        </div>
    );
}

export default PostCard;