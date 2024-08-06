import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Alert, Container, Form, Row, Col, Button } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { apiService } from "../../services/api";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const EditForm = (props) => {
  const { id } = props;
  const navigate = useNavigate();
  const initialQue = { qId: uuidv4(), type: "text", title: "" };
  const initialAlert = { view: false, label: "", variant: "" };
  const [formData, setFormData] = useState({});
  console.log("formData", formData);
  const [questions, setQuestions] = useState([]);
  console.log("questions", questions);
  const [alert, setAlert] = useState(initialAlert);
  function addNewQue() {
    setQuestions((prevQuestions) => [...prevQuestions, initialQue]);
  }
  async function onSubmit() {
    const body = {
      ...formData,
      que: questions,
      updatedAt: Date()
    };
    return apiService
      .updateFormData(id, body)
      .then((res) => {
        const { data } = res;
        setAlert({ view: true, variant: "success", label: "Form Updated!" });
        setTimeout(() => {
          setAlert(initialAlert);
        }, 5000);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const formTitleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      name: e.target.value,
    }));
  };
  const handleTitleChange = (e, qId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.qId === qId ? { ...question, title: e.target.value } : question
      )
    );
  };

  const handleTypeChange = (e, qId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.qId === qId ? { ...question, type: e.target.value } : question
      )
    );
  };

  function handleDelete(qId) {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.qId !== qId)
    );
  }
  const getFormData = useCallback(async () => {
    return apiService
      .getFormData(id)
      .then((res) => {
        const { data } = res;
        setFormData(data);
        setQuestions(data?.que?.length > 0 ? data.que : [initialQue]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedQuestions = Array.from(questions);
    const [movedQuestion] = reorderedQuestions.splice(result.source.index, 1);
    reorderedQuestions.splice(result.destination.index, 0, movedQuestion);

    setQuestions(reorderedQuestions);
  };

  useEffect(() => {
    getFormData();
  }, [props]);

  const alertStyle = {
    position: "fixed",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: "600px",
    zIndex: 1050,
    margin: "10px",
  };

  return (
    <>
      {alert?.view && (
        <Alert key={alert.variant} variant={alert.variant} style={alertStyle}>
          {alert.label}
        </Alert>
      )}
      <div className="m-4">
        <Form.Group controlId={`formData-title-${formData.qId}`}>
          <Form.Control
            type="text"
            placeholder="Enter the form title"
            value={formData.name}
            onChange={(e) => formTitleChange(e)}
          />
        </Form.Group>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) =>
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {questions?.length > 0 &&
                questions.map((question, index) => {
                  return (
                    <Draggable
                      key={question.qId}
                      draggableId={question.qId}
                      index={index}
                    >{
                        (provided) => (
                          <Row key={question.qId}
                            className="align-items-center mb-3"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <Col xs={6}>
                              <Form.Group controlId={`question-title-${question.qId}`}>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter the title"
                                  value={question.title}
                                  onChange={(e) => handleTitleChange(e, question.qId)}
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={4}>
                              <Form.Select
                                aria-label="Default select example"
                                value={question.type}
                                onChange={(e) => handleTypeChange(e, question.qId)}
                              >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="file">File</option>
                              </Form.Select>
                            </Col>
                            <Col xs={2} className="text-center">
                              <MdDelete
                                style={{ cursor: "pointer", color: "red", background: "white" }}
                                onClick={() => handleDelete(question.qId)}
                              />
                            </Col>
                          </Row>
                        )
                      }

                    </Draggable>
                  );
                })}
            </div>
          }

        </Droppable>
      </DragDropContext>

      <Row>
        <Col><Button variant="outline-success" className="m-2" onClick={addNewQue}>
          Add New{" "}
        </Button><Button variant="outline-primary" className="m-2" onClick={onSubmit}>
            Submit{" "}
          </Button>{" "}
          <Button variant="outline-dark" className="m-2" onClick={() => navigate("/")}>
            Home{" "}
          </Button>{" "}</Col>
      </Row>
    </>
  );
};

export default EditForm;
