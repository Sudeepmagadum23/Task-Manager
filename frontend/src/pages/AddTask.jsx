import React, { useEffect, useState } from "react";
import { addTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (!auth) nav("/");
    // eslint-disable-next-line
  }, []);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};

    if (!form.title.trim()) temp.title = "Title is required";
    if (!form.description.trim())
      temp.description = "Description is required";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await addTask(form);
    nav("/tasks");
  };

  return (
    <div className="form-container">
      <h2>Create New Task</h2>

      <form onSubmit={submit} className="nice-form">

        <label>Title</label>
        <input
          name="title"
          className={errors.title ? "input-error" : ""}
          value={form.title}
          onChange={change}
          placeholder="Enter task title"
        />
        {errors.title && <p className="error-text">{errors.title}</p>}

        <label>Description</label>
        <textarea
          name="description"
          className={errors.description ? "input-error" : ""}
          value={form.description}
          onChange={change}
          rows="4"
          placeholder="Enter task description"
        />
        {errors.description && (
          <p className="error-text">{errors.description}</p>
        )}

        <label>Status</label>
        <select name="status" value={form.status} onChange={change}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div style={{ marginTop: 20, display: "flex", gap: "10px" }}>
          <button className="btn submit">Create Task</button>
          <button
            type="button"
            className="btn delete"
            onClick={() => nav("/tasks")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
);
}
