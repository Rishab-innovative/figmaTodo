import React from "react";
import { ListGroup, Form } from "react-bootstrap";
import { CiAlarmOn } from "react-icons/ci";
import { TodoItem } from "./Types";

type TodoDataProps = {
  items: TodoItem[];
  handleCheck: (id: number) => void;
};

const TodoData: React.FC<TodoDataProps> = ({ items, handleCheck }) => {
  return (
    <div className="todo-wrapper">
      <ListGroup variant="flush">
        {items.map((element) => (
          <ListGroup.Item key={element.id}>
            <div className="container-box">
              <Form.Check
                type="checkbox"
                label={element.text}
                onChange={() => handleCheck(element.id)}
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
  );
};

export default TodoData;
