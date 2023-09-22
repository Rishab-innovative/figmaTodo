import React, { useState } from "react";
import { ListGroup, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DateTimePicker from "react-datetime-picker";
import { IoAddCircleOutline } from "react-icons/io5";
import "./App.css";

const Todo: React.FC = () => {
  const [item, setItem] = useState<string[]>([]);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [checks, setChecks] = useState<boolean[]>([false, false]);
  const [inputValue, setInputValue] = useState<string>("");
  const [signal, setSignal] = useState<boolean>(false);
  const [checkInput, setCheckInput] = useState<boolean>(true);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  const handleDateChange = (e: any) => {
    console.log("dfjbfhgdjhyf", e);
  };
  const handleCheck = (index: number) => {
    console.log("check-->", checks);
    const newChecks: boolean[] = [...checks];
    newChecks[index] = !newChecks[index];
    console.log(newChecks, "-----");
    setChecks(newChecks);
  };

  const handleDone = () => {
    if (inputValue === "") {
      setCheckInput(false);
    } else {
      setShow(false);
      setCheckInput(true);
      item.unshift(inputValue);
      setInputValue("");
    }
  };
  const checkTodo = () => {
    setSignal(!signal);
  };
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
        <ListGroup variant="flush">
          {item.map((element: string, index: number) => (
            <ListGroup.Item key={index}>
              <Form.Check
                type="checkbox"
                label={element}
                onChange={() => handleCheck(index)}
                onClick={checkTodo}
              />
              <span className={signal ? "green-dot" : "red-dot"}></span>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="addModal">
        <Modal show={show} onHide={handleClose} className="modalContainer">
          <Form.Group className="mb-3">
            <Form.Label>
              <p className="addText">Add Todo</p>
            </Form.Label>
            <Form.Control
              as="textarea"
              className={checkInput ? "black-border" : "red-border"}
              rows={3}
              value={inputValue}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Modal.Footer className="modalFooter">
            <p onClick={handleClose}>Cancel</p>
            <DateTimePicker
              className="custom-datetime-picker"
              onChange={(e) => handleDateChange(e)}
              value={date}
            />
            <p onClick={handleDone}>Done</p>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
