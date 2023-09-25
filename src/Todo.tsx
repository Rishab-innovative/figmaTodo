import React, { useState } from "react";
import { ListGroup, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import { IoAddCircleOutline } from "react-icons/io5";
import { CiAlarmOn } from "react-icons/ci";
import "./App.css";

const Todo: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [value, onChange] = useState<Value>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [signal, setSignal] = useState<boolean>(false);
  const [checkInput, setCheckInput] = useState<boolean>(true);

  type TodoItem = {
    id: number;
    text: string;
    dateTime: Date;
    completed: boolean;
    color: string;
  };
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleCheck = (id: number) => {
    const itemToUpdate = items.find((item) => item.id === id);
    if (itemToUpdate) {
      setSignal(!itemToUpdate.completed);
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      setItems(updatedItems);
    }
    updateItemColors();
  };
  const updateItemColors = () => {
    const currentDate = new Date();
    const updatedItems = items.map((item) => {
      if (item.dateTime < currentDate) {
        return { ...item, color: "red-dot" };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  const handleDone = () => {
    if (inputValue === "") {
      setCheckInput(false);
    } else {
      const selectedTime = value as Date;
      const currentTime = new Date();

      if (selectedTime > currentTime) {
        const newTodoItem: TodoItem = {
          id: items.length + 1,
          text: inputValue,
          dateTime: selectedTime,
          completed: false,
          color: "purple-dot",
        };
        setShow(false);
        setCheckInput(true);
        setItems([...items, newTodoItem]);
        setInputValue("");
        setError(false);
      } else {
        updateItemColors();
        setError(true);
        setShow(true);
      }
    }
  };
  const checkTodo = () => {
    setSignal(!signal);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateItemColors();
  };
  return (
    <div className="container">
      <div className="nav">
        <p>Today</p>
        <IoAddCircleOutline onClick={handleShow} />
      </div>
      <div className="x">
        <ListGroup variant="flush">
          {items.map((element) => (
            <ListGroup.Item key={element.id}>
              <div className="container-box">
                <Form.Check
                  type="checkbox"
                  label={element.text}
                  onChange={() => handleCheck(element.id)}
                  onClick={checkTodo}
                />
                <span
                  className={element.completed ? "green-dot" : element.color}
                ></span>
              </div>
              <div className="display-time">
                <CiAlarmOn />
                {element.dateTime.toLocaleString()}
              </div>
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
            <DateTimePicker onChange={onChange} value={value} />

            <p onClick={handleDone}>Done</p>
          </Modal.Footer>
          {error ? <p className="error-msg">"DO NOT SELECT PAST TIME"</p> : ""}
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
