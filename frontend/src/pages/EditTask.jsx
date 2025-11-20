import React, { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../services/taskService";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTask() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", status: "pending" });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (!auth) {
      nav("/");
      return;
    }
    (async () => {
      const res = await getTaskById(id);
      setForm(res.data);
    })();
    // eslint-disable-next-line
  }, [id]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }
    await updateTask(id, form);
    nav("/tasks");
  };

  return (
    <div className="form-container">
      <h2>Edit Task</h2>
      <form onSubmit={submit} className="nice-form">
        <label>Task Title</label>
        <input name="title" value={form.title} onChange={change} />
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={change} rows="4" />
        <label>Status</label>
        <select name="status" value={form.status} onChange={change}>
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="completed">Completed</option>
        </select>
        <button className="btn submit">Save Changes</button>
      </form>
    </div>
);
}
