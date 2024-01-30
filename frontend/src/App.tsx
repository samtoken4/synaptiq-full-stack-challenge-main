import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import TodoList from './pages/TodoList';
import "./App.css";
import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/"
        element={
            <TodoList />
        }
      >
      </Route>
    </Routes>
  </Router>
  );
}

export default App;
