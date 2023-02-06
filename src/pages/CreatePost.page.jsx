import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { addDoc, collection } from "firebase/firestore";

import { db, auth } from "../utils/firebase/firebase.utils";

const CreatePost = ({isAuth}) => {
    const [ title, setTitle ] = useState("");
    const [ postText, setPostText ] = useState("");

    const postCollectionRef = collection(db, "posts");

    let navigate = useNavigate();

    useEffect(() => {
        if(!isAuth) navigate("/login");
    }, [isAuth, navigate])

    const createPost = async () => {
        await addDoc(postCollectionRef, {
            title, postText, author: {
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
                    <textarea
                        placeholder="Post..."
                        onChange={(event) => {
                            setPostText(event.target.value)
                        }}
                    />
                </div>
                <button onClick={createPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default CreatePost;