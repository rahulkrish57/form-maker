import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Alert, Row, Col, Button, Card } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { loaderState } from "../../features/loaderSlice";
import { newForm } from "../../features/formSlice";
import { addToForm } from "../../features/allFormSlice";
import { apiService } from "../../services/api";

const NewHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader.value);
  const allForm = useSelector((state) => state.allForm.value);
  const initialAlert = { view: false, label: "", variant: "" };
  const [alert, setAlert] = useState(initialAlert);


  const showAllForms = useCallback(async () => {
    return apiService
      .showAllForms()
      .then((res) => {
        dispatch(addToForm(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const addNewForm = useCallback(async () => {
    dispatch(loaderState(true));
    const initial = {
      name: "Untitled",
      fId: uuidv4(),
      createdAt: Date(),
      updatedAt: Date(),
      que: [],
    };
    dispatch(newForm(initial));
    return apiService
      .addNewForm(initial)
      .then((res) => {
        console.log(res);
        const { data } = res;
        const newData = [...allForm, res.data];
        console.log(newData);
        dispatch(addToForm(newData));
        dispatch(loaderState(false));
        navigate(`form/${data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, allForm, navigate]);

  useEffect(() => {
    showAllForms();
  }, [showAllForms]);

  const memoizedAllForm = useMemo(() => allForm, [allForm]);

  const editForm = (id) => {
    navigate(`/form/${id}`);
  };

  const deleteForm = async (id) => {
    return apiService
      .deleteFormData(id)
      .then((res) => {
        setAlert({ view: true, variant: "success", label: "Form Deleted!" });
        setTimeout(() => {
          setAlert(initialAlert);
        }, 5000);
        showAllForms()
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });

  }
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
    <div className="p-4">
      {alert?.view && (
        <Alert key={alert.variant} variant={alert.variant} style={alertStyle}>
          {alert.label}
        </Alert>
      )}
      <Row className="mb-4">
        <Col>
          <p>Click the button below to open a new form:</p>
          <Button variant="outline-success" onClick={addNewForm}>
            Create New
          </Button>
        </Col>
      </Row>
      {loader ? (
        <div>Loading...</div>
      ) : (
        <Row className="d-flex flex-wrap mt-4">
          {memoizedAllForm?.length > 0 &&
            memoizedAllForm.map((formData) => (
              <Col xs={12} sm={6} md={4} lg={3} key={formData.fId} className="mb-4 cursor-pointer">
                <Card>
                  <Card.Body>
                    <Card.Title>{formData.name}</Card.Title>
                    <p>
                      Created At:{" "}
                      {moment(formData.createdAt).format("DD-MM-YYYY")}
                    </p>
                    <p>
                      Updated At:{" "}
                      {moment(formData.updatedAt).format("DD-MM-YYYY")}
                    </p>
                  </Card.Body>
                  <Card.Body>
                    <FaEdit
                      style={{ cursor: "pointer", color: "green", background: "white", margin: "5px" }}
                      onClick={() => editForm(formData.id)}
                    />
                    <MdDelete
                      style={{ cursor: "pointer", color: "red", background: "white", margin: "5px" }}
                      onClick={() => deleteForm(formData.id)}
                    />
                  </Card.Body>

                </Card>
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default NewHome;
