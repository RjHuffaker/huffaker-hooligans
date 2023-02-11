import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import './post-editor.css';

const PostEditor = ({ post, setPost, submitHandler }) => {
    console.log(post);
    
    const onTitleChange = (event) => {
        const value = event.target.value;
        setPost({...post, title: value});
    }

    const onBodyChange = (value) => {
        setPost({...post, body: value});
    }
    
    return (
        <div className="postEditorContainer">
            <div className="inputGroup">
                <label>Title:</label>
                <input
                    placeholder="Title..."
                    value={post.title}
                    onChange={onTitleChange}
                />
            </div>
            <div className="inputGroup">
                <label>Body:</label>
                <ReactQuill
                    theme="snow"
                    value={post.body}
                    onChange={onBodyChange}
                />
                
            </div>
            <button onClick={submitHandler}>Submit Post</button>
        </div>
    );
}

export default PostEditor;