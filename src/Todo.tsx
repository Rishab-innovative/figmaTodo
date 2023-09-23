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
  const [value, onChange] = useState<Value>(new Date());
  const [show, setShow] = useState<boolean>(false);
  const [checks, setChecks] = useState<boolean[]>([false, false]);
  const [inputValue, setInputValue] = useState<string>("");
  const [signal, setSignal] = useState<boolean>(false);
  const [checkInput, setCheckInput] = useState<boolean>(true);

  type TodoItem = {
    text: string;
    dateTime: Date;
  };
  const currentD = new Date();
  let currentMin = currentD.getMinutes();
  let currentHour = currentD.getHours();
  let currentDate = currentD.getDate();
  let currentMonth = currentD.getMonth();
  let currentYear = currentD.getFullYear();

  const currentTime =
    currentYear.toString() +
    currentMonth.toString() +
    currentDate.toString() +
    currentHour.toString() +
    currentMin.toString();

  const hours = (value as Date).getHours();
  let hour = hours > 12 ? hours - 12 : hours;
  const minutes = (value as Date).getMinutes();
  let min = minutes > 9 ? minutes : `0${minutes}`;
  const date = (value as Date).getDate();
  const month = (value as Date).getMonth() + 1;
  const year = (value as Date).getFullYear();

  const futureDate =
    year.toString() +
    month.toString() +
    date.toString() +
    hours.toString() +
    minutes.toString();
  const gap = (parseInt(futureDate) - parseInt(currentTime)) / 100000;
  type ValuePiece = Date | null;
  type Value = ValuePiece | [ValuePiece, ValuePiece];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };
  const handleCheck = (index: number) => {
    console.log("index-->", index);
  };

  const handleDone = () => {
    if (inputValue === "") {
      setCheckInput(false);
    } else {
      const newTodoItem: TodoItem = {
        text: inputValue,
        dateTime: value as Date,
      };
      setShow(false);
      setCheckInput(true);
      setItems([...items, newTodoItem]);
      setInputValue("");
    }
  };

  const setampm = (hours: number) => {
    return hours > 12 ? "pm" : "am";
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
      <div className="x">
        <ListGroup variant="flush">
          {items.map((todoItem: TodoItem, index: number) => (
            <ListGroup.Item key={index}>
              <div className="container-box">
                <Form.Check
                  type="checkbox"
                  label={todoItem.text}
                  onChange={() => handleCheck(index)}
                  onClick={checkTodo}
                />
                <span className={signal ? "green-dot" : "red-dot"}></span>
              </div>
              <div className="display-time">
                <CiAlarmOn />
                {hour}:{min} {setampm(hours)} {date}/{month}/{year}
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
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
