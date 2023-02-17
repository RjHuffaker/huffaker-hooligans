import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup";

import ImageUploader from "../../components/image-uploader/image-uploader";
import TagSelector from "../tag-selector/tag-selector"
import QuillEditor from '../../components/quill-editor/quill-editor';


import './post-writer.css';

const PostWriter = ({ headerText, post, setPost, onSubmit, onCancel }) => {
    
    const setTitleImage = (value) => {
        setPost({...post, titleImage: value});
    }

    const onTitleChange = (event) => {
        const value = event.target.value;
        setPost({...post, title: value});
    }

    const onTagsChange = (value) => {
        setPost({...post, tags: value});
    }

    const onBodyChange = (value) => {
        setPost({...post, body: value});
    }
    
    
    return (
        <Container>
            <Row>
                <Col xs={9} className="my-2">
                    <Card className="h-100">
                        <Card.Title>
                            <h1 className="m-2">{headerText}</h1>
                        </Card.Title>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col md="8" className="my-1">
                                        <InputGroup>
                                            <input
                                                className="form-control"
                                                placeholder="Title..."
                                                value={post.title}
                                                onChange={onTitleChange}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col md="2" className="my-1">
                                        <Button className="w-100" variant="primary" onClick={onSubmit}>Save</Button>
                                    </Col>
                                    <Col md="2" className="my-1">
                                        <Button className="w-100" variant="secondary" onClick={onCancel}>Cancel</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <TagSelector value={post.tags} onChange={onTagsChange}/>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={3} className="my-2">
                    <Card className="h-100">
                        <ImageUploader imageUrl={post.titleImage} setImageUrl={setTitleImage} />
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col className="xs-12">
                    <Card>
                        <Card.Body>
                            <QuillEditor value={post.body} setValue={onBodyChange} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default PostWriter;