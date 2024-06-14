import React from "react";
import { Routes, Route } from "react-router-dom";
import Todo from "./pages/Todo";

export default function Router() {
  return (
    <Routes>
      <Route exact path="/" element={<Todo />} />
    </Routes>
  );
}
