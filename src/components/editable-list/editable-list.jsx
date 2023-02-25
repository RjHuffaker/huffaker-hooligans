import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import './editable-list.css';

const EditableList = ({
  itemList,
  selectedItem,
  setSelectedItem,
  editableItem,
  setEditableItem,
  onChangeTitle,
  onItemSave,
  onItemRemove
}) => {

  const onItemSelect = (item) => {
    if(item.id === selectedItem?.id){
      setEditableItem(item);
    } else {
      setSelectedItem(item);
      setEditableItem(null);
    }
  }

  return (
    <>
      <ListGroup>
        {itemList?.map(item => (
          <div key={item.id}>
            {item.id === editableItem?.id ?
              <ButtonGroup className="w-100 item-row">
                <input
                  className="form-control"
                  value={editableItem.title}
                  onChange={onChangeTitle}
                />
                <Button variant="outline-success" onClick={onItemSave}>&#9998;</Button>
                <Button variant="outline-danger" onClick={onItemRemove}>&#128465;</Button>
              </ButtonGroup>
              :
              <ListGroup.Item
                className="item-row"
                variant="light"
                action
                onClick={() => onItemSelect(item)}
                active={item.id === selectedItem?.id}
              >
                {item.title}
              </ListGroup.Item>
            }
          </div>
        ))}
      </ListGroup>
    </>
  );
}

export default EditableList;