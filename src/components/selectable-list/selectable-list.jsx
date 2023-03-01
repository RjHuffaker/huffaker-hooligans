import ListGroup from 'react-bootstrap/ListGroup';

const SelectableList = ({itemList, selectItem}) => {

  const onItemSelect = (item) => {
    selectItem(item);
  }

  return (
    <ListGroup>
      {itemList.map((item) => 
        <ListGroup.Item
          key={item.id}
          variant="light"
          action
          active={item.selected}
          onClick={() => onItemSelect(item)}
        >{item.title} {item.selected}</ListGroup.Item>
      )}
    </ListGroup>
  );
}

export default SelectableList;