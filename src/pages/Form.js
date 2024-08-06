import { useParams } from "react-router-dom";
import EditForm from "../components/form/EditForm";
import { Container, Row, Col } from "react-bootstrap";
const Form = () => {
  const { formId } = useParams();
  return (
    <Container>
      <Row>
        <EditForm id={formId} />
      </Row>
    </Container>
  );
};

export default Form;
