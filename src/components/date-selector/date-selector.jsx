import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({labelText, date, setDate}) => {
    
    const newDate = date ? new Date(parseInt(date)) : new Date();

    return (
        <Container>
            <Row className="my-1">
                <Col lg={4}>
                    <span>{labelText}</span>
                </Col>
                <Col lg={8}>
                    <DatePicker
                        selected={newDate}
                        onChange={setDate}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default DateSelector;