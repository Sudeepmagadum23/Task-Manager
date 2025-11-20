import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Protected from "./Protected";
import "./styles/main.css";

function Navbar() {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Task Manager</h2>

      <div>
        {auth ? (
          <>
            <Link to="/tasks">All Tasks</Link>
            <Link to="/add" className="add-btn">add task</Link>
            {/* <span style={{ marginLeft: 12, marginRight: 8 }}>Hi, {auth.username}</span> */}
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<Protected><TaskList /></Protected>} />
          <Route path="/add" element={<Protected><AddTask /></Protected>} />
          <Route path="/edit/:id" element={<Protected><EditTask /></Protected>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
