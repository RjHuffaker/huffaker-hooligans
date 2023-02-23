import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const InputToggle = ({value, onChange}) => {

  const [ editMode, setEditMode ] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  return (
    <Container>
      <Row>
        <Col xs={9}>
          {editMode ? 
          <input
            className="form-control"
            value={value}
            onChange={onChange}
          /> :
          <span>{value}</span>}
        </Col>
        <Col>
          <span onClick={toggleEditMode}>
            &#9998;
          </span>
        </Col>
      </Row>
    </Container>
  );
}

export default InputToggle;