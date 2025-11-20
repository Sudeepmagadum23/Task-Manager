import axios from "axios";
const API = "https://task-manager-1-l2ln.onrender.com/api/tasks";

export const getTasks = (params = {}) => axios.get(API, { params });
export const getTaskById = (id) => axios.get(`${API}/${id}`);
export const addTask = (task) => axios.post(API, task);
export const updateTask = (id, task) => axios.put(`${API}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API}/${id}`);
