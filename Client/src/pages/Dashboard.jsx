import { useEffect, useState } from "react";
import API from "../api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const userName = localStorage.getItem("userName") || "User";

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchTasks();
    };
    loadData();
  }, []);

  // Add Task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  // Toggle Complete
  const toggleComplete = async (id, isCompleted) => {
    await API.put(`/tasks/${id}`, { isCompleted: !isCompleted });
    fetchTasks();
  };

  // Delete Task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.location.reload();
  };

  return (
    <div style={{ padding: "20px" }} className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#818cf8", margin: 0 }}>Welcome, {userName}!</h3>
        <button
          onClick={logout}
          style={{ float: "right" }}
          className="logout-btn"
        >
          Logout
        </button>
      </div>

      <h2>My To-Do List</h2>

      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New Task..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span
              className="task-text"
              style={{
                textDecoration: task.isCompleted ? "line-through" : "none",
                opacity: task.isCompleted ? 0.6 : 1,
              }}
            >
              {task.title}
            </span>

            <div className="actions">
              <button
                className="done-btn"
                onClick={() => toggleComplete(task._id, task.isCompleted)}
              >
                {task.isCompleted ? "Undo" : "Done"}
              </button>
              <button className="del-btn" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
