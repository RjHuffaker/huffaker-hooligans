import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { db, auth } from "../../config/firebase";

import './create-post.css';

const CreatePost = ({isAuth}) => {
    const [ title, setTitle ] = useState("");
    const [ body, setBody ] = useState("");

    const postCollectionRef = collection(db, "posts");

    let navigate = useNavigate();

    useEffect(() => {
        if(!isAuth) navigate("/login");
    }, [isAuth, navigate]);

    const createPost = async () => {
        await addDoc(postCollectionRef, {
            title, body, author: {
                name: auth.currentUser.displayName,
                id: auth.currentUser.uid
            }
        });
        navigate("/");
    }

    return (
        <div className="createPostPage">
            <div className="cpContainer">
                <h1>Create A Post</h1>
                <div className="inputGp">
                    <label>Title:</label>
                    <input
                        placeholder="Title..."
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                    />
                </div>
                <div className="inputGp">
                    <label>Post:</label>
                    <ReactQuill theme="snow" value={body} onChange={setBody}/>
                    
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost;