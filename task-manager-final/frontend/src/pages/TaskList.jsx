import React, { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../services/taskService";
import { Link, useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;
  const navigate = useNavigate();

  const load = async (p = page, s = status) => {
    const res = await getTasks({ status: s, page: p, limit });
    const { tasks, total, page: pnum, pages } = res.data;
    setTasks(tasks);
    setTotal(total);
    setPage(pnum);
    setPages(pages);
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (!auth) {
      navigate("/");
      return;
    }
    load(1, status);
    // eslint-disable-next-line
  }, [status]);

  useEffect(() => {
    load(page, status);
    // eslint-disable-next-line
  }, [page]);

  const remove = async (id) => {
    if (confirm("Delete this task?")) {
      await deleteTask(id);
      if (tasks.length === 1 && page > 1) setPage(page - 1);
      else load(page, status);
    }
  };

  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  return (
    <div>
      <h2>All Tasks</h2>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <label>Filter: </label>
          <select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <small>Showing {tasks.length} of {total}</small>
        </div>
      </div>

      {tasks.length === 0 && <p>No tasks available.</p>}

      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <h3>{task.title}</h3>
          <div style={{ display: "flex", gap: 8 }}>
            {auth && <Link className="btn" to={`/edit/${task._id}`}>Edit</Link>}
            {auth && <button onClick={() => remove(task._id)} className="btn delete">Delete</button>}
          </div>
        </div>
      ))}

  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
    <button className="btn" disabled={page <= 1} onClick={() => setPage(page - 1)}>Prev</button>
    <span style={{ alignSelf: "center" }}>Page {page} / {pages}</span>
    <button className="btn" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
  </div>
    </div>
  );
}
