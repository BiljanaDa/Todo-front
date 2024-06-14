import React, { useState } from "react";
import TodoService from "../services/Todo.service";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

export default function AddTodo({
  setTodoList,
  todoList,
  currentTodo,
  clearCurrentTodo,
}) {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentTodo) {
      setTask(currentTodo.task);
      setStatus(currentTodo.status);
      setDeadline(currentTodo.deadline);
    }
  }, [currentTodo]);

  const validateForm = () => {
    const newErrors = {};
    if (!task) newErrors.task = "Task is required";
    if (!status) newErrors.status = "Status is required";
    if (!deadline) newErrors.deadline = "Deadline is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      let addedTask;
      if (currentTodo) {
        addedTask = await TodoService.editTodo(currentTodo._id, {
          task,
          status,
          deadline,
        });
        setTodoList(
          todoList.map((todo) =>
            todo._id === addedTask._id ? addedTask : todo
          )
        );
      } else {
        addedTask = await TodoService.addTodo({ task, status, deadline });
        setTodoList([...todoList, addedTask]);
      }
      clearCurrentTodo();
      setTask("");
      setStatus("");
      setDeadline("");
      setErrors({});
    } catch (error) {
      console.error("Error adding/ediing task:", error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Task</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          isInvalid={!!errors.task}
        />
        <Form.Control.Feedback type="invalid">
          {errors.task}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          isInvalid={!!errors.status}
        />
        <Form.Control.Feedback type="invalid">
          {errors.status}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Deadline</Form.Label>
        <Form.Control
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          isInvalid={!!errors.deadline}
        />
        <Form.Control.Feedback type="invalid">
          {errors.deadline}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        {currentTodo ? "Update" : "Add"} Task
      </Button>
    </Form>
  );
}
