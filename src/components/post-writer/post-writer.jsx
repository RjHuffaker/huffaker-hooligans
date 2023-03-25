import { useContext } from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

import { ImagesContext } from '../../contexts/images-context';

import ImageSelectModal from '../../components/image-select-modal/image-select-modal';
import TagSelector from "../../components/tag-selector/tag-selector"
import DateSelector from "../../components/date-selector/date-selector";
import Checkbox from "../../components/checkbox/checkbox"

import QuillEditor from '../quill-editor/quill-editor';

import './post-writer.css';

const PostWriter = ({ headerText, post, setPost, bodyText, setBodyText, onSubmit, onCancel }) => {

  console.log(post);

  const {
		stageImage,
		stagedImages,
		uploadImage,
		uploadPercent,
		createImageData
	} = useContext(ImagesContext);

  const setTitleImage = (value) => {
    setPost({ ...post, titleImage: value });
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value })
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

  const handleAccept = async (newImageData) => {
    setPost({ ...post, titleImage: newImageData });
  }

  const acceptImage = async (newImage) => {
    setPost({ ...post, titleImage: newImage });
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
                        name="title"
                        className="form-control"
                        placeholder="Title..."
                        value={post.title}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Col>
                  <Col lg={6}>
                    <TagSelector name="tags" value={post.tags} onChange={handleChange} />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <textarea
                      name="summary"
                      className="form-control"
                      placeholder="Summary..."
                      value={post.summary}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </Container>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={3} className="my-2">
          <Card className="h-100">
            <ImageSelectModal
							handleAccept={acceptImage}
						/>
            <img src={post?.titleImage?.xs_img} alt="title" />
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
        <Col md={4} xs={6}>
          <DateSelector
            labelText={"Created:"}
            date={post.dateCreated}
            setDate={onCreatedChange}
          />
        </Col>
        <Col md={4} xs={6}>
          <DateSelector
            labelText={"Published:"}
            date={post.datePublished}
            setDate={onPublishedChange}
          />
        </Col>
        <Col md={2} xs={6}>
          <Checkbox
            label="Published"
            value={post.published}
            onChange={onCheckPublished}
          />
        </Col>
        <Col md={2} xs={6}>
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