import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import ImageUploader from "../image-uploader/image-uploader";
import TagSelector from "../tag-selector/tag-selector"
import DateSelector from "../date-selector/date-selector";
import Checkbox from "../checkbox/checkbox"

import QuillEditor from '../quill-editor/quill-editor';

import './post-writer.css';

const PostWriter = ({ headerText, post, setPost, bodyText, setBodyText, onSubmit, onCancel }) => {

  console.log(post);

  const setTitleImage = (value) => {
    setPost({ ...post, titleImage: value });
  }

  const onTitleChange = (event) => {
    const value = event.target.value;
    setPost({ ...post, title: value });
  }

  const onSummaryChange = (event) => {
    const value = event.target.value;
    setPost({ ...post, summary: value });
  }

  const onTagsChange = (value) => {
    setPost({ ...post, tags: value });
  }

  const onCreatedChange = (date) => {
    setPost({ ...post, dateCreated: date.getTime() });
  }

  const onPublishedChange = (date) => {
    setPost({ ...post, datePublished: date.getTime() });
  }

  const onCheckPublished = (event) => {
    const checked = event.target.checked;
    setPost({ ...post, published: checked });
  }

  const onCheckFeatured = (event) => {
    const checked = event.target.checked;
    setPost({ ...post, featured: checked });
  }

  return (
    <Container>
      <Row>
        <Col xl={9} className="my-2">
          <Card className="h-100">
            <Card.Title>
              <h2 className="m-2">{headerText}</h2>
            </Card.Title>
            <Card.Body>
              <Container>
                <Row>
                  <Col lg={6} className="my-1">
                    <InputGroup>
                      <input
                        className="form-control"
                        placeholder="Title..."
                        value={post.title}
                        onChange={onTitleChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col lg={6}>
                    <TagSelector value={post.tags} onChange={onTagsChange} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <textarea
                      className="form-control"
                      placeholder="Summary..."
                      value={post.summary}
                      onChange={onSummaryChange}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} className="my-2">
          <Card className="h-100">
            <ImageUploader imageUrl={post.titleImage} setImageUrl={setTitleImage} />
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <QuillEditor value={bodyText} setValue={setBodyText} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={4} xs={6} className="my-2">
          <DateSelector
            labelText={"Created:"}
            date={post.dateCreated}
            setDate={onCreatedChange}
          />
        </Col>
        <Col md={4} xs={6} className="my-2">
          <DateSelector
            labelText={"Published:"}
            date={post.datePublished}
            setDate={onPublishedChange}
          />
        </Col>
        <Col md={2} xs={6} className="my-1">
          <Checkbox
            label="Published"
            value={post.published}
            onChange={onCheckPublished}
          />
        </Col>
        <Col md={2} xs={6} className="my-1">
          <Checkbox
            label="Featured"
            value={post.featured}
            onChange={onCheckFeatured}
          />
        </Col>
        <Col md={2} xs={6} className="my-1">
          <Button className="w-100" variant="primary" onClick={onSubmit}>Save</Button>
        </Col>
        <Col md={2} xs={6} className="my-1">
          <Button className="w-100" variant="secondary" onClick={onCancel}>Cancel</Button>
        </Col>
      </Row>

    </Container>
  );
}

export default PostWriter;