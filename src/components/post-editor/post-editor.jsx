import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Editor from '../editor/editor';

import ImageUploader from "../../components/image-uploader/image-uploader"

import './post-editor.css';

const PostEditor = ({ post, setPost }) => {
    const { title, titleImage, summary, body } = post;

    const onTitleChange = (event) => {
        const value = event.target.value;
        setPost({...post, title: value});
    }

    const onSummaryChange = (event) => {
        const value = event.target.value;
        setPost({...post, summary: value});
    }

    const onBodyChange = (value) => {
        setPost({...post, body: value});
    }
    
    const getTextLength = (text) => {
        if(text){
            return text.length;
        }
        return 0;
    }
    
    const setTitleImage = (value) => {
        setPost({...post, titleImage: value});
    }

    return (
        <div className="postEditorContainer">
            <div className="inputGroup">
                <label>Title Image</label>
                <ImageUploader imageUrl={titleImage} setImageUrl={setTitleImage} />
            </div>
            <div className="inputGroup">
                <label>Title</label>
                <input
                    placeholder="Title..."
                    value={title}
                    onChange={onTitleChange}
                />
            </div>
            <div className="inputGroup">
                <label>Summary {getTextLength(summary)} of 120</label>
                <textarea
                    placeholder="Summary..."
                    maxLength="120"
                    value={summary}
                    onChange={onSummaryChange}
                />
            </div>
            <div className="inputGroup">
                <label>Body</label>
                <Editor value={body} setValue={onBodyChange} />
            </div>
        </div>
    );
}

export default PostEditor;