import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Editor from '../editor/editor';

import './post-editor.css';

const PostEditor = ({ post, setPost }) => {
    const { title, subtitle, summary, body } = post;

    const onTitleChange = (event) => {
        const value = event.target.value;
        setPost({...post, title: value});
    }

    const onSubtitleChange = (event) => {
        const value = event.target.value;
        setPost({...post, subtitle: value});
    }

    const onSummaryChange = (event) => {
        const value = event.target.value;
        setPost({...post, summary: value});
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
                    value={title}
                    onChange={onTitleChange}
                />
            </div>
            <div className="inputGroup">
                <label>Subtitle:</label>
                <input
                    placeholder="Subitle..."
                    value={subtitle}
                    onChange={onSubtitleChange}
                />
            </div>
            <div className="inputGroup">
                <label>Summary:</label>
                <textarea
                    placeholder="Summary..."
                    value={summary}
                    onChange={onSummaryChange}
                />
            </div>
            <div className="inputGroup">
                <label>Body:</label>
                <Editor value={body} setValue={onBodyChange} />
            </div>
        </div>
    );
}

export default PostEditor;