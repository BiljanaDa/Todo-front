import React, { useEffect, useState } from "react";
import TodoService from "../services/Todo.service";
import Table from "react-bootstrap/Table";
import AddTodo from "../components/AddTodo";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";

export default function Todo() {
  const [todoList, setTodoList] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  // useEffect(() => {
  //   async function getTodoList() {
  //     console.log("Fetching todo list");
  //     const response = await TodoService.getTodoList();
  //     console.log("Fetched todo list", response);
  //     setTodoList(response);
  //   }
  //   getTodoList();
  // }, []);
  useEffect(() => {
    getTodoList();
  }, []);
  const getTodoList = async () => {
    console.log("Fetching todo list");
    const response = await TodoService.getTodoList();
    console.log("Fetched todo list", response);
    setTodoList(response);
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
  };

  const clearCurrentTodo = () => {
    setCurrentTodo(null);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await TodoService.deleteTodo(id);
      setTodoList(todoList.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deletin todo:", error);
    }
  };

  return (
    <>
      <Container>
        <h3 align="center">
          <strong>ToDo List</strong>
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoList.map((data) => (
              <tr key={data._id}>
                <td>{data.task}</td>
                <td>{data.status}</td>
                <td>{data.deadline}</td>
                <td>
                  <Button onClick={() => handleEditTodo(data)}>Edit</Button>
                  <Button
                    onClick={() => handleDeleteTodo(data._id)}
                    variant="danger"
                    style={{ marginLeft: "30px" }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <br></br>
      <Container>
        {" "}
        <h3 align="center">
          <strong>{currentTodo ? "Edit ToDo" : "Add Todo"}</strong>
        </h3>
        <AddTodo
          setTodoList={setTodoList}
          todoList={todoList}
          currentTodo={currentTodo}
          clearCurrentTodo={clearCurrentTodo}
        />
      </Container>
    </>
  );
}
