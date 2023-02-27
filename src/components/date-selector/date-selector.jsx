import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-selector.css"

const DateSelector = ({labelText, date, setDate}) => {
    
    const newDate = date ? new Date(parseInt(date)) : new Date();

    return (
        <Row>
            <Col md="auto">
                <label>{labelText}</label>
            </Col>
            <Col>
                <DatePicker
                    selected={newDate}
                    onChange={setDate}
                />
            </Col>
        </Row>
    );
}

export default DateSelector;