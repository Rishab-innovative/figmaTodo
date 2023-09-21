import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "./App.css";
import { IoAddCircleOutline } from "react-icons/io5";

const Todo: React.FC = () => {
  const [item, setItem] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleDone = () => {
    setShow(false);
    item.unshift(inputValue);
  };
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="container">
      <div className="nav">
        <p>Today</p>
        <IoAddCircleOutline onClick={handleShow} />
      </div>
      <div className="container-box">
        {item.map((element) => (
          <ListGroup variant="flush" key={element} className="displayItem">
            <Form.Check />
            <ListGroup.Item>{element}</ListGroup.Item>
          </ListGroup>
        ))}
      </div>
      <div className="addModal">
        <Modal show={show} onHide={handleClose} className="modalContainer">
          <Form.Group className="mb-3">
            <Form.Label>
              <p className="addText">Add Todo</p>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Modal.Footer className="modalFooter">
            <p onClick={handleClose}>Cancel</p>
            <p onClick={handleDone}>Done</p>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
