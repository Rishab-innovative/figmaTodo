import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import moment from "moment";
import TodoData from "./TodoData";
import Nav from "./Nav";
import { TodoItem, Value } from "./Types";

const Todo: React.FC = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [timeOfTodo, onChange] = useState<Value>(moment().toDate());
  const [modalDisplay, setModalDisplay] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [todoCompleted, setTodoCompleted] = useState<boolean>(false);
  const [checkInput, setCheckInput] = useState<boolean>(true);

  const handleCheck = (id: number) => {
    console.log("click fun---");
    const itemToUpdate = items.find((item) => item.id === id);
    if (itemToUpdate) {
      setTodoCompleted(!itemToUpdate.completed);
      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      setItems(updatedItems);
      setTodoCompleted(!itemToUpdate.completed);
    }
  };
  const updateItemColors = () => {
    const updatedItems = items.map((item) => {
      if (moment(item.dateTime).isBefore(moment())) {
        return { ...item, color: "red-dot" };
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  };

  const handleDone = () => {
    if (inputValue.trim() === "") {
      setCheckInput(false);
    } else {
      const selectedTime = moment(timeOfTodo as Date);
      const currentTime = moment();

      if (selectedTime.isAfter(currentTime)) {
        const newTodoItem: TodoItem = {
          id: items.length + 1,
          text: inputValue,
          dateTime: selectedTime.toDate(),
          completed: false,
          color: "purple-dot",
        };
        setModalDisplay(false);
        setCheckInput(true);
        setItems([...items, newTodoItem]);
        setInputValue("");
        setError(false);
      } else {
        updateItemColors();
        setError(true);
        setModalDisplay(true);
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    updateItemColors();
  };
  return (
    <div className="container">
      <Nav setModalDisplay={setModalDisplay} />
      <TodoData items={items} handleCheck={handleCheck} />
      <div className="addModal">
        <Modal
          show={modalDisplay}
          onHide={() => setModalDisplay(false)}
          className="modalContainer"
        >
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
            <p onClick={() => setModalDisplay(false)}>Cancel</p>
            <DateTimePicker onChange={onChange} value={timeOfTodo} />

            <p onClick={handleDone}>Done</p>
          </Modal.Footer>
          {error ? <p className="error-msg">"DO NOT SELECT PAST TIME"</p> : ""}
        </Modal>
      </div>
    </div>
  );
};

export default Todo;
