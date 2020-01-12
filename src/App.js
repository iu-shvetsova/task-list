import React from "react";
import "./App.scss";
import "antd/dist/antd.css";
import { TaskList } from "./containers/TaskList/TaskList";
import { PageHeader } from "./containers/PageHeader/PageHeader";
import { NewTaskForm } from "./containers/NewTaskForm/NewTaskForm";

function App() {
  return (
    <div className="App">
      <PageHeader />
      <NewTaskForm />
      <TaskList />
    </div>
  );
}

export default App;
