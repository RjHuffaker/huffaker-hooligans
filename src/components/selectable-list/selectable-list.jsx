import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ListGroup from 'react-bootstrap/ListGroup';

const SelectableList = ({itemList, selectItem, allowEdit, onEditItem}) => {

  const onItemSelect = (item) => {
    selectItem(item);
  }

  console.log(allowEdit);

  return (
    <ListGroup>
      {itemList?.map((item) => 
        
          <ListGroup.Item
            key={item.id}
            variant="light"
            action
            active={item.selected}
            onClick={() => onItemSelect(item)}
          >
            <Row>
              <Col>
                {item.title}
              </Col>
              <Col xs={2}>
                {allowEdit && 
                  <span variant="outline-success" onClick={() => onEditItem(item.id)}>&#9998;</span>
                }
              </Col>
            </Row>
          </ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default SelectableList;