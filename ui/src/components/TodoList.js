import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { FaPlusCircle } from "react-icons/fa";
import { getTaskList, createTask, updateTask, removeTask } from "./../handler";

function TodoList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTaskList().then((resp) => {
      console.log(resp);
      setTasks(resp);
    });
  }, []);

  const [description, setDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  function addTask(text) {
    const trimmedText = text.trim();

    if (trimmedText === "") {
      alert("Task description cannot be empty.");

      // remove edit task id to prevent accidental update
      if (editTaskId !== null) {
        setEditTaskId(null);
      }
      return;
    }

    if (editTaskId !== null) {
      // Update mode
      updateTask(editTaskId, { description: trimmedText });
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, description: trimmedText } : task
        )
      );
      setEditTaskId(null); // exit edit mode
    } else {
      // Add mode
      const newTask = { description: trimmedText };
      createTask(newTask);
      setTasks([...tasks, newTask]);
    }
    setDescription("");
  }

  function editTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setDescription(taskToEdit.description); // populate input box
      setEditTaskId(id); // set edit mode
    }
  }

  function deleteTask(id) {
    removeTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleStatus(id, newStatus) {
    updateTask(id, { status: newStatus });

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }
  return (
    <div className="todo-list">
      <input
        className="todo-input"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="icon-button" onClick={() => addTask(description)}>
        <FaPlusCircle style={{ color: "#5e5e5e", fontSize: "16px" }} />
      </button>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
}
export default TodoList;
