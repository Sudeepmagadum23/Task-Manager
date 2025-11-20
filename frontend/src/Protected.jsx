import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}
