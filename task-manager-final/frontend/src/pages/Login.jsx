import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth") || "null");
    if (auth) nav("/tasks");
  }, [nav]);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let temp = {};
    if (!form.username.trim()) temp.username = "Username is required";
    if (!form.password.trim()) temp.password = "Password is required";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.username === "admin" && form.password === "12345") {
      localStorage.setItem("auth", JSON.stringify({ username: form.username }));
      nav("/tasks");
      return;
    }
    setErrors({ username: "", password: "Invalid username or password" });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={submit} className="nice-form">
        <label>Username</label>
        <input name="username" value={form.username} className={errors.username ? "input-error" : ""} onChange={change} placeholder="Enter username" />
        {errors.username && <p className="error-text">{errors.username}</p>}
        <label>Password</label>
        <input type="password" name="password" value={form.password} className={errors.password ? "input-error" : ""} onChange={change} placeholder="Enter password" />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <button className="btn submit" style={{ marginTop: "20px" }}>Login</button>
      </form>
    </div>
  );
}
